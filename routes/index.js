const express = require('express');
const router = express.Router();
// could use one line instead: const router = require('express').Router();
const tweetBank = require('../tweetBank');
const path = require('path')
router.get('/', function(req, res) {
    let tweets = tweetBank.list();
    res.render('index', { tweets: tweets });
    console.log(router)
});

router.use("/special/", function(req, res, next) {
    res.send("you've reached the special area.")
});


// router.get("/stylesheets/style.css", function(req, res) {
//     res.sendFile(path.resolve('public/stylesheets/style.css'))
// });
var locals = { title: "hi" }

router.get("/views/index.html", function(req, res) {
    //res.sendfile('./views/index.html') //untemplated, raw file
    res.render('index.html', locals);
});


module.exports = router;