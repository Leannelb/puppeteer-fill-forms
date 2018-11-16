const puppeteer = require('puppeteer');
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

for (row of rows){
    a = 0
    b = 0
    for (r of row){
       if(a%2 == 0){
            let property_url = SLM_URL + r
            uuids.push(property_url)
            a++
        } 
        if(a%2 == 1){
            if ( b%2 == 1){
                let address = r
                addresses.push(address)
            }
        } 
       b++
    }
}

module.exports = { uuids };
module.exports = { addresses };










