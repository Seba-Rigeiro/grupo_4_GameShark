module.exports = (sequelize, dataTypes) => {
    const Category = sequelize.define('Category', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER
        },
        name: {
            type: dataTypes.STRING,
        },
    }, {
        tableName: 'categories',
    });

    Category.associate = (models) => {
        Category.hasMany (models.Product, {
            as: 'products'        
        })
    }
    return Category;
}