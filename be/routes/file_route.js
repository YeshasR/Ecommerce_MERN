const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const __basedir = path.resolve();

// Configure multer for file upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'upload/') // Destination directory where the uploaded files will be stored
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname) // Set the filename to the original name of the uploaded file
    }
});

// Configure multer settings
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 10 // Limit the file size to 10 MB
    },
    fileFilter: (req, file, cb) => {
        // Check if the file is an image with allowed file types (jpeg, png, jpg)
        if (file.mimetype == 'image/png' || file.mimetype == 'image/jpg' || file.mimetype == 'image/jpeg') {
            cb(null, true); // Accept the file
        } else {
            cb(null, false); // Reject the file
            return res.status(400).json({ error: "File types allowed are .jpeg ,.png,.jpg" });
        }
    }
});

// Route to handle file upload
router.post("/uploadFile", upload.single('file'), function (req, res) {
    res.json({ "fileName": req.file.filename }); // Respond with the filename of the uploaded file
});

// Function to handle file download
const downloadFile = (req, res) => {
    const fileName = req.params.filename;
    const filePath = path.join(__basedir, "upload", fileName);

    res.download(filePath, fileName, (error) => {
        if (error) {
            res.status(500).send({ message: "File cannot be downloaded: " + error });
        }
    });
};

// Route to handle file download
router.get("/files/:filename", downloadFile);

module.exports = router;
