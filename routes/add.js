var express = require("express");
var router = express.Router();

router.post("/", function(req, res, next) {
	if (!req.query.name || !req.query.location)
		res.status(412).send(
			"Failed to provide required restaurant paramters"
		);
	else {
		req.db
			.collection("restaurants")
			.insertOne({
				name: req.query.name,
				location: req.query.location
			})
			.then(doc => {
				return req.db.collection("menus").insertOne({
					id: doc.insertedId
				});
			});
	}
});

module.exports = router;
