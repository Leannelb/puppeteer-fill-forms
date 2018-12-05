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
//get all urls for each property
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
//steves code
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
  await insertDB(property, amenities);
  browser.close();
}

async function insertDB(property, amenities) {
  const mysql = require("mysql");
  for (let amenityRow of amenities) {
    let extitsInDB = await amenityExists(amenityRow);
    if (extitsInDB == null) {
      console.log("A DB error has occured");
    } else if (extitsInDB == false) {
      console.log(amenityRow + " It does not exist in db");
      // await noMatch();
    } else {
      console.log(amenityRow + " exist in db");
    }

    // console.log(extitsInDB);
  }
}

// async function noMatch(amenityRow) {
//   return new Promise((resolve, reject) => {
//     const mysql = require("mysql");
//     const connection = mysql.createConnection(options);
//     connection.connect(err => {
//       if (err) {
//         console.error("An error occurred while connecting to the DB");
//         throw err;
//       }
//     });
//     connection.query(
//       `SELECT COUNT(*) AS 'exists' FROM property_attributes WHERE TRIM(LOWER(name)) LIKE '%${amenityName}%'`,
//       (error, db_attributes) => {
//         if (error != null) {
//           resolve(null);
//         }
//         if (db_attributes[0].exists > 0) {
//           resolve(true);
//         } else {
//           resolve(false);
//         }
//       }
//     );
//   });
// } //noMatch () end

async function amenityExists(amenityName) {
  amenityName = amenityName.trim().toLowerCase();
  return new Promise((resolve, reject) => {
    const mysql = require("mysql");
    const connection = mysql.createConnection(options);
    connection.connect(err => {
      if (err) {
        console.error("An error occurred while connecting to the DB");
        throw err;
      }
    });
    connection.query(
      `SELECT COUNT(*) AS 'exists' FROM property_attributes WHERE TRIM(LOWER(name)) LIKE '%${amenityName}%'`,
      (error, db_attributes) => {
        if (error != null) {
          resolve(null);
        }
        if (db_attributes[0].exists > 0) {
          resolve(true);
        } else {
          resolve(false);
        }
      }
    );
  });
}
// This is a change this is another
