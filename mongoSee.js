
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
  
  async function seeData() {
    try {

      await client.connect();
      
      const database = client.db('starwars');
      const people = database.collection('people');
      
      const options = {
        projection: { _id: 0, rank : 1 },
      };
      
  
      const cursor = people.find({}, options);
  
      if ((await people.countDocuments()) === 0) {
        console.log("No documents found!");
      }

      for await (const doc of cursor) {
        console.log(doc.rank);
      }
  
    } finally {
      await client.close();
    }
  }
  return {
    seeData
  };

}

module.exports = run;
