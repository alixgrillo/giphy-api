console.log("hi");

var animals = ["dog", "cat", "bird"];


// Function for displaying animal buttons
function createButtons() {

    // Deleting the movie buttons prior to adding new movie buttons
    // (this is necessary otherwise we will have repeat buttons)
    $("#buttonsDiv").empty();

    // Looping through the array of movies
    for (var i = 0; i < animals.length; i++) {

        // Then dynamicaly generating buttons for each movie in the array.
        // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
        var a = $("<button>");
        // Adding a class
        a.addClass("animal-button");
        // Adding a data-attribute with a value of the movie at index i
        a.attr("animal", animals[i]);
        // Providing the button's text with a value of the movie at index i
        a.text(animals[i]);
        // Adding the button to the HTML
        $("#buttonsDiv").append(a);
    }
}

createButtons();

      // This function handles events where one button is clicked
      $("#add-animal").on("click", function(event) {
        // event.preventDefault() prevents the form from trying to submit itself.
        // We're using a form so that the user can hit enter instead of clicking the button if they want
        event.preventDefault();

        // This line will grab the text from the input box
        var animal = $("#animal-input").val().trim();
        // The movie from the textbox is then added to our array
        animals.push(animal);

        // calling renderButtons which handles the processing of our movie array
        createButtons();
      });

$(".animal-button").on("click", function(){

    var queryURL = "https://api.giphy.com/v1/gifs/search?";
    //var queryURL = "https://api.giphy.com/v1/gifs/random?";
    var apiKey = "api_key=vo4Gg8GsJD8WqzEg7o18BpxDgzmio0V5";

    var q = "";
    var limit = 10;

    $.ajax({
        url: queryURL + apiKey + "&&tag=" + $(this).attr("animal"),
        method: "GET"
    }).then(function(response){
        console.log(response);
    })
})