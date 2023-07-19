$(document).ready(function() {
  // --- our code goes here ---

  $("#tweet-text").on('input', function() {
    // console.log(this); //The this keyword is a reference to the button
    // console.log('button has been pressed!!'); 
    const tweetText = $('#tweet-text').val();
    console.log(tweetText.length);

    const lettersRemaining = 140 - tweetText.length;
    if (lettersRemaining > 0) {
      $('.counter').html(lettersRemaining);
    } else {
      $('.counter').html(lettersRemaining).css('color', 'red');
    }



  });




});