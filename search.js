var request;

function reloadVenues(circle) {
	var lat = circle.center.lat();
	var lng = circle.center.lng();
	var radius = parseInt(circle.radius, 10);
	var queryStr = document.getElementById('query').value;

	if (request) {
		request.cancel();
	}

	var query = Query
		.search(Filter.distance('location', [ lng, lat ], radius + 'm'))
		.highlight('name')
		.limit(100);

	if (queryStr) {
		query.search(Filter.prefix('name', queryStr))
	}

	request = Launchpad
		.url('http://liferay.io/map/germany/places')
		.get(query)
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