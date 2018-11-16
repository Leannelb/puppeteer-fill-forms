const puppeteer = require('puppeteer');

// var { uuids } = require('./working_parse');
// var { addresses } = require('./working_parse');

// console.dir(addresses)

let fs = require('fs');
const Papa = require('papaparse');
let file = 'uuid_1.csv';
let content = fs.readFileSync(file, "utf8");
const SLM_URL = 'https://slm.netlify.com/properties/edit/'

let rows;
Papa.parse(content, {
    header: false,
    delimiter: "\n",
    complete: function(results) {
        rows = results.data
        return rows
    }
});

let uuids = []
let addresses = []

for (row of rows)
{
    a = 0
    b = 0
    for (r of row)
    {
       if(a%2 == 0)
       {
            let property_url = SLM_URL + r
            uuids.push(property_url)
            a++
        } 
        if(a%2 == 1)
        {
            if ( b%2 == 1)
            {
                let address = r
                addresses.push(address)
            }
        } 
       b++
    }
}

for (url of uuids){
    console.log(url)
}

// async function run() {
//     const browser = await puppeteer.launch({
//         headless: false,
//         slowMo: 10,
//         args: ['--no-sandbox', '--disable-setuid-sandbox'],
//         ignoreHTTPSErrors: true, 
//         dumpio: false,
//         devtools: true 
//     });
    
//     var page = await browser.newPage(); 
//     await page.setViewport({width: 2000, height: 2000})
//     //define all constants and selectors
//     const USERNAME_LOGIN_FIELD = 'body > app-root > app-login > div > div.content > form > div:nth-child(3) > input'
//     const PASS_LOGIN_FIELD = 'body > app-root > app-login > div > div.content > form > div:nth-child(4) > input'
//     const LOGIN_BUTTON = 'body > app-root > app-login > div > div.content > form > div.create-account.yellow-gold'
//     const PROPERTIES_TAB ='body > app-root > div > div.page-container > app-sidebar > div > div > ul > li:nth-child(2) > a'
//     const TEST_PROPERTY_MANAGE = '#sample_1 > tbody > tr:nth-child(79) > td:nth-child(3) > button'
//     const PROPERIES_LOCATION_TAB = 'body > app-root > div > div.page-container > div > app-properties-edit > div > div > div > div > tab-property > div > div > ul > li:nth-child(6) > a'
//     const ADD_NEW_PROPERIES_BUTTON =  '#sample_1_option_1'
//     const SUBMIT_NEW_PROPERTY_BUTTON = "body > app-root > div > div.page-container > div > app-properties-locations > div > location-modal > div > div > div > div > div.modal-footer > button.btn.btn-primary"
//     const DOOR_NO_FIELD = 'body > app-root > div > div.page-container > div > app-properties-locations > div > location-modal > div > div > div > div > div.modal-body > form > div > input'
    
//     await page.goto('https://slm.netlify.com/', {waitUntil: 'networkidle2'})
//     await page.focus(USERNAME_LOGIN_FIELD)
//     await page.keyboard.type('villa@admin.com')
//     await page.focus(PASS_LOGIN_FIELD)
//     await page.keyboard.type('123456')
//     await page.click(LOGIN_BUTTON)
//     await page.waitFor(2000) 

//     for (URL of uuids)
//     {
//         for (address of addresses)
//         {
//             await page.goto(URL)
//             await page.waitFor(10000) 
            
//             try 
// {
//                 await page.waitFor(10000) 
//                 await page.click(PROPERIES_LOCATION_TAB)
//             } catch (error) {
//             console.log("darniooooo")
//             }
//             // await page.click(ADD_NEW_PROPERIES_BUTTON)
//             // await page.focus(DOOR_NO_FIELD)
//             // await page.keyboard.type(address)
//             // await page.waitFor(1000)
//             // await page.click(SUBMIT_NEW_PROPERTY_BUTTON)
//         }
//     }
//     await page.waitFor(10000) 

// }

// run();