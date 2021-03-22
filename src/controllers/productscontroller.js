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
        const { name, category_id, price } =  req.body

        db.Product.create({
            name, 
            category_id, 
            price
        })
            .then(product => {
                res.redirect('/')
            })
            .catch(err => console.log(err))    
    },

    editForm : (req , res ) => {
        res.render('edit');
    },

    edit : (req , res ) => {
        res.render('edit');
    },
}