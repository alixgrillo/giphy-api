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