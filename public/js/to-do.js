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
  })

});