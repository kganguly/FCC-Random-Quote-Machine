//var rndColor = "rgb(0, 0, 0)";
var debug = false;
var currentQuote = "";
var currentSource = "";

$(document).ready(function() {
  getQuote();
  $("#newQuote").on("click", getQuote);
  $("#twitter").on("click", tweetQuote);
  $("#source").on("click", searchWikipedia);
});

function setRndColor() {

  function getRndIntensity() {
    return Math.floor(Math.random() * 256);
  }

  var rndColor = "rgb(" + getRndIntensity() + ", " + getRndIntensity() + ", " + getRndIntensity() + ")";
  document.documentElement.style.setProperty('--rnd-color', rndColor);
}

function getQuote() {
  $.ajax({
    url: 'https://andruxnet-random-famous-quotes.p.mashape.com/',
    type: 'POST',
    data: {
      cat: "famous"
    },
    datatype: "json",
    success: function(response) {
      if (debug) console.log("RESP: ", typeof response, " : ", response);
      $("#main").animate({
        opacity: 0
      }, 1000, function() {
        var json = (typeof response === "object") ? response : JSON.parse(response);
        currentQuote = json.quote;
        currentSource = json.author;
        $("#quote").html(currentQuote);
        $("#source").html(currentSource);
        setRndColor();
        $("#main").animate({
          opacity: 1
        }, 2000);
      });
    },
    error: function(err) {
      alert(err);
    },
    beforeSend: function(xhr) {
      xhr.setRequestHeader("X-Mashape-Authorization", "Ou2aUyMFA5mshMtd2KUBzMehnFS5p1XWkIVjsn6G9HfIfxXsAu");
      xhr.setRequestHeader("Accept", "application/json");
    }

  });
}

function tweetQuote() {
  var tweetText = "\"" + currentQuote + "\"" + "  - " + currentSource;
  var tweetTags = "FamousPeopleQuotes";
  var tweetUrl = "https://twitter.com/intent/tweet?text=" + tweetText + "&hashtags=" + tweetTags;
  tweetUrl = encodeURI(tweetUrl);
  var windowSpecs = "width=550, height=420, location=no, menubar=no, resizable=no, scrollbars=no, status=no, titlebar=no, toolbar=no";
  //window.alert(tweetUrl);
  window.open(tweetUrl, "", windowSpecs);
}

function searchWikipedia () {
  var wikiUrl = "https://en.wikipedia.org/wiki/" + currentSource;
  wikiUrl = encodeURI(wikiUrl);
  window.open(wikiUrl);
}