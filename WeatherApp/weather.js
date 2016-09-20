$('document').ready(function(){
	var latitude;
	var longitude;
	var apiUrl = "http://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&APPID=88d7747abc290c8a803e9c34ae064b02&units=metric";
	$.getJSON("http://ip-api.com/json",function(data2)
	latitude = data2.lat;
	longitude = data2.lon;

});
		$.getJSON(apiUrl, function(data){
			var weatherCondition = data.weather[0].description;
			var kelvinTemp = data.main.temp;
			var switchTemp = true;
			tempF = (kelvinTemp * (9 / 5) - 459.67).toFixed(0);
			tempC = (kelvinTemp - 273).toFixed(0);
			var city = data.name
			var wind = data.wind.speed;
			wind = (2.237 * ( wind )).toFixed(0);



			$("#city").html(city);
			$("#tempF").html(tempF + " &#8457;");
			$("#condition").html(weatherCondition);
			$("#wind").html(wind + " MPH");

			$("tempF").click(function(){
				if(switchTemp === false){
					$("tempF").html(tempF + " &#8457;");
					switchTemp = true;
				}else{
					$("tempF").html(tempC + " &#8451;");
					switchTemp = false;
				}
			});

	});


	});
