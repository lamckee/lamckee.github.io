$(document).ready(function () {
  newQuote();
});

//quotes are recieved from forismatic api via the url set as a variable below.

function newQuote(){
	var apiURL = 'http://api.forismatic.com/api/1.0/?method=getQuote&format=jsonp&lang=en&jsonp=?'

//function will receive data from forismatic, trim it, and store into variables

	$.getJSON(apiURL).done(function (data) {
      var quote = data.quoteText.trim(),
       author = '-' + (data.quoteAuthor.trim() || 'Anonymous'),
       tweetText = (quote + ' ' + author),
       twitterURL = 'https://twitter.com/intent/tweet?text=' + tweetText;

       //inputing variable into the HTML
       $('#quote').text(quote);
       $('#author').text(author);
       $('#tweetButton').attr('href', twitterURL);

      //colors of the box will change randomly between 4 colors on every new quote
			var colors = ["#a5dff9","#60c5ba","#ef5285","#feee7d"];
			var rand = Math.floor(Math.random()*colors.length);
 $('#quoteBox').css("background-color", colors[rand]);

      //colors of the background will change randomly between 4 colors on every new quote
			var backgroundColors = ["#a79c8e","#f8ecc9","#D8E6E7","#EFFFE9"];
			var rand2 = Math.floor(Math.random()*backgroundColors.length);
 $('body').css("background-color", backgroundColors[rand]);

    })

}
