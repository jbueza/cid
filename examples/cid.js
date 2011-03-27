var cid = {};


var cidSwapImages = function cidSwapImages(data) {        
  $("img[cid-src]").each(function(i, img) {
    img = $(img), key = img.attr('cid-src');
    img.attr('src', data[key]);
  });
};


var imgs = $('img[cid-src]');
var params = [];
for (var i = 0; i < imgs.length; i++) {
  params.push(imgs[i].getAttribute('cid-src'));
}

$.ajax({
   url: "http://localhost:3000",
   data: { 
      'targetUrl': window.location.href
     , 'srcs' : params.join(',') 
   },
   dataType: "jsonp",
   jsonp : "callback",
   jsonpCallback: "swapImages"
});


cid.bundle = function() {
  
};

//usage:
/* 
  cid
    .configure('bundlerService', 'http://localhost:3000');
    .configure('callback', 'cidSwapImages')
    
    .execute();

*/    