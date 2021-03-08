let request = require("request");
/*
arg1: uri aka api endpoint, 
arg2: callback function which has three arguments
        a) error
        b) response
        c) body

*/
request("http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1",function(err,res, body){
    let bodyJson = JSON.parse(body);
    let randomQuote = bodyJson[0]["content"];
    document.getElementById("quote").innerHTML = randomQuote;
});

//setInterval(function, intervalyouwantittorun in milliseconds)
//below we are making a request to the api endpoint every 5 seconds and then we update the html of the div tag
setInterval(function(){
    request("http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1",function(err,res, body){
        let bodyJson = JSON.parse(body);
        let randomQuote = bodyJson[0]["content"];
        document.getElementById("quote").innerHTML = randomQuote;
    });
}, 5000);