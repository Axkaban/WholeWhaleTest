const AWS = require("aws-sdk");
const fs = require('fs');
const csv = require("fast-csv");

var stream = fs.createReadStream('./MockDonorsData.csv');

AWS.config.update({
  region: "us-east-1",
  endpoint: "https://dynamodb.us-east-1.amazonaws.com"
});

const docClient = new AWS.DynamoDB.DocumentClient();

console.log("Importing datas into DynamoDB. Please wait.");

csv
  .fromStream(stream, {
    headers: ["OrganizationId", "FirstName", "LastName", "EmailAdress", "DonationDate", "DonationAmount"]
  })
  .on("data", function (data) {
    console.log(data);
    if (data.OrganizationId !== 'OrganizationId') {
      let params = {
        TableName: "Donors",
        Item: {
          "OrganizationId": parseInt(data.OrganizationId),
          "FirstName": data.FirstName,
          "LastName": data.LastName,
          "EmailAdress": data.EmailAdress,
          "DonationDate": data.DonationDate,
          "DonationAmount": data.DonationAmount
        }
      };


      docClient.put(params, function (err, d) {
        if (err) {
          console.error("Unable to add data", data.FirstName, ". Error JSON:", JSON.stringify(err, null, 2));
        } else {
          console.log("PutItem succeeded:", data.OrganizationId);
        }
      });
    }
  })
  .on("end", function () {
    console.log("done");

  });
