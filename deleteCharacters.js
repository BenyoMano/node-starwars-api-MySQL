async function deleteCharacter(rl, characters, menu) {

    async function removeItem(del, action) {
        const mongoRemove = require("./mongoRemove");
        const remove = mongoRemove();
        await remove.removeData(del, action);
    }

    await require("./mongoSee")().seeData('summary');
    rl.question("Which character do you want to delete? ", function(del) {
        if (del == 'a') {
            removeItem(del, 'all');
        } else {
            removeItem(del, 'single');
        }
        menu();
    })

    menu();
    return characters;
}

module.exports = { deleteCharacter }