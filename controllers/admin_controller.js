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
    console.log(condtion);

    menu.del(condition, function (result) {
        if (result.affectedRows == 0) {
            return res.status(404).end();
        } else {
            res.status(200).end();
        };
    })
})
router.post("/api/menu", function (req, res) {
    console.log(req);
    menu.insertOne(
        ["item_name", "category", "selected", "price"],
        [req.body.item_name, req.body.category, req.body.selected, req.body.price],
        function (result) {
            res.json({ id: result.insertId });
            
        }
    )
})
router.put("/api/menu/:id", function (req, res) {
    var condition = "id = " + req.params.id;
    // console.log(condition);
    menu.updateOne({
        item_name: req.body.item_name,
        category: req.body.category,
        selected: req.body.selected,
        price: req.body.price
    }, condition, function (result) {
        if (result.changedRows == 0) {
            return res.status(404).end();
        } else {
            console.log(req.body.item_name);
            res.json({ 
                id: req.params.id,
                item_name: req.body.item_name,
                category: req.body.category,
                selected: req.body.selected,
                price: req.body.price
            });
        }
    }
    )
})
module.exports = router;