
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

      await client.connect();
      
      const database = client.db('starwars');
      const people = database.collection('people');

      if (action == 'single') {
        const skip = del -1;
        const found = await people.findOne({}, { skip: skip });
        const query = { _id: found._id }
        const result = await people.deleteOne(query);
        if (result.deletedCount === 1) {
          console.log('Single character deleted!');
        } else {
          console.log('No documents matched your input!');
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
