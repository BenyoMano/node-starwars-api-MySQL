const askForCharacter = require("./askForCharacters");
const swapCharacter = require("./swapCharacters");
const seeCharacters = require("./seeCharacters");
const deleteCharacter = require("./deleteCharacters");

const rl = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout
});

let characters = [];

function iterateThroughNames(array) {
    const l = array.length;
    for (var i = 0; i < l; i++) {
        console.log(i+1, array[i][0].name);
    }
}

function menu() {
    console.log('WELCOME TO THE GALAXY!');
    rl.question("Do you want to add (A), swap (S), remove (R), see (C) a character, or quit (Q)?\n", async function(answer) {
        if (answer == 'a') {
            try {
                characters = await askForCharacter.askForCharacter(rl, characters, menu);
            } catch {
                console.error(error);
            }
        }
        if (answer == 's') {
            characters = await swapCharacter.swapCharacter(rl, characters, menu, iterateThroughNames);
        }
        if (answer == 'c') {
            characters = await seeCharacters.seeCharacters(characters, menu);
        }
        if ( answer == 'r') {
            characters = await deleteCharacter.deleteCharacter(rl, characters, menu, iterateThroughNames);
        }
        if (answer == 'q') {
            rl.close();
        }
    });
}

menu();

rl.on("close", function() {
    console.log("\nLeaving the galaxy... Bye Bye!");
    process.exit(0);
});