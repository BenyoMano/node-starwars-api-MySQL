
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
        projection: { _id: 0, name: 1 },
      };
      // const options = {
      //   projection: { _id: 0, name: 1, height: 1, mass: 1, hair_color: 1, skin_color: 1, eye_color: 1, birth_year: 1, gender: 1, homeworld: 1 },
      // };
  
      const cursor = people.find({}, options);
  
      if ((await people.countDocuments()) === 0) {
        console.log("No documents found!");
      }
  
      for await (const doc of cursor) {
        console.dir(doc);
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
