var express = require("express");

var router = express.Router();

var menu = require("../models/admin.js");

router.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"));
});

router.get("/api/menu", function(req, res) {
    menu.selectAll(function (data) {
        res.json({menu: data});
        
    });
});

router.get("/api/menu/:category", function(req, res) {
    var category = JSON.stringify(req.params.category)
    var condition = "category = " + category;
    console.log(condition);
    menu.selectCategory(condition, function (data) {
        res.json({menu: data});
    });
});

module.exports = router;