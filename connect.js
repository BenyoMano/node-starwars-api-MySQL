function run() {
    let mysql = require('mysql2');
    let connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'Pollylol#123',
        database: 'starwars'
    });
    
    
   async function initialize(connectionStatus) {
    return new Promise((resolve, reject) => {
        if (connectionStatus == 'connect') {
            connection.connect(function(err) {
                if (err) {
                    reject(err);
                    return console.error('error: ' + err.message);
                }
                console.log('Connected to the MySQL server.');
                resolve();
            });
        }
        
        if (connectionStatus ==  'disconnect') {
            connection.end(function(err) {
                if (err) {
                    reject(err);
                    return console.log('error: ' + err.message);
                }
                console.log('Closed the database connection.');
                resolve();
            });
        }
    });
    }
    return {
        initialize
    };
}

module.exports = run;