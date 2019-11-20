// ------ APPS

$(document).ready(function () {
    configureSearch();
    gapi.load("client");
});

function configureSearch() {
$("#submit").click(function () {
    $("#start-page").hide();
    $(".foodDirectory").show();

// ------ Yahoo! Weather 

    var weatherURL = 'https://weather-ydn-yql.media.yahoo.com/forecastrss';
    var method = 'GET';
    var app_id = 'ov3WsG30';
    let weatherConsumerKey = "dj0yJmk9S3BnYVFTMFByUnMyJmQ9WVdrOWIzWXpWM05ITXpBbWNHbzlNQS0tJnM9Y29uc3VtZXJzZWNyZXQmc3Y9MCZ4PWVk";
    let weatherConsumerSecret = "742d88bd3ff7f47a3932bbbd6e7ec745475f82e0";
    var concat = '&';
    var query = {'location': 'miami,fl', 'format': 'json'};
    var oauth = {
        'oauth_consumer_key': weatherConsumerKey,
        'oauth_nonce': Math.random().toString(36).substring(2),
        'oauth_signature_method': 'HMAC-SHA1',
        'oauth_timestamp': parseInt(new Date().getTime() / 1000).toString(),
        'oauth_version': '1.0'
    };

    var merged = {}; 
    $.extend(merged, query, oauth);
    // Note the sorting here is required
    var merged_arr = Object.keys(merged).sort().map(function(k) {
      return [k + '=' + encodeURIComponent(merged[k])];
    });
    var signature_base_str = method
      + concat + encodeURIComponent(url)
      + concat + encodeURIComponent(merged_arr.join(concat));
    
    var composite_key = encodeURIComponent(weatherConsumerSecret) + concat;
    var hash = CryptoJS.HmacSHA1(signature_base_str, composite_key);
    var signature = hash.toString(CryptoJS.enc.Base64);
    
    oauth['oauth_signature'] = signature;
    var auth_header = 'OAuth ' + Object.keys(oauth).map(function(k) {
      return [k + '="' + oauth[k] + '"'];
    }).join(',');


    $.ajax({
        url: weatherURL + '?' + $.param(query),
        headers: {
          'Authorization': auth_header,
          'X-Yahoo-App-Id': app_id 
        },
        method: 'GET',
        success: function(data){
          console.log(data);
        }
    });

// ------ Food Choices for Dummies 

    let jokeGIFapi = "5aq9ySNcbmDa3eP7R5B0OdOaJBvYihlY";
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

    });

// ------ Portfolio News

    let newsAPI = "5aq9ySNcbmDa3eP7R5B0OdOaJBvYihlY";
    let newsURL = "https://api.giphy.com/v1/gifs/random?api_key=" + newsAPI;

    $.ajax({

        url: newsURL,
        method: "GET"
    }).then(function (response) {

        let newsDIV = $("<div>");
        // console.log(response);
        let newGIF = $("<img>");

        newGIF.addClass("media");
        newGIF.attr("src", response.data.image_original_url);
        newsDIV.append(newGIF);
        $("#jokeGIF").html(newDIV);

    });
});
