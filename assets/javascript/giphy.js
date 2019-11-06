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
        // setup an attr of disabled to false (meaning it is in enabled) 
        a.attr("disabled", false);

        // create a button that will hold the x to remove the word
        var x = $("<button>");
        // add a class to pull in the bootstrap close
        x.addClass("close");
        // add an x to the element as text
        x.append("&times;");
        // give the x an attribute with animal - this will delete the proper button when clicked
        x.attr("animal", animals[i]);
        // append the x button to the animal button
        a.append(x);

        // Adding the button to the HTML
        $("#buttonsDiv").append(a);
    }
}

// create buttons upon loading the page
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
        // alerts the user that there is not text to add a button
        alert("Please enter a search term to add a button.");
    } else{
        // add animal to the array
        animals.push(animal);

        // calling renderButtons which handles the processing of our animals array
        createButtons();
    }
    // clear the value of the input field
    $("#animal-input").val("");
});

// on the click of any animal button, run populate gifs
$(document).on("click", ".animal-button", populateGifs)

function populateGifs(){
    // only run this function if the button is enabled (not disabled)
    if(!$(this).attr("disabled")){
        // clears the gif div
        $("#gifDiv").empty();
        // makes the gif div visible (if hidden) - it will be hidden on the page load
        // due to the background-color; it was showing a thin white line
        $("#gifDiv").css("visibility", "visible");

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

$(document).on("click", ".close", function(){
    var par = $(event.target).parent();
    par.attr("disabled", true);
    var rem = $(this).attr("animal");
    animals.splice(animals.indexOf(rem),1);
    createButtons();
})

