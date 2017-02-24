console.log("hello");

//add map
var map = L.map('map', {
  center: [39.9522, -75.1639],
  zoom: 12
});
var Stamen_TonerLite = L.tileLayer('http://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.{ext}', {
  attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  subdomains: 'abcd',
  minZoom: 0,
  maxZoom: 20,
  ext: 'png'
}).addTo(map);

//plot markers
$.ajax("https://gist.githubusercontent.com/ajrobbins/4ce891612ee792676bba3dd52a62be12/raw/2483c11b0a92ba3b3e98cca6bbd17ff9e6958944/schools.geojson").done(function(ajaxResponseValue) {
  var data = JSON.parse(ajaxResponseValue);
  console.log(data);
  featureGroup = L.geoJson(data).addTo(map);
});

//do something when you click a button
var state = {
  count:0,
  data: undefined,
};

$(function() {
     $('#button1').on('click', function() {
       state.count=state.count-1;
       console.log(state.count);
       if (state.count==2) {
         console.log("it works");
       }
     });
   });

$(function() {
    $('#button2').on('click', function() {
      state.count=state.count+1;
      console.log(state.count);
    });
});
