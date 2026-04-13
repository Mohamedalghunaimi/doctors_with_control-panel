
const multer = require('multer');
// Configure storage
const storage = multer.diskStorage({
filename: (req, file, cb) => {
const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
cb(null, file.fieldname + '-' + uniqueSuffix + '-' + file.originalname);
}
});

// Initialize Multer
const upload = multer({ storage: storage });

module.exports = {
    upload
}