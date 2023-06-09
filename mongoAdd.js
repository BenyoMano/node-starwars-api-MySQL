
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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

      // If no docs exist => create
      const countDocs = await people.countDocuments({});
      if (countDocs == 0) {
        if (action == 'single') {
          const document = { rank: {1: newResult}}
          await people.insertOne(document);
          console.log('Single character added!');
        }
        if (action == 'multiple') {
          await people.insertMany(newResult);
          console.log('Multiple characters added')
        }
      }
      if (countDocs !== 0) {
        const document = await people.findOne();
        let count = 0;
        for (const value of Object.values(document.rank)) {
          count++;
        }

        console.log('RES', document);
        console.log('Count', count);
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