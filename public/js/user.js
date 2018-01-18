$(document).ready(function() {


  /* global moment */
  // Container holds all of our posts
  var toDoContainer = $(".list-group");

  //NOTE FOR TEAM == The code below does not yet work.
  // Click events for the edit and delete buttons
 // $(document).on("click", "button.delete", handleItemDelete);
  //$(document).on("click", "button.edit", handleItemEdit);
  //$(document).on("click", "button.specificItem", handleDetailView);
 var items;

  //This captures the ID of the item for which we want the more detailed view

  //function handleDetailView() {
   
  //  var currentItem = $(this)
  //  console.log("this is:" + currentItem)
  //    .parent()
  //    .parent()
  //    .data("item");
 //   window.location.href = "/detailView?item_id=" + currentItem.id;
    
 // }

  // This function grabs items from the database and updates the view
  function getItems(category) {
    
    $.get("/api/todos/", function(data) {
      console.log("Items", data);
      items = data;
      console.log(items);
      if (!items || !items.length) {
        displayEmpty();
      }
      else {
        initializeRows();
      }
    });
  }

  

  // Getting the initial list of toDos
  getItems();
  // InitializeRows handles appending all of our constructed item HTML inside
  // toDoContainer
  function initializeRows() {
    toDoContainer.empty();
    var itemsToAdd = [];
    var addButton = $("<button><a href='/add'>Add an Item</a> </button>");

    for (var i = 0; i < items.length; i++) {
      itemsToAdd.push(createNewRow(items[i]));
    }
    toDoContainer.append(itemsToAdd);
    toDoContainer.append(addButton);
  }

  // This function constructs a post's HTML

  function createNewRow(item) {
    var newItemList = $("<li>");
    newItemList.addClass("list-group-item new-item");
    var deleteBtn = $("<button>");
    deleteBtn.text("x");
    deleteBtn.addClass("delete btn btn-danger");
    var editBtn = $("<button>");
    editBtn.text("EDIT");
    editBtn.addClass("edit btn btn-default");
    
    //var newItem = $("<div>" + item.title + "</div>");


    newItemList.append(item.task);  
    newItemList.append(deleteBtn);
    newItemList.append(editBtn);
    
    
    return newItemList;
  }

  function displayEmpty(id) {
    var query = window.location.search;
    var partial = "";
    
    toDoContainer.empty();
    var messageh2 = $("<h2>");
    messageh2.css({ "text-align": "center", "margin-top": "50px" });
    messageh2.html("No items yet" + partial + ", navigate <a href='/add" + query +
    "'>here</a> in order to get started.");
    toDoContainer.append(messageh2);
  }





});






