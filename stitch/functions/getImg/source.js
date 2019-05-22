exports = async function(name){
  const s3 = context.services.get('rate-my-bean-aws').s3("eu-west-1");
  try {
    const result = await s3.GetObject({
      "Bucket": "rate-my-bean",
      "Key": name
    });
    console.log(EJSON.stringify(result));
    return result;
  } catch(error) {
    console.error(EJSON.stringify(error));
  }
};