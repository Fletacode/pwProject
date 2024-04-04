const webSocket = require('ws');
const path = require('path');
const fs = require('fs');

let sockets = [];

module.exports = (server) =>{
    const wss = new webSocket.Server({server});


    wss.on('connection' , (ws,req)=>{
        console.log(req.connection.remoteAddress);

        ws.id = req.headers['sec-websocket-key'];

        sockets.push(ws);

        

        function sendImages() {



            const directoryPath = path.join(__dirname, './storage/videos'); // 로컬 디렉토리 경로
            
            fs.readdir(directoryPath, (err, imageNames) => { 
                if (err) {
                    return err;
                } else {
                   
                    imageNames.forEach((imageName,index) => {
                        
                        const directoryPath = path.join(__dirname, `./storage/videos/${imageName}`); // 로컬 디렉토리 경로
                        const imageData = fs.readFileSync(directoryPath);
                        //console.log(imageData);
                        ws.send(imageData, { binary: true });

                        if (index === imageNames.length - 1) {
                            ws.send('end');
                        }
                    });
                }
            });

           
        }
        
        

        sendImages();
        
        
       
        
        

        
    
        // 클라이언트가 연결을 끊었을 때 실행되는 부분
        ws.on('close', () => {
            console.log('Client disconnected');
        });

    })


    wss.on('close',(code,reason)=>{
        // code: 연결이 종료되는 이유 숫자
        // 기본값 1000
        // reason : 왜 종료되는지 문자열
        

        sockets = sockets.filter(v=>{
            return ws.id !== v.id;
        })

        //console.log(sockets.length);
    })

    wss.on('message', (message) => {
        console.log('Received message:', message);
    });

}