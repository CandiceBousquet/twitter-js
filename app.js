const express = require('express');
const volleyball = require('volleyball')
const nunjucks = require('nunjucks')
const routes = require('./routes')
const socket = require('socket.io')
const app = express();


//nunjucks
app.set('view engine', 'html');
app.engine('html', nunjucks.render);
nunjucks.configure('views', { noCache: true });

//express
app.use(volleyball); //first call: before following func, last call: after
app.use(express.static('public'))

const PORT = 3001;
var server = app.listen(PORT, function() {
    console.log("server listening");
});

var io = socket.listen(server)

app.use("/", routes(io))