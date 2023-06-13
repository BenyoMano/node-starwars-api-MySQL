
function askForCharacter(rl, menu) {

    function iterateThroughResults(result) {
        for (var i = 0; i < result.length; i++) {
            console.log(i+1, result[i].name);
        }
    }

    async function addItem(newResult, action) {
        const mongoAdd = require("./mongoAdd");
        const add = mongoAdd();
        await add.insertData(newResult, action);
    }

    return new Promise((resolve, reject) => {

        rl.question("What star-wars character do you want to add?\n", async function(character) {
            console.log(`Searching for ${character}...`);
            const res = await fetch(`https://swapi.dev/api/people/?search=${character}`);
            
            try {
                if (res.ok) {
                    const data = await res.json();
                    const result = data.results;

                    if (data.count == 0) {
                        console.log("Couldn't find any characters with that name");
                    }
                    if (data.count == 1) {
                        const newResult = result[0].name;
                        await addItem(newResult, 'single');
                    }
                    if (data.count >= 2) {
                        console.log('Found these:');
                        iterateThroughResults(result);

                        rl.question("Pick the one you want by typing the number or all of them by typing (A):", async function(picking) {
                            if (picking == 'a') {
                                const newResult = result;
                                await addItem(newResult, 'multiple');

                            } else {
                                const newResult = result[picking -1].name;
                               await addItem(newResult, 'single');
                            }
                            resolve(addItem);
                            menu();
                        });
                        return;
                    }
                    resolve(addItem);
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