var mysql = require("mysql");

var connect = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "Dragom765",
	database: "db"
});

module.exports = connect;
