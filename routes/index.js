const express = require('express');
const router = express.Router();
// could use one line instead: const router = require('express').Router();
const bodyParser = require("body-parser")
const tweetBank = require('../tweetBank');
const path = require('path')

router.get('/', function(req, res) {
    let tweets = tweetBank.list();
    res.render('index', { tweets: tweets, showForm: true });
});

router.post("/tweets", bodyParser.urlencoded(), (req, res, next) => {
    tweetBank.add("twitteregg.jpeg", req.body.name, req.body.text);
    router.io.sockets.emit('newTweet', { photo: "../twitteregg.jpeg", name: req.body.name, content: req.body.text })
    res.redirect("/");

})

router.use("/special/", function(req, res, next) {
    res.send("you've reached the special area.")
});


// router.get("/stylesheets/style.css", function(req, res) {
//     res.sendFile(path.resolve('public/stylesheets/style.css'))
// });

router.get('/users/:name', function(req, res) {
    var name = req.params.name;
    var list = tweetBank.find({ name: name });
    res.render('index', { tweets: list, showForm: true, tweetName: name });
});

/* router.get("/index.html", function(req, res) {
    //res.sendfile('./views/index.html') //untemplated, raw file
    res.render('index.html', locals);
}); */




module.exports = function(io) {
    router.io = io;
    return router
};