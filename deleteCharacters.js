async function deleteCharacter(rl, menu) {

    async function removeItem(del, action) {
        const MySqlRemove = require("./MySqlRemove");
        const remove = MySqlRemove();
        await remove.removeData(del, action);
    }

    const resultLength = await require("./MySqlSee")().seeData('summary');
    if (resultLength === 0) return;
    rl.question("Which character do you want to delete? (# or (A) for all)", async function(del) {
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