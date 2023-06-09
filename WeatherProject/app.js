const express= require("express");
const https =require ("https");
const bodyParser= require("body-parser");

const app =express();



app.get("/", function(req, res){

    res.sendFile(__dirname+ "/index.html");

})

app.use(bodyParser.urlencoded({extended:true}));

app.post("/", function(req, res){
    

    const city =req.body.cityName;
    const apikey ="483714c24627fe2bd36a5dbc831a6420"
    const unit= "metric"
    const url= "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+apikey+"&units="+unit

    https.get(url, function(response){
        console.log(response.statusCode);


        response.on("data",function(data){
            const weatherData= JSON.parse(data)
        // console.log(weatherData); 
/// to take speacific data
            const temp =weatherData.main.temp
        
            const weatherDescripttion = weatherData.weather[0].description;
        
            const icon=weatherData.weather[0].icon;
            const iconURL= "https://openweathermap.org/img/wn/"+icon+"@2x.png";
        
            res.write("<h1>The temperature in "+city+" is " + temp + " degrees Celcius.</h1>");

            res.write("The weathe is cureently " + weatherDescripttion);
            res.write("<img src="+iconURL+">")
            res.send()
    })
})

/// there can be only one send on post
})



app.listen(4500,function(){
    console.log("Server is running on port 4500");
})














