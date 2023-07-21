/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {
  // --- our code goes here ---

  const createTweetElement = function(tweet) {
    function escape(str) {
      const div = document.createElement('div');
      div.textContent = str;
      return div.innerHTML;
    }

    // creates the tweet box
    const $tweet = $(`  <section class="tweet-container">
        <article>
          <header>
              <div class="picAndUsername">
                <i><img src="${escape(tweet.user.avatars)}" alt="Icon"></i>
                <h3>${escape(tweet.user.name)}</h3>
              </div>
              <h3>${escape(tweet.user.handle)}</h3>
          </header>
              <p>${escape(tweet.content.text)}</p>
          <footer>
              <time class="timeago" datetime="2023-07-19T12:34:56">${timeago.format(tweet.created_at)}</time>
              <div><i class="fa-solid fa-flag"></i>
                <i class="fa-solid fa-share"></i>
                <i class="fa-solid fa-heart"></i>
              </div>
          </footer>
                
        </article>
      </section>`);
    return $tweet;
  };


  const renderTweets = function(tweets) {
    // grab the tweets container from the DOM
    const $container = $('#all-tweets');
    $container.empty();

    for (const tweet of tweets) {
      // create a tweet box for each element in the array 
      const $newTweet = createTweetElement(tweet);

      // add our new tweet element to the cntainer
      $container.prepend($newTweet);
    }


  };


  // loads the tweets
  const loadTweets = function() {

    $.ajax({
      method: 'GET',
      url: '/tweets',
      success: (data) => {
       
        renderTweets(data);

      },
      error: function(error) {
        // Handle any errors that occur during the AJAX request
        console.error('Error getting tweet:', error);
      }
    });

  };
  loadTweets();


  
  $('.new-tweet-form').submit(function(event) {
    event.preventDefault(); // Prevent the default form submission
    
    // Get the form data
    const formData = $(this).serialize();
    const tweetText = $('#tweet-text').val().trim();
    if(tweetText === '' || tweetText === null){
      const $meg = $('<h3>Empty input. Please type a message.</h3>');
      $('#alert').empty().append($meg).show();
      return;
    };

    // Check if tweetText.length is greater than 140
    if(tweetText.length > 140){
      return;
    }
    
    // Reset the counter to 140
    $('.counter').html(140).css('color', 'black');
    
    // Perform the AJAX request to submit the data to the server
    $.ajax({
      type: 'POST',
      url: '/tweets',
      data: formData,
      success: function(response) {
        // Handle the successful response if needed
        console.log('Tweet submitted successfully:', response);
        loadTweets();
      },
      error: function(xhr, status, error) {
        // Handle any errors that occur during the AJAX request
        console.error('Error submitting tweet:', error);
      }
    });

    $('#tweet-text').val('')

  });


  


});