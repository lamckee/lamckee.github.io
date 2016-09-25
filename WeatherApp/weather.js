var weather_result = '';

$(document).ready(function(){

  var city = geoplugin_city();
  var state = geoplugin_regionName();
  var country = geoplugin_countryCode();

  var api = "http://api.openweathermap.org/data/2.5/weather?";
  var unit = "metric";
  var id = "88d7747abc290c8a803e9c34ae064b02";
  var URL = api + "q=" + city + "," + country + "&units=" + unit + "&appid=" + id;

  $("#city").html(city + ", " + state );

  $.ajax({
    url: URL,
    dataType: "jsonp",
    data: {
     mode: "json"
    },
    success: function( data ) {
      displayWeather(data);
      loadIcon(data.weather[0].main);
      weather_result = data;
    }
  });

  displayWeather = function (data) {
    $("#temp").html(Math.round(data.main.temp * 9 / 5 + 32));
    $("#unit").html('F');
    $("#description").html(data.weather[0].main);
    $("#wind").html(data.wind.speed + " mph");
  }

  loadIcon = function (des) {
    des = des.toLowerCase();

    switch (des) {
      case 'drizzle':
        $("#weatherIcon").attr("src","http://image.flaticon.com/icons/svg/136/136733.svg");
 $(body).css("background-image", "url(https://pixabay.com/static/uploads/photo/2015/10/09/22/15/rain-980076_960_720.jpg)");
        break;
      case 'rain':
        $("#weatherIcon").attr("src","http://image.flaticon.com/icons/svg/136/136733.svg");
$("body").css("background", "url(https://pixabay.com/static/uploads/photo/2015/10/09/22/15/rain-980076_960_720.jpg)");
        break;
			case 'clouds':
        $("#weatherIcon").attr("src","http://image.flaticon.com/icons/svg/178/178346.svg");
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
      default:
        $("#weatherIcon").attr("src","http://image.flaticon.com/icons/svg/178/178346.svg");
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
