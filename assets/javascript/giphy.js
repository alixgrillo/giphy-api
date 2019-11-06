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

        // declare variable for the API url
        var queryURL = "https://api.giphy.com/v1/gifs/search?";

        // declare variable for api key
        var apiKey = "api_key=vo4Gg8GsJD8WqzEg7o18BpxDgzmio0V5";

        // declare variable that will hold the animal of the button pushed
        var animal = $(this).attr("animal");

        // start the ajax call to the api - requires a url and method (GET)
        $.ajax({
            url: queryURL + apiKey + "&&limit=10&&q=" + animal,
            method: "GET"
        // waits until the api returns to run the function
        }).then(function(response){
            // declare a variable to hold the response data
            var results = response.data;
            // for each returned GIF (should be 10), run the following steps
            $.each(results, function(i, gif){
                // declare variable for an img div
                var imgDiv = $("<div>");
                // add class
                imgDiv.addClass("gif-div");
                // set the width of the div to the same width of the image returned
                imgDiv.css("width", results[i].images.fixed_height.width);
                // append the value of the rating
                imgDiv.append("<p>Rating: " + results[i].rating);
                // declare variable for image element
                var img = $("<img>");
                // add an attr of src, which will be the image displayed to the still version
                img.attr("src", results[i].images.fixed_height_still.url);
                // add an alt attribute with the title of the gif 
                img.attr("alt", results[i].title);

                // the following attributes will allow the image to toggle between the 
                // still and animated urls

                // add an attribute holding the url of the still image
                img.attr("img-still", results[i].images.fixed_height_still.url);
                // add an attribute holding the url of the animated image
                img.attr("img-animate", results[i].images.fixed_height.url);
                // add an attribute of state that ties the state to still or animated
                img.attr("state", "still");
                // add a class to the image
                img.addClass("gif-img");
                // prepend the image to the imgdiv
                imgDiv.prepend(img);
                // append the image div to the gif dif
                $("#gifDiv").append(imgDiv);  
            })
        })
    }
}

// run animate gifs when any gif-img is clicked
$(document).on("click", ".gif-img", animateGifs)

function animateGifs(){
    // declare variable that returns the state of the clicked image
    var state = $(this).attr("state");
    // if the state is still, change the src to the animated url and the state of the image to animate
    if(state==="still"){
        $(this).attr("src",$(this).attr("img-animate"));
        $(this).attr("state","animate");
    // else (if state is animate), change the src to the still url and the state of the image to still
    } else {
        $(this).attr("src",$(this).attr("img-still"));
        $(this).attr("state","still");
    }
}

// if the close button is clicked, run this function
$(document).on("click", ".close", function(){
    // return the parent element - this is the animal button
    var par = $(event.target).parent();
    // disable the parent button - this keeps the gifs from displaying when user is trying to 
    // remove the button
    par.attr("disabled", true);
    // declare a variable of the animal of the clicked button
    var rem = $(this).attr("animal");
    // remove the element from the animals array
    animals.splice(animals.indexOf(rem),1);
    // render the buttons again - the removed button will not be there anymore
    createButtons();
})

