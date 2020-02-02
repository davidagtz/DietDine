const mongo = require("mongodb").MongoClient;
const fs = require("fs");

mongo.connect("mongodb://localhost:27017").then(client => {
	let str = fs.readFileSync("McDonalds.csv", { encoding: "utf-8" });
	let lines = str.split("\r\n").map(e => e.split(","));
	let arr = [];
	for (let i = 1; i < lines.length - 1; i++) arr.push(makeDoc(lines[i]));

	const db = client.db("dietdine");

	db.collection("menus")
		.insertOne({
			items: arr
		})
		.then(res => client.close());
});

function makeDoc(arr) {
	return {
		name: arr[0],
		isVeg: parseBool(arr[2]),
		isVegan: parseBool(arr[1]),
		isGF: parseBool(arr[3]),
		isLF: parseBool(arr[4])
	};
}

function parseBool(bool) {
	console.log(bool.toLowerCase());
	return bool.toLowerCase() == "true" ? true : false;
}
