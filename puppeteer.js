const puppeteer = require("puppeteer");
//connection to DB info: i.e. OPTIONS
const mysql = require("mysql");
const options = {
  user: "root",
  password: "root",
  database: "slm_all_tables_2"
};
//create connection with options
const connection = mysql.createConnection(options);
var slm_urls = [];
connection.connect(err => {
  if (err) {
    console.error("An error occurred while connecting to the DB");
    throw err;
  }
});
//get all urls for each property: temp_old_reference, id FROM property
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

//runs DBFetcher to get: temp_old_reference, id FROM property
var dbFetcher = new DataFatcher();
dbFetcher.getData().then(result => {
  slm_urls = result;
  testArray = slm_urls.slice(0, 4);
  looping(testArray);
});

//loop the first URL item in the array.
async function looping(testArray) {
  await openWeb(testArray[i]);
  // Create a new empty promise (don't do that with real people ;)
  var sequence = Promise.resolve();

  // Loop over each file, and add on a promise to the
  // end of the 'sequence' promise.
  testArray.forEach(function(url) {
    // Chain one computation onto the sequence
    sequence = sequence
      .then(function() {
        return looping(url);
      })
      .then(function(result) {
        looping(result); // Resolves for each file, one at a time.
      });
  });

  // This will resolve after the entire chain is resolved
  return sequence;
}

//opens the URL and runs puppeteer script
function openWeb(property) {
  run(property);
}

//runs puppeteer script
async function run(property) {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 10,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
    ignoreHTTPSErrors: true,
    dumpio: false,
    devtools: true
  });

  const AMENITIES_PANNEL = "#block-4";
  var current_prop_url = property.temp_old_reference;
  // var current_prop_id = property.id;
  var page = await browser.newPage();
  await page.setViewport({ width: 2000, height: 2000 });
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
  //puppeteer grabs the amenitites of the page.
  const amenities = amenitiesEven.concat(amenitiesOdd);
  browser.close();
}
