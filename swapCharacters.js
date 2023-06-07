function swapCharacter(rl, characters, menu, iterateThroughNames) {
    if (characters.length == 0) {
        console.log("There are no characters to swap!");
    } else {
        console.log('Swap the placement of two characters');
        iterateThroughNames(characters);

        console.log('Press the number of the two characters you want to swap! (two inputs)')
        rl.question("First input: ", function(swap1) {
            console.log('\u2713');
            rl.question("Second input: ", function(swap2) {
                console.log('\u2713');
                let tempCharacters = [...characters];
                console.log(`tempCharacters:\n`);
                iterateThroughNames(tempCharacters);
                characters[swap1-1] = tempCharacters[swap2-1];
                characters[swap2-1] = tempCharacters[swap1-1];
                console.log(`characters:\n`);
                iterateThroughNames(characters);
                menu();
            })
        })
    }
    menu();
    return characters;
}

module.exports = { swapCharacter }