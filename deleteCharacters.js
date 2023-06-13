async function deleteCharacter(rl, menu) {

    async function removeItem(del, action) {
        const mongoRemove = require("./mongoRemove");
        const remove = mongoRemove();
        await remove.removeData(del, action);
    }

    await require("./mongoSee")().seeData('summary');
    rl.question("Which character do you want to delete? ", async function(del) {
        if (del == 'a') {
           await removeItem(del, 'all');
        } else {
           await removeItem(del, 'single');
        }
        menu();
    })

    menu();
}

module.exports = { deleteCharacter }