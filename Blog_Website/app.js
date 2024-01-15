const express = require('express');
const mongoose = require('mongoose');
const expressLayouts = require('express-ejs-layouts');
const Article=require('./models/article')

// routes
const userRouters = require('./routes/user')

const app = express();

//mongoose db
mongoose.connect('mongodb://localhost:27017/rakeshblog',{
  useNewUrlParser:true
})

// view
app.use(expressLayouts);
app.set('view engine','ejs');

// rout
app.get('/',async(req,res)=>{
  const article = await Article.find();
  // console.log(article)
  res.render('index',{article:article})
})

// body parser
app.use(express.json());
app.use(express.urlencoded({extended:true}))

// userRouters
app.use('/article',userRouters)



// public folder for css and js
app.use(express.static('public'))




const PORT = process.env.PORT || 8000
app.listen(PORT,()=>{
  console.log('working on Port 8000')
})