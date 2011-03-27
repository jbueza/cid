# cid: Image Bundler Service on Node.js

  Provides a web service for stateless image bundling for mobile web applications that have
  designs with extensive images, such as, product catalogs. This gateway takes images,
  builds a JSON hash map of base64 encoded images, and throws the response back to the frontend for
  some awesome data uri action on image elements.

  * Why would I use base64 encoded images instead of using css sprites?
    * You can use any way you want; however, we've found for distributed development teams spriting (PSD files) can be
    a huge pain in the a** when merging PSDs with interface sprites
    
  * When does base64 encoded images really provide an increased performance benefit?
    * When your users are on 3G or anything slower than WiFi. We've found with tests that on Wifi
    there's literally no difference in performance/user experience; however, on 3G/Edge, this approach
    is much faster with 1 JSONP request for all the images in a hash than doing extensive image http requests
    
  * What are the down sides to using this approach? this seems like a silver bullet approach to http request reduction
    * It is not a silver bullet, as you will be using base64 encoded strings, so you'll end up
    not using the browser's cache for images on subsequent page views. This approach really benefits
    mCommerce (ya, mobile commerce) sites/product catalogs/image galleries instead of productivity tools.
  
## Browser Support

Any browser that supports [Data URI Scheme](http://en.wikipedia.org/wiki/Data_URI_scheme):

* Mobile Safari
* Webkit mobile (Android)
* Chrome
* Safari
* Firefox
* Opera
* IE8+

Originally, this project was primarily focused on increasing performance on mobile web applications.
  
## Client JavaScript

<pre>
  cid
    .configure('service', 'http://localhost:3000') //where your nodejs service is hosted
    .configure('callback', 'cidSwapImages') //defaulted to cidSwap
    .configure('lookup', 'cid-src') //css selector attribute for what you want swapped in for b64 strings
    
    .start();
</pre>


## Server JavaScript

* node v0.4+
* express 2.0+

* npm install express (required)
* npm install jsdom (required)
* npm install supervisor (optional for easier development)

<pre>node app.js</pre>

## License 

(The MIT License)

Copyright (c) 2011 jbueza &lt;jbueza@gmail.com&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.