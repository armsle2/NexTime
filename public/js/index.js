$(document).ready(function() {
	
  
 
// $(document).on("click", "button.returnUser", returnUserInput);
 function returnUserInput(event){

  

 
 	var firstName = $(".firstName1").val().trim();
    var lastName = $(".lastName1").val().trim();

    

	
 function getCategory(event) {
        event.stopPropagation();
        category = $(this).data("category");
        console.log("This " + category);
        $.get("/api/todos/category/" + category, function(data) {
            console.log("Items", data);
            items = data;
            console.log(items);
            if (!items || !items.length) {
                displayEmpty1();
            } else {
                initializeRowsCategory();
            }
        });
    }

	 
  
 }

 
});