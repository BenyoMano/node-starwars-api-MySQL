function deleteCharacter(rl, characters, menu, iterateThroughNames) {

    async function removeItem(del, action) {
        const mongoRemove = require("./mongoRemove");
        const remove = mongoRemove();
        await remove.removeData(del, action);
    }

    iterateThroughNames(characters);
    rl.question("Which character do you want to delete? ", function(del) {
        // const newResult = result;
        if (del == 'a') {
            removeItem(del, 'all');
        } else {
            removeItem(del, 'single');
        }
        
        // characters.splice(del-1, 1); 
        // iterateThroughNames(characters);
        menu();
    })

    menu();
    return characters;
}

module.exports = { deleteCharacter }