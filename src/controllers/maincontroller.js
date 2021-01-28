module.exports = {
    index : ( req , res) => {
        res.render('index');
    },

    products : (req , res) => {
        res.render('products');
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


