const express = require('express');
const fs = require('fs');
const request = require('request');
const cheerio = require('cheerio');
const app     = express();
const logger = require('morgan');
const pgp = require('pg-promise');
const PORT = process.env.PORT || 3000;
const mainUrl = 'http://a810-bisweb.nyc.gov/bisweb/';
const path = require('path');
const buildingRouter = require('./routes/building-router')
var json = { address : "", violations : "", numComplaints: 0, complaints : {}, propertyId: "", floodZone: ""};
var jsonObject = require('./newoutput.json')



function firstPage(resolve){
       console.log('first');
        let houseNo = encodeURIComponent('84'); //$('#inputnumber').val()
        let street = encodeURIComponent('Withers Street'); //$('#inputstreet').val()
        let boro = 3;

        let options = {
            url : 'http://a810-bisweb.nyc.gov/bisweb/PropertyProfileOverviewServlet?boro='+boro + "&houseno=" + houseNo + "&street=" + street,
            headers:  
            {
                'User-Agent' : 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.1916.153 Safari/537.36'
            }
        }        
        
        request(options, function(error, response, html){
            if(!error){
                console.log('first request ok');
                let $ = cheerio.load(html);
               

                let address, violations, complaints;

                $('.maininfo').first().filter(function(){
                    let data = $(this);
                    address = data.text();            

                    json.address = address;
                });

                $($('a[href^="ActionsByLocationServlet"]').parent().parent().parent().children()[1]).filter(function(){
                    let data = $(this);
                    violations = data.text();

                    json.violations = violations;
                });

                $($('a[href^="ComplaintsByAddressServlet"]').parent().parent().parent().children()[1]).filter(function(){
                    let data = $(this);
                    complaints = data.text();

                    json.numComplaints = complaints;
                });

                $($('.maininfo')[2]).filter(function(){
                    let data = $(this);
                    let propertyId = data.text().replace(/[^0-9]/g, '');
                    console.log('propertyId, ', propertyId);
                    json.propertyId = propertyId;
                }); 

                $($('a[href^="http://www1.nyc.gov/site/buildings/codes/wetlandsmaps.page"]').parent().parent().children()[0]).filter(function(){
                    let data = $(this);
                    floodZone = data.text();

                    json.floodZone = floodZone;
                });          
                resolve();
            };
        });
}

function secondPage(){
    // let binNum = encodeURIComponent('3068248');
        let options = {
            url : 'http://a810-bisweb.nyc.gov/bisweb/ComplaintsByAddressServlet?requestid=1&allbin=' + json.propertyId ,
            headers: {
                'User-Agent' : 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.1916.153 Safari/537.36'
            }
        }
        return new Promise(function(resolve2, reject2) {
            request(options, function(error, response, html) {
                console.log('html: ', html);   
                if(!error) {
                    console.log('json: ', json);
                    console.log('second request ok');
                    let $ = cheerio.load(html);
                    $($('a[href^="OverviewForComplaintServlet"]')).each(function(index, value){
                        let data = $(this);                
                        let complaintId = data.text();
                        console.log('complaint', complaintId);
                        json.complaints[complaintId] = {link: mainUrl + value.attribs.href};
                    });  
                    console.log('json: ', json);
                    resolve2(); 
                }
                else {
                    console.log('second request error');
                }
            });
        });
}

function writeToFile(){
    fs.writeFile('newoutput.json', JSON.stringify(json, null, 4), function(err) {
        console.log('File written. Check newoutput.json file in project directory.');
    });  
}

app.get('/scrape', function(req, res, next) {
    res.render('index')
    let promise = new Promise(function(resolve, reject) {
       firstPage(resolve);
    }).then(function(stuff) {
        return secondPage();
    }).then(function(stuff2) {
        writeToFile();
        res.send('Check console.');
    })

});





// view config
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// port config
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}, in ${app.get('env')} node.`);
});

// error handler
app.get('*', (req, res) => {
    res.status(404).send('404 not found.');
});



exports = module.exports = app;











// const express = require('express');
// const fs = require('fs');
// const request = require('request');
// const cheerio = require('cheerio');
// const app     = express();
// const logger = require('morgan');
// const pgp = require('pg-promise');
// const mainUrl = 'http://a810-bisweb.nyc.gov/bisweb/';
// var json = { address : "", violations : "", numComplaints: 0, complaints : {}, propertyId: "", floodZone: ""};


// app.get('/scrape', function(req, res, next){

//     new Promise = new Promise(function(resolve, reject)
//     {
        
//     }


//     console.log('first');
//     let houseNo = encodeURIComponent('84'); //$('#inputnumber').val()
//     let street = encodeURIComponent('Withers Street'); //$('#inputstreet').val()
//     let boro = 3;
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
//             console.log('first request ok');
//             let $ = cheerio.load(html);
           

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

//                 json.numComplaints = complaints;
//             });

//             $($('.maininfo')[2]).filter(function(){
//                 let data = $(this);
//                 let propertyId = data.text().replace(/[^0-9]/g, '');
//                 console.log('propertyId, ', propertyId);
//                 json.propertyId = propertyId;
//             }); 

//             $($('a[href^="http://www1.nyc.gov/site/buildings/codes/wetlandsmaps.page"]').parent().parent().children()[0]).filter(function(){
//                 let data = $(this);
//                 floodZone = data.text();

//                 json.floodZone = floodZone;
//             });

//             // This writes the data being scraped into a JSON file

//             // fs.writeFile('general-output.json', JSON.stringify(json, null, 4), function(err){

//             //     console.log('File written. Check general-output.json file in project directory.');

//             // });
//             // res.send('Check console.');
//         };
//     });
//     next();
// });



// app.get('/scrape', function(req, res, next){    // complaints descriptions

//     console.log('second');
//     // let houseNo = encodeURIComponent('84'); //$('#inputnumber').val()
//     // let street = encodeURIComponent('Withers Street'); //$('#inputstreet').val()
//     // let boro = 3;
//     //let binNum = encodeURIComponent('3068248'); //this is hard coded and needs a way to get accessed

//     // url = 'http://a810-bisweb.nyc.gov/bisweb/PropertyProfileOverviewServlet?boro='+boro + "&houseno=" + houseNo + "&street=" + street;
//     // url = 'http://a810-bisweb.nyc.gov/bisweb/PropertyProfileOverviewServlet?boro=3&houseno=84&street=Withers%20Street';

//     let options = {
//         url : 'http://a810-bisweb.nyc.gov/bisweb/ComplaintsByAddressServlet?requestid=1&allbin=' + json.propertyId ,
//         headers:  {

//                 'User-Agent' : 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.1916.153 Safari/537.36'
//             }
//     }
   
//     // console.log('url: ', url);
//     request(options, function(error, response, html){
//         if(!error){
//             let $ = cheerio.load(html);
            
//             // let address, complaints, propertyId;

//             // $('.maininfo').first().filter(function(){
//             //     let data = $(this);
//             //     address = data.text();            

//             //     json.address = address;
//             // });

//             // $($('a[href^="PropertyProfileOverviewServlet"]')).filter(function(){
//             //     let data = $(this);
//             //     propertyId = data.text();

//             //     json.propertyId = propertyId;
//             // });
//             console.log('error: ', error);
            

//             $($('a[href^="OverviewForComplaintServlet"]')).each(function(index, value){
//                 let data = $(this);

//                 //console.log('value', value.attribs.href);
//                 // console.log(data.text());
//                 complaintId = data.text();
//                 //console.log(json.complaints);
//                 //json.complaints.push(complaints);
//                 json.complaints[complaintId] = {link: mainUrl + value.attribs.href};
//             });

            
//             console.log('json: ', json);

//             // This writes the data being scraped into a JSON file

           
//         };
//     });
//     next();
// });

// app.get('/scrape', function(req, res, next)
// {
//     console.log('third');
//     console.log(json);
//     fs.writeFile('newoutput.json', JSON.stringify(json, null, 4), function(err){

//         console.log('File written. Check newoutput.json file in project directory.');


//     });
//      res.send('Check console.');
// });



// app.listen('3000')

// console.log('Port running on 3000');


// exports = module.exports = app;