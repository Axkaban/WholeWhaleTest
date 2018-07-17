const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const AWS = require("aws-sdk");
const csv = require("fast-csv");
const fs = require('fs');
require('dotenv').config();

// AWS configuration for dynamo db

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: "us-east-1",
  endpoint: "https://dynamodb.us-east-1.amazonaws.com"
});

const docClient = new AWS.DynamoDB.DocumentClient();

// basic configuration

app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

const PORT = process.env.PORT || 8080;

app.use(cors());

//  request for all donors

app.get('/index', (req, res) => {

  let arrData = [];

  const params = {
    TableName: "Donors",
    ProjectionExpression: "DonationAmount, DonationDate, LastName, EmailAdress, FirstName, OrganizationId"
  };

  docClient.scan(params, function (err, data) {

    if (err) {
      console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
    } else {

      let obj = req.body.obj;


      data.Items.forEach((item) => {
        arrData.push(item);

      });

      res.json(arrData);
    }
  });
})

// request for display items from one organization

app.get('/index/:id', (req, res) => {

  let arrData = [];//array will contain the rows as object items


//   query parameters
  const params = {
    TableName: "Donors",
    ProjectionExpression: "DonationAmount, DonationDate, LastName, EmailAdress, FirstName, OrganizationId",
    FilterExpression: "OrganizationId = :id",
    ExpressionAttributeValues: {
      ":id": parseInt(req.params.id)
    }
  };

//   the query itself. Scan takes parameters that do not need to be the Attribute Key
  docClient.scan(params, function (err, data) {

    if (err) {
      console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
    } else {

      let obj = req.body.obj;

      //create the csv file once the rendering is being done
      let csvStream = csv.createWriteStream({
          headers: true
        }),
        writableStream = fs.createWriteStream(`${req.params.id}.csv`); //csv file name from the id

      writableStream.on("finish", () => {
        console.log("DONE!");
      })



      csvStream.pipe(writableStream);

      data.Items.forEach((item) => {
        arrData.push(item);// push the results in the array
        csvStream.write(item); // add the results in the file

      });

      csvStream.end();

      res.json(arrData); //sending the response to the front end

    }
  });
})

// request for csv file
app.get('/export/:id', (req, res) => {

  let filename = `${req.params.id}.csv`;

  var options = {
    root: __dirname + '/',
    dotfiles: 'deny',
    headers: {
      'x-timestamp': Date.now(),
      'x-sent': true
    }
  };
  res.sendFile(filename, options);// express has a sendFile method that takes the file name and an otions object
                                  //   which helps keep the relative filepath as well as possibly wanted metadata to the response.
 
})


app.listen(PORT, () => {
  console.log(`Port running on ${PORT} `);
});