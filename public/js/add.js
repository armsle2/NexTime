$(document).ready(function() {

    $(document).on("click", "#add", insertTodo);

    var addTask = $("#title");
    var addBody = $("#body");
    var addCategory = $("#category");


    function insertTodo(event) {
        event.preventDefault();
        var newToDo = {
            task: addTask.val().trim(),
            body: addBody.val().trim(),
            category: addCategory.val().trim(),
            complete: false
        };
        console.log(newToDo);
        submitToDo(newToDo)

    }

    function submitToDo(Item) {
        $.post("/api/todos/", Item, function(data) {
            window.location.href = "/to-do";
        });
    }

});

