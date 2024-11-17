const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");
app.use(express.urlencoded({extended:true}));
const MyData = require("./models/MyDataSchema.js");
var moment = require('moment');

var methodOverride = require('method-override')
app.use(methodOverride('_method'))



app.use(express.static("public"));

// auto refresh
const path = require("path");
const livereload = require("livereload");
const liveReloadServer = livereload.createServer();

liveReloadServer.watch(path.join(__dirname, 'public'));
const connectLivereload = require("connect-livereload");
app.use(connectLivereload());

liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});


// reception
app.set("view engine","ejs")

         //get request
app.get("/", (req, res) => {
  MyData.find()
    .then((result)=>{
      // console.log(result)
      res.render("index",{result:result, moment:moment})})
    .catch(err=>{console.log(err)});
});

app.get("/user/add.html", (req, res) => { 
  res.render("user/add",{})
});

app.get("/view/:id", (req, res) => {
  MyData.findById(req.params.id)
    .then((result)=>{
      res.render("user/view.ejs",{result:result,moment:moment})
    })
    .catch(err=>{console.log(err)});
});

app.get("/edit/:id", (req, res) => {
  MyData.findById(req.params.id)
    .then((result)=>{res.render("user/edit.ejs",{result:result,moment:moment})})
    .catch(err=>{console.log(err)});
});

    //post request
app.post("/user/add.html", (req, res) => {

    MyData.create(req.body)
    .then(()=>{res.redirect("/")})
    .catch(err =>{console.log(err)})
  });

  // delet request
  app.delete("/user/:id", (req, res) => {
    MyData.deleteOne({_id:req.params.id})
    .then(()=>{
      res.redirect("/")
    })
    .catch(err=>{console.log(err)});
  });

  app.delete("/edit/:id", (req, res) => {
    MyData.findByIdAndDelete(req.params.id)
    .then(()=>{
      res.redirect("/")
    })
    .catch(err=>{console.log(err)});
  });

  //update request
  app.put("/edit/:id", (req, res) => {
    MyData.updateOne({_id:req.params.id}, req.body)
    .then(()=>{
      res.redirect("/")
    })
    .catch(err=>{console.log(err)});
    
  });


       //connection with mongo db
mongoose
  .connect("mongodb+srv://bouchkoujmohamed200:ysThYVCmVg6EMIdI@cluster0.itmma.mongodb.net/node-data?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => {
    app.listen(port, () => {
        console.log(`http://localhost:${port}/`);
    });
  })
  .catch((err) => {console.log(err)});


  