const db = require('../../database/models')

module.exports = {
    index: (req,res) => { 
        db.Category.findAll()
            .then(categories => {
                res
                    .status(200)
                    .json ({
                        
                        data: categories,
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
    }
}