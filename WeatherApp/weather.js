var weather_result = '';

$(document).ready(function(){
  /* Using GeoPlugin to find where our end user is located
     Use this link for future reference: http://www.geoplugin.com/ */
     $getScript("http://www.geoplugin.net/javascript.gp");
  var city =  geoplugin_city();
  var state =  geoplugin_regionName();
  var country =  geoplugin_countryCode();

  var api = "http://api.openweathermap.org/data/2.5/weather?"; // the beginning part of the url we are accessing --> Later joins with var URL.
  var unit = "metric";                         // units are sent to in metric system formats
  var id = "88d7747abc290c8a803e9c34ae064b02"; // This ID comes from OpenWeatherMap. It's unique and needed to access weather data.
  var URL = api + "q=" + city + "," + state + "," + country + "&units=" + unit + "&appid=" + id;

  $("#city").html(city + ", " + state ); // put the city and state in respective location as text.

  $.ajax({
    url: URL,
    dataType: "jsonp",
    data: {
     mode: "json"
    },
    success: function( data ) {
      displayWeather(data);
      loadIcon(data.weather[0].main); // to load the icon, we need a proper description, so that if it's raining, a rain icon appears
      weather_result = data;
    }
  });

  displayWeather = function (data) {
    $("#temp").html(Math.round(data.main.temp * 9 / 5 + 32)); //the JSON call will give us the temp in Kelvin...This formula fixes that.
    $("#unit").html('F');
    $("#description").html(data.weather[0].main); // Clouds, Clear, Snow Etc.
    $("#wind").html(data.wind.speed + " mph"); // wind speed
  }

  loadIcon = function (des) {
    des = des.toLowerCase();

// case statement will change icon and background according to the actual weather

    switch (des) {
      case 'drizzle':
        $("#weatherIcon").attr("src","http://image.flaticon.com/icons/svg/136/136733.svg");
 	$(body).css("background-image", "url(https://static.pexels.com/photos/110874/pexels-photo-110874.jpeg)");
        break;
      case 'rain':
        $("#weatherIcon").attr("src","http://image.flaticon.com/icons/svg/136/136733.svg");
	$("body").css("background", "url(https://static.pexels.com/photos/110874/pexels-photo-110874.jpeg)");
        break;
      case 'clouds':
        $("#weatherIcon").attr("src","http://image.flaticon.com/icons/svg/136/136701.svg");
 	$("body").css("background", "url(https://coclouds.com/wp-content/uploads/2014/11/afternoon-various-clouds-2014-07-11.jpg)");
        break;
      case 'snow':
        $("#weatherIcon").attr("src","http://image.flaticon.com/icons/svg/136/136755.svg");
 	$("body").css("background", "url(https://static.pexels.com/photos/4022/cold-snow-forest-trees.jpeg)");
        break;
      case 'clear':
        $("#weatherIcon").attr("src","http://image.flaticon.com/icons/svg/136/136723.svg");
 	$("body").css("background", "url(http://onceuponatimeblog.weebly.com/uploads/5/8/3/1/5831762/474426177_orig.jpg)");
        break;
      case 'thunderstorm':
        $("#weatherIcon").attr("src","http://image.flaticon.com/icons/svg/136/136729.svg");
 	$("body").css("background", "url(https://upload.wikimedia.org/wikipedia/commons/2/28/Thunderstorm_in_Annemasse,_France.jpg)");
        break;
      case 'mist':
      	$("#weatherIcon").attr("src","http://image.flaticon.com/icons/svg/213/213992.svg");
      	 $("body").css("background", "url(http://www.zocalopublicsquare.org/wp-content/uploads/2010/05/mist.jpg)");
      	 $("body").css("background-repeat", "no-repeat");
      	break;
      default:
        $("#weatherIcon").attr("src","http://image.flaticon.com/icons/svg/136/136723.svg");
        break;
    }
  }
});

convertTemp = function (){
  var current_unit = document.getElementById("unit").text;
  var current_temp = Math.round(weather_result.main.temp);
    if (current_unit == 'F') {
      $('#temp').text(current_temp);
      $("#unit").text('C');
    }
    else if (current_unit == 'C') {
      var current_fah = Math.round(current_temp * 9 / 5 + 32);
      $("#temp").text(current_fah);
      $("#unit").text('F');
    }
}
