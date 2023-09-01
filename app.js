const askForCharacter = require("./askForCharacters");
const swapCharacter = require("./swapCharacters");
const seeCharacters = require("./seeCharacters");
const deleteCharacter = require("./deleteCharacters");


const rl = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout
});

console.clear();
console.log('WELCOME TO THE GALAXY!');


function menu() {
    rl.question("Do you want to add (A), swap (S), remove (R), see (C) a character, or quit (Q)?\n", async function(answer) {
        if (answer == 'a') {
            try {
                await askForCharacter.askForCharacter(rl, menu);
            } catch {
                console.error(error);
            }
        }
        if (answer == 's') {
            await swapCharacter.swapCharacter(rl, menu);
        }
        if (answer == 'c') {
            await seeCharacters.seeCharacters(menu);
        }
        if ( answer == 'r') {
            await deleteCharacter.deleteCharacter(rl, menu);
        }
        if (answer == 'q') {
            rl.close();
        } else {
            menu();
        }
    });
}

menu();

rl.on("close", function() {
    console.log("\nLeaving the galaxy... Bye Bye!");
    process.exit(0);
});