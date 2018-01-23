$(function() {
	setTimeout(getItems, 10000)
	let locations = {};

	// This function grabs items from the database and updates the view
	function getItems() {
		let currentUserID = $('.user-page').data('id');
	    $.get(`/api/user/${currentUserID}/to-do`, function(data) {
	        getLocation();
			function getLocation() {
			    if (navigator.geolocation) {
			        navigator.geolocation.watchPosition(showPosition);
			    } else { 
			        console.log('Geolocation is not supported by this browser.')
			    }
			}

			function showPosition(position) {
				//if lat1 and lon1 don't exist write coordinates to them
			    if(!locations.lat1 && !locations.lon1){
			      locations.lat1 = position.coords.latitude;
			      locations.lon1 = position.coords.longitude;
			    }else{
			    	//write lat2 and lon2(old coordinates) as lat1 and lon1
			      locations.lat2 = locations.lat1;
			      locations.lon2 = locations.lon1;
			      //write lat1 and lon1 as new coordinates
			      locations.lat1 = position.coords.latitude;
			      locations.lon1 = position.coords.longitude;   
			    }
			    //shorthand to make coordinates more manageable
			    let lat1 = locations.lat1;
			    let lon1 = locations.lon1;
			    let lat2 = locations.lat2;
			    let lon2 = locations.lon2;
			    //distance function allows us to compare two coordinates and return the distance as a number which represents miles
			    let positionDiff = distance(lat1, lon1, lat2, lon2)
			    //below is a condtional for if the users new location (lat1,lon1) is more than 1 mile away from their old location (lat2,lon2)
			    if(!lat2 && !lon2){
			    	sendSearchToGoogle(data, lat1, lon1);
			    }else if(positionDiff > 1){
			    	sendSearchToGoogle(data, lat1, lon1);
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

			function googleAPI(type, typeName, lat, lon){

			    let apiKey = "AIzaSyDku5hGYht2Deh0IIUDx0TEwx7uZH7llks";
			    let location = `${lat},${lon}`;
			    let queryURL = `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location}&radius=4828&type=${typeName}&key=${apiKey}`;

			   $.ajax({
			        url: queryURL,
			        method: "GET"
			    }).done(function(res){
			        
			        function safeGet(obj) {
					  if(obj) {
					    return obj
					  }else {
					    return 0;
					  }
					}
					res.results.sort(function(a, b) {
			              return safeGet(b.rating) - safeGet(a.rating);
			        });

			        if(res.results.length > 0){
	        			let locationResultsDiv = $("<div>");
	        			let locationResults = $(`<div id="demo${typeName}" class="collapse">`);
	        			let button = $(`<button class="panel panel-default panel-heading" data-toggle="collapse" data-target="#demo${typeName}">`);
	        			button.append(`Places for your ${type} list`);
	        			
	        			locationResultsDiv.append(button);
				        $('.panel-group').append(locationResultsDiv);
			        	res.results.forEach((result, index)=>{
			        		if(index < 5){
			        			if(!result.rating){
			        				result.rating = `No Rating`;
			        			}
		                        let specificResult = $(`<div>`);
		                        specificResult.addClass("resultBox");
			        			let locationName = $("<p>").text(`${index+1}: \n Name: ${result.name}`);
			                    let locationVicinity = $("<p>").text(`Address: ${result.vicinity}`);
			                    let locationRating = $("<p>").text(`Rating: ${result.rating}`);
			                    let resultLat = result.geometry.location.lat;
			                    let resultLon = result.geometry.location.lng;
			                    let mileageDistance = distance(lat, lon, resultLat, resultLon);
			                    let distanceRes = $("<p>").text(`Distance: ${mileageDistance} mi`);
			        			specificResult.append(locationName);
			        			specificResult.append(locationVicinity);
			        			specificResult.append(locationRating);
			        			specificResult.append(distanceRes);
			        			locationResults.append(specificResult)
			        			locationResultsDiv.append(locationResults);
			        		}
					        
	                    })
			        }
			    });
			};

			function sendSearchToGoogle(data, lat1, lon1){
				let categoryInfo = {
		    		typeName: [],
		    		type: []
		    	};
		    	//running loop based on user's tasks
		    	data.forEach((results, index)=>{
		    		let categoryTypeName = results.Category.type_name;
		    		let categoryName = results.Category.type;

		    		if(!categoryInfo.typeName.includes(categoryTypeName)){
		    			categoryInfo.typeName.push(categoryTypeName)
		    		}
		    		if(!categoryInfo.type.includes(categoryName)){
		    			categoryInfo.type.push(categoryName)
		    		}
		    	})
		    	//if user categoryTypeName array is not empty then run google api
	    		if(categoryInfo.typeName.length > 0 && categoryInfo.type.length > 0 && lat1 && lon1){
	    			categoryInfo.type.forEach((catType, index)=>{
	    					let catTypeName = categoryInfo.typeName[index];
	    				//passing category type, type_name, lat1, and lon1 to google
					    googleAPI(catType, catTypeName, lat1, lon1);
	    			})
						$('#myResultModal').modal('show');

	    		}
			}
		});
	}
});