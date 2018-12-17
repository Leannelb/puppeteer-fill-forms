const puppeteer = require("puppeteer");

const mysql = require("mysql");
const options = {
  user: "root",
  password: "root",
  database: "slm_all_tables_2"
};

const connection = mysql.createConnection(options);
var slm_urls = [];
connection.connect(err => {
  if (err) {
    console.error("An error occurred while connecting to the DB");
    throw err;
  }
});
class DataFatcher {
  async getData() {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT temp_old_reference, id FROM property",
        (error, dbResult) => {
          if (error) {
            console.error("An error occurred while executing the query");
            resolve(null);
          } else {
            resolve(dbResult);
          }
        }
      );
    });
  }
}

var dbFetcher = new DataFatcher();
dbFetcher.getData().then(result => {
  slm_urls = result;
  looping();
});

function looping() {
  if (slm_urls.length > 0) {
    openWeb(slm_urls[0]);
    slm_urls.shift();
  } else {
    console.log("WOOOOW :)");
  }
}

function openWeb(property) {
  run(property);
}

async function run(property) {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 10,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
    ignoreHTTPSErrors: true,
    dumpio: false,
    devtools: true
  });

  var current_prop_url = property.temp_old_reference;
  if (
    current_prop_url !== null &&
    current_prop_url !==
      "http://shortletsmalta.com/034-Stunning-3-bedroom-Duplex-Penthouse.html" &&
    current_prop_url !=
      "http://shortletsmalta.com/090_St'Julians_Hill_Duplex_Pth" &&
    current_prop_url !=
      "http://shortletsmalta.com/087_St'Julians_Hill_1-bedroom_Apt" &&
    current_prop_url.indexOf("http") > -1
  ) {
    var current_prop_id = property.id;
    var page = await browser.newPage().catch(() => (page = null));
    await page.setViewport({ width: 2000, height: 2000 });
    const AMENITIES_PANNEL = "#block-4";

    await page
      .goto(current_prop_url, { waitUntil: "networkidle2" })
      .catch(() => (page = null));

    if (page != null) {
      await page
        .waitForSelector("#content > #block-3 > .column > .paragraph")
        .catch(() => (page = null));
      if (page != null) {
        //  The evaluates below get the amentites list (from their classes) and creates an array with them.
        cites = [];
        try {
          cities = await page
            .evaluate(() =>
              Array.from(
                document.querySelectorAll(
                  "#content > #block-3 > .column > .paragraph"
                )
              ).map(paragraph => paragraph.innerHTML)
            )
            .catch(e => "");
        } catch (e) {
          console.log("An errror has occured and handled kinda", e);
        }

        console.log(
          "The paragraph of info for " +
            current_prop_url +
            "\t\n" +
            "  is " +
            cities +
            "\t\n\n\t\n\t\n\r\r\r\r\r"
        );
        browser.close();
        looping();
      } else {
        console.log("SHIT, Wait for selector ");
      }
    } else {
      console.log("SHIT, GOTO PAGE ");
    }
  } else {
    console.log("SHIT", current_prop_url);
    browser.close();
    looping();
  }
}
