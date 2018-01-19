$(document).ready(function() {
    googleAPI();

    // Container holds all of our posts
    var toDoContainer = $(".list-group");
    var panelHeading = $(".panel-heading");
    var userName = $("#userName");
    var category;
    var id;


    // Click events for the edit and delete buttons and specific items
    $(document).on("click", "button.delete", deleteItem);
    //Note:  Need to include the edit functionality.
    //$(document).on("click", "button.edit", handleItemEdit);
    $(document).on("click", "a.specificItem", getSpecific);
    $(document).on("click", "button.grocery", getCategory);
    $(document).on("click", "button.bank", getCategory);
    $(document).on("click", "button.pharmacy", getCategory);


    var items;

    // This function grabs items from the database and updates the view
    function getItems(category) {

        $.get("/api/todos/", function(data) {
            items = data;
            console.log("Current Items: ", items);
            if (!items || !items.length) {
                displayEmpty();
            } else {
                initializeRows();
            }
        });
    }


    //THis function allows user to view items by category
    function getCategory(event) {
        event.stopPropagation();
        category = $(this).data("category");
        console.log("This " + category);
        $.get("/api/todos/category/" + category, function(data) {
            console.log("Items", data);
            items = data;
            console.log(items);
            if (!items || !items.length) {
                displayEmpty1();
            } else {
                initializeRowsCategory();
            }
        });
    }

    // Getting the initial list of toDos
    getItems();


    // InitializeRows handles appending all of our constructed item HTML inside
    // toDoContainer for the filtered list
    function initializeRows() {
        toDoContainer.empty();
        userName.empty();
        //NOTE:  We will need to code this once we figure out how we are capturing the user info.
        //var user = 
        var itemsToAdd = [];
        var addButton = $("<button id='add-btn'><a href='/add'><img src='../img/plus-circle.png'/></button>");
        var groceryBtn = $("<button>");
        groceryBtn.html("<img src='../img/star.png' />");
        groceryBtn.addClass("grocery btn btn-default");
        groceryBtn.data("category", "Groceries")
        var bankBtn = $("<button>");
        bankBtn.html("<img src='../img/box.png' />");
        bankBtn.addClass("bank btn btn-default");
        bankBtn.data("category", "Banking")
        var pharmacyBtn = $("<button>");
        pharmacyBtn.html("<img src='../img/globe.png' />");
        pharmacyBtn.addClass("pharmacy btn btn-default");
        pharmacyBtn.data("category", "Pharmacy")

        //Add more category buttons once we decide on categories

        for (var i = 0; i < items.length; i++) {
            itemsToAdd.push(createNewRow(items[i]));
        }
        toDoContainer.append(itemsToAdd);
        toDoContainer.append(addButton);
        toDoContainer.append(groceryBtn);
        toDoContainer.append(bankBtn);
        toDoContainer.append(pharmacyBtn);
        //We will need to append other category buttons once we decide on categories
        // userName.append("Hello" + user"!");
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
        var categoryIcon = $("<button>");
        categoryIcon.addClass("icon");
        categoryIcon.addClass(item.category);
        categoryIcon.html("<img src='../img/"+item.category+".png'/>");
        editBtn.html("<img src='../img/edit.png'/>");
        specificItem = $("<a class = specificItem></a>");
        specificItem.text(item.task);
        specificItem.data("id", item.id);

        newItemList.append(categoryIcon);
        newItemList.append(specificItem);
        newItemList.append(deleteBtn);
        newItemList.append(editBtn);


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
        var returnButton = $("<button><a href='/to-do'>Return to Complete List</a> </button>");
        for (var i = 0; i < items.length; i++) {
            itemsToAdd.push(createNewRow(items[i]));
        }
        toDoContainer.append(itemsToAdd);
        toDoContainer.append(returnButton);
        panelHeading.append(category)
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
        var addButton = $("<button><a href='/to-do'>Return to List</a> </button>");
        itemsToAdd.push(createDetail(items));
        toDoContainer.append(itemsToAdd);
        toDoContainer.append(addButton);
        panelHeading.append("Detail View:  Task # " + id);
    }

    //This adds the specific items to the detailed view.

    function createDetail(item) {

        var task = item.task;
        var category = item.category;
        var notes = item.body
        var newItemDetailDiv = $("<div>")
        var newItemDetail = $("<div class = 'container'><form id 'detailItem> <div class 'form-group><label for='title'>Task Name:</label><div id = 'taskName'> " + task + "</div> <br /> <label for = 'category'> Category:  </label> <div id = 'category'>" + category + "</div> <br /> <label for 'body'> Notes:  </label> <div id = 'notes'>" + notes + "</div>");
        var deleteBtn = $("<button>");
        deleteBtn.text("x");
        deleteBtn.data("id", item.id);
        deleteBtn.addClass("delete btn btn-danger");
        var editBtn = $("<button>");
        editBtn.text("EDIT");
        editBtn.addClass("edit btn btn-default");
        editBtn.data("id", item.id);
        newItemDetailDiv.append(newItemDetail);
        newItemDetailDiv.append(editBtn);
        newItemDetailDiv.append(deleteBtn);

        return newItemDetailDiv;
    }

    //This message alerts the user that they have no items in their list
    function displayEmpty(id) {
        var query = window.location.search;
        var partial = "";

        toDoContainer.empty();
        var messageh2 = $("<h2>");
        messageh2.css({ "text-align": "center", "margin-top": "50px" });
        messageh2.html("You do not have any items on your list" + partial + ". Click <a href='/add" + query +
            "'>here</a> to get started.");
        toDoContainer.append(messageh2);
    }

    //This message alerts the user they have no items in a specific category.
    function displayEmpty1(id) {
        var query = window.location.search;
        var partial = "";

        toDoContainer.empty();
        var messageh2 = $("<h2>");
        messageh2.css({ "text-align": "center", "margin-top": "50px" });
        messageh2.html("You do not have any items in this category" + partial + ".  Click <a href='/to-do" + query +
            "'>here</a> to return to your list.");
        toDoContainer.append(messageh2);
    }

    
function googleAPI(){

  var apiKey = "AIzaSyDku5hGYht2Deh0IIUDx0TEwx7uZH7llks";
  var keyWord = "grocery_or_supermarket";

  var queryURL = `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=33.673705%2C-84.312278&radius=50000&type=${keyWord}&key=${apiKey}`;
    // console.log(queryURL);

   $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function(response){
        console.log(response);
    });
};



});