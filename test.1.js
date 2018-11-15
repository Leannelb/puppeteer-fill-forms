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

for (row of rows){
    a = 0
    for (r of row){
       if(a%2 == 0){
            let property_url = SLM_URL + r
            console.log(property_url);
            a++
        } 
        if(a%2 == 1){
            let address = r
            console.log(address);
        } 
        
    }
}


// run();








