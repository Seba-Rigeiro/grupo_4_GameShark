const { promiseImpl } = require('ejs')
const db = require('../database/models')

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

    createForm : (req , res ) => {
             
        Promise.all ([
            db.Category.findAll(),
            db.Platform.findAll()                    
        ])
        .then (([categories, platforms]) => {
            res.render('./products/create', {categories, platforms}) 
        })
    },

    create(req, res) {
        const { name, category_id, platform_id, description, price } =  req.body
        const { filename } = req.file

        db.Product.create({
            name, 
            category_id,
            platform_id,
            description, 
            price,
            image: filename
        })
            .then(product => {
                res.redirect('/products')
            })
            .catch(err => console.log(err))    
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