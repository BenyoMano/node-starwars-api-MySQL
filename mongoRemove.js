
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
  
  async function removeData(del, action) {
    try {
      console.log('Please wait...')

      await client.connect();
      
      const database = client.db('starwars');
      const people = database.collection('people');

      if (action == 'single') {
        const newRank = Number(del);
        const oldRank = newRank + 1;
        const findDocument = await people.findOne({});
        const query = { _id: findDocument._id }
        const resultRemoved = await people.updateOne(query, {
          $unset: { [`rank.${del}`]: 1 }
        });

        let count = 0;
        for (const value of Object.values(findDocument.rank)) {
          count++;
        }
        let i = 0;
        for (const value of Object.values(findDocument.rank)) {
          await people.updateOne(query, {
            $rename: { [`rank.${oldRank + i}`]: `rank.${newRank + i}` }
          });
          i++;
        }
        
        console.log('Modiefied count', resultRemoved.modifiedCount);
        if (resultRemoved.modifiedCount === 1) {
          console.log('Removed one character!');
        } else {
          console.log('Failed!');
        }
      }
      if (action == 'all') {
        const res = await people.deleteMany({});
        console.log('Deleted', res.deletedCount, "characters!");
      }
  
    } finally {
      await client.close();
    }
  }
  return {
    removeData
  };

}

module.exports = run;
