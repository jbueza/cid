var cidSwapImages = function cidSwapImages(data) {        
  $("img[cid-src]").each(function(i, img) {
    img = $(img);
    var key = img.attr('cid-src');
    img.attr('src', data[key]);
  });
};
var cid = {
  options: {
      service: 'http://localhost:3000/bundle'
    , callback: 'cidSwapImages'
  }
};

cid.configure = function(key, value) {
  if (arguments.length == 1) {
    return cid.options[key];
  } else {
    cid.options[key] = value;
    return this;
  }  
};

cid.execute = function() {
  var imgs = $('img[cid-src]')
    , params = [];
  for (var i = 0; i < imgs.length; i++) {
    params.push(imgs[i].getAttribute('cid-src'));
  }
  $.ajax({
     url: cid.configure('service'),
     data: { 'root'   : window.location.href, 'images' : params.join(',') },
     dataType: "jsonp",
     jsonp : "callback",
     jsonpCallback: cid.configure('callback')
  });
};