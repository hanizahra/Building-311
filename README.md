# NY-Building-Vet-CRUD

## Proposal

### Description
A full stack web application where users can look up New York addresses to see their standing with the DOB (Department of Buildings). This will include history and current info on oustanding and closed complaints and violations. They will see basic info regarding class violations as well as detailed descriptions (where available). Users will be able to save and delete queries as they refer to them in a collection.

### Wireframes
[included in images]

### User Stories
1. User goes to landing page, sees instruction and input field for address  
2. User enters desired address into input field  
3. User arrives on info page and sees data available on property  
4. Violations and complaints have their own drop down for user to expand on click  
5. Option to save to recent queries on click on property data page which redirects to recent query database  
6. User has option redirect to home landing page and enter a new query, or go to recent query page  
7. On recent query page, user has ability to delete recent queries and has option to redirect to home page  

### Technologies Used
Node JS  
Express  
Cheerio - HTML scraping  
Fs - JSON output from scraping  
HTML  
CSS  
JavaScript  
  -regex with html parsing  
SQL-POSTGRESQL  

### Timeline
2/26 - Proposal submittal/approval, begin work. Set up server, router, basic functionality of html scraper. Setup database with tables to include JSON ouput from inital scrape (address, total of complaints and violations) and JSON output for second scrape for respective complaint and violation descriptions. From there JOIN tables  
2/27 - Continued development of basic functionality and eventual separation of concerns  
2/28 - Once databases and queries are functional, begin work on rendering views to generate basic HTML layout  
3/1 - Continued development of HTML layout for more user based interaction such as redirects, drop downs, and CRUD capability  
3/2 - Prepare for deployment  
3/3-4 - Continue making web app front end more user friendly and functionality is consistent  
3/5 - Presentation  

### Links and Resources
http://www1.nyc.gov/site/buildings/index.page  
http://a810-bisweb.nyc.gov/bisweb/ECBQueryByLocationServlet?requestid=0&allbin=3070426  
https://regex101.com/  
https://www.gitbook.com/book/kevinchisholm/basic-web-scraping-with-node-js-and-cheerio-js/details  
https://stackoverflow.com/  
https://www.w3schools.com/  





