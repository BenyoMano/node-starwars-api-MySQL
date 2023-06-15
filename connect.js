let mysql = require('mysql2');
let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Pollylol#123',
    database: 'starwars'
});

let connectionStatus = 'connect';

function initialize(connectionStatus) {
    if (connectionStatus == 'connect') {
        connection.connect(function(err) {
            if (err) {
                return console.error('error: ' + err.message);
            }
            console.log('Connected to the MySQL server.');
        });
    }
    
    if (connectionStatus ==  'disconnect') {
        connection.end(function(err) {
            if (err) {
                return console.log('error: ' + err.message);
            }
            console.log('Closing the database connection.');
        });
    }
}
initialize(connectionStatus);