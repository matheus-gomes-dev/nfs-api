const { fileUploadUtil, getAllFilesUtil } = require("../utils/upload");

const fileUpload = async (req, res) => {
  const { data } = req.body;
  if (!data) return res.status(400).json({ error: 'File as a string is required' });
  if (!process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY) {
    return res.status(500).json({ error: 'AWS credentials not configured' });
  }
  try {
    const fileSrc = await fileUploadUtil(data);
    res.status(200).json({
      message: 'File uploaded successfully',
      fileSrc: fileSrc
    });
  } catch (err) {
    console.error("Error uploading file:", err);
    res.status(500).json({ error: 'Failed to upload file' });
  }
};

const getAllFiles = async (req, res) => {
  try {
    const result = await getAllFilesUtil();
    res.status(200).json({ objects: result });
  } catch (err) {
    console.error("Error listing files:", err);
    res.status(500).json({ error: 'Failed to retrieve files' });
  }
};

module.exports = {
  fileUpload,
  getAllFiles
};