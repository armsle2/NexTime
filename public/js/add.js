$(document).ready(function() {
    getCategories();

    $(document).on("click", "#add", insertTodo);

    var addTask = $("#task");
    var addBody = $("#body");
    var category = $("#category");
   // var categoryId;
    //var userId;
    //var userSelect = $("#author");


    //NEED TO UPDATE THE USER IT SO THAT IT IS NOT ALWAYS 1

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

        
        console.log(newToDo);
        submitToDo(newToDo);

    }

   

    function submitToDo(Item) {
        $.post("/api/todos/", Item, function(data) {
            console.log(data);
            window.location.href = "/to-do";
        });
    }

    //The function below relates to pulling the categories from the category table.
     function getCategories() {
        $.get('/api/categories/', function(data) {
            console.log(data);
            let select = $('#category');
            let option = $(`<option value="">`);
            select.append(option);
            data.forEach((result, index) => {
                select.append($('<option>', {
                    value: result.id,
                    text: result.type
                }));
            })
        })
    }

    

    //The functions below relate to adding a new user
  
    $(document).on("click", ".addUser1", addUser)

    var addFirstName = $(".firstName1");
    var addLastName = $(".lastName1");
    var addUsername = $(".username1");
    var addPassword = $(".password1")
    var categoryId;
    var userId;


    function addUser(event) {


        event.preventDefault();
       


        var newUser = {
            firstName: addFirstName.val().trim(),
            lastName: addLastName.val().trim(),
            username: addUsername.val().trim(),
            password: addPassword.val().trim(),
        };
     
        createUser(newUser);

    }

    function createUser(User) {
        $.post("/api/users/", User, function(data) {
            console.log(data);
            window.location.href = "/to-do";

        });
    }

    
});