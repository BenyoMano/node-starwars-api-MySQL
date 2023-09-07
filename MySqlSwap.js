function run() {
  
  async function swapData(swap1, swap2) {
    try {
      let mysql = require('mysql2/promise');
      let connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: process.env.PASSWORD,
        database: 'starwars'
      });

      if (isNaN(swap1) || isNaN(swap2)) {
        console.log('One of your inputs is not a number!');
        return;
      }

      const [allRankingNumbers] = await connection.execute('SELECT Ranking FROM characters');
      let rankingNumbersArray = [];
      for (const value of allRankingNumbers) {
        rankingNumbersArray.push(value.Ranking);
      }

      if (!rankingNumbersArray.includes(Number(swap1)) || !rankingNumbersArray.includes(Number(swap2))) {
        console.log("One of your inputs didn't match a character!");
        return;
      }
      console.log('Please wait...')

      const firstSwap = Number(swap1);
      const secondSwap = Number(swap2);
      const [saveNameSecondName] = await connection.execute(`SELECT Name FROM characters WHERE Ranking = ${secondSwap}`);
      const query1 = `UPDATE characters SET Ranking = ${secondSwap} WHERE Ranking = ${firstSwap}`;
      const query2 = `INSERT INTO characters (Name, Ranking) VALUES(?, ?)`;
      const querydeleteSecond = `DELETE FROM characters WHERE Ranking = ${secondSwap}`;
      await connection.execute(querydeleteSecond);
      await connection.execute(`ALTER TABLE characters AUTO_INCREMENT = 0`);
      await connection.execute(query1);
      await connection.execute(query2, [saveNameSecondName[0].Name, firstSwap]);
      console.log('Swapped successfully!');

    } catch (error) {
      console.error('Error: ', error);
    }
  }
  return {
    swapData
  };

}

module.exports = run;
