const { promiseImpl } = require('ejs')
const db = require('../database/models')
const { validationResult } = require ('express-validator');
const ACCEPTED_IMAGE_MIMETYPES = [ "image/png" , "image/jpg", "image/jpeg"]

module.exports = {
    detail : (req , res ) => {
        db.Product.findByPk(req.params.id)
            .then(productDetail => {
                res.render('./products/detail', { product: productDetail })    
        })
                    
    },

    products : (req , res) => {
        db.Product.findAll({
            include: ['category', 'platform'],
            order: [
                ['price', 'ASC']
            ]
        })
            .then (productsList => 
                res.render ("./products/index", {productsList})
            )        
    },

    productsByPlatform : (req , res) => {
        db.Product.findAll({
            include: ['category', 'platform'],
            order: [
                ['price', 'ASC']
            ],
            where: {
                platform_id: req.params.id
            }
           
        }) 
        .then (productsList => 
             res.render ("./products/index", {productsList})
        )        
      },

    productsByCategory : (req , res) => {
        db.Product.findAll({
            include: ['category', 'platform'],
            order: [
                ['price', 'ASC']
            ],
            where: {
                category_id: req.params.id
            }
        }) 
         .then (productsList => 
             res.render ("./products/index", {productsList})
        )        
    },

    createForm : (req , res ) => {
             
        Promise.all ([
            db.Category.findAll(),
            db.Platform.findAll()    
                            
        ])
        .then (([categories, platforms]) => {
            res.render('./products/create', {categories, platforms}) 
        })
    },

    create : (req, res) => {
        let errors = validationResult(req)
       
       console.log ('req.file', req.file)
       if (errors.isEmpty()) {
            const { name, category_id, platform_id, description, price } =  req.body
            let image = "product-image-default.jpg"
            
            if (req.file && ACCEPTED_IMAGE_MIMETYPES.includes(req.file.mimetype) || !req.file) {
                

                db.Product.create({
                    name, 
                    category_id,
                    platform_id,
                    description, 
                    price,
                    image: req.file ? req.file.filename : image
                })
                    .then(product => {
                        return res.redirect('/products')
                    })
            } else {
                Promise.all ([
                    db.Category.findAll(),
                    db.Platform.findAll()    
                                    
                ])
                .then (([categories, platforms]) => {
                    return res.render('./products/create', {categories: categories, platforms: platforms,  
                        errors: {
                            product_image: {
                                value: '',
                                msg: 'solo se aceptan archivos .jpg, jpeg, png',
                                param: 'password',
                                location: 'body'
                              }
                        },
                        oldFormData: req.body
                    }) 
                }) 
            }
            
        } else {
            Promise.all ([
                db.Category.findAll(),
                db.Platform.findAll()    
                                
            ])
            .then (([categories, platforms]) => {
                return res.render('./products/create', {categories: categories, platforms: platforms,  
                    errors: errors.mapped(),
                    oldFormData: req.body
                }) 
            })
        }
    },

    editForm : (req , res ) => {
        const id = req.params.id
        Promise.all ([
            db.Product.findByPk(id),
            db.Category.findAll(),
            db.Platform.findAll(),                   
        ])
       
        .then (([product, categories, platforms]) => {
            res.render('./products/edit', {product, categories, platforms}) 
        })
    },

    edit : (req , res ) => {
        const { id } = req.params
        const { name, category_id, platform_id, description, price } =  req.body
        
        db.Product.findByPk(id)
        .then(product => {
            const productImage = product.image
            
            db.Product.update({
                name,
                category_id,
                platform_id,
                description,
                price,
                image: req.file ? req.file.filename : productImage
            },

            {
                where: { id }
            })
    
            .then(() => {
                res.redirect('/products')
            })
            
            .catch(err => console.log(err))
        })    
                    
    },
       
    deleteProduct(req, res) {
        // Busca el producto por el id que viene en la ruta, y lo borra    
        db.Product.destroy({
                where: {
                    id: req.params.id
                }
        })
            // Direcciona al listado de productos
            .then((response) => {
                res.redirect('/products')
            })
    
    }            

  
} 