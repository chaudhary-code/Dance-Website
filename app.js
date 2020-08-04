const express = require("express");
const path = require("path");
const app = express();
const mongoose = require('mongoose');
const bodyparser = require("body-parser")
mongoose.connect('mongodb://localhost/contactDance', {useNewUrlParser: true});
const port = 8000;



// define mongoose schema
var contactSchema = new mongoose.Schema({
   name: String,
   phone: String,
   email: String,
   address: String,
   concern: String
 });

 var Contact = mongoose.model('Contact', contactSchema);

//EXPRESS SPECIFIC STUFF

app.use('/static',express.static('static')) // for serving ststic files
app.use(express.urlencoded())

//PUG SPECIFIC STUFF
app.set('view engine', 'pug')// set the pug template engine
app.set('views', path.join(__dirname,'views'))// set the views director

// ENDPOINTS
app.get ('/',(req,res)=>{
    const params = { }
    res.status(200).render('home.pug', params);
 })

 app.get ('/contact',(req,res)=>{
    const params = { }
    res.status(200).render('contact.pug', params);
 })


 app.post ('/contact',(req,res)=>{
    var myData = new Contact(req.body);
    myData.save().then(()=>{
       res.send("This item has been save to Database")
    }).catch(()=>{
       res.status(400).send("Item was not saved t the database")
    })

   // res.status(200).render('contact.pug');
 })

 // START THE SERVER
app.listen(port, () => {
    console.log(`The application startrd on port${port}`)
 })
 
