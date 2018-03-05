# Building 311 - CRUD

## Proposal

### Description
A full stack web application where users can look up New York addresses to see their standing with the DOB (Department of Buildings). This will include history and current info on oustanding and closed complaints and violations. They will see basic info regarding class violations as well as detailed descriptions (where available). Users will be able to save and delete queries as they refer to them in a collection.

### Wireframes
[included in images]

### User Stories
1. User goes to landing page, sees instruction and input field for address  
2. User enters desired address into input field  
3. User arrives on building overview page and sees total complaints and violations, which are clickable links  
4. Navigation to either page to check out building history  
5. All queries are saved into the database and can be accessed through the Saved link on the navigation menu
6. On the building queries page, options are availabe to comment (edit data objects) or delete entry  
7. From there, user also has option redirect to home landing page and enter a new query, or go back to building query page 

### Technologies Used
Node JS  
Express  
Cheerio - HTML scraping  
Fs - JSON output to assist in taking snapshots of NY html page 
HTML  
CSS  
JavaScript  
  -regex with html parsing  
SQL-POSTGRESQL 

### Link to Video Tour of App
https://vimeo.com/258578705

### Code Snippet
![alt text](https://i.imgur.com/Ouxo5w4.png)
This part of the app was by the most difficult to wrap my head around. I will go back and make it more readable in terms of argument names

### Future Development
I plan to add a function that retries the NY server a handful of times before throwing an error. It isn't always reliable as it is now so I would like to add that feature. I would also like to scrape the NY site further for more details and expand the scope of the app. 

### Timeline
2/26 - Proposal submittal/approval, begin work. Set up server, router, basic functionality of html scraper. Setup database with tables to include JSON ouput from inital scrape (address, total of complaints and violations) and JSON output for second scrape for respective complaint and violation descriptions. From there JOIN tables  
2/27 - Continued development of basic functionality and eventual separation of concerns  
2/28 - Once databases and queries are functional, begin work on rendering views to generate basic HTML layout  
3/1 - Continued development of HTML layout for more user based interaction such as redirects, drop downs, and CRUD capability  
3/2 - Prepare for deployment  
3/3-4 - Continue making web app front end more user friendly and functionality is consistent  
3/5 - Presentation  

### Instructions


### Links and Resources
http://www1.nyc.gov/site/buildings/index.page  
http://a810-bisweb.nyc.gov/bisweb/ECBQueryByLocationServlet?requestid=0&allbin=3070426  
https://regex101.com/  
https://www.gitbook.com/book/kevinchisholm/basic-web-scraping-with-node-js-and-cheerio-js/details  
https://stackoverflow.com/  
https://www.w3schools.com/  





