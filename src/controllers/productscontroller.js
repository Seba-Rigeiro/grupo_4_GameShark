module.exports = {
    detail : (req , res ) => {
        res.render('detail');
    },

    create : (req , res ) => {
        res.render('create');
    },

    edit : (req , res ) => {
        res.render('edit');
    }
}