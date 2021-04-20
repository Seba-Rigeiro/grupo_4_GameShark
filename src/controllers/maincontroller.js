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
        // Si no hay errores,busca el usuario por email
        if (errors.isEmpty()) {
            
            db.User.findOne({
                where: {
                    email: req.body.email
                }
            })
            // Si el usuario existe y el password es correcto, inicia session y redirige a la pag. de productos
            .then(user => {
                if (user) {
                    if (bcrypt.compareSync(req.body.password, user.password)) {
                        req.session.user = user
                                return res.redirect('/products')
                    // Si el password es incorrecto, muestra el error debajo del campo password (por seguridad)         
                    } else {
                        res.render('login', {
                            errors: {
                                password: {
                                    value: '',
                                    msg: 'el email o la contraseña son incorrectos ',
                                    param: 'password',
                                    location: 'body'
                                  }
                            },
                        })
    
                    }
                    // Si el email es incorrecto, muestra el error debajo del campo password (por seguridad)
                } else {
                    res.render('login', {
                        errors: {
                            password: {
                                value: '',
                                msg: 'el email o la contraseña son incorrectos',
                                param: 'email',
                                location: 'body'
                              }
                        },
                        oldFormData: req.body
                    })
                }
            })
          // Si hay errores de validacion en los campos, los muestra 
        } else {
            res.render('login', { 
            errors: errors.mapped(),
            oldFormData: req.body
            });
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


