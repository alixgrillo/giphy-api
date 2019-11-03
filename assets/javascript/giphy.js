// initial list of buttons to display on page
var animals = ["dog", "cat", "bird", "octopus", "donkey", "moose", "rabbit", "hummingbird"];

// Function for displaying animal buttons
function createButtons() {

    // Clears the buttons that are on page, to repopulate them
    // (this is necessary otherwise we will have repeat buttons)
    $("#buttonsDiv").empty();

    // Looping through the array of animals
    for (var i = 0; i < animals.length; i++) {

        // Then dynamicaly generating buttons for each animal in the array
        var a = $("<button>");
        // Adding a class to tie to animal button
        a.addClass("animal-button btn btn-dark m-2");
        // Adding a data-attribute with a value of the animal name at index i
        // this will be used for the giphy query
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
    if(animal===""){
        alert("Please enter a search term to add a button.");
    } else{
        animals.push(animal);

        // calling renderButtons which handles the processing of our movie array
        createButtons();
    }
});

$(document).on("click", ".animal-button", populateGifs)

function populateGifs(){
    $("#gifDiv").empty();

    var queryURL = "https://api.giphy.com/v1/gifs/search?";

    var apiKey = "api_key=vo4Gg8GsJD8WqzEg7o18BpxDgzmio0V5";

    var animal = $(this).attr("animal");

    $.ajax({
        url: queryURL + apiKey + "&&limit=10&&q=" + animal,
        method: "GET"
    }).then(function(response){
        var results = response.data;
        $.each(results, function(i, gif){
            var imgDiv = $("<div>");
            imgDiv.addClass("gif-div");
            imgDiv.css("width", results[i].images.fixed_height.width);
            imgDiv.append("<p>Rating: " + results[i].rating);
            var img = $("<img>");
            img.attr("src", results[i].images.fixed_height_still.url);
            img.attr("alt", results[i].title);
            img.attr("img-still", results[i].images.fixed_height_still.url);
            img.attr("img-animate", results[i].images.fixed_height.url);
            img.attr("state", "still");
            img.addClass("gif-img");
            imgDiv.prepend(img);
            $("#gifDiv").append(imgDiv);  
        })
    })
}

$(document).on("click", ".gif-img", animateGifs)

function animateGifs(){
    var state = $(this).attr("state");
    if(state==="still"){
        $(this).attr("src",$(this).attr("img-animate"));
        $(this).attr("state","animate");
    } else {
        $(this).attr("src",$(this).attr("img-still"));
        $(this).attr("state","still");
    }
}

