const AWS = require('aws-sdk');

const s3 = new AWS.S3({
  region: 'ap-southeast-1',
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
});

const getObject = async () => {
  const object = s3.getObject({
    Bucket: bucket,
    Key: key,
  });

  const data = object.Body.toString();
  const image = new Image();
  image.src = data;

  return image;
};

module.exports = s3;
