const {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
  ListObjectsCommand
} = require("@aws-sdk/client-s3");

const uploadPrefix = 'nfs-upload'
const getS3Client = () => {
  return new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    },
    forcePathStyle: false
  });
};

const fileUploadUtil = async (data) => {
  const mimeType = data.split(';')[0].split(':')[1];
  const base64Data = data.split(',')[1];
  const buffer = Buffer.from(base64Data, 'base64');
  const extension = mimeType.split('/')[1];
  const uploadTimestamp = Date.now();
  const key = `${uploadPrefix}-${uploadTimestamp}.${extension}`;
  const client = getS3Client();
  try {
    await client.send(new PutObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: key,
      Body: buffer,
      ContentType: mimeType
    }))
    return `${process.env.AWS_S3_URL}/${key}`;
  } catch (err) {
    console.error("Error uploading file:", err);
    throw err;
  }
}

const getAllFilesUtil = async () => {
  const client = getS3Client();
  try {
    const data = await client.send(new ListObjectsCommand({ Bucket: process.env.AWS_S3_BUCKET_NAME }));
    return data.Contents;
  } catch (err) {
    console.error("Error listing files:", err);
    throw err;
  }
};

const deleteFileUtil = async (key) => {
  const client = getS3Client();
  try {
    await client.send(new DeleteObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: key
    }));
  } catch (err) {
    console.error("Error deleting file:", err);
    throw err;
  }
};

const isS3Object = (url) => {
  return url.includes(process.env.AWS_S3_URL);
}

const shouldDeleteExistingFile = (existingUrl, newData) => {
  if (!isS3Object(existingUrl)) return false
  return existingUrl !== newData;
}

module.exports = {
  fileUploadUtil,
  getAllFilesUtil,
  deleteFileUtil,
  shouldDeleteExistingFile,
  isS3Object
};