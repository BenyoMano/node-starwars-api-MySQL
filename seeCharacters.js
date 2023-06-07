function seeCharacters(characters, menu) {
    if (characters.length == 0) {
        console.log("There are no characters stored yet!");
    } else {
        console.log('Here are the stored characters: ', characters);
    }
    menu();
    return characters;
}

module.exports = { seeCharacters }