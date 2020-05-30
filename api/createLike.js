import * as uuid from "uuid";
import handler from "../libs/handler-lib";
import dynamoDb from "../libs/dynamodb-lib";

export const main = handler(async (event, context) => {
  const data = JSON.parse(event.body);
  const params = {
    TableName: process.env.tableName,
    // 'Item' contains the attributes of the item to be created
    Item: {
      pk: event.requestContext.identity.cognitoIdentityId,
      sk: `LIKE#${uuid.v1()}`,
      trackSk: data.sk,
      recordType: "LIKE",
      createdAt: Date.now()
    }
  };
  await dynamoDb.put(params);
  return params.Item;
});