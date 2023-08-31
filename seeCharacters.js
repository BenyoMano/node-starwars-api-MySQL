async function seeCharacters(menu) {

    async function findAll() {
            const mysqlSee = require("./MySqlSee");
            const see = mysqlSee();
            await see.seeData();
    }
    await findAll();
    menu();
}

module.exports = { seeCharacters }
