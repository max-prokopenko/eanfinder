
var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();

app.get('/scrape', function(req, res){
    var jsonFinal = [];
    var itemI = 1; 
    for (var i = 2; i <= 5928; i++) {
        var left = 5928 - i;
      url = 'https://www.foodie.fi/products/' + i;

      console.log(i + " begins, " + left + " left");
     
      request(url, function(error, response, html){

           
            if(!error){
               
                var $ = cheerio.load(html);

                
                var name, ean, price;
                
            
                $('.item').filter(function(){
                    var json = { name : "", ean : "", price : ""};
               
                    var data = $(this);

               
                    ean = data.data("ean");
                    
                    var info = $( this ).children( 'div.info' );

                    name = info.children().first().text();  

                    var priceInfo = info.children( 'div.price-and-quantity' );
                    priceInfo = priceInfo.children().first();
                    priceInfo = priceInfo.children().first();

                    price = priceInfo.children( 'span.whole-number' ).text();
                    price = price + "." + priceInfo.children( 'span.decimal' ).text();

                    if ((ean != "") & (name != "") & (price != "")) {
                        json.ean = ean;
                        json.name = name;
                        json.price = price;

                        //jsonFinal.push(json);
                      
                        fs.appendFile('output5000_5928.json', JSON.stringify(json, null, 4), function(err){
                                    console.log("Item " + itemI + " added");
                        })
                        itemI++;
                    }
                    

                })
            }

            
        })
    }
})

app.listen('8081')

exports = module.exports = app;