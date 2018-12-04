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

//aarons code
var dbFetcher = new DataFatcher();
dbFetcher.getData().then(result => {
  slm_urls = result;
  looping();
});

function looping() {
  openWeb(slm_urls[0]);
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
  var current_prop_id = property.id;
  console.log(current_prop_id);
  return;
  var page = await browser.newPage();
  await page.setViewport({ width: 2000, height: 2000 });
  const AMENITIES_PANNEL = "#block-4";

  await page.goto(current_prop_url, { waitUntil: "networkidle2" });
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
  browser.close();

  // insertIntoDB(amenities, property);
}

// function insertIntoDB(property, amenities) {
//   var url = property.temp_old_reference;
//   var id = property.id;
//   console.log(
//     "property URL" + url + "property ID " + id + "amenities" + amenities
//   );
// }
