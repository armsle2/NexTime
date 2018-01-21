//THIS PAGE RELATES TO THE ADDITION OF ITEMS AND USERS

$(document).ready(function() {

    getCategories();

    $(document).on("click", "#add", insertTodo);

    var addTask = $("#task");
    var addBody = $("#body");
    var category = $("#category");
    var id;
    var user;
    var url = window.location.search;
    var userId;
   
    if (url.indexOf("?user_id=") !== -1) {
        userId = url.split("=")[1];
        
    }

    $(document).on("click", "#addSubmit", function(){
         window.location.href = "/to-do?user_id=" + userId;
    });
    


    function insertTodo(event) {
        event.preventDefault();
        var newToDo = {
            task: addTask.val().trim(),
            body: addBody.val().trim(),
            category: category.find(':selected').text(),
            UserId: userId,
            CategoryId: category.val(),
            complete: false
        };
        submitToDo(newToDo);
    }

    function getCategories() {
        $.get('/api/category/', function(data) {
            console.log(data);
            let select = $('#category');
            let option = $(`<option value="">`);
            select.append($('<option>', { text: 'Select A Category' }));
            data.forEach((result, index) => {
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
            window.location.href = "/to-do?user_id=" + userId;
        });
    }

    //functions relating to users

    getUsers();

    $(document).on("click", ".addUser1", addUser);
    $(document).on("click", ".delete-user", deleteUser);

  //  $(document).on("click", ".returnUser1", returnUser);

    var nameInput = $("#user-name");
    var userList = $("tbody");
    var userContainer = $(".userContainer");
    var addFirstName = $(".firstNameNew");
    var addLastName = $(".lastNameNew");
    var addUsername = $(".usernameNew");
    var addPassword = $(".passwordNew")
    var lastNameRet = $(".lastNameRet");
    
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

    function returnUser(event) {
        //var lastName = lastNameRet.val().trim();
        //console.log(lastName);
        $.get("/api/users/", function(user) {
            var rowsToAdd = [];
            for (var i = 0; i < user.length; i++) {
                rowsToAdd.push(createUserRow(user[i]));
            }
            console.log(user.length)

            renderUserList(rowsToAdd);
            nameInput.val("");
        });
    }

    function createUser(user) {

        $.post("/api/users/", user)
            .then(getUsers);
    };

    function getUsers() {
        $.get("/api/users/", function(user) {
            var rowsToAdd = [];
            for (var i = 0; i < user.length; i++) {
                rowsToAdd.push(createUserRow(user[i]));
            }
            renderUserList(rowsToAdd);
            nameInput.val("");
        });
    }

    function createUserRow(user) {
        var newTr = $("<tr>");
        newTr.data("user", user);
        newTr.append("<td>" + user.firstName + "</td>");
        newTr.append("<td> " + user.lastName + "</td>");
        newTr.append("<td><a id = 'triggerList' href='/to-do?user_id=" + user.id + "'>Go to List</a></td>");
        newTr.append("<td><a style='cursor:pointer;color:red' class='delete-user'>Delete User</a></td>");
        userId = user.id;

       return newTr;
    }

    function renderUserList(rows) {
        userList.children().not(":last").remove();
        userContainer.children(".alert").remove();
        if (rows.length) {
            userList.prepend(rows);
        } else {
            renderEmpty();
        }
    }

    function renderEmpty() {
        var alertDiv = $("<div>");
        alertDiv.addClass("alert alert-danger");
        alertDiv.text("You must create a User before you can create a list.");
        userContainer.append(alertDiv);
    }

    function deleteUser() {
        var listItemData = $(this).parent("td").parent("tr").data("user");
        var id = listItemData.id;
        $.ajax({
                method: "DELETE",
                url: "/api/users/" + id
            })
            .then(getUsers);
    }
});