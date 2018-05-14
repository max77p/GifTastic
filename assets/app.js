var topics = ["panda", "dog", "cat", "bear", "elephant"];//animals who do funny things

// Function for rendering buttons
function renderButtons() {

    for (elements in topics) {
        var gifButton = $("<button>");
        gifButton.addClass("gifBtn");
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

var animatetemp;
function showGif() {

    var gif = $(this).attr("data-name");

    var queryURL = "http://api.giphy.com/v1/gifs/search?q=funny+" + gif + "&limit=10&api_key=b9iYVAwBVidnNVDrHuHcJZehZKWVNYSs";


    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        var tempArray = response.data;
        console.log(Object.keys(tempArray));
        var length = tempArray.length;
        console.log(length);

        for (var i = 0; i < length; i++) {
            var outterCard = $('<div class="card outterCard">');
            var textCard = $("<div class='card-body'>").append($("<p class='card-text'>"));
            $('.card-text').text("Rating: " + tempArray[i].rating);
            outterCard.append(textCard);

            var card = $('<div class="card mainCard" data-gifLink="' + tempArray[i].images.original.url + '" data-imgLink="' + tempArray[i].images['480w_still'].url + '">').append($("<img class='card-img-top imgCard pause'" + "src='" + tempArray[i].images['480w_still'].url + "'alt='card image cap'>"));

            outterCard.append(card);
            $('.leftSection').append(outterCard);
        }


    });
}//get gif related to button clicked

$(document).on("click", ".mainCard", function (event) {
    event.preventDefault();

    var gif = $(this).attr("data-gifLink");
    var still = $(this).attr("data-imgLink");

    var thisImg=$(this).children('.imgCard');

    if (thisImg.hasClass('pause')) {
        $(this).children('.imgCard').attr("src", gif).removeClass('pause').addClass('play');
        console.log(gif);
    }
    else if (thisImg.hasClass('play')) {
        $(this).children('.imgCard').attr("src", still).removeClass('play').addClass('pause');
        console.log(still);
    }

});



$(document).on("click", ".gifBtn", showGif);
