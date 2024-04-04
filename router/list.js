const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
require('dotenv').config();


router.get('/', (req,res) =>{


    const directoryPath = path.join(__dirname, '../storage/images'); // 로컬 디렉토리 경로

    fs.readdir(directoryPath, (err, imageNames) => {
        if (err) {
            console.error('Error reading directory:', err);
            res.status(500).send('Internal Server Error');
        } else {
            
            
            res.render(path.join(__dirname,'../views/list.ejs'), { imagePaths: imageNames });
        }
    });





   
})


router.get('/files', (req, res) => {
    
});







module.exports = router;