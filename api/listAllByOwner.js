import handler from "../libs/handler-lib";
import dynamoDb from "../libs/dynamodb-lib";

export const main = handler(async (event, context) => {
  const params = {
    TableName: process.env.tableName,
    KeyConditionExpression: "pk = :pk and begins_with(sk, :sk)",
    ExpressionAttributeValues: {
      ":pk": event.requestContext.identity.cognitoIdentityId,
      ":sk": "TRACK#"
    }
  };
  const result = await dynamoDb.query(params);
  return result.Items;
});
