const db = require('../database/models');
const { validationResult } = require ('express-validator');

module.exports = {
    
    index : (req , res) => {
        db.User.findAll({
        })
         .then (userList => 
             res.render ("./users/index", {userList})
          )        
           
      },
    
    detail : (req , res) => {
        db.User.findByPk(req.params.id)
            .then(userDetail => {
                res.render('./users/detail', { user: userDetail })    
            })
                    
    },

    editForm : (req , res) => {
        const id = req.params.id
        Promise.all ([
            db.User.findByPk(id),
        ])
       
        .then (([user]) => {
            res.render('./users/edit', {user}) 
        })
    },

    edit : (req , res ) => {
        const { id } = req.params
        const { first_name, last_name, email, } =  req.body
        
        db.User.findByPk(id)
        .then(user => {
            const userImage = user.image
            
            db.User.update({
                first_name,
                last_name,
                email,
                image: req.file ? req.file.filename : userImage
            },

            {
                where: { id }
            })
    
            .then(() => {
                res.redirect('/users')
            })
            
            .catch(err => console.log(err))
        })    
                    
    },
    
    deleteUser(req, res) {
        // Busca el producto por el id que viene en la ruta, y lo borra    
        db.User.destroy({
                where: {
                    id: req.params.id
                }
            })
            // Direcciona al listado de productos
            .then((response) => {
                res.redirect('/users')
                })
            }            
}