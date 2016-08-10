var input = "";
var url = "";
$(document).ready(function() {
  function getInput() { // Get Input and passed into url and get data with ajax
    input = $(".myInput").val();
    url = "http://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=" + input + "&callback=?";
    $.ajax({
      type: "GET",
      url: url,
      async: false,
      dataType: "json",
      success: function(data) {
        var body = $("body");
        for (var i = 0; i < data[1].length && i < data[2].length && i < data[3].length; i++) { // Populate the search results from the json arrays
          body.append("<div class='content'><a class='dataLink' target='_blank' href='" + data[3][i] + "'><p class='dataName'>" + data[1][i] + "</p>" + "<p class='dataDesc'>" + data[2][i] + "</p></a></div>");
        }
      },
      error: function(errorMessage) {
        alert("An Error has Occurred!");
      }
    });
    return input;
  }
  function getNewInput() {
    $(".content").remove(); //remove the current search results
    getInput(); //get new search results 
  }
  $(".myInput").keydown(function(e) { //Use Keyboard Enter Button to Input
    if (e.keyCode == 13) {
      var newInput = $(".myInput").val();
      var currentInput = input.toLowerCase();
      if (newInput !== "") {
        if (newInput.toLowerCase() !== currentInput) { // check if current input and new input are identical in order to prevent repeated API call
          $(".content").length ? getNewInput() : getInput(); // if .content exists then call the first method, if not call second method
        }
      } else {
        alert("Rookie Mistake: The search text-field is empty.");
      }
    }
  });
  $("#enterBtn").click(function() { //Use Click Enter Button to Input
    var newInput = $(".myInput").val();
    var currentInput = input.toLowerCase();
    if (newInput !== "") {
        if (newInput.toLowerCase() !== currentInput) {
          $(".content").length ? getNewInput() : getInput();
        }
      } else {
        alert("Rookie Mistake: The search text-field is empty.");
      }
  });
  $(".clearBtn").click(function() { //Clear search field
    $(".myInput").val("");
  });
  $("#randomBtn").click(function() { // Open a random article
    window.open("https://en.wikipedia.org/wiki/Special:Random");
  });
});