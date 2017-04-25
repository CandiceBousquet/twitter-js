const express = require('express');
const volleyball = require('volleyball')
const nunjucks = require('nunjucks')
const routes = require('./routes')
const app = express();


//nunjucks
app.set('view engine', 'html');
app.engine('html', nunjucks.render);
nunjucks.configure('views', { noCache: true });

//express
app.use(volleyball); //first call: before following func, last call: after
app.use(express.static('public'))
app.use("/", routes)

const PORT = 3001;
app.listen(PORT, function() {
    console.log("server listening");
});