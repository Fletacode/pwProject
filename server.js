const express = require('express');
const path = require('path');


const app = express();

app.set('view engine','ejs');
app.set('views', __dirname + './views');
app.set('port', process.env.PORT || 3000);

app.use(express.static(__dirname + './views'));


app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기 중')
})



app.get('/', (req, res) => {
    res.render(path.join(__dirname,'./views/index.ejs'));
})
