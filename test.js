const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 10,
    args: ['--start-fullscreen']
  });
  const page = await browser.newPage();
  const USERNAME_LOGIN_FIELD = 'body > app-root > app-login > div > div.content > form > div:nth-child(3) > input'
  const PASS_LOGIN_FIELD = 'body > app-root > app-login > div > div.content > form > div:nth-child(4) > input'
  const LOGIN_BUTTON = 'body > app-root > app-login > div > div.content > form > div.create-account.yellow-gold'
  const HAMBURGER_ICON = 'body > app-root > div > app-navigation > div > div > a'
  const SEARCH_FIELD = '#typeahead_example_1'
  const appUrlBase = 'https://slm.netlify.com/'
  const routes = {
    public: {
      login: `${appUrlBase}/login`,
    },
    admin: {
      properties: `${appUrlBase}/properties/listing/`,
    },
  }

  //Go to my page and wait until the page loads
  await page.goto('https://slm.netlify.com/', {waitUntil: 'networkidle2'})
  //type the name
  await page.focus(USERNAME_LOGIN_FIELD)
  await page.keyboard.type('villa@admin.com')
  //type the password
  await page.focus(PASS_LOGIN_FIELD)
  await page.keyboard.type('123456')
  //submit by clicking login
  await page.click(LOGIN_BUTTON)
  //LOGGED IN

  await page.waitForNavigation({waitUntil: 'networkidle'});
    // await page.focus(SEARCH_FIELD)
  // page.keyboard.type('villa@admin.com')
  console.log('Hello')

  // page.focus(SEARCH_FIELD),
  // page.keyboard.type('villa@admin.com')
  // await page.waitForNavigation({waitUntil: 'load'});

  // await page.waitForNavigation();
  // page.focus(SEARCH_FIELD),
  // page.keyboard.type('villa@admin.com')
  // await page.waitForNavigation();
  // console.log('The wait is over 2');

  // page.focus(SEARCH_FIELD),
  // page.keyboard.type('villa@admin.com')

  // await Promise.all([
  //   page.waitForNavigation({ waitUntil: 'networkidle2' }),
  //   page.focus(SEARCH_FIELD),
  //   page.keyboard.type('villa@admin.com')
  // ]);

})();