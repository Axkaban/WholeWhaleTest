const AWS = require("aws-sdk");
require('dotenv').config();

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: "us-east-1",
  endpoint: "https://dynamodb.us-east-1.amazonaws.com"
});

const dynamodb = new AWS.DynamoDB();

const params = {
  TableName: "Donors",
  KeySchema: [{
      AttributeName: "EmailAdress",
      KeyType: "HASH"
    } //Partition key

  ],
  AttributeDefinitions: [{
      AttributeName: "OrganizationId",
      AttributeType: "N"
    },
    {
      AttributeName: "EmailAdress",
      AttributeType: "S"
    },

  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 400,
    WriteCapacityUnits: 400
  },
  GlobalSecondaryIndexes: [ // optional (list of GlobalSecondaryIndex)
    {
      IndexName: 'Organization_id',
      KeySchema: [{ // Required HASH type attribute
        AttributeName: 'OrganizationId',
        KeyType: 'HASH',
      }],
      Projection: { // attributes to project into the index
        ProjectionType: 'ALL' // (ALL | KEYS_ONLY | INCLUDE)
      },
      ProvisionedThroughput: { // throughput to provision to the index
        ReadCapacityUnits: 400,
        WriteCapacityUnits: 400,
      },
    }
  ],
};

dynamodb.createTable(params, function (err, data) {
  if (err) {
    console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
  } else {
    console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
  }
});