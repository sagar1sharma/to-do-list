const express = require ("express");
const bodyParser = require ("body-parser");
const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://sagar:test123@cluster0.jyo05.mongodb.net/todolistDB", {useNewUrlParser:true});

const itemsSchema = new mongoose.Schema({
    name: String
});

const Item = mongoose.model("item", itemsSchema);

const monday = new Item({
    name: "Monday"
});
const tuesday = new Item({
    name: "Tuesday"
});
const wednesday = new Item({
    name: "Wednesday"
});

// Item.insertMany([monday, tuesday, wednesday]);

const app = express();
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/", function(req, res){
    Item.find(function(err, item){
               res.render('index', {kindOfDay: "Today", newListItems: item})
            });
    })
    

app.post("/", function(req, res){
    var item = req.body.newItem;
    const newItem = new Item({
        name: item
    })
    newItem.save();
    res.redirect("/");
})

app.get("/:topic", function(req, res){
    console.log(req.params.topic);
})

app.post("/delete", function(req, res){
    const checked_id = req.body.checkbox;
    Item.findByIdAndRemove(checked_id, function(err){});
    res.redirect("/")
})

app.listen(3000, function(){
    console.log("server has started successfully");
});