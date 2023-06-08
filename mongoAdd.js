
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

  async function insertData(newResult, action) {
    try {
      await client.connect();
  
      const database = client.db('starwars');
      const people = database.collection('people');
  
      if (action == 'single') {
        await people.insertOne(newResult);
        console.log('Single character added!');
      }
      if (action == 'multiple') {
        await people.insertMany(newResult);
        console.log('Multiple characters added')
      }
      
    } finally {
      await client.close();
    }
  }
  return {
    insertData
  };

}
// insertData().catch(console.dir);

module.exports = run;