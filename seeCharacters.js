function seeCharacters(characters, menu) {

    async function findAll() {
            const mongoSee = require("./mongoSee");
            const see = mongoSee();
            await see.seeData();
    }
    findAll();
    menu();
    return characters;
}

module.exports = { seeCharacters }