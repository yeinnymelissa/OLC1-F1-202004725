var express = require('express');
var morgan = require('morgan');

var app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));



app.get('/', function(req, res) {
    res.send("hola mundo")
})


app.listen(8000, function() {
    console.log("app escuchando en el puerto 8000")
})
