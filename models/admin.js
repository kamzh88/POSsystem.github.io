var orm = require("../config/orm.js");

var menu = {
    selectAll: function(cb) {
        orm.selectAll("menu", function(res) {
            cb(res);
        });
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
    }
}

module.exports = menu;