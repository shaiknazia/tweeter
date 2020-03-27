/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// $(() => {

  
  const escape =  function(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  } 

  const renderTweets = tweets => {
    $("#tweets-container").empty();
    for (let tweet of tweets) {
      $("#tweets-container").prepend(createTweetElement(tweet));
    }
  }

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
      <span class = "icons">&#127988 &#128257 &#128153</span>
    </div>
  </article>`
  }

  const tweetError = function() {
    const newTweet = $("#tweet-text").val();
    $("#more-chars", "#none").removeClass("tweet-validity")
    if (newTweet.length > 140) {
      $("#more-chars").addClass("tweet-validity");
      return false;
    } else if (newTweet.length === 0 || $(newTweet === null)) {
      $("#none").addClass("tweet-validity")
      return false;
    } else {
      return true;
    }
  }

  const tweetError = () => {
    const length = $("#tweet-text").val().length;
    $("#none, #more-chars").removeClass("tweet-validity").slideUp()
    if (length > 140) {
      $("#max")
        .addClass("tweet-validity")
        .slideDown();
      return false;

    } else if (length === 0) {
      $("#empty")
        .addClass("tweet-validity")
        .slideDown();
      return false
    }
    else return true
  }
  const $form = $('#form');


  $form.submit(function(event) {
      event.preventDefault();
      if (tweetError()) {
        $.ajax({
          url: '/tweets/',
          type: "POST",
          data: $(this).serialize(),
          success: () => {
            $form[0].reset();
            loadTweets();
        }
      })
    }
  })

  const loadTweets = {
    function(){
    $.ajax({
      url: '/tweets/',
      type: "GET",
      data: "JSON",
      success: (res) => {
      renderTweets(res)
    }
    })
    }
  }

  $(document).ready(function() {
    $(".new-tweet").hide();
    loadTweets();
  });







