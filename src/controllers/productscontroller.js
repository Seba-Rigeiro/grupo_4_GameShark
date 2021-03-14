const db = require('../database/models')

module.exports = {
    detail : (req , res ) => {
        db.Product.findByPk(req.params.id)
            .then(productDetail => {
                res.render('detail', { product: productDetail })    
            })
                    
    },

    create : (req , res ) => {
        res.render('create');
    },

    edit : (req , res ) => {
        res.render('edit');
    }
}