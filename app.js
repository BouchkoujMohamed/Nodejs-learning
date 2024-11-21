const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");
app.use(express.urlencoded({extended:true}));


var methodOverride = require('method-override')
app.use(methodOverride('_method'))
const allRoutes = require('./routes/allRoutes')



app.use(express.static("public"));

// auto refresh
const path = require("path");
const livereload = require("livereload");
const liveReloadServer = livereload.createServer();

liveReloadServer.watch(path.join(__dirname, 'public'));
const connectLivereload = require("connect-livereload");
app.use(connectLivereload());

// reception
app.set("view engine","ejs")

liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
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


  app.use(allRoutes)