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
  await checkDB(property, amenities);
  browser.close();
}

//insert amenity not there already, into DB
async function checkDB(property, amenities) {
  // const mysql = require("mysql");
  for (let amenityRow of amenities) {
    createRecord(amenityRow, property);

    // let extitsInDB = await amenityExists(amenityRow);
    // if (extitsInDB == null) {
    //   console.log("A DB error has occured");
    // } else if (extitsInDB == false) {
    //   // console.log(amenityRow + " It does not exist in db");
    //   await createRecord(amenityRow);
    //   continue;
    // } else {
    //   console.log(amenityRow + " exist in db");
    // }
    // console.log(extitsInDB);
  }
}
// checkDB(property, amenities);

async function createRecord(amenityName, property) {
  return new Promise((resolve, reject) => {
    let currentAmenityID = null;
    const mysql = require("mysql");
    const connection = mysql.createConnection(options);
    connection.connect(err => {
      if (err) {
        console.error("An error occurred while connecting to the DB");
        throw err;
      }
    });
    connection.query(
      `SELECT id FROM property_attributes WHERE TRIM(LOWER(name)) LIKE '%${amenityName}%' limit 1 `,
      (error, db_attributes) => {
        if (error != null) {
          // resolve(null);
        }
        if (db_attributes.length > 0) {
          currentAmenityID = db_attributes[0].id;
        } else {
        }
      }
    );
    if (currentAmenityID > 0) {
    } else {
      connection.query(
        "INSERT INTO property_attributes SET ?",
        { name: amenityRow },
        function(error, results, fields) {
          if (error) throw error;
          currentAmenityID = results.insertId;
          console.log(
            "These are the results for : " + results + results.insertId
          );
        }
      );
    }
  });
} //createRecord () end

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
