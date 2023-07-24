$(document).ready(function () {
  // --- our code goes here ---

  $("#alert").hide();

  $("#tweet-text").on("input", function () {
    const tweetText = $("#tweet-text").val();
    console.log(tweetText.length);

    const lettersRemaining = 140 - tweetText.length;
    if (lettersRemaining + 1 > 0) {
      $(".counter").html(lettersRemaining).css("color", "black");
      $("#alert").empty();
      $("#alert").hide();
    } else {
      $(".counter").html(lettersRemaining).css("color", "red");
    }
  });
});
