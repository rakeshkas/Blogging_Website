const express = require('express');
const Router = express.Router();
const Article=require('../models/article');


// New form view 
Router.get('/new',(req,res)=>{
  res.render('article/new')
})

// update
Router.get('/edit/:id',async(req,res)=>{
  const article_date = await Article .findById({_id: req.params.id})
  res.render('article/edit', {article: article_date})
})

  

  Router.post('/edit/:id', async (req, res) => {
    try {
      const updatedArticle = await Article.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
  
      if (!updatedArticle) {
        console.log('Cannot find the article');
        return res.status(404).send('Article not found');
      }
  
      // Redirect to the home page or wherever you want to redirect after successful update
      res.redirect('/');
    } catch (err) {
      console.error('Error updating article:', err.message);
      res.status(500).send('Internal Server Error');
    }
  });
  
// single page view
Router.get('/:slug',async(req,res)=>{
  const article = await Article.findOne({slug:req.params.slug})
  if(article==null){res.redirect('/')}
  res.render('article/show',{article: article})
  })

Router.post('/',(req,res)=>{
  // console.log(req.body.title)
  const article =new Article({
    title:req.body.title,
    des:req.body.des,
    info:req.body.info
  })
  article.save().then(()=>{
    res.redirect(`/`)
  })
  
  
})

// delete

Router.get('/delete/:id', async (req, res) => {
  try {
    await Article.findByIdAndDelete(req.params.id).exec();
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.send('Sorry, an error occurred.');
  }
});


module.exports = Router;