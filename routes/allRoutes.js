const express = require('express')
const router = express.Router()
const MyData = require("../models/MyDataSchema");
var moment = require('moment');
const userControler = require("../Controler/userControler");


         //get request
   router.get("/", userControler.user_index_get);

   router.get("/edit/:id",userControler.user_edit_get);

  
  router.get("/user/add.html", (req, res) => { 
    res.render("user/add",{})
  });
  
  router.get("/view/:id", userControler.user_view_get);
  
  
      //post request
      router.post("/user/add.html", userControler.user_add_post); 
  
      //post request
            //search
    router.post("/search", userControler.user_search_get);

    // delet request
    router.delete("/user/:id", userControler.user_delet1);
    router.delete("/edit/:id", userControler.user_delet2);

    //update request
    router.put("/edit/:id", userControler.user_update);





module.exports = router