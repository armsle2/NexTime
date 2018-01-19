$(document).ready(function() {
        getCategories();

    $(document).on("click", "#add", insertTodo);

    var addTask = $("#task");
    var addBody = $("#body");
    var category = $("#category");


    function insertTodo(event) {
        event.preventDefault();
        var newToDo = {
            task: addTask.val().trim(),
            body: addBody.val().trim(),
            category: category.find(':selected').text(),
            UserId: 1,
            CategoryId: category.val(),
            complete: false
        };

        var newUser = {
            firstName: 'Bob',
            lastName: 'James',
            username: 'Bobby-J',
            password: 'password'
        }
        console.log(newToDo);
        submitToDo(newToDo);

    }

    function getCategories(){
        $.get('/api/category/', function(data){
            console.log(data);
            let select = $('#category');
            let option = $(`<option value="">`);
            select.append($('<option>', {text: 'Select A Category'}));
            data.forEach((result, index)=>{
                select.append($('<option>', {
                    value: result.id,
                    text: result.type
                }));
            })
        })
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

