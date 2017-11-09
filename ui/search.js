var request;

function reloadVenues(circle) {
	var lat = circle.center.lat();
	var lng = circle.center.lng();
	var radius = parseInt(circle.radius, 10);
	var queryStr = document.getElementById('query').value;

	// if (request) {
	// 	request.cancel();
	// }

	request = WeDeploy
		.data('https://db-geodemo.wedeploy.io')
		.match('name', queryStr + '~')
		.distance('location', [ lat, lng ], radius + 'm')
		.highlight('name')
		.search('places')
		.then(function(results) {
			plotResults(results);
			console.log(results);
		});
}

// Private helpers -------------------------------------------------------------

function plotResults(response) {
	clearPlot();
	var queryResult = response;
	var showWindow = document.getElementById('query').value;
	if (queryResult.documents) {
		queryResult.documents.forEach(function(place) {
			plot(circle, place.name, place.location, showWindow);
		});
	}
	delete queryResult.scores;
	if (queryResult.documents) {
		document.getElementById('json-canvas').innerHTML = JSON.stringify(queryResult.documents, null, 2);
	}
}

function initialize() {
	document.getElementById('query').oninput = function(e) {
		if (circle) {
			reloadVenues(circle);
		}
	};
}

window.onload = initialize;