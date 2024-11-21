const MyData = require("../models/MyDataSchema");
var moment = require('moment');


const user_index_get = (req, res) => {
    MyData.find()
      .then((result)=>{
        // console.log(result)
        res.render("index",{result:result, moment:moment})})
      .catch(err=>{console.log(err)});
  }

  const user_edit_get = (req, res) => {
    MyData.findById(req.params.id)
      .then((result)=>{res.render("user/edit.ejs",{result:result,moment:moment})})
      .catch(err=>{console.log(err)});
  }

  const user_view_get= (req, res) => {
    MyData.findById(req.params.id)
      .then((result)=>{
        res.render("user/view.ejs",{result:result,moment:moment})
      })
      .catch(err=>{console.log(err)});
  }
  const user_add_post= (req, res) => {
  
    MyData.create(req.body)
    .then(()=>{res.redirect("/")})
    .catch(err =>{console.log(err)})
  };
  const user_delet1 = (req, res) => {
    MyData.deleteOne({_id:req.params.id})
    .then(()=>{
      res.redirect("/")
    })
    .catch(err=>{console.log(err)});
  };
  const user_delet2 = (req, res) => {
    MyData.findByIdAndDelete(req.params.id)
    .then(()=>{
      res.redirect("/")
    })
    .catch(err=>{console.log(err)});
  };
  const user_update = (req, res) => {
    MyData.updateOne({_id:req.params.id}, req.body)
    .then(()=>{
      res.redirect("/")
    })
    .catch(err=>{console.log(err)});
  };

  const user_search_get = (req, res) => {
    const searchtext= req.body.searchtext.trim()
    
    MyData.find({$or:[{firstName:searchtext},{lastName:searchtext}]})
    .then((result)=>{
    //   console.log("****************************")
    //   console.log(result)
      res.render("user/search.ejs",{result:result,moment:moment})
    })
    .catch(err=>{console.log(err)});
  }



  module.exports = {user_index_get , user_edit_get, user_view_get, user_add_post, user_update, user_delet1, user_delet2, user_search_get}