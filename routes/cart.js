
var express = require('express');
var router = express.Router();
var Product = require('../models/product');

// exports
router.get('/',(req,res)=>{
    Page.findOne({slug:'home'},function(err,page){
        if(err){
            console.log(err);
        }
            res.render('index',{
                title:page.title,
                content:page.content
            });
    });
});

// GET a page
router.get('/:slug',(req,res)=>{

    var slug = req.params.slug;

    Page.findOne({slug:slug},function(err,page){
        if(err){
            console.log(err);
        }
        if(!page){
            res.redirect('/');
        }else{
            res.render('index',{
                title:page.title,
                content:page.content
            });
        }
    });
    
});


module.exports = router;
