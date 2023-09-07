 function run() {
  

  async function insertData(newResult, action) {
    try {
      console.log('Please wait...')

      let mysql = require('mysql2/promise');
      let connection = await mysql.createConnection({
          host: 'localhost',
          user: 'root',
          password: process.env.PASSWORD,
          database: 'starwars',
      });
  
        let createTableQuery = `create table if not exists characters(
          ID int primary key auto_increment,
          Ranking int,
          Name varchar(255) not null,
          CONSTRAINT uc_ranking UNIQUE (Ranking)
        )`;
        try {
          await connection.query(createTableQuery);
        } catch (error) {
          console.error('Error executing query: ', error.message);
        }
          connection.end();
          console.log('Closed connection.');


    } catch (err) {
       console.error('Error: ', err);
    } finally {
      // await client.close();
      console.log('Done!');
    }
  }
  return {
    insertData
  };

}

module.exports = run;
