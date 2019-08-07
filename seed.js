var mongoose = require("mongoose");
 var Articles = require("./models/articles");
 var Comment   = require("./models/comment");
 
 var data = [
     {
         title: "Cloud's Rest", 
         author: "Fortune",
         body: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
     },
  
 ]

function seedDB(){
    //Remove all campgrounds
    Articles.remove({}, function(err){
         if(err){
             console.log(err);
         }
         console.log("removed campgrounds!");
          //add a few campgrounds
         data.forEach(function(seed){
            Articles.create(seed, function(err, articles){
                 if(err){
                     console.log(err)
                 } else {
                     console.log("added a article");
                //create a comment
                Comment.create(
                    {
                        content: "This place is great, but I wish there was internet",
                        author: "Homer",
                    }, 
                  
                    function(err, comment){
                        if(err){
                            console.log(err);
                        } else {
                             articles.comments.push(comment)
                             articles.save()

                            console.log("Created new comment");
                        }
                    });
                 }
             });
         });
     }); 
     //add a few comments
 }
 
 module.exports = seedDB;




