const db = require('../database/models');
const { validationResult } = require ('express-validator');
const bcrypt = require ('bcryptjs')
//const sequelize = db.sequelize

module.exports = {
    index : ( req , res) => {
        res.render('index');
    },

    
    loginForm : (req , res) => {
        res.render('login');
    },

    loginAuth (req, res) {
        let errors = validationResult(req);
        // Si no hay errores, buscar el usuario por mail
        if (errors.isEmpty()) {
            
            db.User.findOne({
                where: {
                    email: req.body.email
                }
            })
            .then (user => {
                if(user) {
                    user.email = req.body.email
                    console.log (user)
                    return res.redirect('/products')
                } else {
                    res.render('login', {
                        errors: {
                            email: {
                                value: '',
                                msg: 'Ingresa un email valido',
                                param: 'email',
                                location: 'body'
                              }
                        },
                        oldFormData: req.body
                    })
                }
                    if (bcrypt.compareSync(req.body.password, user.password)) {
                        req.session.user = user
                            return res.redirect('/products')
                    } else {
                        res.render('login', {
                            errors: {
                                password: {
                                    value: '',
                                    msg: 'Ingresa una contraseña',
                                    param: 'password',
                                    location: 'body'
                                  }
                            },
                        })
                    }    
            })
    
        } else {
            res.render('login', { 
            errors: errors.mapped(),
            oldFormData: req.body
            });
        }
    },

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


