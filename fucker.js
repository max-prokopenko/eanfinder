var Horseman = require('node-horseman');
var horseman = new Horseman();
var jQuery = require("jquery");
var SELECTOR = "#pcPassword";

horseman
  .open('http://192.168.0.1/userRpm/LoginRpm.htm?Save=Save')
  .type('#pcPassword', 'admin')
  .type('#userName', 'admin')
  .evaluate(function (selector) {
        var els = $(selector);
        els.each(function () {
            var event = document.createEvent("MouseEvent");
            event.initMouseEvent("click",
                true, true,
                window, null,
                0, 0, 0, 0,
                false, false, false, false,
                0, null);
            this.dispatchEvent(event);
        });
    }, SELECTOR)
    .delay(2000)
  //.keyboardEvent('keypress', 16777221)
  
  //.count('#a48')
  .screenshot('big.png')
  //.log() // prints out the number of results 
  .close();