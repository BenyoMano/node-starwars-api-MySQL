
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
        const skip = del -1;
        const findDocument = await people.findOne({});
        const query = { _id: findDocument._id }
        const result = await people.updateOne(query, {
          $unset: { [`rank.${skip + 1}`]: 1 }
        });
        
        console.log('Modiefied count', result.modifiedCount);
        if (result.modifiedCount === 1) {
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
