const db = require('../../database/models')

module.exports = {

    index: (req,res) => { 
        db.Product.findAll()
            .then(products => {
                res
                    .status(200)
                    .json ({
                        meta: {
                           count : products.length,
                            
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

    lastProduct: (req,res) => {
        db.Product.findAll({
            limit: 1,
            order: [ [ 'createdAt', 'DESC' ]]
          }).then(function(product){
            res
            .status(200)
            .json ({
                
                data: product,
                status: 'success'
        })
          }); 
    }

}