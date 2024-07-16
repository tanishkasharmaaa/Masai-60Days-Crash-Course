const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const path = require('path');

const app = express();
const port = 4000;

// Configure Cloudinary
cloudinary.config({
    cloud_name: 'dferozjwj',
    api_key: '575191383497899',
    api_secret: 'hkfDtRqfuGhmSlK10kCAomFV2dk'
});

// Configure Multer Storage with Cloudinary
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'uploads',
        format: async (req, file) => 'png',
        public_id: (req, file) => file.originalname,
    },
});

const upload = multer({ storage: storage });

// Serve the HTML form
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Handle file upload
app.post('/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    // File has been uploaded to Cloudinary at this point
    const imageUrl = req.file.path;
    res.status(200).json({
        message: 'File uploaded successfully',
        imageUrl: imageUrl
    });
});

app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
});
