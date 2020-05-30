import handler from "../libs/handler-lib";
import dynamoDb from "../libs/dynamodb-lib";

export const main = handler(async (event, context) => {
  const params = {
    TableName: process.env.tableName,
    // 'KeyConditionExpression' defines the condition for the query
    IndexName: "SearchAllTracks",
    KeyConditionExpression: `recordType  = :recordType`,
    ExpressionAttributeValues: {
      ':recordType': "TRACK"
    }
  };

  const result = await dynamoDb.query(params);

  // Return the matching list of items in response body
  return result.Items;
});
