const express = require('express');
const app = express();
const port = 5000;

app.use(express.static('public'));

app.get('/', function (req, res) {
    res.sendFile('index.html', {root: __dirname});
})

app.listen(process.env.PORT || 5000)

