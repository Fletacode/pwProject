const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
require('dotenv').config();
const app = express();


const WebSocket = require('./socket.js');


app.set('view engine','ejs');
app.set('views', __dirname + './views');
app.set('port', process.env.PORT || 3000);

app.use(express.static(__dirname + './views'));
app.use(bodyParser.json({ limit: '300mb' }));
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));

app.use('/file', require('./router/file.js') );
app.use('/photo', require('./router/photo.js') );
app.use('/video', require('./router/video.js') );
app.use('/list', require('./router/list.js'));

const server = app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기 중')
})


WebSocket(server);


app.get('/', (req, res) => {
    res.render(path.join(__dirname,'./views/index.ejs'));
})




