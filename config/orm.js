var connection = require("./connection.js");

var orm = {
    selectAll: function (tableInput, cb) {
        var queryString = "SELECT * FROM " + tableInput + ";";
        connection.query(queryString, function (err, result) {
            if (err) {
                throw err;
            }
            cb(result);
        });
    },
    // selectCategory: function(tableInput, cb) {
    //     var queryString = `SELECT * FROM ${tableInput} WHERE category=?;`;
    //     connection.query(queryString, function (err, result) {
    //         if (err) {
    //             throw err;
    //         }
    //         cb(result);
    //     });
    // },
}

module.exports = orm;