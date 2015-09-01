function reloadVenues(circle, type) {
	var query = document.getElementById('search-form').elements.query.value;

	var search = {};

	search.preFilter = {
		location: {
			operator: 'gd',
			value: {
				location: [circle.center.lng(), circle.center.lat()],
				max: parseInt(circle.radius, 10) + 'm'
			}
		}
	};

	if (query.length > 0) {
		search.query = {
			name: {
				operator: type,
				value: query
			}
		};
	}

	search.highlight = { name: {} };

	Launchpad
		.url('http://localhost:8080/sample-map/venues')
		.param('search', JSON.stringify(search))
		.param('limit', 1000)
		.get()
		.then(function(clientResponse) {
			clearPlot();

			var queryResult = clientResponse.body();
			if (queryResult.documents) {
				queryResult.documents.forEach(function(doc) {
					var docMetadata = queryResult.metadata[doc.id];
					if (docMetadata && docMetadata.highlights && docMetadata.highlights['name']) {
						plot(circle, docMetadata.highlights['name'][0], doc.location, true);
					}
					else {
						plot(circle, doc.name, doc.location);
					}
				});
			}
			delete queryResult.metadata;

			document.getElementById('json-canvas').innerHTML = JSON.stringify(queryResult, null, 2);
		});

}

function initialize() {
	document.getElementById('search-form').onkeydown = function(e) {
		if (e.keyCode != 13 && circle) {
			reloadVenues(circle, 'pre');
		}
	};

	document.getElementById('search-form').onsubmit = function(e) {
		e.preventDefault();
		if (circle) {
			reloadVenues(circle, 'match');
		}
		return false;
	};
}

window.onload = initialize;