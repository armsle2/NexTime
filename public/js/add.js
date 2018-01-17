$(document).ready(function() {

    $(document).on("click", "#add", insertTodo);

    var addTitle = $("#title");
    var addCategory = $("#category");
    
    var addBody = $("#body");
    

    function insertTodo(event) {
        event.preventDefault();
        var newToDo = {
            title: addTitle.val().trim(),
            category: addCategory.val().trim(),
            body: addBody.val().trim(),
            complete: false
        };
        console.log(newToDo);
        submitToDo(newToDo)

    }

    function submitToDo(Item) {
        $.post("/api/todos/", Item, function() {
            window.location.href = "/to-do";
        });
    }

});