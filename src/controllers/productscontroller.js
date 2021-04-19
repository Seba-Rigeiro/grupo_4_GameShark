const { promiseImpl } = require('ejs')
const db = require('../database/models')

module.exports = {
    detail : (req , res ) => {
        db.Product.findByPk(req.params.id)
            .then(productDetail => {
                res.render('detail', { product: productDetail })    
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
             res.render ("products", {productsList})
          )        
           
      },

      productsByPlatform : (req , res) => {
        db.Product.findAll({
            include: ['category', 'platform'],
            order: [
                ['price', 'ASC']
            ],
            where: {
                platform_id: true
            }
           
        })
         .then (productsList => 
             res.render ("products", {productsList})
          )        
          
      },

    createForm : (req , res ) => {
        // db.Category.findAll()                    
        //  .then (categories => {
        // res.render('create', {categories})
        //  })
        // //  db.Platform.findAll()                    
        //  .then (platforms => {
        // res.render('create', {platforms})
        //  })     
        Promise.all ([
            db.Category.findAll(),
            db.Platform.findAll()                    
        ])
        .then (([categories, platforms]) => {
            res.render('create', {categories, platforms}) 
        })
    },

    create(req, res) {
        const { name, category_id, platform_id, price } =  req.body
        console.log ()

        db.Product.create({
            name, 
            category_id,
            platform_id, 
            price,
            
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
            res.render('edit', {product, categories, platforms}) 
        })
    },

    edit : (req , res ) => {
            const { id } = req.params
            const { name, category_id, platform_id, price,  } =  req.body

            db.Product.findByPk(id)
                .then(product => {
                    
                    db.Product.update({
                    name,
                    category_id,
                    platform_id,
                    price,
                    image: 
                    {
                        where: {    
                        id
                        }
                    }
                
            
                    .then(() => {
                        res.redirect('/products')
                    })
                    .catch(err => console.log(err))
                }    
            
                    )}        
                )},

  
} 