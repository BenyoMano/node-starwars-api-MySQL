
const res = require('express/lib/response');
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://Benjo:80Bi5opPJX9A7HBe@cluster0.ufix2v0.mongodb.net/?retryWrites=true&w=majority";

function run() {
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });
  
  async function swapData(swap1, swap2) {
    try {
      console.log('Please wait...')

      await client.connect();
      
      const database = client.db('starwars');
      const people = database.collection('people');

      const firstSwap = Number(swap1);
      const secondSwap = Number(swap2);
      const findDocument = await people.findOne({});
      const query = { _id: findDocument._id }
      const saveName = findDocument.rank[firstSwap];

      await people.updateOne(query, {
        $rename: { [`rank.${secondSwap}`]: `rank.${firstSwap}` }
      }).then(console.log('\u2713'));
      
      await people.updateOne(query, {
        $set: { [`rank.${secondSwap}`]: saveName }
      }).then(console.log('\u2713\nSwapped successfully!'));

    } finally {
      await client.close();
    }
  }
  return {
    swapData
  };

}

module.exports = run;
