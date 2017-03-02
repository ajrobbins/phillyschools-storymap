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

//functions and stuff
//isolate one school in the array and return its name
var getMarker = function (myFeatures) {
  return _.map(myFeatures, function (obj) {
    if (obj.properties.FACIL_NAME=="Gesu School") {
      console.log(obj.properties.FACIL_NAME);
    }
  });
};

//plot markers
$.ajax("https://gist.githubusercontent.com/ajrobbins/4ce891612ee792676bba3dd52a62be12/raw/2483c11b0a92ba3b3e98cca6bbd17ff9e6958944/schools.geojson").done(function(ajaxResponseValue) {
  var parsedData = JSON.parse(ajaxResponseValue);
  data = parsedData;
  myFeatures = data.features;
  featureGroup = L.geoJson(data).addTo(map);
  getMarker(myFeatures);
});

//do something when you click a button
var state = {
  count:0,
  data: undefined,
};

//change CSS based on state
var colorChange = function() {
  if (state.count==2) {
    console.log("it works");
    $(".sidebar").css("background-color", "#43D569");
  }
};

//openPopup based on state
var openPopup = function() {
  if (state.count==3) {
    var popup = L.popup()
      .setLatLng([39.959684, -75.161644])
      .setContent("I am a standalone popup.")
      .openOn(map);
  }
};

//pan map based on state
var panMap = function() {
  if (state.count==1) {
    map.panTo(new L.LatLng(40.033196, -75.163361));
  }
};

$(function() {
  $('#button1').on('click', function() {
    state.count=state.count-1; //count will decrease by one on button click
    console.log(state.count);
    colorChange();
    openPopup();
    panMap ();
  });
});

$(function() {
    $('#button2').on('click', function() {
      state.count=state.count+1; //count will increase by one on button click
      console.log(state.count);
      colorChange();
    });
});
