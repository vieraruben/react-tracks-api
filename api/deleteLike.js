import handler from "../libs/handler-lib";
import dynamoDb from "../libs/dynamodb-lib";

export const main = handler(async (event, context) => {
  const data = JSON.parse(event.body);
  const params = {
    TableName: process.env.tableName,
    Key: {
      pk: event.requestContext.identity.cognitoIdentityId,
      sk: data.sk //event.pathParameters.sk
    }
  };

  await dynamoDb.delete(params);

  return { status: true };
});