$(document).ready(function() {

function getDetail(category) {
    
    $.get("/api/todos/", function(data) {
     console.log("Items", data);
  		items = data;
    console.log(items[0].id);
   
  }

   getDetail();

});


