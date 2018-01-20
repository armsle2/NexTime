$(function() {
	var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';

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
  	$.get('/api/users', function(data){
  		function checkUsers(user){
  			return user.username === username;
  		}
  		 let userMatch = data.find(checkUsers);
  		 console.log(userMatch);
  		 if(userMatch){
  		 	window.location.href = `/user/${userMatch.id}/to-do`;
  		 }else{
  		 	$('#username-sign-in').addClass('shake').one(animationEnd, function(){
  				$(this).removeClass('shake');
  			});
  		 }
  	})
  })

});