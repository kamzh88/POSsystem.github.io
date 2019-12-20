var orm = require("../config/orm.js");

var menu = {
    selectAll: function(cb) {
        orm.selectAll("menu", function(res) {
            cb(res);
        });
    },
    // selectCategory: function(cb) {
    //     orm.selectCategory("menu", function (res) {
    //         cb(res);
    //     });
    // }
}

module.exports = menu;