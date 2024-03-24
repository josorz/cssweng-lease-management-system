const multer = require('multer');
const path = require('path');
const crypto = require('crypto');

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, ("./uploads") );  // ->("./uploads")  this is the destination where files will save in the HArdDisk Storage 
    },
    filename: (req, file, callback) => {
        const fileExtension = path.extname(file.originalname);
        const filename = "image" + crypto.randomBytes(10).toString('hex') + fileExtension
        callback(null, filename);
    },
});

const upload = multer({ storage });

module.exports = upload;