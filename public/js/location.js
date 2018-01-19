$(document).ready(function() {
	getItems();
	let locations = {};

	// This function grabs items from the database and updates the view
	function getItems() {

	    $.get("/api/todos/", function(data) {
	        getLocation();
			function getLocation() {
			    if (navigator.geolocation) {
			        navigator.geolocation.watchPosition(showPosition);
			    } else { 
			        console.log('Geolocation is not supported by this browser.')
			    }
			}

			function showPosition(position) {
			    if(!locations.lat1 && !locations.lon1){
			      locations.lat1 = position.coords.latitude;
			      locations.lon1 = position.coords.longitude;
			    }else if(!locations.lat2 && !locations.lon2){
			      locations.lat2 = position.coords.latitude;
			      locations.lon2 = position.coords.longitude;
			    }else if(locations.lat2 && locations.lon2){
			      locations.lat1 = locations.lat2;
			      locations.lon1 = locations.lon2;
			        locations.lat2 = position.coords.latitude;
			      locations.lon2 = position.coords.longitude;   
			    }
			    console.log("Latitude 1: " + locations.lat1 + 
			    "\nLongitude 1: " + locations.lon1 + "\nLatitude 2: " + 
			    locations.lat2 + "\nLongitude 2: " + locations.lon2);

			    let lat1 = locations.lat1;
			    let lon1 = locations.lon1;
			    let lat2 = locations.lat2;
			    let lon2 = locations.lon2;
			    //testing with category type_name of first task but need to be able to run category type_name of multiple tasks if categories are different
			    // let type = data[0].Category.type_name;
			    // googleAPI(type, lat1, lon1);
			    let positionDiff = distance(lat1, lon1, lat2, lon2)
			    //below is a condtional for if the users new location (lat2,lon2) is more than 1 mile away from their first location (lat1,lon1)
			    if(positionDiff > 1){
			    	let categoryTypeName = [];
			    	//running loop based on user's tasks
			    	data.forEach((results, index)=>{
			    		let typeName = results.Category.type_name
			    		function checkTypeArray(type){
			    			return type != typeName;
			    		}
			    		//pushing the category type_name of users tasks to array only ONCE
			    		if(categoryTypeName.every(checkTypeArray)){
			    			categoryTypeName.push(typeName);
			    		}
			    	})
			    	//if user categoryTypeName array is not empty then run google api
			    			console.log(categoryTypeName);
		    		if(categoryTypeName.length > 0){
		    			categoryTypeName.forEach((results, index)=>{
		    				//passing the actual category type_name to google api through 'results'
						    googleAPI(results, lat2, lon2);
		    			})
		    		}
			    }   
			}

			function distance(lat1, lon1, lat2, lon2, unit) {
				let radlat1 = Math.PI * lat1/180
				let radlat2 = Math.PI * lat2/180
				let theta = lon1-lon2
				let radtheta = Math.PI * theta/180
				let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
				dist = Math.acos(dist)
				dist = dist * 180/Math.PI
				dist = dist * 60 * 1.1515
				if (unit=="K") { dist = dist * 1.609344 }
				if (unit=="N") { dist = dist * 0.8684 }
				return Math.floor(dist)
			}

			function googleAPI(typeName, lat, lon){

			    let apiKey = "AIzaSyDku5hGYht2Deh0IIUDx0TEwx7uZH7llks";
			    let type = typeName;
			    let location = `${lat},${lon}`;
			    let queryURL = `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location}&radius=4828&type=${type}&key=${apiKey}`;

			   $.ajax({
			        url: queryURL,
			        method: "GET"
			    }).done(function(res){
			        res.results.sort(function(a, b) {
			              return b.rating - a.rating;
			        });
			        console.log(`-------------\nResults Based On ${type}`)
			        res.results.forEach((result, index)=>{
			          console.log(`${index+1}: \n Name: ${result.name}\n Address: ${result.vicinity} \n Rating: ${result.rating}`);
			        })
			    });
			};
		});
	}
});