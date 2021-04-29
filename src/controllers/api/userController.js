const db = require('../../database/models')

module.exports = {

    users: (req,res) => { 
        
        db.User.findAll({
            attributes: ['first_name', 'last_name', 'email', 'image']
        })
            .then(users => {
                res
                    .status(200)
                    .json ({
                        meta: {
                           count : users.length
                            
                        },
                        data: users
                        ,
                        status: 'success'
                })
            })
            .catch(error => {
                console.log(error)
                res
                    .status(500)
                    .json ({
                        status: 'error',
                        error: error
                })
            })
    },

    userDetail: (req , res ) => {
        db.User.findByPk(req.params.id)
        .then(userDetail => {
            
            if (!userDetail) {
                return res
                    .status(404)
                    .json ({
                        status: 'not_found'
                    })   
            }
            res
                .status(200)
                .json ({
                    data: userDetail,
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