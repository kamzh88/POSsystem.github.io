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
    }
}

module.exports = menu;