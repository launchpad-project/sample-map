var request;

function reloadVenues(circle) {
	var lat = circle.center.lat();
	var lng = circle.center.lng();
	var radius = parseInt(circle.radius, 10);
	var queryStr = document.getElementById('query').value;

	if (request) {
		request.cancel();
	}

	request = Launchpad
		.url('http://liferay.io/map/germany/places')
		.search(Filter.distance('location', [ lng, lat ], radius + 'm'))
		.search(queryStr ? Filter.prefix('name', queryStr) : '*')
		.highlight('name')
		.limit(100)
		.get()
		.then(plotResults);
}





// Private helpers -------------------------------------------------------------

function plotResults(response) {
	clearPlot();
	var queryResult = response.body();
	var showWindow = document.getElementById('query').value;
	if (queryResult.documents) {
		queryResult.documents.forEach(function(doc) {
			plot(circle, doc.name, doc.location, showWindow);
		});
	}
	delete queryResult.scores;
	document.getElementById('json-canvas').innerHTML = JSON.stringify(queryResult, null, 2);
}

function initialize() {
	document.getElementById('query').oninput = function(e) {
		if (circle) {
			reloadVenues(circle);
		}
	};
}

window.onload = initialize;