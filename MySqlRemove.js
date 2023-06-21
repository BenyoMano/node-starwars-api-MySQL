function run() {
  
  async function removeData(del, action) {
    try {
      console.log('Please wait...')

      let mysql = require('mysql2/promise');
      let connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'Pollylol#123',
        database: 'starwars',
      });

      if (action == 'single') {
        try {
          if (isNaN(del)) {
            console.log('Your input is not a number!');
            return;
          }
          const newRank = Number(del);
          const [removeOne] = await connection.execute(`DELETE FROM characters WHERE Ranking=${newRank}`);
          if (removeOne.affectedRows === 0) {
            console.log("Number didn't match any character!");
            return;
          };
          const query = `UPDATE characters SET Ranking = Ranking -1 WHERE Ranking > ${newRank}`;
          
          await connection.execute(query);
          await connection.execute(`ALTER TABLE characters AUTO_INCREMENT = 0`);
          console.log('Deleted one character!');
        } catch (error) {
          console.error('Error: ', error);
        }
      }
      
        if (action == 'all') {
          try {
            await connection.execute(`DELETE FROM characters`);
            await connection.execute(`ALTER TABLE characters AUTO_INCREMENT = 0`);
            console.log("Deleted all characters!");
          } catch (error) {
            console.error('Error: ', error);
          }
        }
        
    } catch (error) {
      console.error('Error: ', error);
    }
  }
  return {
    removeData
  };
}

module.exports = run;
