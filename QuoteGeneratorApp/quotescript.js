$(document).ready(function () {
  newQuote();
});

function newQuote(){
	var apiURL = 'http://api.forismatic.com/api/1.0/?method=getQuote&format=jsonp&lang=en&jsonp=?'

	$.getJSON(apiURL).done(function (data) {
      var quote = data.quoteText.trim(),
       author = '-' + (data.quoteAuthor.trim() || 'Anonymous'),
       tweetText = (quote + ' ' + author),
       twitterURL = 'https://twitter.com/intent/tweet?text=' + tweetText;

 $('#quote').text(quote);
 $('#author').text(author);
 $('#tweetButton').attr('href', twitterURL);

			var colors = ["#f94e3f","#e77e4d","#e3632d","#6f2108"];
			var rand = Math.floor(Math.random()*colors.length);
 $('#quoteBox').css("background-color", colors[rand]);

			var backgroundColors = ["#a79c8e","#f8ecc9","#f1bbba",""];                
			var rand2 = Math.floor(Math.random()*backgroundColors.length);
 $('body').css("background-color", backgroundColors[rand]);

    })

}
