$('document').ready(function(){
var city;
$.getJSON("http://api.wunderground.com/api/836b08a8370c1267/geolookup/q/autoip.json", function(data){
 city = data.location[5];
 console.log(city);
});
});
