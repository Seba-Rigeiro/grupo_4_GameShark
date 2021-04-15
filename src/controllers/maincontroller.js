const db = require('../database/models');
const { validationResult } = require ('express-validator');
const bcrypt = require ('bcryptjs')
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

    loginForm : (req , res) => {
        res.render('login');
    },

    loginAuth(req, res) {
        let errors = validationResult(req);      
          if (errors.isEmpty()) {
            
        db.User.findOne({
            where: {
                email: req.body.email
            }
        } )   
            .then (user => {                
                if(user) {
                    if (bcrypt.compareSync(req.body.password, user.password)) { 
                        req.session.user
                        return res.redirect('/products') 
            }
                } else {
                    res.render('login', { 
                        errors: errors.mapped(),
                        oldFormData: req.body
                    });
            }
            })       
    }},

    logout: (req,res) =>{ 
        req.session.destroy()
        res.redirect ('/')
    },

    registerForm: (req , res) => {
        res.render('register');
    },

    register : (req , res) => {
        let errors = validationResult(req); 
        let passwordHash = bcrypt.hashSync(req.body.password, 10)     
        if (errors.isEmpty()) {
        
            const { name, email, password } =  req.body
            
            db.User.create({
            name: name, 
            email: email, 
            password: passwordHash
           
        
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


