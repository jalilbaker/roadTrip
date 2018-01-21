

function initMap(){	
	
	var dirService = new google.maps.DirectionsService ; 
	var dirDisplay = new google.maps.DirectionsRenderer ;
	var autocompleteOrigin; 
	var autocompleteDestination;  
	
	//Set parameters for map.
	var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 4,
          center: {lat: 41.85, lng: -87.65}
        });
	//Display the map
	dirDisplay.setMap(map); 
	//set origin, destination and waypoint markers 
	var originInput = document.getElementById('origin'); 
	var destinationInput = document.getElementById('destination'); 
	var pitstopInput = document.getElementById('pitstop'); 
	if(originInput!=null){
		var autocompleteOrigin = new google.maps.places.Autocomplete(originInput); 
		//map.controls[google.maps.ControlPostition.TOP_LEFT].push(originInput); 	
	}
	if (pitstopInput!=null){
		var autocompletePitstop = new google.maps.places.Autocomplete(pitstopInput);
		//map.controls[google.maps.ControlPostition.TOP_LEFT].push(destinationInput); 	
	}
	if (destinationInput!=null){
		var autocompleteDestination = new google.maps.places.Autocomplete(destinationInput);
		//map.controls[google.maps.ControlPostition.TOP_LEFT].push(destinationInput); 	
	}


	$("#submit").click(function(){
		calculateAndDisplayRoute(dirService, dirDisplay, originInput, destinationInput); 

	})
}



//function to create an array of waypoints
function collectWayPoints(){



}

function calculateAndDisplayRoute(dirService, dirDisplay, originInput, destinationInput){


	dirService.route({
		origin: originInput.value, 
		destination: destinationInput.value,
		travelMode: "DRIVING"
	}, function(result, status){
		if(status ==="OK"){
			console.log(result);		
			dirDisplay.setDirections(result); 
			var originId = result.geocoded_waypoints[0].place_id ; 
			var destinationId = result.geocoded_waypoints[1].place_id ;
			
			localStorage.clear();  
			localStorage.setItem("Origin", originId); 
			localStorage.setItem("Destination", destinationId); 			
		}
		else{
			windows.alert("Direction Request Failed due to" + status); 
		}
	})
}

