const db = require('../database/models');
const { validationResult } = require ('express-validator');
//const sequelize = db.sequelize

module.exports = {
    index : ( req , res) => {
        res.render('index');
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

    login : (req , res) => {
        res.render('login');
    },

    registerForm : (req , res) => {
        res.render('register');
    },

    register : (req , res) => {
        let errors = validationResult(req);      
        if (errors.isEmpty()) {
        
            const { name, email, password } =  req.body

            db.User.create({
            name, 
            email, 
            password
            })
            .then(user => {
                res.redirect('/')
            })
        } else {
            res.render('register', { 
                errors: errors.mapped(),
                oldFormData: req.body
            });
        }   
    },

     
       
    mycart : (req , res) => {
        res.render('mycart');
    }
}


