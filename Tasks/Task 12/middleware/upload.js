const path = require('path');
const crypto = require('crypto');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: path.join(__dirname, '..', 'uploads'),
  filename: (req, file, callback) => {
    const extension = path.extname(file.originalname).toLowerCase();
    const uniqueName = `${Date.now()}-${crypto.randomBytes(8).toString('hex')}${extension}`;
    callback(null, uniqueName);
  }
});

const fileFilter = (req, file, callback) => {
  if (file.mimetype.startsWith('image/')) {
    return callback(null, true);
  }

  return callback(new Error('Only image files are allowed.'));
};

module.exports = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }
});
