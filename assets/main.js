$(document).ready(function() {
    let btn = $("#btn");
    btn.on("click", function() {
        let city = $("#input").val();
        let queryUrl = "api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=1a12ade99b308e8c20a740db7ad02276"
        console.log(queryUrl);
        $.ajax({
            url: queryUrl,
            method: "GET"
        })
           .then(function(response) {
                console.log(response)
           })
    })

})