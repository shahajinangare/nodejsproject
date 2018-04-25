var mongo = require("mongoose");
//var CONN_STRING = "mongodb://132.0.0.182:30010/activitylog";
var CONN_STRING = "mongodb://filelogs:SOh4TbYhxuLi2@132.0.0.182:30010/filelogs";

var db = mongo.connect(CONN_STRING, function (err, response) {
    if (err) {
        console.log('Failed to connect to ' + db);
    }
    else {
        console.log('Connected to ' + db, ' + ', response);
    }
});

module.exports = db;