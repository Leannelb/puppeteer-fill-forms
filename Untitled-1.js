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
      connection.query("SELECT id, temp_old_reference FROM property", function(
        err,
        result,
        fields
      ) {
        // if any error while executing above query, throw error
        if (err) throw err;
        // if there is no error, you have the result
        // iterate for all the rows in result
        Object.keys(result).forEach(function(key) {
          var row = result[key];
          //   console.log(row.temp_old_reference);
        });
      });
    });
  }
}

//aarons code
var dbFetcher = new DataFatcher();
dbFetcher.getData().then(result => {
  slm_urls = result;
  looping();
});

function looping() {
  // console.log("Hello");
  // console.log(slm_urls);
  openWeb(slm_urls[0]);
}

function openWeb(current_prop) {
  run(current_prop);
}

async function run(current_prop) {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 10,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
    ignoreHTTPSErrors: true,
    dumpio: false,
    devtools: true
  });

  var page = await browser.newPage();
  await page.setViewport({ width: 2000, height: 2000 });
  const AMENITIES_PANNEL = "#block-4";
  let this_Url = current_prop[0].temp_old_reference;
  console.log("current_prop[0].temp_old_reference");
  await page.goto(this_Url, { waitUntil: "networkidle2" });
  await page.waitFor(2000);
  await page.focus(AMENITIES_PANNEL);

  //  The evaluates below get the amentites list (from their classes) and creates an array with them.
  const amenitiesEven = await page.evaluate(() =>
    Array.from(document.querySelectorAll("div.column li.even span")).map(
      attribute => attribute.innerHTML
    )
  );
  const amenitiesOdd = await page.evaluate(() =>
    Array.from(document.querySelectorAll("div.column li.odd span")).map(
      attribute => attribute.innerHTML
    )
  );

  const amenities = amenitiesEven.concat(amenitiesOdd);
  console.log(amenities);
  browser.close();
}
