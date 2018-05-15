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

var offset = 0;
function showGif(el, eloff) {//get gif related to button clicked

    var gif = el;
    var queryURL;
    if (shownext10) {//if same button clicked then show more gifs
        console.log(shownext10);
        offset += 10;
        queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gif + "&limit=10&api_key=b9iYVAwBVidnNVDrHuHcJZehZKWVNYSs&offset=" + offset;
    }
    else {
        offset = 0;
        queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gif + "&limit=10&api_key=b9iYVAwBVidnNVDrHuHcJZehZKWVNYSs&offset=" + offset;
    }


    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        var tempArray = response.data;
        //console.log(Object.keys(tempArray));
        var length = tempArray.length;
        console.log(length);

        for (var i = 0; i < length; i++) {
            console.log(tempArray[i].rating);
            var outterCard = $('<div class="card outterCard">');
            var ratingCard = $("<div class='card-body'>").append($("<p class='card-text'>Rating: " + tempArray[i].rating+"</p>")).append($("<p class='card-text'>Title: " + tempArray[i].title+"</p>"));
         
            
            outterCard.append(ratingCard);

            var card = $('<div class="card mainCard" data-gifLink="' + tempArray[i].images['fixed_height'].url + '" data-imgLink="' + tempArray[i].images['fixed_height_still'].url + '">').append($("<img class='card-img-top imgCard pause'" + "src='" + tempArray[i].images['480w_still'].url + "'alt='card image cap'>"));

            outterCard.append(card);
            $('.leftSection').append(outterCard);
        }


    });
}

$(document).on("click", ".mainCard", function (event) {//play and pause gifs
    event.preventDefault();

    var gif = $(this).attr("data-gifLink");
    var still = $(this).attr("data-imgLink");

    var thisImg = $(this).children('.imgCard');

    if (thisImg.hasClass('pause')) {
        $(this).children('.imgCard').attr("src", gif).removeClass('pause').addClass('play');
        console.log(gif);
    }
    else if (thisImg.hasClass('play')) {
        $(this).children('.imgCard').attr("src", still).removeClass('play').addClass('pause');
        console.log(still);
    }

});


var previousTarget = null;
var shownext10;
$(document).on("click", ".gifBtn", function (event) {
    event.preventDefault();
    var currentgif = $(this).attr("data-name");
    if (currentgif === previousTarget) {
        shownext10 = true;
        showGif(previousTarget);

    }
    else {
        $('.leftSection').empty();
        $('.nextBtn').remove();
        shownext10 = false;
        showGif(currentgif);

    }
    previousTarget = currentgif;
    return false;
});

