$(document).ready(function() {
 

  // Clear localStorage - to delete all entries of the store
  //localStorage.clear();


  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyD_apD7d0ocNgkcfY50DUi5e818qUahmrc",
    authDomain: "project-gt-82242.firebaseapp.com",
    databaseURL: "https://project-gt-82242.firebaseio.com",
    projectId: "project-gt-82242",
    storageBucket: "project-gt-82242.appspot.com",
    messagingSenderId: "954443679576"
  };

  firebase.initializeApp(config);


  var gApiKey = 'AIzaSyBntUJftstarx_tMDAHQh5Vwgsu3Ys_RTg';
  var gName       = '';
  var gRating     = '';
  var gVicinity   = '';
  var gPriceLevel = '';

  var eRadius = '500';
  var eTypes  = 'restaurant,food,cafe';
  var eMinPrice = '0';
  var eMaxPrice = '4';

  var wRadius = '500';
  var wTypes  = 'restaurant,food,cafe';
  var wMinPrice = '0';
  var wMaxPrice = '4';

  var eLattLong = false;
  var wLattLong = false;

  var endPlaceIdFound = false;
  var wayPlaceIdFound = false;

  var eLatt = '';
  var eLong = '';
  var ePlId = '';
  var ePlNm = '';
  var eBdgt = '';

  var wLatt = '';
  var wLong = '';
  var wPlId = '';
  var wPlNm = '';
  var wBdgt = '';

  var gAllEndPlaces = [];
  var gAllWayPlaces = [];

  var restaurants = {
    "food": {
         "endLctn": {
            name: '',
            description: '',
            budget_dollars: ''
         },
         "wayLctn": {
            name: '',
            description: '',
            budget_dollars: ''
          },
      },
    };

  data = firebase.database().ref();

  // *** Set up Proxy and base Query's *******************************************//
  const proxyURL  = "https://cors-anywhere.herokuapp.com/";
  var queryGeoURL = "https://maps.googleapis.com/maps/api/geocode/json?";
  var queryPlcURL = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?";
  // *****************************************************************************//


  function init() {

    // *** Retrieve Place ID from Store *******************************************//
    for(var i=0, len=localStorage.length; i<len; i++) {
      var key   = localStorage.key(i);
      var value = localStorage[key];
      console.log(key + " => " + value);

      if (key === "markPoint1"){
        ePlId = value;
        endPlaceIdFound = true;
        console.log("get local storage end point: ", ePlId, " ", endPlaceIdFound);
      }
      if (key === "markPoint2"){
        wPlId = value;
        wayPlaceIdFound = true;
        console.log("get local storage way point: ", ePlId, " ", wayPlaceIdFound);
      }
    }

    // *****************************************************************************//




    // $( "#contact-tab" ).click(function() {
      alert("its End Point tab that is currently active");

      // *** Retrieve End Pont Information via Google APIs ***************************//
      if (endPlaceIdFound) {

          // Ajax Query for Google Geocode API (end point) --------------------------------//
          var bldQueryGeoURL = queryGeoURL + "place_id=" + ePlId + "&key=" + gApiKey; 
          console.log("ajax geo query URL end point: ", bldQueryGeoURL);

          $.ajax({
              url: proxyURL + bldQueryGeoURL,
              method: "GET"
          })
              .done(function(geoResponse) {
                console.log("ajax geo end point response: ", geoResponse);

                eLatt = geoResponse.results[0].geometry.location.lat.toString();
                eLong = geoResponse.results[0].geometry.location.lng.toString();
                eLattLong = true;
                console.log("get end point lattitude longitude: ", eLatt, " ", eLong, " ", eLattLong);

                // -----------------------------------------------------------------------------//

                if (eLattLong) {
                    // Ajax Query for Google Places API (end point ) -------------------------------//
                    var bldQueryPlcURL = queryPlcURL + "location=" + eLatt + "," + eLong + "&radius=" + eRadius + "&types=" + eTypes +
                      "&minprice=" + eMinPrice + "&maxprice=" + eMaxPrice + "&key=" + gApiKey; 
                    console.log("ajax plc query URL end point: ", bldQueryPlcURL);

                    $.ajax({
                        url: proxyURL + bldQueryPlcURL,
                        method: "GET"
                    })
                      .done(function(plcResponse) {
                          console.log("ajax plc end point response: ", plcResponse);

                          var placesResults = plcResponse.results;
                          for (var i = 0; i < placesResults.length; i++) {
                            gName       = placesResults[i].name;
                            gRating     = placesResults[i].rating;
                            gVicinity   = placesResults[i].vicinity;
                            gPriceLevel = placesResults[i].price_level;
                            console.log(" name rating vicinity pricelevel", i, ' ', gName, ' ', gRating, ' ', gVicinity, ' ', gPriceLevel);
                            /* -------------------------------------- */
                            /* format and display the data on the DOM */
                            /* -------------------------------------- */

                            if (i < 5) {
                              // Build the Restaurant Name DOM ID
                              var rNameId = "#ep-res-name-"+ [i];
                              $(rNameId).html(gName);

                              // Build the Restaurant Description DOM ID
                              var rDescription = '';

                              var rRating = placesResults[i].rating;
                              if (rRating !='') {
                                rDescription = rDescription + "RATING: " + rRating + ";  ";
                              };

                              // Build the Restaurant Price Level Sign
                              // 0 —> Free; 1 —> Inexpensive; 2 —> Moderate; 3 —> Expensive; 4 —> Very Expensive
                              var gPriceLvl = 0;
                              if (gPriceLvl == parseInt(placesResults[i].price_level)) {
                                // Adjust price level sign depending upon price level returned in places JSON data
                                var rPrLvlDollars = "$$$";
                                if (gPriceLvl< 3){
                                    rPrLvlDollars = "$$";
                                };
                                if (gPriceLvl < 2){
                                    rPrLvlDollars = "$";
                                };
                              }
                              else {
                                // Data is not an integer so assign a default price level dollar value
                                rPrLvlDollars = "$$";
                              }; 
                              rDescription = rDescription + "BUDGET LEVEL: " + rPrLvlDollars+ ";  ";

                              var rVicinity = placesResults[i].vicinity;
                              if (rVicinity != '') {
                                rDescription = rDescription + "VICINITY: " + rVicinity;
                              };
                              var rDescriptionId = "#ep-res-desc-"+ [i];
                              $(rDescriptionId).html(rDescription);

                              /* ------------------------------------------- */
                              /* Write the summary data to a temporary array */
                              /* ------------------------------------------- */

                              restaurants.food.endLctn.name = gName;
                              restaurants.food.endLctn.description   = rDescription;
                              restaurants.food.endLctn.budgetDollars = rPrLvlDollars;

                              gAllEndPlaces[i] = restaurants;

                            }; // end process JSON data and display on DOM 
                          }; // end For Loop to get all entries from the JSON array  
                    }); // end of AJAX done functionality
                  // -----------------------------------------------------------------------------//
                }; // end of boolean check for lattitude & longitude values  

          });
      // *****************************************************************************//
    };
  // });


// $( "#profile-tab" ).click(function() {
      alert("its Way Point tab that is currently active");

      // *** Retrieve End Pont Information via Google APIs ***************************//
      if (wayPlaceIdFound) {

          // Ajax Query for Google Geocode API (end point) --------------------------------//
          bldQueryGeoURL = queryGeoURL + "place_id=" + wPlId + "&key=" + gApiKey; 
          console.log("ajax geo query URL way point: ", bldQueryGeoURL);

          $.ajax({
              url: proxyURL + bldQueryGeoURL,
              method: "GET"
          })
              .done(function(geoResponse) {
                console.log("ajax place end point response: ", geoResponse);

                wLatt = geoResponse.results[0].geometry.location.lat.toString();
                wLong = geoResponse.results[0].geometry.location.lng.toString();
                wLattLong = true;
                console.log("get way point lattitude longitude: ", wLatt, " ", wLong, " ", wLattLong);

                // -----------------------------------------------------------------------------//

                if (wLattLong) {
                    // Ajax Query for Google Places API (way point ) -------------------------------//
                    bldQueryPlcURL = queryPlcURL + "location=" + wLatt + "," + wLong + "&radius=" + eRadius + "&types=" + eTypes +
                      "&minprice=" + eMinPrice + "&maxprice=" + eMaxPrice + "&key=" + gApiKey; 
                    console.log("ajax plc query URL way point: ", queryPlcURL);

                    $.ajax({
                        url: proxyURL + bldQueryPlcURL,
                        method: "GET"
                    })
                      .done(function(plcResponse) {
                          console.log("ajax plc way point response: ", plcResponse);

                          var placesResults = plcResponse.results;
                          for (var i = 0; i < placesResults.length; i++) {
                            gName       = placesResults[i].name;
                            gRating     = placesResults[i].rating;
                            gVicinity   = placesResults[i].vicinity;
                            gPriceLevel = placesResults[i].price_level;
                            console.log(" name rating vicinity pricelevel", i, ' ', gName, ' ', gRating, ' ', gVicinity, ' ', gPriceLevel);
                            /* -------------------------------------- */
                            /* format and display the data on the DOM */
                            /* -------------------------------------- */

                            if (i < 5) {
                              // Build the Restaurant Name DOM ID
                              var rNameId = "#wp-res-name-"+ [i];
                              $(rNameId).html(gName);

                              // Build the Restaurant Description DOM ID
                              var rDescription = '';

                              var rRating = placesResults[i].rating;
                              if (rRating !='') {
                                rDescription = rDescription + "RATING: " + rRating + ";  ";
                              };

                              // Build the Restaurant Price Level Sign
                              // 0 —> Free; 1 —> Inexpensive; 2 —> Moderate; 3 —> Expensive; 4 —> Very Expensive
                              var gPriceLvl = 0;
                              if (gPriceLvl == parseInt(placesResults[i].price_level)) {
                                // Adjust price level sign depending upon price level returned in places JSON data
                                var rPrLvlDollars = "$$$";
                                if (gPriceLvl< 3){
                                    rPrLvlDollars = "$$";
                                };
                                if (gPriceLvl < 2){
                                    rPrLvlDollars = "$";
                                };
                              }
                              else {
                                // Data is not an integer so assign a default price level dollar value
                                rPrLvlDollars = "$$";
                              }; 
                              rDescription = rDescription + "BUDGET LEVEL: " + rPrLvlDollars + ";  ";

                              var rVicinity = placesResults[i].vicinity;
                              if (rVicinity != '') {
                                rDescription = rDescription + "VICINITY: " + rVicinity;
                              };

                              var rDescriptionId = "#wp-res-desc-"+ [i];
                              $(rDescriptionId).html(rDescription);

                              /* ------------------------------------------- */
                              /* Write the summary data to a temporary array */
                              /* ------------------------------------------- */

                              restaurants.food.wayLctn.name = gName;
                              restaurants.food.wayLctn.description   = rDescription;
                              restaurants.food.wayLctn.budgetDollars = rPrLvlDollars;

                              gAllWayPlaces[i] = restaurants;

                            }; // end process JSON data and display on DOM 
                          }; // end For Loop to get all entries from the JSON array  
                    }); // end of AJAX done functionality
                  // -----------------------------------------------------------------------------//
                }; // end of boolean check for lattitude & longitude values  

          });
      // *****************************************************************************//
    };
  // });

  }; // *** end of init function ***
 
  init();

});


var rDe = "#wp-sel-"+ 1;



$(rDe).click(function() {

  var rselc = ['test','black'];
  
  $('#fdSelections').html(rselc);

  alert("I clicked");


});
$(".wp-sel-2" ).click(function() {

  alert("I clicked");


});
$(".wp-sel-3" ).click(function() {

  alert("I clicked");


});
$(".wp-sel-4" ).click(function() {

  alert("I clicked");


});
$(".ep-sel-1" ).click(function() {

  alert("I clicked");


});
$(".ep-sel-2" ).click(function() {

  alert("I clicked");


});
$(".ep-sel-3" ).click(function() {

  alert("I clicked");


});
$(".ep-sel-4" ).click(function() {

  alert("I clicked");


});



 // on click of the selection box, store these values for summary

  $(document).on("click", ".restaurant-image", function() {

    // Saving the clicked restaurant name.

    var name = $(this).attr("data-name");

     
    // if (state === "res-1") {
                 // restaurants.endLctn.lat = 
                 // restaurants.endLctn.lng = 
                 // restaurants.endLctn.name = 
                 // restaurants.endLctn.rating = 
                 // restaurants.endLctn.priceLevel = 
                 // restaurants.endLctn.website = 

                 // restaurants.wayLctn.lat = 
                 // restaurants.wayLctn.lng = 
                 // restaurants.wayLctn.name = 
                 // restaurants.wayLctn.rating = 
                 // restaurants.wayLctn.priceLevel = 
                 // restaurants.wayLctn.website = 

    // }
  });

