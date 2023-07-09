const multer = require('multer');
const fs = require('fs');

// Create the upload path if it does not exist
const uploadPath = 'uploads/';
if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath);
}

// Create a storage engine for multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadPath)
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const fileExtension = getFileExtension(file.originalname);
        cb(null, file.fieldname + '-' + uniqueSuffix + '.' + fileExtension);
    }
});

// Function to get file extension
function getFileExtension(filename) {
    return filename.split('.').pop();
}

// Function to filter only image files
function fileFilter(req, file, cb) {
    const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif'];
    const fileExtension = getFileExtension(file.originalname);

    if (allowedExtensions.includes(fileExtension)) {
        cb(null, true);
    } else {
        cb(new Error('Only image files are allowed'));
    }
}

const upload = multer({ storage: storage, fileFilter: fileFilter });

module.exports = upload;
