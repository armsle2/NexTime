$(function() {
  var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';

  // NEW CLICK EVENTS, revisit this in the AM
  $(document).on("click", ".list-item", function(){
     $(this, ".this-task").toggleClass("checked");
  });

	$('#submit-sign-up').on('click', function(event){
		event.preventDefault();
		let firstName = $("#first-name-sign-up");
	    let lastName = $("#last-name-sign-up");
	    let userName = $("#username-sign-up");
	    let password = $('#password-sign-up');
	  	let newUser = {
	  		firstName: firstName.val().trim(),
	        lastName: lastName.val().trim(),
	        username: userName.val().toLowerCase().trim(),
	        password: password.val().trim()
	  	}
	  	console.log(newUser)
		$.post('/api/users', newUser, function(data){
			console.log(data);
			window.location.href = `/user/${data.id}/to-do`;
		})

	});

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

  $(document).on('click', '#add-item', function(event){
  	// event.preventDefault();
  	let addTask = $("#task");
    let addBody = $("#body");
    let category = $("#category");
    let userID = $('#addItem');
  	let newItem = {
  		task: addTask.val().trim(),
        body: addBody.val().trim(),
        category: category.find(':selected').text(),
        UserId: userID.data('id'),
        CategoryId: category.val(),
        complete: false
  	}
  	console.log(newItem)
  	if(newItem.task === ''&& category.find(':selected').val() === ''){
  		$('#missing-data').html('You forgot to add a task and choose a category')

  		console.log('no category chosen')
  		
  	}else if(newItem.task === ''){
  		$('#missing-data').html('Wait! You need to add a task first')
  	}else if(category.find(':selected').val() === ''){
  		$('#missing-data').html(`Don't forget to choose a category`)
  	}else{
	  	$.post('/api/todos', newItem, function(data){
		  	location.reload();	
	  	})
  	}
  });
  //COME BACK TO THIS!  	
  $(document).on('click', '.edit-button', function(){
  	let taskID = $(this).parent().data('id');
  	$.get(`/api/todos/${taskID}`, function(data){
  		let addTask = $("#task-edit");
	    let addBody = $("#body-edit");
	    let category = $("#category-edit");
	    let userID = $('#addItem');
  		addTask.val(data.task);
        addBody.val(data.body);
        category.val(`${data.Category.id}`);
        $('#edit-item').on('click', function(){
        	let editedItem = {
        	taskID: taskID,
	  		task: addTask.val().trim(),
	        body: addBody.val().trim(),
	        category: category.find(':selected').text(),
	        CategoryId: category.val(),
	        complete: false
		  	}
		  	if(editedItem.task === ''&& category.find(':selected').val() === ''){
		  		$('#missing-edit-data').html('You forgot to add a task and choose a category')

		  		console.log('no category chosen')
		  		
		  	}else if(editedItem.task === ''){
		  		$('#missing-edit-data').html('Wait! You need to add a task first')
		  	}else if(category.find(':selected').val() === ''){
		  		$('#missing-edit-data').html(`Don't forget to choose a category`)
		  	}else{
			  	$.ajax({
			  		method: 'PUT',
			  		url: '/api/todos',
			  		data: editedItem
			  	}).then(function(data){
				  	location.reload();	
			  	})
		  	}
        })
        
  	})
  });

});

