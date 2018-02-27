const express = require('express');
const fs = require('fs');
const request = require('request');
const cheerio = require('cheerio');
const app     = express();
const logger = require('morgan');
const mainUrl = 'http://a810-bisweb.nyc.gov/bisweb/'

// app.get('/scrape', function(req, res){

//     let houseNo = encodeURIComponent('84'); //$('#inputnumber').val()
//     let street = encodeURIComponent('Withers Street'); //$('#inputstreet').val()
//     let boro = 3;
//     // url = 'http://a810-bisweb.nyc.gov/bisweb/PropertyProfileOverviewServlet?boro='+boro + "&houseno=" + houseNo + "&street=" + street;
//     // url = 'http://a810-bisweb.nyc.gov/bisweb/PropertyProfileOverviewServlet?boro=3&houseno=84&street=Withers%20Street';

//     let options = {
//         url : 'http://a810-bisweb.nyc.gov/bisweb/PropertyProfileOverviewServlet?boro='+boro + "&houseno=" + houseNo + "&street=" + street,
//         headers:  {

//                 'User-Agent' : 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.1916.153 Safari/537.36'
//             }
//     }
   
//     // console.log('url: ', url);
//     request(options, function(error, response, html){
//         if(!error){
//             let $ = cheerio.load(html);
//             let json = { address : "", violations : "", complaints : "", propertyId: "", floodZone: ""};

//             let address, violations, complaints;

//             $('.maininfo').first().filter(function(){
//                 let data = $(this);
//                 address = data.text();            

//                 json.address = address;
//             });

//             $($('a[href^="ActionsByLocationServlet"]').parent().parent().parent().children()[1]).filter(function(){
//                 let data = $(this);
//                 violations = data.text();

//                 json.violations = violations;
//             });

//             $($('a[href^="ComplaintsByAddressServlet"]').parent().parent().parent().children()[1]).filter(function(){
//                 let data = $(this);
//                 complaints = data.text();

//                 json.complaints = complaints;
//             });

//             $($('.maininfo')[2]).filter(function(){
//                 let data = $(this);
//                 let propertyId = data.text().replace(/[^0-9]/g, '');

//                 json.propertyId = propertyId;
//             }); 

//             $($('a[href^="http://www1.nyc.gov/site/buildings/codes/wetlandsmaps.page"]').parent().parent().children()[0]).filter(function(){
//                 let data = $(this);
//                 floodZone = data.text();

//                 json.floodZone = floodZone;
//             });

//             // This writes the data being scraped into a JSON file

//             fs.writeFile('general-output.json', JSON.stringify(json, null, 4), function(err){

//                 console.log('File written. Check general-output.json file in project directory.');

//             });
//             res.send('Check console.');
//         };
//     });
// });





app.get('/scrape', function(req, res){    // complaints descriptions

    let houseNo = encodeURIComponent('84'); //$('#inputnumber').val()
    let street = encodeURIComponent('Withers Street'); //$('#inputstreet').val()
    let boro = 3;
    let binNum = encodeURIComponent('3068248'); //this is hard coded and needs a way to get accessed

    // url = 'http://a810-bisweb.nyc.gov/bisweb/PropertyProfileOverviewServlet?boro='+boro + "&houseno=" + houseNo + "&street=" + street;
    // url = 'http://a810-bisweb.nyc.gov/bisweb/PropertyProfileOverviewServlet?boro=3&houseno=84&street=Withers%20Street';

    let options = {
        url : 'http://a810-bisweb.nyc.gov/bisweb/ComplaintsByAddressServlet?requestid=1&allbin=' + binNum ,
        headers:  {

                'User-Agent' : 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.1916.153 Safari/537.36'
            }
    }
   
    // console.log('url: ', url);
    request(options, function(error, response, html){
        if(!error){
            let $ = cheerio.load(html);
            let json = { address: "", propertyId: "", complaints: {} };
            let address, complaints, propertyId;

            $('.maininfo').first().filter(function(){
                let data = $(this);
                address = data.text();            

                json.address = address;
            });

            $($('a[href^="PropertyProfileOverviewServlet"]')).filter(function(){
                let data = $(this);
                propertyId = data.text();

                json.propertyId = propertyId;
            });


            $($('a[href^="OverviewForComplaintServlet"]')).each(function(index, value){
                let data = $(this);
                //console.log('value', value.attribs.href);
                // console.log(data.text());
                complaintId = data.text();
                //console.log(json.complaints);
                //json.complaints.push(complaints);
                json.complaints[complaintId] = {link: mainUrl + value.attribs.href};
            });

            console.log('json.complaints: ', json.complaints);
            

            // This writes the data being scraped into a JSON file

            fs.writeFile('newoutput.json', JSON.stringify(json, null, 4), function(err){

                console.log('File written. Check newoutput.json file in project directory.');

            });
            res.send('Check console.');
        };
    });
});





app.listen('3000')

console.log('Port running on 3000');


exports = module.exports = app;