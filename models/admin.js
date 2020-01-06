var orm = require("../config/orm.js");
var menu = {
    selectAll: function(cb) {
        orm.selectAll("menu", function(res) {
            cb(res);
        });
    },
    selectOrders: function(cb) {
        orm.selectAll("orders", function (res) {
            cb(res);
        })
    },
    selectCategory: function(condition, cb) {
        orm.selectCategory("menu", condition, function (res) {
            cb(res);
        });
    },
    del: function(condition, cb) {
        // console.log(conditon);
        orm.delete("menu", condition, function(res) {
            cb(res);
        })
    },
    insertOne: function(cols, vals, cb) {
        orm.insertOne("menu", cols, vals, function(res) {
            cb(res);
            // console.log(res);
        })
    },
    insertOrder: function(cols, vals, cb) {
        orm.insertOrder("orders", cols, vals, function(res) {
            cb(res);
            // console.log(res);
        })
    },
    updateOne: function(objColVals, condition, cb) {
        // console.log(objColVals);
        // console.log(condition);
        orm.updateOne("menu", objColVals, condition, function(res) {
            cb(res);
        })
    }
}
module.exports = menu;