const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, ("./uploads") );  // ->("./uploads")  this is the destination where files will save in the HArdDisk Storage 
    },
    filename: (req, file, callback) => {
        const fileExtension = path.extname(file.originalname);
        callback(null, file.originalname + fileExtension);
    },
});

const upload = multer({ storage });

module.exports = upload;