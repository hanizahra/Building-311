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
const bodyParser = require('body-parser');
const buildingRouter = require('./routes/building-router');
var json = { address : "", violations : "", numComplaints: 0, complaints : {}, propertyId: "", floodZone: ""};
var json2 = {address: "", propertyId: "", complaint: "", comment: "", date: "", status: "", categoryCode: "", priority: ""};
const buildingModel = require('./models/buildingModel.js');


// address input - scraping for basic building info from NY DOB
function firstPage(resolve){
       console.log('first');
        let houseNo = encodeURIComponent('84'); //$('#inputnumber').val()
        let street = encodeURIComponent('Withers'); //$('#inputstreet').val()
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

// scraping for complaint basic info

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
                // console.log('html: ', html);   
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

// var json2 = {address: "", propertyId: "", complaint: "", comment: "", date: "", status: "", categoryCode: "", priority: ""};
// scraping for complaint details
function thirdPage(){
    let complaintId = encodeURIComponent('0000643914');
        let options = {
            url : 'http://a810-bisweb.nyc.gov/bisweb/OverviewForComplaintServlet?requestid=2&vlcompdetlkey=' + complaintId , //hard coded for now
            headers: {
                'User-Agent' : 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.1916.153 Safari/537.36'
            }
        }
        return new Promise(function(resolve3, reject3) {
            request(options, function(error, response, html) {
                // console.log('html: ', html);   
                if(!error) {
                    console.log('json2: ', json2);
                    console.log('second request ok');
                    let $ = cheerio.load(html);

                    $('.maininfo').first().filter(function(){
                        let data = $(this);
                        address = data.text();            

                        json2.address = address;
                    });


                    $($('a[href^="PropertyProfileOverviewServlet"]')).filter(function(){
                        let data = $(this);
                        let propertyId = data.text().replace(/[^0-9]/g, '');
                        console.log('propertyId, ', propertyId);
                        json2.propertyId = propertyId;
                    });  

                    //doesn't work
                    // $($('body').children().children().eq(5).children().children().eq(4).children().eq(1)).filter(function(){
                    //     let data = $(this);
                    //     complaint = data.text();

                    //     json2.complaint = complaint;
                    //     console.log('ahhhhhhhhhhhhhhhhh' +complaint);
                    // });

                    //doesn't work
                    // $($('center').eq(4).children().children().children().eq(1)).filter(function(){
                    //     let data = $(this);
                    //     date = data.text();

                    //     json2.date = date;
                    // });

                    $($('center').children().children().children().eq(3)).filter(function(){
                        let data = $(this);
                        status = data.text();

                        json2.status = status;
                    });


                    console.log('json2: ', json2);
                    resolve3(); 
                }
                else {
                    console.log('second request error');
                }
            });
        });
}


// writing scraping output to a JSON file in the directory
// function writeToFile(){
//     fs.writeFile('newoutput.json', JSON.stringify(json, null, 4), function(err) {
//         console.log('File written. Check newoutput.json file in project directory.');
//     }); 

// }

// the collective scrape
app.get('/scrape', function(req, res, next) {
    // res.render('index')
        let promise = new Promise(function(resolve, reject) {
           firstPage(resolve);
        }).then(function(stuff) {
            return secondPage(); 
        }).then(function(stuff3) {
            return thirdPage();
        }).then(function(stuff2) {
            // writeToFile();
            console.log('the json obj ->',json);
            buildingModel.create(json);
            res.send('Check console.');
        })
});





// view config
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/buildings', buildingRouter);

app.use('/', (req, res) => {
    res.render('index')
})

app.use(express.static('public'))


// port config
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}, in ${app.get('env')} node.`);
});

// error handler
app.get('*', (req, res) => {
    res.status(404).send('404 not found.');
});



exports = module.exports = app;