var request;

function reloadVenues(circle) {
	var lat = circle.center.lat();
	var lng = circle.center.lng();
	var radius = parseInt(circle.radius, 10);
	var query = document.getElementById('query').value;

	if (request) {
		request.cancel();
	}

	var search = {
		highlight: {
			name: {}
		},

		query: [
			{
				name: {
					value: query,
					operator: 'phrasePrefix'
				}
			},
			{
				location: {
					operator: 'gd',
					value: {
						location: [ lng, lat ],
						max: radius + 'm'
					}
				}
			}
		]
	};

	request = Launchpad
		.url('/map/venues')
		.param('search', search)
		.param('limit', 200)
		.get()
		.then(plotResults);
}





// Private helpers -------------------------------------------------------------

function plotResults(response) {
	clearPlot();
	var queryResult = response.body();
	if (queryResult.documents) {
		queryResult.documents.forEach(function(doc) {
			var docMetadata = queryResult.metadata[doc.id];
			if (docMetadata && docMetadata.highlights && docMetadata.highlights['name']) {
				doc.name =  docMetadata.highlights['name'][0];
			}
			plot(circle, doc.name, doc.location);
		});
	}
	delete queryResult.metadata;
	delete queryResult.nextPage;
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