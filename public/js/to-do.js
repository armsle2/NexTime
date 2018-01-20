$(document).ready(function() {
  $(document).on('click', '.item-delete', function(){
        var id = $(this).data("id");
        	console.log(id);
  		$.ajax({
            method: "DELETE",
            url: "/api/todos/" + id
        }).then(function(data){
        	// $(`li.${id}`).remove();
        	location.reload();
        	// console.log(data)
        });
  });

  $(document).on('click', '#submit-sign-in', function(event){
  	event.preventDefault();
  	let username = $('#username-sign-in').val().toLowerCase().trim();
  	console.log(username);
  	$.get('/api/users', function(data){
  		data.forEach((results, index)=>{
	  		console.log(results);
	  		if(results.username === username){
	            window.location.href = `/user/${results.id}/to-do`;
	  		}
  		})
  	})
  })

});