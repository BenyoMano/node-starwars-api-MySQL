
function askForCharacter(rl, characters, menu) {
    return new Promise((resolve, reject) => {

        rl.question("What star-wars character do you want to add?\n", async function(character) {
            console.log(`Adding ${character}...`);
            const res = await fetch(`https://swapi.dev/api/people/?search=${character}`);
            
            try {
                if (res.ok) {
                    const data = await res.json();
                    const result = data.results;
                    if (data.count == 0) {
                        console.log("Couldn't find any characters with that name");
                    } else {
                        console.log('Character: ', result);
                        characters = [...characters, result];
                    }
                    resolve(characters);
                }
                if (!res.ok) {
                    throw new Error;
                }
            } catch {
                console.error('Error', res.status);
                reject();
            }
            menu();
        });
    });
}

module.exports = { askForCharacter }