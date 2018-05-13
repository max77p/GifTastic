var topics = ["panda", "dog", "cat", "bear", "elephant"];//animals who do funny things

// Function for displaying movie data
function renderButtons() {

    for (elements in topics) {
        var gifButton = $("<button>");
        gifButton.addClass("movie");
        gifButton.attr("data-name", topics[elements]);
        gifButton.text(topics[elements]);
        gifButton.appendTo("#btnSection");
    }
}

// This function handles events where one button is clicked
$("#add-gif").on("click", function (event) {

    $('#btnSection').empty();
    event.preventDefault();

    var gifInput = $("#gif-input").val().trim();
    topics.push(gifInput);

    renderButtons();

});



// Calling the renderButtons function to display the initial list of topics array
renderButtons();


function showGif() {

    var gif = $(this).attr("data-name");

    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + gif + "&limit=10&api_key=b9iYVAwBVidnNVDrHuHcJZehZKWVNYSs";


    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        var tempArray=response.data;
        console.log(Object.keys(tempArray));
        var length=tempArray.length;
        console.log(length);

        for(var i=0;i<length;i++){
            var card=$("<div class='card mainCard'>").append($("<img class='card-img-top imgCard'"+ "src='"+tempArray[i].images['480w_still'].url+"'alt='card image cap'>"));
            var innerCard=$("<div class='card-body'>").append($("<p class='card-text'>"));
            card.append(innerCard);
            $('.leftSection').append(card); 
        }

    });
}//get gif related to button clicked

/*<div class="card" style="width: 18rem;">
  <img class="card-img-top" src="..." alt="Card image cap">
  <div class="card-body">
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
  </div>
</div>*/


$(document).on("click", ".movie", showGif);