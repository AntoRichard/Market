var express = require('express');
var router = express.Router();
var fs = require('fs-extra');

// GET product model
var Product = require('../models/product');

var Category = require('../models/category');
// exports
router.get('/products',(req,res)=>{
    Product.find(function(err,products){
        if(err){
            console.log(err);
        }

        res.render('all_product',{
            title:'All products',
            products:products
        });
    });
});

// GET a page

router.get('/:category',(req,res)=>{
    var categorySlug = req.params.category;
    // console.log(categorySlug);
    Category.find({slug:categorySlug},function(err,c){
    
        Product.find({category:categorySlug},function(err,products){
            if(err){
                console.log(err);
            }

            res.render('cat_products',{
                title:c.title,
                products:products
            });
        });
    });
});

// product details
router.get('/:category/:product',function(req,res){
    var galleryImage = null;
    console.log(req.params.category);
    console.log(req.params.product);
    // console.log(req.params.id);
    Product.findOne({slug:req.params.product},function(err,pro){
        if(err){
            console.log(err);
        }else{
            // console.log(req.params.id);
            console.log(pro._id);
            var GalleryDir = 'public/product_images/'+ pro._id+'/gallery';
            console.log(GalleryDir);
            fs.readdir(GalleryDir,function(err,files){
                if(err){
                    console.log(err);
                }else{
                    galleryImage = files;
                    res.render('prod',{
                    title:pro.title,
                    p:pro,
                    galleryImage:galleryImage
                    });
                }
            });
        }
    });
});


module.exports = router;


