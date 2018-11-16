const puppeteer = require('puppeteer');

const working_parse_file = require("/Users/leanne/Sites/automation/puppeteer-automation/working_parse.js");

console.log(working_parse_file.uuids);

async function run() {
    const browser = await puppeteer.launch({
        headless: false,
        slowMo: 10,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
        ignoreHTTPSErrors: true, 
        dumpio: false,
        devtools: true 
    });
    
    var page = await browser.newPage(); 
    await page.setViewport({width: 2000, height: 2000})
    //define all constants and selectors
    const USERNAME_LOGIN_FIELD = 'body > app-root > app-login > div > div.content > form > div:nth-child(3) > input'
    const PASS_LOGIN_FIELD = 'body > app-root > app-login > div > div.content > form > div:nth-child(4) > input'
    const LOGIN_BUTTON = 'body > app-root > app-login > div > div.content > form > div.create-account.yellow-gold'
    const PROPERTIES_TAB ='body > app-root > div > div.page-container > app-sidebar > div > div > ul > li:nth-child(2) > a'
    const TEST_PROPERTY_MANAGE = '#sample_1 > tbody > tr:nth-child(79) > td:nth-child(3) > button'
    const PROPERIES_LOCATION_TAB = 'body > app-root > div > div.page-container > div > app-properties-edit > div > div > div > div > tab-property > div > div > ul > li:nth-child(6) > a'
    const ADD_NEW_PROPERIES_BUTTON =  '#sample_1_option_1'
    const SUBMIT_NEW_PROPERTY_BUTTON = "body > app-root > div > div.page-container > div > app-properties-locations > div > location-modal > div > div > div > div > div.modal-footer > button.btn.btn-primary"
    const DOOR_NO_FIELD = 'body > app-root > div > div.page-container > div > app-properties-locations > div > location-modal > div > div > div > div > div.modal-body > form > div > input'
    const uuids = ["https://slm.netlify.com/properties/edit/02fe252a-b0e0-11e8-a9d2-00259047317d", "https://slm.netlify.com/properties/edit/02fe252a-b0e0-11e8-a9d2-00259047317d", "https://slm.netlify.com/properties/edit/0aab5727-b04c-11e8-a9d2-00259047317d"]
    const urls = ["St Paul's, flat 4, 5th Floor, 2bd,79 Delfin Court, Flat 4, Triq Patri Guzepp Calleja, St Paul's Bay, SPB 2732", "St Paul's, flat 5, pth 6th Floor, 2bd,79 Delfin Court, Flat 5, Triq Patri Guzepp Calleja, St Paul's Bay, SPB 2732", "79 Delfin Court, Flat 5, Triq Patri Guzepp Calleja, St Paul's Bay, SPB 2732"]
    
    await page.goto('https://slm.netlify.com/', {waitUntil: 'networkidle2'})
    await page.focus(USERNAME_LOGIN_FIELD)
    await page.keyboard.type('villa@admin.com')
    await page.focus(PASS_LOGIN_FIELD)
    await page.keyboard.type('123456')
    await page.click(LOGIN_BUTTON)
    await page.waitFor(2000) 

    try {
        await page.goto("https://slm.netlify.com/properties/edit/02fe252a-b0e0-11e8-a9d2-00259047317d")
        await page.waitFor(5000) 
    } catch (error) {
        console.log("The element didn't appear.")
    }
    try {
        await page.waitFor(2000) 
        await page.click(PROPERIES_LOCATION_TAB)
    } catch (error) {
    console.log("darniooooo")
    }
    await page.click(ADD_NEW_PROPERIES_BUTTON)
    await page.focus(DOOR_NO_FIELD)
    await page.keyboard.type(urls[0])
    await page.waitFor(1000)
    await page.click(SUBMIT_NEW_PROPERTY_BUTTON)

    // try { 
    //     await page.click(PROPERTIES_TAB) 
    // } catch (error) {
    //     console.log("Ahh shoot")
    // }
    // try {
    //     await page.waitFor(5000) 
    //     await page.click(uuids[0])
    // } catch (error) {
    //     console.log("The element didn't appear.")
    // }
    // try {
    //     await page.waitFor(5000) 
    //     await page.click(PROPERIES_ACTUAL_LOCATION_TAB)
    // } catch (error) {
    // console.log("darniooooo")
    // }
    // await page.click('#sample_1_option_1')
    // await page.focus(DOOR_NO_FIELD)
    // await page.keyboard.type('sjhdfjkasdfkjhasdhflashdfjhasdkfjh')
    // await page.waitFor(1000) 
    // page.click('body > app-root > div > div.page-container > div > app-properties-locations > div > location-modal > div > div > div > div > div.modal-footer > button.btn.btn-primary', {delay: 10000})
    await page.waitFor(10000) 

}

run();