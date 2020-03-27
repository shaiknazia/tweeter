$(document).ready(function() {
  $(".new-tweet textarea").on("keyup", function(event) {
    let count = $(this).val().length;
    let remain = 140 - count;
    $(this).siblings(".output").text(remain);
    console.log(count);
    let counter = $(this).closest(".new-tweet").find(".counter");
    counter.text(remain);
    if (remain < 0) {
      counter.css("color", "red");
    } else {
      counter.css("color", "inherit");
    }
  });
});
