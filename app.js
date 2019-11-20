var firebaseConfig = {
    apiKey: "AIzaSyCEe4cKSqbkoj9DGmB2dPM6xTfTMrnCKcM",
    authDomain: "project-1-bored-board.firebaseapp.com",
    databaseURL: "https://project-1-bored-board.firebaseio.com",
    projectId: "project-1-bored-board",
    storageBucket: "project-1-bored-board.appspot.com",
    messagingSenderId: "934204858779",
    appId: "1:934204858779:web:5bb0a29eba5bf9f9a1413e"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
let database = firebase.database();

// ---------------------------------------------

$(document).ready(function () {
    configureSearch();
    gapi.load("client");
});

// Restaurant locator & location 
// API wo Key
function configureSearch() {
$("#submit").click(function () {
    $("#start-page").hide();
    $(".foodDirectory").show();
    let keyAPI = "";
    let yelpAPI = "https://api.yelp.com/v3/businesses/search";
    $.ajax({
        url: yelpAPI,
        method: "GET"
    })
        .then(function (response) {
            // console.log(response)
            let foodDirectoryResults = $("<div>" + response[1, 2, 3].punchline + "</div>");
            $("#foodDirectoryResults").html(foodDirectoryResults);
            // console.log(response[1, 2, 3].punchline);
        });

// ------ API w Key
    let jokeGIFapi = "5aq9ySNcbmDa3eP7R5B0OdOaJBvYihlY"
    let jokeGIFurl = "https://api.giphy.com/v1/gifs/random?api_key=" + jokeGIFapi;
    $.ajax({
        url: jokeGIFurl,
        method: "GET"
    }).then(function (response) {
        let newDIV = $("<div>");
        // console.log(response);
        let newGIF = $("<img>");
        newGIF.addClass("media");
        newGIF.attr("src", response.data.image_original_url);
        newDIV.append(newGIF);
        $("#jokeGIF").html(newDIV);
    })
})

$("#like").click(function() {
    database.ref("jokesLiked").once("value", function(snapshot) {
        let totalLikes = snapshot.val() + 1;
        database.ref("jokesLiked").set(totalLikes);
        if (totalLikes === 1)
            $("#global-message").text(totalLikes + " person liked a joke");
        else
            $("#global-message").text(totalLikes + " people liked a joke");
        $("#global-message").fadeIn();
        setTimeout(function () { $("#global-message").fadeOut(); }, 3000);
    });
});

$("#dislike").click(function() {
    database.ref("jokesDisliked").once("value", function(snapshot) {
        let totalDislikes = snapshot.val() + 1;
        database.ref("jokesDisliked").set(totalDislikes);
        if (totalDislikes === 1)
            $("#global-message").text(totalDislikes + " person got confused");
        else
            $("#global-message").text(totalDislikes + " people got confused");
        $("#global-message").fadeIn();
        setTimeout(function () { $("#global-message").fadeOut(); }, 3000);
        
    })
});
