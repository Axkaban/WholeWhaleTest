# Whole Whale's Full Stack Developer Whaler Test Project

## Overview

##### Requirements:
○ Use the sample data set of donors that we provide called MockDonorsData.csv


○ DynamoDB​ must be used as the backend data store and your server must be
written in Node.js


○ Your server must provide the following routes:


■ GET /index


● The homepage for your application. This page should look like the
provided mockup. It will contain a button that should send an
AJAX request to the /export​ endpoint on click.

■ POST /export


● A JSON API endpoint that returns a CSV file of donors from the
sample data that match the provided OrganizationId.


● Request Body: ​ { organizationId: <String>}

### Before starting

Do not forget to run `npm install` after cloning. set up the database by running `node migration.js` and `node seeds.js`. 

Note: Server and front end are separate, so they are both going to be started. server runs on `http://localhost:8080` and front end runs in `http://localhost:3000`

## UPDATE
server is now hosted on `https://donors-log.herokuapp.com/` where `https://donors-log.herokuapp.com/index` will show all donors, `https://donors-log.herokuapp.com/index/:id` shows donors with the same organization id and `https://donors-log.herokuapp.com/export/:id` generates the csv file of the donors with the same organization id.

All routes have been updated in the front end app, now when using the hosted server, you just need to navigate to the front-end directory and run: 
 `npm install`
 `npm start`
 for the react app to run. No need for migration or seeds.

##### Main Dependencies
* express
* aws-sdk
* fast-csv
* React
* Material-Ui

## Follow up Questions

##### What issues/limitations might this system face in a real production environment? How could you solve them?

Rendering all data when you open the page, as requested, might overtime become costly as the entries increase in size, not just in monetary loss if there were a charge per query result but mainly with time and performance. Placing an introduction text about the app might be a great way to keep activity in the page while there is no search, as well as limiting the display of unnecessary data for the client. 
There is only one search parameter. I would like to implement more customization to the search, for example, targeting the donors not only by organization id but also by amount, or range of donation amount, as well as donation date. 
Besides the categorize data, It would be nice to implement visual projections, either comparison graphs, growth range, or strongest seasons (donation trend). 

##### What additional features would you want to build?

As mentioned earlier, graphic projections might be a helpful way to interact with the current donation base of the organization. Maybe the option of selecting which donors you will like to have in the csv download. Also the posibility to click in the donor an see more detail information, preferably in a modal.

##### How would you test this system?

There are many things I didn't directly account for, I would've love to set test and fixes for invalid values, as well as checking the format of the response from DynamoDB before it is sent to the front end. 
As and overall test, I would release a beta version that some of the organizations could start using and record the experience through mild pop ups before the window closes. 
