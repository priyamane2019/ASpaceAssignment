const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken")
const cookieParser = require("cookie-parser");
require('../db/conn');
router.use(cookieParser());
const User = require("../model/userSchema")
const Product = require("../model/Product");
const authenticate = require("../middleware/Authenticate");


///////Register data  Store in database///////////////////////////////////////////////
router.post("/register", (req, res) => {
    const { name, email, phone, address, password, cpassword } = req.body;

    // console.log(name);
    if (!name || !email || !phone || !address || !password || !cpassword) {
        return res.status(422).json({ error: "Plz filled the feild properly " });
    }

    User.findOne({ email: email })
        .then((userExist) => {
            if (userExist) {
                return res.status(422).json({ error: "User Already Exist" });
            }

            else if (password != cpassword) {
                return res.status(422).json({ error: "password Should match" });
            }
            else {

                const user = new User({ name, email, phone, address, password, cpassword })
                user.save().then(() => {
                    res.status(201).json({ message: "user registartaion successfully" })
                }).catch((err) => res.status(500).json({ error: "Failed to register" }))
            }
        }).catch(err => {
            console.log(err);
        })
})


////////Login Data store in Database///////////////////////////////////////////////
router.post("/login", (req, res) => {
    let token;
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "Plz filled the feild properly " });
        alert("Password should match");
    }

    User.findOne({ email: email })
        .then((userExist) => {
            if (userExist) {
                bcrypt.compare(password, userExist.password, (err, isValid) => {
                    token = userExist.generateAuthToken();
                    res.cookie("jwtoken", token, {
                        expires: new Date(Date.now() + 2589000000),
                        httpOnly: true
                    });
                    if (isValid) {
                        return res.status(200).json({ message: "login Successfully" });
                    }
                    else {
                        return res.status(400).json({ error: "Error Crediential" });
                        }
                     })
            }
                        else {
                             return res.status(400).json({ error: "user error plz create account" });
                             }

        })
})

/////////////////////Authentication for Valid User To Access About Page////////////////////////////////

router.get("/about", authenticate, (req, res) => {
    res.send(req.rootUser);

})


///////////CRUD operations for  Product /////////////////////////////////////////



//create first route --add Todo Item to database
router.post('/api/item', async (req, res)=>{
  try{
    const newItem = new Product({
      item: req.body.item
    })
    //save this item in database
    const saveItem = await newItem.save()
    res.status(200).json(saveItem);
  }catch(err){
    res.json(err);
  }
})

//create second route -- get data from database
router.get('/api/items', async (req, res)=>{
  try{
    const allTodoItems = await Product.find({});
    res.status(200).json(allTodoItems)
  }catch(err){
    res.json(err);
  }
})


//update item
router.put('/api/item/:id', async (req, res)=>{
  try{
    //find the item by its id and update it
    const updateItem = await Product.findByIdAndUpdate(req.params.id, {$set: req.body});
    res.status(200).json(updateItem);
  }catch(err){
    res.json(err);
  }
})


//Delete item from database
router.delete('/api/item/:id', async (req, res)=>{
  try{
    //find the item by its id and delete it
    const deleteItem = await Product.findByIdAndDelete(req.params.id);
    res.status(200).json('Item Deleted');
  }catch(err){
    res.json(err);
  }
})


module.exports = router;
