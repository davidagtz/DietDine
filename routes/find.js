module.exports = db => {
	var express = require("express");
	var router = express.Router();

	/* GET home page. */
	router.get("/", function(req, res, next) {
		const isVegan = req.query.isVegan == "true" ? true : false;
		const isVeg = req.query.isVeg == "true" ? true : false;
		const isGF = req.query.isGF == "true" ? true : false;
		const isLF = req.query.isLF == "true" ? true : false;
		db.collection("menus")
			.find({})
			.toArray()
			.then(arr => {
				let r = [];
				for (const rest of arr) {
					let opts = [];
					for (const item of rest.items) {
						if (isVegan && !item.isVegan) continue;
						if (isVeg && !item.isVeg) continue;
						if (isGF && !item.isGF) continue;
						if (isLF && !item.isLF) continue;
						opts.push(item.name);
					}
					r.push({
						restaurant: rest.name,
						location: rest.location,
						options: opts
					});
				}
				res.json(r);
			});
	});
	return router;
};
