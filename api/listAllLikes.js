import handler from "../libs/handler-lib";
import dynamoDb from "../libs/dynamodb-lib";

export const main = handler(async (event, context) => {
  const params = {
    TableName: process.env.tableName,
    KeyConditionExpression: "pk = :pk and begins_with(sk, :sk)",
    ExpressionAttributeValues: {
      ":pk": event.requestContext.identity.cognitoIdentityId,
      ":sk": "LIKE#"
    }
  };
  const result = await dynamoDb.query(params);
  const hashResults = {}; // HASH Results
  for (let index = 0; index < result.Items.length; index++){
    hashResults[result.Items[index].trackSk] = result.Items[index].sk;
  };
  return hashResults;
});
