const puppeteer = require('puppeteer');

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
    // const USERNAME_LOGIN_FIELD = 'body > app-root > app-login > div > div.content > form > div:nth-child(3) > input'
    // const PASS_LOGIN_FIELD = 'body > app-root > app-login > div > div.content > form > div:nth-child(4) > input'
    // const LOGIN_BUTTON = 'body > app-root > app-login > div > div.content > form > div.create-account.yellow-gold'
   
    await page.goto('http://shortletsmalta.com/all_properties_menu.html', {waitUntil: 'networkidle2'})
    await page.click('div.column:nth-child(5) > h3:nth-child(1) > a:nth-child(1)')
    
    await page.focus('#property-1013476')
    await page.focus('#content')
    await page.focus('#block-4')
    await page.focus('.description-prop_info-amenities > ul:nth-child(2)')
    
    const result = await page.evaluate(() => {
        let amenity = ('.description-prop_info-amenities-5 > span:nth-child(1)').innerText;

        console.log(amenity);
    });

    
    // await page.keyboad.type('villa@admin.com')
    // await page.focus(PASS_LOGIN_FIELD)
    // await page.keyboard.type('123456')
    // await page.click(LOGIN_BUTTON)
    // await page.waitFor(2000) 

    // for(var i = 0, b = 0; i < uuids.length, b < addresses.length; i++, b++){
    //     await page.goto(uuids[i])
    //     await page.waitFor(5000) 
        
    //     try 
    //     {
    //         await page.waitFor(2000) 
    //         await page.click(PROPERIES_LOCATION_TAB)
    //     } catch (error) {
    //     console.log("darniooooo")
    //     }
    //     await page.click(ADD_NEW_PROPERIES_BUTTON)
    //     await page.focus(DOOR_NO_FIELD)
    //     await page.keyboard.type(addresses[b])
    //     await page.waitFor(1000)
    //     await page.click(SUBMIT_NEW_PROPERTY_BUTTON)
    //     await page.waitFor(10000) 
// }
// browser.close();

}

run();