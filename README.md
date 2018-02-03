# NextTime App 

## Contributors:
Leaveil Armstrong, Lisa Ewart, Taly Huang, and Janessa Hanna

## Description:
NexTime is a Smart To-Do list that reminds you about items on your list when you are nearby retail locations that match the categories of those items.

## Concept:

You have just battled Atlanta traffic and now you are finally home.  Oops -- you forgot to pick up the main ingredient you need for the dinner you are making.  The last thing you want to do is go back out.  Sign up for the NexTime app, and next time you will not have to go back out because next time you won't forget!  

NexTime is the future of the to-do list.  It is a smart to-do list that will revolutionize the way we write to-lists and complete tasks. NexTime provides the user with a sleek and user-friendly interface in which the user can compile all tasks.  While the user is on the move, NexTime will periodically identify the user’s location and send an alert when the user is within a certain distance of a place where an item on the to-list can be completed.  

NexTime’s task list is interactive, providing the user with multiple fields to detail daily tasks and multiple ways in which to view tasks. It is the perfect tool for anyone who wants to be organized and efficient!  

## Technology Overview:
This application employs a variety of technologies, including:  Node.js, Handlebars, MySQL, HTML5 Geolocation, Bootstrap, Sequelize, Express, CSS, Javascript, HTML, JQuery, modals, Animate.css, and the Google Places API.

Within MySQL, the application accesses one database with three separate tables.  The application employs a CRUD format to provide the user with various interactions with the database.  

The application uses HTML Geolocation using the .watchPosition method to determine the location of the user.  Once the application detects that the user has moved or is in a new location, the application uses the category information associated with specific tasks and the location of the user to run an AJax call to the Google Places API.  The NexTime application then returns the top five options in the area where a user can complete one or more to-do items on their list. The user is alerted using modal technology.  

## Instructions:  

The application can be viewed at this website:  https://nex-time.herokuapp.com/.  

Upon entering the application, first time users are asked to create a new user and returning users are asked to provide their log-in credentials.  

One the user is logged in, the user can access the items on their individualized NexTime to-do lists.  If the user has no items on the list, the user will be redirected to an interface where the user can create to-do items through entering the task, selecting a corresponding category for that task, and adding any notes that the user has associated with that task.  

Once the list is populated, the user has a variety of display options.  The default is the list in its entirety, but if the uses clicks on the category icon next to the task name, the user can view all items in that category.  By clicking on the icon to the right of the task name, the user can view the item in detail and make any updates to that item.  By clicking on the task name, the user can mark the task as complete, and by clicking on the delete icon, the user can delete items from the to-do list.  

Once NexTime identifies places of business in the area where a user can complete one or more items on their list, the application will send a modal alert to the user indicating the places within a certain distance from the user.  

## Future Development:  

This application has limitless potential, and the team has started brainstorming ideas for future development.  Potential areas for future development include:

* User manipulated radius for location notification.
* Google Maps integration.
* Ability for user to insert specific locations that user would like to visit in the future.
* Ability for user to click on a location and add to NexTime list.
* Walk Mode and Drive Mode 
* Expanded selection of categories.
* Interface with locations in area to display coupons and compare prices for items on list.
* Mobile platform with direct mobile notifications.
* Smart technology that makes suggestions based on user preferences determined from user habits. 

## Screenshots:

* Landing Page
![landing page](https://user-images.githubusercontent.com/32542804/35289190-9bb0708e-0034-11e8-9a6a-ba4e30012328.png)


* Create Account Page
![createaccount](https://user-images.githubusercontent.com/32542804/35289188-9b9d2cea-0034-11e8-8152-1b728b7adc32.png)


* Login Page
![login](https://user-images.githubusercontent.com/32542804/35289191-9bbbf684-0034-11e8-8574-2555697d85d6.png)


* User page (full list display)
![userpagefulldisplay](https://user-images.githubusercontent.com/32542804/35289197-9d2e0566-0034-11e8-9714-fccdf6136d4c.png)


* User page (item detail and update display)
![userpageupdate](https://user-images.githubusercontent.com/32542804/35289200-9d8451be-0034-11e8-906a-2906de90b858.png)


* User page (add item)
![userpageadditem](https://user-images.githubusercontent.com/32542804/35289195-9c94615e-0034-11e8-8ea6-a1a678b477d3.png)


* User page (display by category)
![userpagecategorydisplay](https://user-images.githubusercontent.com/32542804/35289196-9cf80ca4-0034-11e8-953c-9640632b9649.png)


* Notification Modal
![notificationmodal](https://user-images.githubusercontent.com/32542804/35289192-9bc7f09c-0034-11e8-807b-0406e081d9b9.png)


* Notification Modal (detail)
![notificationmodaldetail](https://user-images.githubusercontent.com/32542804/35289193-9c2becaa-0034-11e8-9118-c14d0a90f152.png)



