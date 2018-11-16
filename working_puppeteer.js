const puppeteer = require('puppeteer');

const working_parse_file = require("/Users/leanne/Sites/automation/puppeteer-automation/working_parse.js");

const ALL_URLS = working_parse_file.uuids;
const ALL_ADDRESSES = working_parse_file.addresses;

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
    
    await page.goto('https://slm.netlify.com/', {waitUntil: 'networkidle2'})
    await page.focus(USERNAME_LOGIN_FIELD)
    await page.keyboard.type('villa@admin.com')
    await page.focus(PASS_LOGIN_FIELD)
    await page.keyboard.type('123456')
    await page.click(LOGIN_BUTTON)
    await page.waitFor(2000) 

    for (URL of ALL_URLS)
    {
        for (address of ALL_ADDRESSES)
        {
            await page.goto(URL)
            await page.waitFor(5000) 
            
            try {
                await page.waitFor(2000) 
                await page.click(PROPERIES_LOCATION_TAB)
            } catch (error) {
            console.log("darniooooo")
            }
            await page.click(ADD_NEW_PROPERIES_BUTTON)
            await page.focus(DOOR_NO_FIELD)
            await page.keyboard.type(address)
            await page.waitFor(1000)
            await page.click(SUBMIT_NEW_PROPERTY_BUTTON)
        }
    }
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
    await browser.close()
}

run();