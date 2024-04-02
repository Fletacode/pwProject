const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const image_path = "./storage/images"; 

var storage = multer.diskStorage({

  destination : function(req, file, cb){
    cb(null, image_path)
  },
  filename : function(req, file, cb){
    cb(null, file.originalname )
  }

});

const upload = multer({

    storage: storage,
    fileFilter: function (req, file, callback) {

        var ext = path.extname(file.originalname);
		
        if(ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png' ) {
            return callback(new Error('사진파일만 업로드하세요'))
        }
        
        callback(null, true)
    },
    limits:{
        fileSize: 3000 * 3000
    }
    
}).single('files'); //클라이언트에서 보내는 키값



router.post('/upload', (req, res) => {
    

    upload(req,res, function(err){
		
		if (err) return res.status(200).json({isfile:err})
		else{
			return res.status(200).json({isfile:true});
		}
	})
    

})



module.exports = router;