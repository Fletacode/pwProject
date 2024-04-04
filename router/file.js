const express = require('express');
const router = express.Router();
//const multer = require('multer');
const path = require('path');
const fs = require('fs');

/*
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
*/

// 파일 이름을 생성하는 함수
function generateFileName() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  const milliseconds = String(now.getMilliseconds()).padStart(3, '0');

  // 파일 이름을 생성하여 반환
  return `${year}${month}${day}_${hours}${minutes}${seconds}_${milliseconds}.jpg`;
}

//base64 값 받아와서 이미지로 변환후 파일 디렉토리에 저장
function base64ToImage(base64String) {
  // base64 문자열을 data URL로 변환
  const dataUrl = `data:image/jpeg;base64,${base64String}`;
  
  const fileName = generateFileName();

  // data URL을 파일로 저장
  const imagePath = path.join(__dirname, `../storage/images/${fileName}`);
  const data = dataUrl.split(';base64,').pop();


  
  fs.writeFile(imagePath, data, { encoding: 'base64' }, function(err) {
      if (err) {
          return err;
      } else {
          return 200;
      }
  });
}

/*
router.post('/upload', (req, res) => {
    

    upload(req,res, function(err){
		
		if (err) return res.status(200).json({isfile:err})
		else{
			return res.status(200).json({isfile:true});
		}
	})
    

})
*/


router.post('/parse',(req,res)=>{
   
    const stat = base64ToImage(req.body.base64String);

    res.send(stat);
    
})

//이미지 보여주는 라우터
router.get('/image/:name', (req,res)=>{
    const imageName = req.params.name;

  res.sendFile(path.join(__dirname,`../storage/images/${imageName}`));

})



module.exports = router;