//jshint esversion:6
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended:true}));

//Making GET request with native node https module.
app.get("/",function(req,res)
{
  res.sendFile(__dirname+"/index.html");
});

app.post("/",function(req,res)
{

  const query = req.body.cityName;
  const apiKey = "INSERT YOUR WEATHERAPI KEY HERE";
  const unit = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+unit;

  https.get(url,function(response)
  {
  console.log(response.statusCode);

  response.on("data",function(data)
  {
  const weatherData = JSON.parse(data);

  // console.log(weatherData);
  const temp = weatherData.main.temp;

  const location = weatherData.name;

  const weatherDescription = weatherData.weather[0].description;

  const iconId = weatherData.weather[0].icon;

  const imageUrl = "http://openweathermap.org/img/wn/"+iconId+"@2x.png";

  //We can have only one res.send() in the app.get()
  // But we can have multiple res.write()

  res.write("<h1>The temperature at "+location+" is "+temp+" degrees Celcius.</h1>");

  res.write("<p>The weather is currently "+weatherDescription+".</p>");

  res.write("<img src=" +imageUrl + " alt='weatherIcon'>");

  res.send();
  });

  });

});

/*

*/




app.listen(3000,function()
{
  console.log("Server is running on port 3000");
});
