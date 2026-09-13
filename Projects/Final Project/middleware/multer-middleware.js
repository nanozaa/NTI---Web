const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: path.join(__dirname, "..", "uploads", "users"),
  filename: (req, file, callback) => {
    const extension = path.extname(file.originalname).toLowerCase();
    callback(null, `user-${Date.now()}-${Math.round(Math.random() * 1e9)}${extension}`);
  },
});

const fileFilter = (req, file, callback) => {
  if (file.mimetype.startsWith("image/")) {
    return callback(null, true);
  }

  callback(new Error("Only image files are allowed"));
};

const multerUpload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

module.exports = multerUpload;
