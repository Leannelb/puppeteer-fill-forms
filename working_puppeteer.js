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
  // const USERNAME_LOGIN_FIELD = 'body > app-root > app-login > div > div.content > form > div:nth-child(3) > input'
  // const PASS_LOGIN_FIELD = 'body > app-root > app-login > div > div.content > form > div:nth-child(4) > input'
  // const LOGIN_BUTTON = 'body > app-root > app-login > div > div.content > form > div.create-account.yellow-gold'

  await page.goto(SHORTLETS_URL, { waitUntil: "networkidle2" });
  await page.click(BOOK_NOW);
  await page.waitFor(2000);
  await page.focus(AMENITIES_PANNEL);

  const amenities = await page.evaluate(() =>
    Array.from(document.querySelectorAll("div.column li.even span")).map(
      partner => partner.innerHTML
    )
  );

  console.log(amenities);
}

run();
