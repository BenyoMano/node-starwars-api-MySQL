function deleteCharacter(rl, characters, menu, iterateThroughNames) {
    if (characters.length == 0) {
        console.log("There are no characters to delete!");
    } else {
        iterateThroughNames(characters);
        rl.question("Which character do you want to delete? ", function(del) {
            characters.splice(del-1, 1);
            iterateThroughNames(characters);
            menu();
        })
    }
    menu();
    return characters;
}

module.exports = { deleteCharacter }