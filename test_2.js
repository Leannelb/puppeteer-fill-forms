const puppeteer = require('puppeteer');
let fs = require('fs');
const Papa = require('papaparse');
let file = 'clean_uuid_address.csv';
let content = fs.readFileSync(file, "utf8");
const SLM_URL = 'https://slm.netlify.com/properties/edit/'

let rows;
Papa.parse(content, 
    {
    header: false,
    delimiter: "\n",
    complete: function(results) 
    {
        rows = results.data
        // console.log (rows)        
    }
});

let uuids = []
let addresses = []

for (row of rows){
    a = 0
    b = 0
    for (r of row){
        if(a%2 == 0){
            let property_url = SLM_URL + r
            // console.log(property_url);
            a++
            uuids.push(property_url)
            return uuids
        } 
        if(a%2 == 1){
            if(b%2 == 1 )
            {
                let address = r
                // console.log(address); 
                addresses.push(address)
                return addresses
            }
        b++
        } 
        console.log(uuids)
        // print_r(address)
        
    }
}


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
    const PROPERIES_ACTUAL_LOCATION_TAB = 'body > app-root > div > div.page-container > div > app-properties-edit > div > div > div > div > tab-property > div > div > ul > li:nth-child(6) > a'
    const DOOR_NO_FIELD = 'body > app-root > div > div.page-container > div > app-properties-locations > div > location-modal > div > div > div > div > div.modal-body > form > div > input'

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
    await page.waitFor(2000)   //THIS IS VITAL, WITHOUT THIS CLICK IS TOO QUICK

    for (current_url of uuids){

        await page.goto(current_url, {waitUntil: 'networkidle2'})

            try { //without this try catch, could not access the properties tab
                await page.click(PROPERTIES_TAB) 
            } catch (error) {
                console.log("Ahh shoot")
            }
            try {
                await page.waitFor(5000) 
                await page.click(TEST_PROPERTY_MANAGE)
            } catch (error) {
                console.log("The element didn't appear.")
            }
            try {
                await page.waitFor(5000) 
                await page.click(PROPERIES_ACTUAL_LOCATION_TAB)
            } catch (error) {
            console.log("darniooooo")
            }
            await page.click('#sample_1_option_1')
            await page.focus(DOOR_NO_FIELD)
            await page.keyboard.type('sjhdfjkasdfkjhasdhflashdfjhasdkfjh')
            await page.waitFor(1000) 
            page.click('body > app-root > div > div.page-container > div > app-properties-locations > div > location-modal > div > div > div > div > div.modal-footer > button.btn.btn-primary', {delay: 10000})
            await page.waitFor(10000) 
        
        }
}
run();
