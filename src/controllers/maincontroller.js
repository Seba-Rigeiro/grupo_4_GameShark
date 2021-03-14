const db = require('../database/models')
//const sequelize = db.sequelize

module.exports = {
    index : ( req , res) => {
        res.render('index');
    },

    products : (req , res) => {
      db.Product.findAll({
          order: [
              ['price', 'ASC']
          ]
      })
       .then (productsList => res.render ("products", {productsList}))        
         
    },

    login : (req , res) => {
        res.render('login');
    },

    register : (req , res) => {
        res.render('register');
    },

    mycart : (req , res) => {
        res.render('mycart');
    }
}


