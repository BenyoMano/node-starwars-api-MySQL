async function seeCharacters(menu) {

    async function findAll() {
            const mongoSee = require("./MySqlSee");
            const see = mongoSee();
            await see.seeData();
    }
    await findAll();
    menu();
}

module.exports = { seeCharacters }