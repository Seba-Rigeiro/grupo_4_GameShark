const db = require('../database/models')

module.exports = {

    products: (req,res) => { 
        db.Product.findAll()
            .then(products => {
                res
                    .status(200)
                    .json ({
                        meta: {
                            totalProducts : products.length
                        },
                        data: products,
                        status: 'success'
                })
            })
            .catch(error => {
                res
                    .status(500)
                    .json ({
                        status: 'error',
                        error: error
                })
            })
    },

    productDetail: (req , res ) => {
        db.Product.findByPk(req.params.id)
        .then(productDetail => {
            
            if (!productDetail) {
                return res
                    .status(404)
                    .json ({
                        status: 'not_found'
                    })   
            }
            res
                .status(200)
                .json ({
                    data: productDetail,
                    status: 'success'
            })
        })
        .catch(error => {
            res
                .status(500)
                .json ({
                    status: 'error',
                    error: error
            })
        })
    },
}