
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
      console.log('Please wait...')

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
          const document = { rank: {}}
          await people.insertOne(document);
          console.log('Document created, please wait...');
          
          const findDocument = await people.findOne({});
          let count = 0;
          for (const value of Object.values(findDocument.rank)) {
            count++;
          }

          let i = 0;
          for (const value of Object.values(newResult)) {
            await people.updateOne(
              { _id: findDocument._id},
              { $set: { [`rank.${count + 1 + i}`]: newResult[i].name }}
            );
            i++;
          }
          console.log('Multiple characters added!')
        }
      }

      if (countDocs !== 0) {
        const findDocument = await people.findOne({});
        let count = 0;
        for (const value of Object.values(findDocument.rank)) {
          count++;
        }
        
        if (action == 'single') {
          await people.updateOne(
            { _id: findDocument._id},
            { $set: { [`rank.${count +1}`]:  newResult }}
          ).then(console.log('Single character added!'));
        }

        if (action == 'multiple') {
          let i = 0;
          for (const value of Object.values(newResult)) {
            await people.updateOne(
              { _id: findDocument._id},
              { $set: { [`rank.${count + 1 + i}`]: newResult[i].name }}
            );
            i++;
          }
          console.log('Multiple characters added!')
        }
      }
  
    } finally {
      await client.close();
    }
  }
  return {
    insertData
  };

}

module.exports = run;