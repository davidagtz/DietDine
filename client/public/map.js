document.globals.geocode = addr => {
	return fetch(
		"https://maps.googleapis.com/maps/api/geocode/json?address=" +
			addr +
			"&key=AIzaSyDSPBhWlOC5mJVR7F7ZSjglEaVV1vJtdQ0"
	).then(res => res.json());
};

const kv = {
	Vegetarian: "isVeg",
	Vegan: "isVegan",
	"Lactose Free": "isLF",
	"Gluten Free": "isGF"
};

document.globals.placeFood = cb => {
	let params = "";
	if (!document.globals.params) return;
	for (let i in document.globals.params)
		params +=
			kv[document.globals.params[i]] +
			"=true" +
			(i == document.globals.params.length - 1 ? "" : "&");
	return fetch("/find?" + params)
		.then(res => res.json())
		.then(res => {
			for (let restaurants of res) {
				const loc = restaurants.location;
				document.globals.menus[restaurants.restaurant] =
					restaurants.options;
				document.globals.geocode(loc).then(gres => {
					const loc = gres.results[0].geometry.location;
					const latLng = new google.maps.LatLng(
						loc.lat,
						loc.lng
					);
					var marker = new google.maps.Marker({
						position: latLng,
						map: map,
						title: restaurants.restaurant
					});
					marker.setLabel(restaurants.restaurant[0]);
				});
			}
		})
		.then(cb);
};

document.globals.mapGoTo = (addr, cb) => {
	return document.globals
		.geocode(addr)
		.then(res => {
			const loc = res.results[0].geometry.location;
			const latLng = new google.maps.LatLng(loc.lat, loc.lng);
			document.map.panTo(latLng);
			document.map.setZoom(13);
			return document.globals.placeFood();
		})
		.then(cb)
		.catch(console.error);
};

function loadScript(url) {
	var script = document.createElement("script");
	script.type = "text/javascript";
	script.src = url;
	document.getElementsByTagName("head")[0].appendChild(script);
}
var map;
function myMap() {
	var mapProp = {
		center: new google.maps.LatLng(32, -100),
		zoom: 6,
		disableDefaultUI: false,
		gestureHandling: "greedy"
	};
	let el = document.getElementById("googleMap");
	if (el) {
		map = new google.maps.Map(el, mapProp);
		document.map = map;
		document.google = google;
	}

	const urlParams = new URLSearchParams(window.location.search);
	const location = urlParams.get("location");
	if (location) {
		document.globals.mapGoTo(location);
	}
}
document.addEventListener("DOMContentLoaded", function() {
	const arr = document.getElementsByTagName("input");
	for (const inp of arr) {
		if (inp.placeholder == "Search Data") {
			inp.placeholder = "Search your diet...";
		}
	}

	const el = document.getElementsByClassName("multiSelect")[0];
	let fe = el.children[0];
	el.children[0].remove();
	el.append(fe);

	const urlParams = new URLSearchParams(window.location.search);
	const list = document.getElementsByClassName("list-result")[0].children;
	for (const label of list) {
		const inp = label.getElementsByTagName("input")[0];
		if (urlParams.get(inp.value)) inp.click();
	}

	loadScript(
		"https://maps.googleapis.com/maps/api/js?key=AIzaSyDSPBhWlOC5mJVR7F7ZSjglEaVV1vJtdQ0&callback=myMap"
	);
});
