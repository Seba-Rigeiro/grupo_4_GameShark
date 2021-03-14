module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        name: {
            type: DataTypes.STRING(100),                      
        },
        email: {
            type: DataTypes.STRING(100),
            unique: true,
        },
        password: {
            type: DataTypes.STRING(45)
        },        
        
        },   
        {
        tableName: 'users',
        timestamps: true, 
        })
       
    return User;
    }