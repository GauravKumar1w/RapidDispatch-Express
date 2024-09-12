const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const dotenv = require("dotenv");
const app = express();
const ejs = require("ejs");
const md5 = require("md5");
const path = require("path");
const mongoose = require("mongoose");


mongoose.connect('mongodb://127.0.0.1:27017/transport', { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
  console.log("Connected to database");
}).catch((err) => {
  console.log(err);
});
app.set("view engine", "ejs");
app.set("views", "public");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Load routers
app.use("/", require("./server/routes/router"));

// Authentication
const adminDB = require("./server/model/admin");
const customerDB = require("./server/model/customer");
const { redirect } = require("express/lib/response");

// Admin signup hidden
app.get("/register", function (req, res) {
  res.render("register");
});



// Admin Login
app.get("/login", function (req, res) {
  res.render("login");
});

//Admin login
app.post("/login", function (req, res) {
  const username = req.body.RIG;
  const password = md5(req.body.password);
  adminDB.findOne({ RIG: username }, function (err, foundUser) {
    if (err) res.redirect("/failure");
    else {
      if (foundUser) {
        if (foundUser.password === password) res.redirect("/managerview");
        else res.redirect("/failure");
      }
    }
  });
});

//User signup
app.get("/createnewuser", function (req, res) {
  res.render("createnewuser");
});

//Employee signup
app.post("/createnewuser", function (req, res) {
  const newAdmin = new customerDB({
    RIG: req.body.RIG,
    password: md5(req.body.password),
  });

  newAdmin.save(function (err) {
    if (err) res.redirect("/failure");
    else {
      //alert("successfully registered");
      res.redirect("/login");
    }
  });
});

// User Login
app.get("/managerlogin", function (req, res) {
  res.render("managerlogin");
});

//User Login
app.post("/managerlogin", function (req, res) {
  const username = req.body.RIG;
  const password = md5(req.body.password);
  customerDB.findOne({ RIG: username }, function (err, foundUser) {
    if (err) res.redirect("/failure");
    else {
      if (foundUser) {
        if (foundUser.password === password) res.redirect("/view");
        else res.redirect("/failure");
      }
    }
  });
});
// for payment purpose
// app.post("/checktoken",function(req,res){
// 	//const token=req.body.paytoken;

// 	    //  if(token==="token123")
// 		{
// 			// if(token==="token123")
// 		{res.redirect("/seetruckdetail?id="+ req.body.id);
// 				//   {res.redirect("/seecasedetail/"+req.body.id);
// 		}
// 				// else
// 				// 	res.redirect("/failure");

// 		}

// })
app.post("/managerloginfun", function (req, res) {
  const username = req.body.RIG;
  const password = md5(req.body.password);
  adminDB.findOne({ RIG: username }, function (err, foundUser) {
    if (err) res.redirect("/failure");
    else {
      if (foundUser) {
        if (foundUser.password === password) res.redirect("/managerview");
        else res.redirect("/failure");
      }
    }
  });
});
// // for payment purpose
app.post("/makepayment", function (req, res) {
  res.redirect("/makepayment");
});

app.listen(5000, function (req, res) {
  console.log("server running on port 5000");
});
