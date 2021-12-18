let mysql = require('mysql'),
    connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'db_express_api'
    });

connection.connect(function (err) {
    if (err) console.log(err);
    else console.log("Connection Success");
});

module.exports = connection;