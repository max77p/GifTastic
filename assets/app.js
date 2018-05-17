var topics = ["panda", "dog", "cat", "bear", "elephant"];//animals who do funny things

//var database = firebase.database();//firebase database

// Function for rendering buttons
function renderButtons() {

    for (elements in topics) {
        var gifButton = $("<button>");
        gifButton.addClass("btn btn-default gifBtn");
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
        //console.log(length);


        for (var i = 0; i < length; i++) {
            var title = tempArray[i].title;
            var favStarGif = tempArray[i].images["fixed_height"].url;
            var favStarImg = tempArray[i].images["fixed_height_still"].url;
            var favStarID = tempArray[i].id;


            



            var favStar = "<i class='fas fa-star' id='favStar' data-gifLink='" + favStarGif + "' data-imgLink='" + favStarImg + "' data-Id='" + favStarID + "'></i>";//create favorites icon

            var passTitle = title.replace("GIF", "").replace(title[0], title[0].toUpperCase());

            var outterCard = $('<div class="card outterCard">');
            var ratingCard = $("<div class='card-body'>").append(favStar).append($("<p class='card-text'>Rating: " + tempArray[i].rating.toUpperCase() + "</p>")).append($("<p class='card-text'>Title: " + passTitle + "</p>"));


            outterCard.append(ratingCard);

            var card = $('<div class="card mainCard" data-gifLink="' + tempArray[i].images['fixed_height'].url + '" data-imgLink="' + tempArray[i].images['fixed_height_still'].url + '">').append($("<img class='card-img-top imgCard pause'" + "src='" + tempArray[i].images['480w_still'].url + "'alt='card image cap'>"));

            outterCard.append(card);
            $('.gifSection').append(outterCard);


            
        }

        keepFav();


    });
}

function keepFav(el) {
    var temp = document.getElementsByTagName("i");
    console.log(temp.length);
    for (var i = 0; i < temp.length; i++) {
        if ($(temp[i]).attr("data-Id") in localStorage) {
            console.log("match");
            $(temp[i]).addClass("favStarColor");

        }
    }
}

var favorite;
var favArray = [];
var keyName = 1;
$('.gifSection').on("click", '#favStar', function () {
    var link = $(this).attr("data-imgLink");
    var id = $(this).attr("data-Id");
    $(this).toggleClass("favStarColor");

    if ($(this).hasClass("favStarColor")) {
        favorite = true;
        //console.log(link);
    }
    else {
        //favorites(link)
        favorite = false;
    }
    favs(id, link);
});

//localStorage.clear();

function favs(elId, elLink) {
    if (favorite) {
        localStorage.setItem(elId, elLink);
    }
    else {
        localStorage.removeItem(elId, elLink);
    }
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
        $('.gifSection').empty();
        shownext10 = false;
        showGif(currentgif);
    }
    previousTarget = currentgif;
    return false;
});

