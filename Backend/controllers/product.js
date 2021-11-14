const Product = require("../models/product")
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");


exports.getProductById = (req, res, next, id) =>{
    Product.findById(id)
    .populate("category")
    .exec((err, product)=>{
        if(err){
            return res.status(400).json({
                error: "Product not found"
            })
        }

        req.product = product;
        next();
    });
};

exports.createProduct= (req, res) =>{
    let form = formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req,(err, fields, file) =>{
        if(err){
            return res.status(400).json({
                error : "Problem with image."
            });
        }
        //Destructure the fields.
        const {name, description, price, category, stock} = fields;
        //Restrictions.        
        if(
            !name ||
            !description ||
            !price ||
            !category ||
            !stock
            ){
                return res.status(400).json({
                    error: "Please include all fields."
                })
            }

        let product = new Product(fields);
        
        //Handle file here.
        if(file.photo){
            if(file.photo.szie > 3000000)
            {
                return res.status(400).json({
                    error : "File size exceeded."
                });
            }
            product.photo.data = fs.readFileSync(file.photo.path);
            product.photo.contentType = file.photo.type
        }

        //Save to database.
        product.save((err, product) => {
            if(err){
                return res.status(400).json({
                    error : "Saving product in DB failed."
                });
            }

            res.json(product);
    
        });



    });
};

exports.getProduct=(req, res) =>{
    req.product.photo = undefined;
    return res.json(req.product);
};

//Middlesware to load phtotos.
exports.photo = (req, res, next) => {
    if(req.product.photo.data)
    {
        res.set("Content-Type", req.product.photo.contentType)
        return res.send(req.product.photo.data)
    }
    next();
};

exports.updateProduct = (req, res) => {

    let form = formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req,(err, fields, file) =>{
        if(err){
            return res.status(400).json({
                error : "Problem with image."
            });
        }
        
        let product = req.product;
        product = _.extend(product, fields);
        
        //Handle file here.
        if(file.photo){
            if(file.photo.szie > 3000000)
            {
                return res.status(400).json({
                    error : "File size exceeded."
                });
            }
            product.photo.data = fs.readFileSync(file.photo.path);
            product.photo.contentType = file.photo.type
        }

        //Update to database.
        product.save((err, product) => {
            if(err){
                return res.status(400).json({
                    error : "Product updated in DB failed."
                });
            }

            res.json(product);
    
        });



    });


};

exports.removeProduct = (req, res) =>{
    let product = req.product;

    product.remove((err, deletedProduct) =>{
        if(err){
            return res.status(400).json({
                error : "Failed to delete product."
            })
        }
        res.json({
            message: "Succesfully deleted."
        });
});
}

exports.getAllProducts = (req, res) => {
    let limit = req.query.limit ? parseInt(req.query.limit) : 10
    let sortBy = req.query.sortBy ? req.query.sortBy : "_id"


    Product.find()
    .select("-photo")
    .sort([[sortBy, "asc"]])
    .limit(limit)
    .exec((err, products)=>{
        if(err){
            return res.status(400).json({
                error : "No products found."
            })
        }
        res.json(products);
    });
}

exports.getAllUniqueCategories = (req, res) => {
    Product.distinct("category", {}, (err, categories) => {
        if(err){
            return res.status(400).json({
                error : "No categories found."
            })
        }
        res.json(categories);
    })
}

//Middleware to update stock
exports.updateStock = (req, res, next) => {
    let myOperations = req.body.products.map(prod =>{
        return {
            updateOne: {
                filter: { _id : prod._id },
                update: {$inc: {stock: -prod.count, sold: +prod.count}}
            }
        }
    })

    Product.bulkWrite(myOperations, {}, (err, products)=>{
        if(err){
            return res.status(400).json({
                error : "BULK OPERATION FAILED."
            })
        }

        next();
    });
}