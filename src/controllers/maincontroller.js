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
        // se utiliza esta propiedad para encriptar la contraseña. (recordar que hay que importarla)
        let passwordHash = bcrypt.hashSync(req.body.password, 10)    
        
        // Si no hay errores se crea el usuario los datos que vienen en el body. Para la imagen se usa req.file 
        if (errors.isEmpty()) {

            db.User.findOne({
                where: {
                    email: req.body.email
                }
            })
            .then (dbUser =>{
                if (dbUser) {
                    res.render('register', {
                        errors: {
                            email: {
                                value: '',
                                msg: 'el email ya existe',
                                param: 'email',
                                location: 'body'
                            }
                        },
                        oldFormData: req.body
                    })
                } else {

                    const { first_name, last_name, email, password,} =  req.body
                               
                    db.User.create({
                    first_name: first_name ,
                    last_name: last_name , 
                    email: email, 
                    password: passwordHash,
                    image: req.file ? req.file.filename : null
                   
                
                    })
                    .then(user => {
                        res.redirect('/')
                    })
                    .catch(err => console.log(err))
                }
            })
            
        
            // Si hay errores, redirecciona nuevamente a la pagina de registro y los muestra.
         } else {
            res.render('register', { 
                errors: errors.mapped(),
                oldFormData: req.body
            });
        }   
    },

    mycart : (req , res) => {
        res.render('mycart');
    },
}


