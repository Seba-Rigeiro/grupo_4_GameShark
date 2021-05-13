const db = require('../../database/models')

module.exports = {
    index: (req,res) => { 
        db.Platform.findAll()
            .then(platforms => {
                res
                    .status(200)
                    .json ({
                        meta: {
                            count : platforms.length,
                             
                         },
                        data: platforms,
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