async function seeCharacters(menu) {

    async function findAll() {
            const mongoSee = require("./mongoSee");
            const see = mongoSee();
            await see.seeData();
    }
    await findAll();
    menu();
}

module.exports = { seeCharacters }