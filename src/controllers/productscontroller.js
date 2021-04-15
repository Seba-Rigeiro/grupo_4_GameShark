const { promiseImpl } = require('ejs')
const db = require('../database/models')

module.exports = {
    detail : (req , res ) => {
        db.Product.findByPk(req.params.id)
            .then(productDetail => {
                res.render('detail', { product: productDetail })    
            })
                    
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
        /* .then ( promises => { 
            const product = promises [0]
            const categories = promises [1]
            const platforms = promises [2]
            if (product) {
            res.render('edit', {product, categories, platforms}) 
            }
        }) */
        .then (([product, categories, platforms]) => {
            res.render('edit', {product, categories, platforms}) 
        })
        /* res.render('edit'); */
    },

    edit : (req , res ) => {

        res.render('edit');
    },
}