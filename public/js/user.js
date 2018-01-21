$(document).ready(function() {
    //   googleAPI();
    // getLocation();
    // Getting the initial list of toDos
    // getItems();


    // Container holds all of our posts
    var toDoContainer = $(".list-group");
    var panelHeading = $(".panel-heading");
    var userName = $("#userName");
    var category;
    var id;




    // Click events for the edit and delete buttons and specific items
    $(document).on("click", "button.delete", deleteItem);
    $(document).on("click", "a.specificItem", getSpecific);
    //$(document).on("click", "button.grocery", getCategory);
    //$(document).on("click", "button.bank", getCategory);
    //$(document).on("click", "button.pharmacy", getCategory);
    $(document).on("click", "button.icon", getCategory);


    //The following click events relate to updates
    $(document).on("click", "button.edit", startItemUpdate);
    $(document).on("click", ".todo-item", editToDo);
    $(document).on("keyup", ".todo-item", finishEdit);

    $(document).on("click", "button.editBtn", updateItem);




    var items;


    //THE CODE BELOW WIll RELATE TO SEARCHING ITEMS BY USER
    var url = window.location.search;
    var userId;
    if (url.indexOf("?user_id=") !== -1) {
        userId = url.split("=")[1];
        getItems(userId);

    }
    // If there's no userId we just get all items
    else {
        getItems();

    }


    // This function grabs items from the database and updates the view
    function getItems(user) {
        userId = user || "";
        console.log(userId)
        if (userId) {
            join = "/"
            userId = "?user_id=" + userId;
        }
        $.get("/api/todos/" + userId, function(data) {
            console.log("Items", data);
            items = data;
            if (!items || !items.length) {
                displayEmptyItem(user);
            } else {
                initializeRows();
            }
        });
    }

    //THis function allows user to view items by category
    function getCategory(event) {
        event.stopPropagation();
        categoryID = $(this).data("category_id");
        console.log(this);
        console.log("This " + categoryID);
        $.get(`/api/todos/category/${categoryID}/`, function(data) {
            console.log("Items", data);
            items = data;
            console.log(items);
            if (!items || !items.length) {
                displayEmptyCategory();
            } else {
                initializeRowsCategory();
            }
        });
    }

    // InitializeRows handles appending all of our constructed item HTML inside
    // toDoContainer for the filtered list
    function initializeRows() {
        toDoContainer.empty();
        //userName.empty();
        //NOTE:  We will need to code this once we figure out how we are capturing the user info.
        // var user =
        var itemsToAdd = [];
        var addButton = $("<a href='/add" + userId + "''><button class='add-btn'><img src='../img/plus-circle.png'/></button></a>");

        // var groceryBtn = $("<button>");
        // groceryBtn.html("<img src='../img/star.png' />");
        // groceryBtn.addClass("grocery btn btn-default");
        // groceryBtn.data("category", "Groceries");
        // var bankBtn = $("<button>");
        // bankBtn.html("<img src='../img/box.png' />");
        // bankBtn.addClass("bank btn btn-default");
        // bankBtn.data("category", "Banking")
        // var pharmacyBtn = $("<button>");
        // pharmacyBtn.html("<img src='../img/globe.png' />");
        // pharmacyBtn.addClass("pharmacy btn btn-default");
        // pharmacyBtn.data("category", "Pharmacy")

        //Add more category buttons once we decide on categories

        for (var i = 0; i < items.length; i++) {
            itemsToAdd.push(createNewRow(items[i]));
        }
        toDoContainer.append(itemsToAdd);
        toDoContainer.append(addButton);
        // toDoContainer.append(groceryBtn);
        // toDoContainer.append(bankBtn);
        // toDoContainer.append(pharmacyBtn);
        //We will need to append other category buttons once we decide on categories
        // userName.append("Hello" + user "!");
    }

    // This function constructs an item's HTML

    function createNewRow(item) {
        var newItemList = $("<li>");
        newItemList.addClass("list-group-item new-item");

        var deleteBtn = $("<button>");
        deleteBtn.html("<img src='../img/trash-2.png'/>");
        deleteBtn.data("id", item.id);
        deleteBtn.addClass("delete btn btn-danger");

        var editBtn = $("<button>");
        editBtn.html("<img src='../img/edit.png'/>");
        editBtn.addClass("edit btn btn-edit");
        editBtn.data("id", item.id);

        var checkBtn = $("<button>");
        checkBtn.html("<img src='../img/check-square.png'/>");
        checkBtn.addClass("edit btn btn-check");
        checkBtn.data("id", item.id);

        var categoryIcon = $("<button>");
        categoryIcon.addClass("icon");
        categoryIcon.addClass(item.Category.type_name);
        categoryIcon.html("<img src='../img/" + item.Category.type_name + ".png'/>");
        categoryIcon.data("category", item.Category.type_name);
        categoryIcon.data("category_id", item.Category.id);


        var specificItem = $("<a class = specificItem></a>");
        specificItem.text(item.task);
        specificItem.data("id", item.id);

        newItemList.append(categoryIcon);
        newItemList.append(specificItem);
        newItemList.append(deleteBtn);
        newItemList.append(editBtn);
        newItemList.append(checkBtn);


        return newItemList;
    }

    // InitializeRows handles appending all of our constructed item HTML inside
    // toDoContainer
    // InitializeRowsCatgory handles appending all of our constructed item HTML of a specific category inside
    // toDoContainer for the filtered list.  It also runs create new row function, but only for rows in the specific category.
    //it is triggered by the getCategory function.
    function initializeRowsCategory() {
        toDoContainer.empty();
        userName.empty();
        panelHeading.empty();
        var itemsToAdd = [];
        var returnButton = $("<button><a href='/to-do" + userId + "'>Return to Complete List</a> </button>");
        for (var i = 0; i < items.length; i++) {
            itemsToAdd.push(createNewRow(items[i]));
        }
        toDoContainer.append(itemsToAdd);
        toDoContainer.append(returnButton);
        panelHeading.append(category);
    }

    //This deletes an item when the delete button is pushed.
    function deleteItem(event) {
        event.stopPropagation();
        //toDoContainer.empty();
        var id = $(this).data("id");
        console.log("This  " + id);

        $.ajax({
            method: "DELETE",
            url: "/api/todos/" + id
        }).then(getItems);
    }

    //This gets a specific item from the server and initiates the function that builds the detailed view.

    function getSpecific(event) {
        event.stopPropagation();
        id = $(this).data("id");
        console.log("This" + id);
        console.log(id);
        $.get("/api/todos/" + id, function(data) {
            console.log("Items", data);
            items = data;
            console.log(items);
            initializeDetail();

        });

    }

    //This creates the detailed view
    function initializeDetail(event) {

        toDoContainer.empty();
        panelHeading.empty();
        var itemsToAdd = [];
        var addButton = $("<button><a href='/to-do" + userId + "'>Return to List</a> </button>");
        itemsToAdd.push(createDetail(items));
        toDoContainer.append(itemsToAdd);
        toDoContainer.append(addButton);
        panelHeading.append("Detail View:  Task # " + id);


    }

    //This adds the specific items to the detailed view.

    function createDetail(item) {

        var newItemDetailDiv = $("<div>");

        var newItemDetail = $(
            [//"",
               // "<div class = 'form-group'>",
             //  "<form id = 'addItem'>",
                "<label for='task'>Task Name:</label>",
                "<li class='list-group-item todo-item'>",
                "<span>",
                item.task,
                "</span>",
                "<input type='text' class='edit' style='display: none;'>",
                "</li>",
                //"</div>",
                //"<div class = 'form-group'>",
                "<label for='category'>Category:</label>",
                "<li class = 'list-group-item todo-item'>",
                "<span>",
                item.category,
                "</span>",
                "<input type = 'text' class = 'edit' style = 'display: none;'>",
                "</li>",
                //"</div>",
                //"<div class = 'form-group'>",
                "<label for='body'>Notes:</label>",
                "<li class = 'list-group-item todo-item'>",
                "<span>",
                item.body,
                "</span>",
                "<input type = 'text' class = 'edit' style = 'display: none;'>",
                "</li>"
               // "</form>"

                //"</div>",
                //"</form>"



            ].join("")
        );

        //var newItemDetail = $(
          //  ["<form id = 'addItem'>",
         //       "<div class = 'form-group'>",
         //       "<label for='task'>Task Name:    " + item.task + "</label>",
         //       "<input type='text' class='form-control' id='task';>",
         //       "</div>",
          //      "<div class = 'form-group'>",
          //      "<label for='category'>Category:    " + item.category + "</label>",
            //    "<input type = 'text' class = 'form-control' id='category';>",
         //       "</div>",
           //     "<label for='body'>Notes:    " + item.body + "</label>",
          //      "<input type = 'text' class = 'form-control' id = 'notes';>",
            //    "</div>",
              //  "</form>"

            //].join("")
       // );

        newItemDetail.data("item", item);
        var editBtn = $("<button class = 'btn btn-default editBtn'>Submit Edit</button>");
        editBtn.data("id", item.id);
        newItemDetailDiv.append(newItemDetail);
        newItemDetailDiv.append(editBtn);
        return newItemDetailDiv;
    }

    //This message alerts the user that they have no items in their list
    function displayEmptyItem(id) {
        var query = window.location.search;
        var partial = "";

        toDoContainer.empty();
        var messageh2 = $("<h2>");
        messageh2.css({ "text-align": "center", "margin-top": "50px" });
        messageh2.html("You do not have any items on your list" + partial + ". Click <a href='/add" + userId + "'>here</a> to get started.");
        toDoContainer.append(messageh2);
    }

    //This message alerts the user they have no items in a specific category.
    function displayEmptyCategory(id) {
        var query = window.location.search;
        var partial = "";
        toDoContainer.empty();
        var messageh2 = $("<h2>");
        messageh2.css({ "text-align": "center", "margin-top": "50px" });
        messageh2.html("You do not have any items in this category" + partial + ".  Click <a href='/to-do" + userId + "'>here</a> to return to your list.");
        toDoContainer.append(messageh2);
    }

    //This series of functions takes care of the update process


    function startItemUpdate(event) {
        id = $(this).data("id");
        console.log("this" + id)
        $.get("/api/todos/" + id, function(data) {
            console.log("Items", data);
            items = data;
            console.log(id);
        });
    }



    //};
    // $("#editBtn").on("click", function(event) {
    // updateItem(updatedItem);
    //  updateItem();
    //});

    function editToDo() {

        var currentItem = $(this).data("item");
        console.log(this);
        console.log(currentItem);
        $(this).children().hide();
        $(this).children("input.edit").val(currentItem.task);
        $(this).children("input.edit").val(currentItem.body);
        $(this).children("input.edit").val(currentItem.category);
        $(this).children("input.edit").val("");
        $(this).children("input.edit").show();
        $(this).children("input.edit").focus();
    }

    //var updatedItem;



    function finishEdit() {
        var updatedItem = $(this).data("item");
        console.log("this" + this);
        console.log("UP" + updatedItem);
        console.log("task" + updatedItem.task);
        console.log("body" + updatedItem.body);
        console.log("category" + updatedItem.category);





        // $("#editBtn").on("click", function(event) {

        //if (event.which === 13) {
        updatedItem.task = $(this).children("input").val().trim();
        updatedItem.body = $(this).children("input").val().trim();
        updatedItem.category = $(this).children("input").val().trim();
        $(this).blur();
        console.log("this is:" + updatedItem);

    }






    function updateItem(item) {

        $.ajax({
            method: "PUT",
            url: "/api/todos/" + id,
            data: item
        }).then(getItems);
    }

});