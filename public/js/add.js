$(document).ready(function() {

    $(document).on("click", "#add", insertTodo);

    var addTask = $("#task");
    var addBody = $("#body");
    var addCategory = $("#category");


    function insertTodo(event) {
        event.preventDefault();
        var newToDo = {
            task: addTask.val().trim(),
            body: addBody.val().trim(),
            category: addCategory.val().trim(),
            UserId: 1,
            CategoryId: 1,
            complete: false
        };

        var newUser = {
            firstName: 'Bob',
            lastName: 'James',
            username: 'Bobby-J',
            password: 'password'
        }
        console.log(newToDo);
        // createUser(newUser);
        submitToDo(newToDo);

    }

    function submitToDo(Item) {
        $.post("/api/todos/", Item, function(data) {
            console.log(data);
            window.location.href = "/to-do";
        });
    }

    function createUser(User) {
        $.post("/api/users/", User, function(data) {
            console.log('User: ' + data);
        });
    }

});

