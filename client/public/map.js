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
}
document.addEventListener('DOMContentLoaded', function () {
	loadScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyDSPBhWlOC5mJVR7F7ZSjglEaVV1vJtdQ0&callback=myMap');
});
