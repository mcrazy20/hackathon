
var http = require('http');
var url = require('url');

var twitter = require('ntwitter');

var geocoderProvider = 'openstreetmap';
var httpAdapter = 'http';





//Various keys to access the twitter API
var twit = new twitter({
  consumer_key: 'wqERQjyGsZNzWZdbd9P6w',
  consumer_secret: 'l96ZBvNhjtbHx8j7npVBZNu5zzOwGPB386wdHtdxr0',
  access_token_key: '1924673076-cgs9Y6VPcNMs09fjjLFoDWd1BS2LqU1DBFiAML8',
  access_token_secret: 'KdQXA1r3gVpqNnfy5uiHTNGGrf9sz5IeHXlNMwPVgCAsc'
});

//Used for Geocoder
var extra = {
	apiKey: 'AIzaSyCrOEigI-IexXXjOM7SAGKH2u8I9CAB05s'
};

//Allows us to get the Lat/Long of a location
var geocoder = require('node-geocoder').getGeocoder(geocoderProvider, httpAdapter, extra);

var ig = require('instagram-node').instagram();

//Keys for instagram API
ig.use({ client_id: 'fbc6b586a2f24eeb8876360c872a8f65',
         client_secret: '2f4ba206c6b34c41a8676333324a1237' });

	var cityName = document.getElementById("locationName").value;
	var twitterPosts = document.getElementById("twitterPosts");
	var instagramPosts = document.getElementById("instagramPosts");
	//Call to the geocoder to get latitude and longitude
	geocoder.geocode(cityName, function(err, res){
		if (err)
			console.log(err);

		//Giving a range to search for Twitter. Unfortunately the Twitter api doesn't allow you to use a radius when searching for geotagged tweets
		var location = (res[0]['longitude'] - .2) + ',' + (res[0]['latitude'] - .2) + ',' + (parseFloat(res[0]['longitude'])
		 + parseFloat(.2)) + ',' + (parseFloat(res[0]['latitude']) + parseFloat(.2));

		//Searching for instagram pictures
		var loc = {};
		loc.lat = parseFloat(res[0]['latitude']);
		loc.lng = parseFloat(res[0]['longitude']);

		//This function uses Latitude, Longitude, and a Distance and returns a list of pictures
		ig.media_search(loc.lat, loc.lng, 3500, function(err, medias, limit){
			if (err)
				console.log(err);
			console.log(medias);
		});
		//This is the twitter stream.
		twit.stream('statuses/filter', {'locations': location}, function(stream) {
	  		stream.on('data', function (data) {
	    		//console.log(data);
	    		window.alert(data);
	    		});

	  		});
	  		stream.on('error', function(response){
	  			console.log(response);
	  		});
	  		stream.on('destroy', function(response){
	  			console.log(response);
	  		});
		setTimeout(stream.destroy, 50000);
	});

});.listen(8080);


