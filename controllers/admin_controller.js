var express = require("express");
var path = require("path");
var router = express.Router();


var menu = require("../models/admin.js");

router.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
});

router.get("/admin", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/admin.html"));
});

router.get("/api/menu", function (req, res) {
    menu.selectAll(function (data) {
        res.json({ menu: data });

    });
});

router.get("/api/menu/:category", function (req, res) {
    var category = JSON.stringify(req.params.category)
    var condition = "category = " + category;
    // console.log(condition);
    // console.log(req);
    menu.selectCategory(condition, function (data) {
        res.json({ menu: data });
    });
});

router.delete("/api/menu/:id", function (req, res) {
    var condition = "id = " + req.params.id;
    // console.log(condition);
    
    menu.del(condition, function (result) {
        if (result.affectedRows == 0) {
            return res.status(404).end();
        } else {
            res.status(200).end();
        };
    })
})

module.exports = router;