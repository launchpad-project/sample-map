function reloadVenues(circle) {

	Launchpad
		.url('http://liferay.io/map/germany/places')
		.get(Query
			.filter(Filter.distance('location', [circle.center.lng(), circle.center.lat()], parseInt(circle.radius, 10) + 'm'))
			.limit(100))
		.then(function(clientResponse) {
			clearPlot();

			var queryResult = clientResponse.body();

			queryResult.forEach(function(doc) {
				plot(circle, doc.name, doc.location);
			});

			document.getElementById('json-canvas').innerHTML = JSON.stringify(queryResult, null, 2);
		});

}
