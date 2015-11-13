var circle;
var markers = [];
var infoWindows = [];

function clearPlot() {
	markers.forEach(function(marker) {
		marker.setMap(null);
	});
	infoWindows.forEach(function(infoWindow) {
		infoWindow.close();
	});
	markers = [];
	infoWindows = [];
}

function plot(circle, name, geo_location, showWindow) {
	var latlng = geo_location.split(',');
	var lat = parseFloat(latlng[0]);
	var lng = parseFloat(latlng[1]);

	var marker = new google.maps.Marker({
		position: new google.maps.LatLng(lat, lng),
		map: circle.map,
		title: name
	});

	var infoWindow = new google.maps.InfoWindow({
		content: marker.title
	});

	google.maps.event.addListener(marker, 'click', function() {
		infoWindow.open(marker.map, marker);
	});

	markers.push(marker);
	infoWindows.push(infoWindow);

	if (showWindow) {
		infoWindow.open(marker.map, marker);
	}
}

function debounce(fn, delay) {
	var id;
	return function() {
		var args = arguments;
		clearTimeout(id);
		id = setTimeout(function() {
			fn.apply(this, args);
		}, delay);
	};
}

google.maps.event.addDomListener(window, 'load', function() {
	var center = {
		lat: 40.77027183102676,
		lng: -73.80739688873291
	};

	var map = new google.maps.Map(document.getElementById('map-canvas'), {
		center: center,
		zoom: 14
	});

	circle = new google.maps.Circle({
		fillColor: '#FF0000',
		fillOpacity: 0.35,
		map: map,
		strokeColor: '#FF0000',
		strokeOpacity: 0.8,
		strokeWeight: 2,
		center: center,
		draggable: true,
		editable: true,
		radius: 2000
	});

	var reloadVenuesDebounced = debounce(reloadVenues.bind(null, circle), 100);
	google.maps.event.addListener(circle, 'radius_changed', reloadVenuesDebounced);
	google.maps.event.addListener(circle, 'center_changed', reloadVenuesDebounced);
	reloadVenues(circle);
});
