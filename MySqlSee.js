
function run() {

  async function seeData() {
    try {
      console.log('Please wait...');

      let mysql = require('mysql2/promise');
      let connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: process.env.PASSWORD,
        database: 'starwars',
      });

      const showCharacters = `SELECT Ranking, Name FROM characters ORDER BY Ranking ASC`;
      const [result] = await connection.execute(showCharacters);

      if (result.length === 0) {
        console.log('No documents found!');
        return result.length;
        
      } else {
        for (const doc of result) {
          console.log(doc.Ranking, doc.Name);
        }
      }
    } catch (error) {
      console.error('Error: ', error);
    }
  }
  return {
    seeData
  };

}

module.exports = run;
