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
    
    return Category;
}