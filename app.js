var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();
var logger = require('morgan');


app.get('/scrape', function(req, res){

    let houseNo = encodeURIComponent('84');
    let street = encodeURIComponent('Withers Street');
    let boro = 3;
    url = 'http://a810-bisweb.nyc.gov/bisweb/PropertyProfileOverviewServlet?boro='+boro + "&houseno=" + houseNo + "&street=" + street;
    console.log('url: ', url);
    request(url, function(error, response, html){
        if(!error){
            var $ = cheerio.load(html);
            var json = { address : "", violations : "", complaints : "", propertyId: ""};

            var address, violations, complaints;

            $('.maininfo').first().filter(function(){
                var data = $(this);
                address = data.text();            

                json.address = address;
            });

            $($('a[href^="ActionsByLocationServlet"]').parent().parent().parent().children()[1]).filter(function(){
                var data = $(this);
                violations = data.text();

                json.violations = violations;
            });

            $($('a[href^="ComplaintsByAddressServlet"]').parent().parent().parent().children()[1]).filter(function(){
                var data = $(this);
                complaints = data.text();

                json.complaints = complaints;
            });

            $($('.maininfo')[2]).filter(function(){
                var data = $(this);
                let propertyId = data.text().replace(/[^0-9]/g, '');

                json.propertyId = propertyId;
            }); 

            // This writes the data being scraped into a JSON file

            fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){

                console.log('File written. Check output.json file in project directory.');

            });
            res.send('Check console.');
        };
    });
});



app.listen('3000')

console.log('Port running on 3000');


exports = module.exports = app;