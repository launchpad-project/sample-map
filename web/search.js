function reloadVenues(circle) {

	LaunchpadClient
		.url('http://localhost:8080/search/venue')
		.query('search', JSON.stringify({
			query: {
				geo_location: {
					operator: 'gd',
					value: {
						location: [circle.center.lng(), circle.center.lat()],
						max: parseInt(circle.radius, 10) + 'm'
					}
				}
			}
		}))
		.get()
		.then(function(clientResponse) {
			clearPlot();

			var queryResult = clientResponse.body();
			if (queryResult.documents) {
				queryResult.documents.forEach(function(doc) {
					plot(circle, doc.name, doc.geo_location);
				});
			}
			delete queryResult.metadata;

			document.getElementById('json-canvas').innerHTML = JSON.stringify(queryResult, null, 2);
		});

}