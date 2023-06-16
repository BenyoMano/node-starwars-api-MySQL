 function run() {
  

  async function insertData(newResult, action) {
    try {
      console.log('Please wait...')

      let mysql = require('mysql2/promise');
      let connection = await mysql.createConnection({
          host: 'localhost',
          user: 'root',
          password: 'Pollylol#123',
          database: 'starwars',
      });

      async function addCharacter(connection) {
        try {
          let character = `INSERT INTO characters (Name, Ranking) VALUES(?, NULL)`;
          const [firstResult] = await connection.execute(character, [newResult]);
          console.log('Inserted data: ', firstResult);
          const insertedId = firstResult.insertId;
          return insertedId;
        } catch (error) {
          console.error('Error executing query: ', error.message);
        }
      }

      async function updateRank(connection, insertedId) {
        try {
          const updateQuery =`UPDATE characters SET Ranking = ? WHERE ID = ?`;
          const [secondResult] = await connection.execute(updateQuery, [insertedId, insertedId])
          console.log('Updated data: ', secondResult);
        } catch (error) {
          console.error('Error executing query: ', error.message);
        }
      }
        const insertedId = await addCharacter(connection);
        updateRank(connection, insertedId);
  
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
