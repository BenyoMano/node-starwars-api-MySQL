async function swapCharacter(rl, menu) {

    async function swapItem(swap1, swap2) {
        const MySqlSwap = require("./MySqlSwap");
        const swap = MySqlSwap();
        await swap.swapData(swap1, swap2);
    }
    async function findAll() {
        const MySqlSee = require("./MySqlSee");
        const see = MySqlSee();
        await see.seeData();
}

    console.log('Swap the placement of two characters!');
    
    await findAll();

    console.log("Press the number of the two characters you want to swap! (two inputs)");
    rl.question("First input: ", function(swap1) {
        console.log('\u2713');
        rl.question("Second input: ", async function(swap2) {
            console.log("\u2713");
           await swapItem(swap1, swap2);
            menu();
        })
    })
    
    menu();
}

module.exports = { swapCharacter }