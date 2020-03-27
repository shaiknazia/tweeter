$(document).ready(function() {


  const escape =  function(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const renderTweets = function(tweets) {
    $("#tweets-container").empty();
    for (let tweet of tweets) {
      $("#tweets-container").prepend(createTweetElement(tweet));
    }
  };

  //form Post request
  $("#form").submit(function(event) {
    event.preventDefault();
    if (tweetError()) {
      $.ajax({
        url: '/tweets/',
        type: "POST",
        data: $(this).serialize(),
        success: () => {
          $("#form")[0].reset();
          loadTweets();
        }
      });
    }
  });
  
  // loading tweets with Get method
  const loadTweets = function() {
    $.ajax({
      url: "/tweets",
      method: "GET",
      datatype: "json",
      success: (response => {
        renderTweets(response);
      })
    });
  };
  loadTweets();

  // New Tweets are created using html (article)
  const createTweetElement = function(tweet) {
    const fullDate = new Date(tweet.created_at);
    const date = (fullDate.getUTCMonth() + 1) + "/" + fullDate.getUTCMonth() + "/" + fullDate.getFullYear();
    return `<article class= "tweet">
    <div class="tweet-feed">
      <div class="header1 header">
        <img class="h1 avatars" src = ${tweet.user.avatars}>
        <h3 class="h1 name">${tweet.user.name}</h3>
      </div>
      <h3 class="header handle">${tweet.user.handle}</h3>
    </div>
    <p class="feed">${tweet.content.text}</p> <hr>
    <div class="footer">
      <span class="date">Created on: ${date}</span>
      <span class = "icons">&#128681; &#128257 &#128147</span>
    </div>
  </article>`;
  };

  //function to check if tweet is valid
  const tweetError = function() {
    const newTweet = $("#tweet-text").val();
    $("#more-chars", "#none").removeClass("tweet-validity");
    if (newTweet.length > 140) {
      $("#more-chars")
        .addClass("tweet-validity")
        .slideDown();
      return false;
    } else if (newTweet.length === 0) {
      $("#none")
        .addClass("tweet-validity")
        .slideDown();
      return false;
    } else {
      return true;
    }
  };
});