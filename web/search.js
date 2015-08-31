function reloadVenues(circle) {

	Launchpad
		.url('http://localhost:8080/sample-map/venues')
		.param('search', JSON.stringify({
			query: {
				location: {
					operator: 'gd',
					value: {
						location: [circle.center.lng(), circle.center.lat()],
						max: parseInt(circle.radius, 10) + 'm'
					}
				}
			}
		}))
		.param('limit', 1000)
		.get()
		.then(function(clientResponse) {
			clearPlot();

			var queryResult = clientResponse.body();
			if (queryResult.documents) {
				queryResult.documents.forEach(function(doc) {
					plot(circle, doc.name, doc.location);
				});
			}
			delete queryResult.metadata;

			document.getElementById('json-canvas').innerHTML = JSON.stringify(queryResult, null, 2);
		});

}