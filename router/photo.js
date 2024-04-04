const express = require('express');
const router = express.Router();
const path = require('path');



router.get('/:name', (req,res) =>{
    const imagePath = `${process.env.SERVERURL}/file/image/${req.params.name}`;

    res.render(path.join(__dirname,'../views/photo.ejs'),{imagePath:imagePath});
})










module.exports = router;