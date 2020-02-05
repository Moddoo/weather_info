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
                     let feh = (response.main.temp - 273.15) * 9/5 + 32;
                        console.log(response)
                        data.empty(); divW.empty();
                        data.text(response.name + " (" + date + ")");  
                    //  let photo = response.weather[0].icon 
                    //  $("<img>").attr("src","https://openweathermap.org/img/wn/"+ photo + "@2x.png").addClass("bg-success d-block").appendTo(data)  
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
       
        $.ajax({
            url: queryForeCast,
            method: "GET"
        })  
            .then(function(info) {
              
                console.log(info)
                let x = 4;
                for(i=1; i<6; i++) {
                 let divD = $("div[data-num="+ i +"]");
                 let feh = (info.list[(i+2)*i].main.temp - 273.15) * 9/5 + 32;
                     divD.empty()
                 $("<h6>").text(moment(date).add(i, "day").format("L")).appendTo(divD)

                 function weather(status,index) {
                            if(index >= info.list.length){
                             random = Math.floor(Math.random()*(info.list.length-32))+x;
                             weather(status,random)
                             console.log(random)
                            }
                            else if(index < info.list.length) {
                            let photo = info.list[index].weather[0].icon;
                            if(info.list[index].weather[0].main.includes(status)){
                    $("<img>").attr("src","https://openweathermap.org/img/wn/"+ photo + "@2x.png")
                              .appendTo(divD)
                           
                            }                
                         }                
                     }
          
                                      
                 let random = Math.floor(Math.random()*(info.list.length-32))+x;
                 console.log(random)

                  weather("Clear",random);
                  weather("Thunderstorm",random)
                  weather("Drizzle",random)
                  weather("Rain",random)
                  weather("Snow",random)
                  weather("Mist",random)
                  weather("Smoke",random)
                  weather("Haze",random)
                  weather("Dust",random)
                  weather("Fog",random)
                  weather("Sand",random)
                  weather("Ash",random)
                  weather("Squall",random)
                  weather("Tornado",random)
                  weather("Clouds",random)

                             
                    $("<p>").text("Temp: " + feh.toFixed(2) + " °F").appendTo(divD) 
                    $("<p>").text("Humidity: " + info.list[(i+2)*i].main.humidity + "%").appendTo(divD)     
                   x+=8;
                }
                
            })
    })

})