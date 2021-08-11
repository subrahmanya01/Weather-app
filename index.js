const http=require('http');
const fs=require('fs');
const path=require('path');
const prompt = require('prompt-sync')();

const val=prompt("Enter the location");

const requests=require('requests')
const port=8080;
var streamurl=`https://api.openweathermap.org/data/2.5/weather?q=${val}&appid=55411c3dcc36eff2ad46fa32eff0d1ac`;
var homedata=fs.readFileSync("F:/Wether API/public/home.html","UTF-8");




const server=http.createServer(function(req,res){
  requests(streamurl)
.on('data', function (chunk) {
  const chunkobj=JSON.parse(chunk);
  const arrobj=[chunkobj];
 homedata= homedata.replace("{%tempval%}",(arrobj[0].main.temp-273).toFixed(2));
 homedata= homedata.replace("{%mintemp%}",(arrobj[0].main.temp_min-273).toFixed(2));
 homedata= homedata.replace("{%maxtemp%}",(arrobj[0].main.temp_max-273).toFixed(2));
 homedata= homedata.replace("{%liveloc%}",(arrobj[0].name));
 if(arrobj[0].weather[0].main==="Haze")
 homedata=homedata.replace("cloud","dehaze");
 
})
.on('end', function (err) {
  if (err) return console.log('connection closed due to errors', err);
});  
     
     if(req.url=="/")
     {
      res.writeHead(200,{"content-type":"text/html"});
      res.end(homedata);
     }
     else if(req.url.match("\.css$")){
       var cssPath=path.join(__dirname,"public",req.url);
       var fileStream=fs.createReadStream(cssPath,"UTF-8");
       res.writeHead(200,{"content-type":"text/css"});
       fileStream.pipe(res);
     }
     else if(req.url.match("\.jpeg$")){
      var imgPath=path.join(__dirname,"public",req.url);
      var fileStream=fs.createReadStream(imgPath);
      res.writeHead(200,{"content-type":"image/jpeg"});
      fileStream.pipe(res);
    }

     
})
server.listen(port,function(error){
    if(error)
    console.log("Some error occured while running the server");
    else
    console.log("Server is running at the port "+port+" successfully");
})
