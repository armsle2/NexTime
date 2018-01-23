// *********************************************************************************
// html-routes.js - this file includes a set of routes for sending users to the various html pages in the NextTime Application.
// *********************************************************************************

// Dependencies
// =============================================================
var path = require("path");
var db = require('../models');

// Routes
// =============================================================
module.exports = function(app) {

  // Each of the below routes just handles the HTML page that the user gets sent to.

  app.get('/', function(req, res){
    res.render('index')
  })
  // Route to the to do list / user page
  app.get("/user/:id/to-do", function(req, res) {
    let currentUserID = req.params.id;
    db.Item.findAll({
      where: {
        UserId: currentUserID
      },
      include: [db.Category, db.User]
    }).then(function(tasks){
      if(tasks.length > 0){
        db.Category.findAll().then(function(allCategories){

          let currentCategories = [];
          //running loop based on user's tasks
          tasks.forEach((results, index)=>{
            let categoryID = results.Category.id;
            function checkTypeArray(type){
              return type.id != categoryID;
            }
            //pushing the category type_name of users tasks to array only ONCE
            // console.log(currentCategories.every(checkTypeArray))
            if(currentCategories.every(checkTypeArray)){
              currentCategories.push(results.Category);
            }
          });
          let userInfo = {
            tasks: tasks,
            categories: currentCategories,
            currentStatus: `All Items`,
            userName: tasks[0].User.firstName,
            userID: currentUserID,
            allCategories: allCategories,
            animation: true,
            animation2: true
          }
          // if(tasks.length > 1){
          //   userInfo.animation = false
          //   userInfo.animation2 = false
          // }
          res.render('to-do', userInfo)
            // userInfo.animation = false
            // userInfo.animation2 = false          

        })
      }else{
        db.User.findAll({
          where: {
            id: currentUserID
          }
        }).then(function(user){
          db.Category.findAll().then(function(allCategories){
            let blankUser = {
              allCategories: allCategories,
              currentStatus: `Your List`,
              userID: currentUserID,
              userName: user[0].firstName
            }
            res.render('blank-user', blankUser);
            // res.json(user);
          })
        })
        
      }
      
    })

  });

  app.get("/user/:id/category-items/:catId", function(req, res) {
    db.Item.findAll({
      where: {
        UserId: req.params.id
      },
      include: [db.Category, db.User]
    }).then(function(tasks){
      db.Category.findAll().then(function(allCategories){

        let currentCategories = [];
        let currentCategoryItems = [];         
        //running loop based on user's tasks
        tasks.forEach((results, index)=>{
          let categoryID = results.Category.id;
          function checkTypeArray(type){
            return type.id != categoryID;
          }
          //pushing the category type_name of users tasks to array only ONCE
          // console.log(currentCategories.every(checkTypeArray))
          if(currentCategories.every(checkTypeArray)){
            currentCategories.push(results.Category);
          }
          if(results.CategoryId == req.params.catId){
            currentCategoryItems.push(results);
          }
          
        });
        console.log(currentCategoryItems);
        if(currentCategoryItems.length < 1){
          res.redirect(`/user/${req.params.id}/to-do`)
        }else{
          let userItemInfo = {
            tasks: currentCategoryItems,
            categories: currentCategories,
            currentStatus: `Your ${currentCategoryItems[0].category} List`,
            viewAllItems: true,
            userID: req.params.id,
            allCategories: allCategories,
            userName: tasks[0].User.firstName,
            animation2: true
          }
          res.render('to-do', userItemInfo)
        }
      })
    })

  });

  app.get("/sign-in", function(req, res) {
    res.render('sign-in');
    });

  app.get("/sign-up", function(req, res) {
    res.render('sign-up');
    });

  app.get("/test", function(req, res) {

      db.Item.findAll().then(function(items){
        db.Category.findAll().then(function(categories){
          console.log(items);
          console.log(categories);
        })

      })
    });


};
