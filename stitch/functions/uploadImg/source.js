exports = async function(name, content){
  const s3 = context.services.get('rate-my-bean-aws').s3("eu-west-1");
  try {
    const result = await s3.PutObject({
      "Bucket": "rate-my-bean",
      "Key": name,
      "Body": content
    });
    
    return result;
  } catch(error) {
    console.error(EJSON.stringify(error));
    throw error;
  }
};