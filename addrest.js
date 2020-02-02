const args = process.argv.slice(2);
const mongo = require("mongodb").MongoClient;

mongo.connect("mongodb://localhost:27017", (err, client) => {
	const db = client.db("dietdine");
	db.collection("restaurants")
		.insertOne({
			name: args[0],
			location: args[1]
		})
		.then(res => client.close());
});
