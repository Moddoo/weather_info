$(document).ready(function() {
    let btn = $("#btn");
    let divL = $(".list"); 
    let divW = $(".weather");
    let data = $("#header");
    let date  = moment().format('L');
    

    btn.on("click", function() {
        let p = $("<p>");
        let city = $("#input").val();
        let queryUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + 
                       "&APPID=1a12ade99b308e8c20a740db7ad02276";
            
            p.addClass("col border my-0 bg-white d-flex align-items-center")
             .css("height", "47px")
             .text(city)
             .prependTo(divL);
             $("#input").val("");
            console.log(queryUrl);
        $.ajax({
            url: queryUrl,
            method: "GET" 
        })
           .then(function(response) {
               let queryUv = "https://api.openweathermap.org/data/2.5/uvi?appid=1a12ade99b308e8c20a740db7ad02276&lat=" + response.coord.lat + "&lon=" + response.coord.lon
             $.ajax({
                 url: queryUv, 
                 method: "GET",
             })  
                .then(function(res) {
                     console.log(res)
                     uvIndex = res.value;
                     console.log(uvIndex)
                     let feh = (response.main.temp - 273.15) * 9/5 + 32
                        console.log(response)
                        data.empty(); divW.empty();
                     data.text(response.name + " (" + date + ")");  
                     $("<p>").text("Temperature: "+ feh.toFixed(2) + " °F").appendTo(divW);
                     $("<p>").text("Humidity: "+ response.main.humidity + "%").appendTo(divW);
                     $("<p>").text("Wind Speed: "+ response.wind.speed + " MPH").appendTo(divW);
                     function color(col) {
                       var c = $("<span>").text(uvIndex).addClass(col);
                       $("<p>").text("UV Index: ").append(c)
                       .appendTo(divW);
                     }
                   
                       if      (uvIndex > 5) color("red")
                       else if (uvIndex > 2) color("yellow")
                       else                  color("green");
                    
                    })
           })
        let queryForeCast = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&APPID=1a12ade99b308e8c20a740db7ad02276"
        // console.log(queryForeCast)
        $.ajax({
            url: queryForeCast,
            method: "GET"
        })  
            .then(function(data) {
                // console.log(data.list[0].dt_txt[11]+""+data.list[0].dt_txt[12])
                // var time = new Date().getHours()
                // console.log(time)
                console.log(data)
                for(i=1; i<6; i++) {
                 let divD = $("div[data-num="+ i +"]") 
                     divD.empty()
                 $("<h6>").text(moment(date).add(i, "day").format("L")).appendTo(divD)
                 $("<i>").text("\u{1F327}")
                         .css("font-size","40px")
                         .appendTo(divD)
                 $("<p>").text("Temp: " + data.list[(i+2)*i].main.temp.toFixed(2)).appendTo(divD) 
                 $("<p>").text("Humidity: " + data.list[(i+2)*i].main.humidity.toFixed(2)).appendTo(divD)     
                }
                 console.log(moment(date).add(1, "day").format("L"))
            })
    })

})