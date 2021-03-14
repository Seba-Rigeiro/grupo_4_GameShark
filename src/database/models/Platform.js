module.exports = (sequelize, dataTypes) => {
    const Platform = sequelize.define('Platform', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER
        },
        name: {
            type: dataTypes.STRING,
        },
    }, {
        tableName: 'platforms',
    });
    
    return Platform;
}