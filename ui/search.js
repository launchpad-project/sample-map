function reloadVenues(circle, map) {
	var lat = circle.center.lat();
	var lng = circle.center.lng();
	var radius = parseInt(circle.radius, 10);
	var queryStr = document.getElementById('query').value;

	WeDeploy
		.data('https://db-geodemo.wedeploy.io')
		.prefix('name', queryStr)
		.limit(100)
		.aggregate('score')
		.distance('location', lat + ', ' + lng, radius + 'm')
		.highlight('name')
		.search('places')
		.then(function(results) {
			plotResults(results, map);
			console.log(results);
		})
}

// Private helpers -------------------------------------------------------------

function plotResults(queryResult) {
	clearPlot();

  if (queryResult.documents) {
    var resultList = '';

    document.getElementById('result-canvas').style.display = "inline";

    var resultTime = queryResult.documents.length + ' results found in ' + queryResult.queryTime + 'ms.';
    document.getElementById('result-time').innerHTML = resultTime;

		queryResult.documents.forEach(function(place) {
			var categoryString = place.categories.toString().replace(/,/g, ', ');
      var placeId = place.id;

			resultList +=
        '<div class="list-result-container" data-name="' + place.name + '" data-categories="' + categoryString + '" data-location="' + place.location + '">' +
				'<p class="name">' + queryResult.highlights[placeId].name[0] + '</p>' +
				'<p class="address">' + place.address + '<br>'
				+ place.city + ', ' + place.state + ' ' + place.postal_code + '</p>' +
				'</div>';

			document.getElementById('results').innerHTML = resultList;
      plotMarkers(circle, place.name, place.location, place.id, categoryString);
      createInfoWindow();
		});

	} else {
    document.getElementById('result-canvas').style.display = "none";
		document.getElementById('results').innerHTML = '';
    document.getElementById('result-time').innerHTML = '';
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
