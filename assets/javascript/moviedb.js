var movies = ["The Matrix", "The Notebook", "Mr. Nobody", "The Lion King"];//movies

//var database = firebase.database();//firebase database

// Function for rendering buttons
function renderButtons() {

    for (elements in movies) {
        
        var capital=movies[elements].substring(0,1).toUpperCase();
        movies[elements]=movies[elements].replace(movies[elements][0],capital);
      
      
        var gifButton = $("<button>");
        gifButton.addClass("btn btn-default gifBtn");
        gifButton.attr("data-name", movies[elements]);
        gifButton.text(movies[elements]);
        gifButton.appendTo("#btnSection");
    }
}

// This function handles events where one button is clicked
$("#add-gif").on("click", function (event) {
    $('#btnSection').empty();
    event.preventDefault();

    var movieInput = $("#gif-input").val().trim();
    movies.push(movieInput);
    renderButtons();
    $("#gif-input").val('');//clears value after submit
});



// Calling the renderButtons function to display the initial list of topics array
renderButtons();

var page = 1;
function showGif(el) {//get gif related to button clicked

    var movie = el;
    var queryURL 
    if (shownext10) {//if same button clicked then show more gifs
        console.log(shownext10);
        page += 1;
        queryURL ="https://www.omdbapi.com/?s=" + movie + "&page="+page+"&plot=short&apikey=trilogy";
    }
    else {
        page = 1;
        queryURL = "https://www.omdbapi.com/?s=" + movie + "&page="+page+"&plot=short&apikey=trilogy";
    }
console.log(page);

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        if(response.Response==="False"){
            alert("No more to Search. Try different movie");
        }
        console.log(response);
        var tempArray = response.Search;
        //console.log(Object.keys(tempArray));
        var length = tempArray.length;
        //var offset=response.totalResults;
        console.log(response.totalResults);
        //console.log(offset);
       

   
        for (var i = 0; i < length; i++) {
            var favStarYear = tempArray[i].Year;
            var title = tempArray[i].Title;
            
            var favStarImg=tempArray[i].Poster;
            //console.log(favStarImg);
            
            var favStarType = tempArray[i].Type;
            var favStarId=tempArray[i].imdbID;

            var imdblink='https://www.imdb.com/title/'+favStarId;
            //console.log(imdblink);



            var favStar = "<i class='fas fa-star' id='favStar' data-title='" + title+ "' data-imgLink='" + favStarImg+ "' data-Id='" + favStarId + "'></i>";//create favorites icon

            //var passTitle = title.replace("GIF", "").replace(title[0], title[0].toUpperCase());

            var outterCard = $('<div class="card outterCard">');
            var ratingCard = $("<div class='card-body'>").append(favStar).append($("<p class='card-text'>Year: " + favStarYear + "</p>")).append($("<p class='card-text'>Title: " + title + "</p>"));


            outterCard.append(ratingCard);

            if(favStarImg==="N/A"){
                var card = $('<div class="card mainCard" data-title="' + title + '" data-imgLink="' + favStarImg+ '">').append($("<a href="+imdblink+"><p class='card-img-top naImg'>N/A</p></a>"));
            }
            else{
                var card = $('<div class="card mainCard" data-title="' + title + '" data-imgLink="' + favStarImg+ '">').append($("<a href="+imdblink+"><img class='card-img-top imgCard pause posterLink'" + "src='" + favStarImg + "'alt='N/A'></a>"));
           
            }

    
            

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
    //event.preventDefault();

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


