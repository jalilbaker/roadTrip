//Create the markpoint object to fetch data stored in localstorage 
// var markPoints= []; 
// for (var i=0; i <= localStorage.length; i++)  {
// 		var key = "markPoint"+i ; 
// 		var obj ={}; 
// 		var value = localStorage.getItem(localStorage.key(i)); 
// 	    //var keyValueString = {eval("markPoint"+i) : value};
// 	    obj["markPoint"+i]= value; 
// 	    markPoints.push(obj); 
// 	    console.log(markPoints);
//  	}
 	
	//var originPlaceId = localStorage.getItem('markPoint0'); 
	
//Get the API key 
	const paramKey = "AIzaSyAPXm9QmxaInN3DegD3IayRg1BQrWlC9rA" ; 
	const placesKey  = "AIzaSyAMqtL7DW6EbTOWa7WrqR2uH8aV-smIsNA"; 
	var placesQueryUrl; 
	var latlngArray ; 
	var latPoint ; 
	var lngPoint ; 
	var latLngLocation; 

	//Invoke the Places API to actually get the info you want. 
	const radius=5000000; 
	const rankby='prominence'; 
	var minPrice=0;  
	var maxPrice=5;
	var keyword = "point_of_interest"; 

	function initPage(){

		var origin = localStorage.getItem('markPoint0Name'); 
		var pitstop = localStorage.getItem('markPoint1Name'); 
		var destination = localStorage.getItem('markPoint2Name'); 
		// $('#home-tab').text(origin); 
		// $('#home-tab').attr('placeid', localStorage.getItem('markPoint0'));
		// $('#home-tab').attr('name', origin);

		$('#startPoint').text(origin); 

		$('#profile-tab').text(pitstop); 
		$('#profile-tab').attr('placeid', localStorage.getItem('markPoint1')); 
		$('#profile-tab').attr('name', pitstop);

		$('#contact-tab').text(destination); 
		$('#contact-tab').attr('placeid', localStorage.getItem('markPoint2')); 
		$('#contact-tab').attr('name', destination);



	}

	initPage(); 

	$('a[data-toggle="tab"]').bind('click', function(event)
	{
		
		var placeId = $(this).attr('placeid'); 
		
		var queryURL = 
		"https://maps.googleapis.com/maps/api/place/details/json?placeid="
		+placeId+"&key="+paramKey; 
    console.log(queryURL); 

    var placesUrl = 
    "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" ; 
    
		$.ajax({
					url: queryURL,
			        method: "GET"
					}).done(function(response){
					
						//for (var l = 1; l<=localStorage.length; l++  ){

							latlngArray = response.result.geometry.location; 
							latOrigin = response.result.geometry.location.lat; 
							lngOrigin = response.result.geometry.location.lng; 
							originLocation = latOrigin+ ',' + lngOrigin; 

							placesQueryUrl = placesUrl + originLocation +
									"&radius="+radius+
									"&minprice="+minPrice+"&maxprice="+maxPrice+
									"&keyword="+keyword+
									"&key="+placesKey; 
									console.log(placesQueryUrl)	
						//}				


						$.ajax({
							url: placesQueryUrl, 
							method: "GET"
						}).done(function(result){
								console.log(result); 
							var counter = result.results.length; 
								if (result.results.length < 6 ){
									counter = result.results.length
								}
								else
									counter = 6; 

								for (i = 0; i < counter; i++) {
		                			var poiName = result.results[i].name;
		                			var paraText = result.results[i].vicinity;
		                			var photoRef = result.results[i].photos[0].photo_reference; 
		                			var img = "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference="+photoRef+"&key="+placesKey; 
		                			console.log(poiName, photoRef, img); 

									// var tabSelected = get selecet Tab 	                		
									// var cardimg 
									// var cardtitle 
									// var cardtext
									 
		                			
		                			$('#profileCard0-img').attr("src", img); 
		                			$('#profileCard0-title').text(poiName); 
		                			$('#profileCard0-text').text(paraText)
		                			// $("#abc").attr("src", img); 
		                			// $(".header").text(poiName); 
		                			// $(".para").text(poiName);
		                			// var getSelectedTab = document.getElementBy	
		                			// var cardElements = 

		           			 }
						})

						
			}); 				
				
		})

	// 	})
	// }
// 	var queryURL = 
// 		"https://maps.googleapis.com/maps/api/place/details/json?placeid="
// 		+originPlaceId+"&key="+paramKey; 
//     console.log(queryURL); 

//     var placesUrl = 
//     "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" ; 
    
// //Invoke the Place Details API to get the latlng required to invoke 
// //places API		
// 		$(document).ready( function(){
// 			$('#submit').on('click', function(event){

// 				$.ajax({
// 					url: queryURL,
// 			        method: "GET"
// 					}).done(function(response){
					
// 						for (var l = 1; l<=localStorage.length; l++  ){

// 							latlngArray = response.result.geometry.location; 
// 							latOrigin = response.result.geometry.location.lat; 
// 							lngOrigin = response.result.geometry.location.lng; 
// 							originLocation = latOrigin+ ',' + lngOrigin; 

// 							placesQueryUrl = placesUrl + originLocation +
// 									"&radius="+radius+
// 									"&minprice="+minPrice+"&maxprice="+maxPrice+
// 									"&keyword="+keyword+
// 									"&key="+placesKey; 
// 									console.log(placesQueryUrl)	

// 						}
						

						


// 							$.ajax({
// 								url: placesQueryUrl, 
// 								method: "GET"
// 							}).done(function(result){
// 									console.log(result); 
// 								var counter = result.results.length; 
// 								if (result.results.length < 6 ){
// 									counter = result.results.length
// 								}
// 								else
// 									counter = 6; 

// 								for (i = 0; i < counter; i++) {
// 		                			var poiName = result.results[i].name;
// 		                			var paraText = result.results[i].vicinity;
// 		                			var photoRef = result.results[i].photos[0].photo_reference; 
// 		                			var img = "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference="+photoRef+"&key="+placesKey; 
// 		                			console.log(poiName, photoRef, img); 
// 		                			$("#abc").attr("src", img); 
// 		                			$(".header").text(poiName); 
// 		                			$(".para").text(poiName);

// 		           			 }
// 						})

						
// 					}); 

				
				
// 			})

// 		})
