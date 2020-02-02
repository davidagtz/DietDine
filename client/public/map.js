document.globals.geocode = (addr) => {
	return fetch(
		'https://maps.googleapis.com/maps/api/geocode/json?address=' +
			addr +
			'&key=AIzaSyDSPBhWlOC5mJVR7F7ZSjglEaVV1vJtdQ0'
	).then((res) => res.json());
};

function loadScript (url, callback) {
	var script = document.createElement('script');
	script.type = 'text/javascript';

	// if (script.readyState) {
	// 	//IE
	// 	script.onreadystatechange = function () {
	// 		if (script.readyState == 'loaded' || script.readyState == 'complete') {
	// 			script.onreadystatechange = null;
	// 			callback();
	// 		}
	// 	};
	// } else {
	// 	//Others
	// 	script.onload = function () {
	// 		callback();
	// 	};
	// }

	script.src = url;
	document.getElementsByTagName('head')[0].appendChild(script);
}
var map;
function myMap () {
	var mapProp = {
		center: new google.maps.LatLng(32, -100),
		zoom: 6,
		disableDefaultUI: true
	};
	let el = document.getElementById('googleMap');
	console.log(el);
	if (el) {
		map = new google.maps.Map(el, mapProp);
		document.map = map;
		document.google = google;
	}

	const urlParams = new URLSearchParams(window.location.search);
	const location = urlParams.get('location');
	if (location) {
		document.globals.geocode(location).then((res) => {
			const loc = res.results[0].geometry.location;
			const latLng = new document.google.maps.LatLng(loc.lat, loc.lng);
			document.map.panTo(latLng);
			document.map.setZoom(13);
		});
	}
}
document.addEventListener('DOMContentLoaded', function () {
	const arr = document.getElementsByTagName('input');
	for (const inp of arr) {
		if (inp.placeholder == 'Search Data') {
			inp.placeholder = 'Search your diet...';
		}
	}

	const el = document.getElementsByClassName('multiSelect')[0];
	let fe = el.children[0];
	el.children[0].remove();
	el.append(fe);

	loadScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyDSPBhWlOC5mJVR7F7ZSjglEaVV1vJtdQ0&callback=myMap');
});
