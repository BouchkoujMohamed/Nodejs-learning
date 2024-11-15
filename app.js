const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");
app.use(express.urlencoded({extended:true}));
const MyData = require("./models/MyDataSchema.js");
var moment = require('moment');


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


// app.get("/", (req, res) => {
//   // res.sendFile("./views/home.html", { root: __dirname });
  
//                  // reception
//   // find tada from mongodb
// //   MyData.find()
// //   .then((result)=>{res.render("home.ejs" ,{mytitle:"homepage", arr:result});})
// //   .catch(err=>{console.log(err)})
// });

          //  send data to mongo db
  // app.post("/", (req, res) => {
  //   console.log(req.body);
  //   const myData = new MyData(req.body);
  //   myData.save()
  //   .then(()=>{res.redirect("/index.html")})
  //   .catch(err =>{console.log(err)})
  // });

          //sure tada is sended
// app.get("/index.html", (req, res) => {
//   res.send("<h1>send sucses</h1>")
//    });


         //get request
app.get("/", (req, res) => {
  MyData.find()
    .then((result)=>{
      console.log(result)
      res.render("index",{result:result, moment:moment})})
    .catch(err=>{console.log(err)});
});


app.get("/user/add.html", (req, res) => { 
  res.render("user/add",{})
});

app.get("/user/edit.html", (req, res) => {
  res.render("user/edit",{})
});
app.get("/user/search.html", (req, res) => {
  res.render("user/search",{})
});

app.get("/user/:id", (req, res) => {
  MyData.findById(req.params.id)
    .then((result)=>{
      res.render("user/view.ejs",{result:result,moment:moment})
    })
    .catch(err=>{console.log(err)});
});

app.get("/user/:id", (req, res) => {
  
  MyData.findById(req.params.id)
    .then((result)=>{res.render("user/edit.ejs",{result:result})})
    .catch(err=>{console.log(err)});
});

    //post request
app.post("/user/add.html", (req, res) => {
    const user = new MyData(req.body);
    user.save()
    .then(()=>{res.redirect("/user/add.html")})
    .catch(err =>{console.log(err)})
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


  