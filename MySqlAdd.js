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
          const [countCharacters] = await connection.execute(`SELECT COUNT(Ranking) FROM characters`);
          const formattedCC = countCharacters[0]['COUNT(Ranking)'];
          
          let character = `INSERT INTO characters (Name, Ranking) VALUES(?, ?)`;
          const [firstResult] = await connection.execute(character, [newResult, formattedCC + 1]);
          console.log('Added character successfully!');
        } catch (error) {
          console.error('Error executing query: ', error.message);
        }
      }

      async function addCharacterMany(connection) {
        const [countCharacters] = await connection.execute(`SELECT COUNT(Ranking) FROM characters`);
        const formattedCC = countCharacters[0]['COUNT(Ranking)'];
        let i = 0;
        
        for (const value of Object.values(newResult)) {
          try {

            let character = `INSERT INTO characters (Name, Ranking) VALUES(?, ?)`;
            const [firstResult] = await connection.execute(character, [newResult[i].name, formattedCC + 1 + i]);
          } catch (error) {
            console.error('Error executing query: ', error.message);
          }
          i++;
        }
      }

      if (action == 'single') {
        const insertedId = await addCharacter(connection);
      }

      if (action == 'multiple') {
        const insertedId = await addCharacterMany(connection);
        console.log('Multiple characters added!');
      }
  
      connection.end();
    
    } catch (err) {
       console.error('Error: ', err);
    }
  }
  return {
    insertData
  };

}

module.exports = run;
