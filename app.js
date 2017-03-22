//add map
var map = L.map('map', {
  center: [39.990867, -75.147735],
  zoom: 12
});
var Stamen_TonerLite = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
  attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  subdomains: 'abcd',
  minZoom: 0,
  maxZoom: 20,
  ext: 'png'
}).addTo(map);


//add data to map
$.ajax("https://gist.githubusercontent.com/ajrobbins/4ce891612ee792676bba3dd52a62be12/raw/2483c11b0a92ba3b3e98cca6bbd17ff9e6958944/schools.geojson").done(function(ajaxResponseValue) {
  var parsedData = JSON.parse(ajaxResponseValue);
  data = parsedData;
  myFeatures = data.features;
  featureGroup = L.geoJson(data).addTo(map);
  var geojsonMarkerOptions = {
    radius: 5,
    fillColor: "#436DD5",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 1
  };

  $(function() {
    $('#btn-prev').on('click', function() {
      state.slideNumber=state.slideNumber-1; //count will decrease by one on button click
      console.log(state.slideNumber);
      slideOne();
      slideTwo();
      slideThree();
      slideFour();
      slideFive();
    });
  });

  $(function() {
    $('#btn-next').on('click', function() {
      state.slideNumber=state.slideNumber+1; //count will increase by one on button click
      console.log(state.slideNumber);
      slideOne();
      slideTwo();
      slideThree();
      slideFour();
      slideFive();
      });
    });
});

//Alternate icon
  var selectedIcon = L.icon({
    iconUrl: 'orange-marker.png',
    iconSize: [16, 16],
    // iconAnchor: [22, 94],
    // popupAnchor: [-3, -76],
  });


//filter by school type
  var filter = function (type) {
  filteredLayer = L.geoJSON(data, {
    filter: function(feature, layer) {
      return feature.properties.TYPE==type;
    }
  }).addTo(map);
  };

 //filter by school name
 var nameFilter = function (name) {
 nameLayer = L.geoJSON(data, {
   filter: function(feature, layer) {
     return feature.properties.FACIL_NAME==name;
   }
 }).addTo(map);
 };


//create popup at Vare-Washington
  function createPopup(feature, layer) {
    if (feature.properties.FACIL_NAME=="Washington, George (EL)") {
      pop=layer.bindPopup("George Washington School, closed in 2013, had been in operation since the Civil War period. Its facility now houses Vare-Washington School.");
      map.setView([39.933455, -75.152622], 15);
    }
  }

//add popup to map
  var popLayer = function () {
    popupLayer = L.geoJSON(data, {
    onEachFeature: createPopup
  }).addTo(map);
  pop.openPopup();
};
//Create state - 5 slides
var state = {
  slideNumber:1,
  slideTotal: 5,
};

//Slide one
var slideOne = function (){
  if (state.slideNumber==1) {
    document.getElementById("btn-prev").style.visibility = "hidden"; //hide Previous button on first screen (only works on return)
    $("#slide-text").text("The School District of Philadelphia is the eighth largest school district in the nation, by enrollment.");
    if (filteredLayer!==undefined) {
      map.removeLayer(filteredLayer);
      slideOneData = L.geoJson(data).addTo(map);
    }
  }
};

//Slide two
var slideTwo = function (){
  if (state.slideNumber==2) {
    $("#slide-text").text("There are 220 public schools in the district.");
    if (featureGroup !== undefined) {
      map.removeLayer(featureGroup);
      filter("District");
    }
    else if (filteredLayer===undefined) {
      map.removeLayer(slideOneData);
    }
  }
};

//Slide three
var slideThree = function (){
  if (state.slideNumber==3) {
    $("#slide-text").text("Charter schools have a strong presence in the District: there are 88 brick-and-mortar charter schools and 15 cyber charters in Philadelphia. Together, they serve 69,505 students.");
    map.removeLayer(filteredLayer);
    filter("Charter");
  }

};

//Slide four
var slideFour = function (){
  if (state.slideNumber==4) {
    $("#slide-text").text("In 2013, facing a $304 million budget deficit, the School Reform commission closed 23 public schools, or about 10% of the city's total. Schools opened with greatly diminished capacity, in some cases, without full-time guidance counselors, assistant principals, lunch aides, and librarians.");
    map.removeLayer(filteredLayer);
    popLayer();
  }
};

//Slide five
var slideFive = function (){
  if (state.slideNumber==5) {
    document.getElementById("btn-next").style.visibility = "hidden"; //hide Next button on last slide
    $("#slide-text").text("This year, the School District announced plans to overhaul academics at these 11 low-performing schools.");
    map.removeLayer(popupLayer);
    nameFilter("Bartram, John");
    nameFilter("Franklin Benjamin HS");
    nameFilter("Fels, Samuel");
    nameFilter("Kensington Culinary Arts");
    nameFilter("Overbrook High School");
    nameFilter("Harding, Warren G.");
    nameFilter("Hartranft, John F.");
    nameFilter("Heston, Edward");
    nameFilter("Marshall, John");
    nameFilter("McDaniel, Delaplaine");
    nameFilter("Blankenburg, Rudolph");
    map.setView([39.963925, -75.161170], 12);
  }
};
