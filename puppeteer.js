const puppeteer = require("puppeteer");

async function run() {
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
  //define all constants and selectors
  const SHORTLETS_URL = "http://shortletsmalta.com/all_properties_menu.html";
  const BOOK_NOW =
    "#block-1 > div.column.e-1.odd.single.features_list.property > p > em > a";
  const AMENITIES_PANNEL = "#block-4";
  const AMENITIES_PANNEL_LI =
    "#block-4 > div.column.e-1.odd.single.description-prop_info-amenities > ul > li";

  await page.goto(SHORTLETS_URL, { waitUntil: "networkidle2" });
  await page.click(BOOK_NOW);
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

  const mysql = require("mysql");
  const options = {
    user: "root",
    password: "root",
    database: "slm_all_tables_2"
  };
  const connection = mysql.createConnection(options);

  connection.connect(err => {
    if (err) {
      console.error("An error occurred while connecting to the DB");
      throw err;
    }
  });

  connection.query(
    "SELECT temp_old_reference FROM property",
    (error, property) => {
      if (error) {
        console.error("An error occurred while executing the query");
        throw error;
      }

      console.log(property);
    }
  );

  browser.close();
}

run();
