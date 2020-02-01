var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
	const isVegan = req.query.isVegan == "true" ? true : false;
	const isVeg = req.query.isVeg == "true" ? true : false;
	const isGF = req.query.isGF == "true" ? true : false;
	req.db
		.collection("menus")
		.findMany({
			isVegan,
			isGF,
			isVeg
		})
		.then(curs => curs.toArray())
		.then(arr => res.send(arr));
});

module.exports = router;
