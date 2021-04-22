module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        first_name: {
            type: DataTypes.STRING,                      
        },
        last_name: {
            type: DataTypes.STRING,                      
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
        },
        password: {
            type: DataTypes.STRING
        },
        image: {
            type: DataTypes.STRING
        },        
        
        },   
        {
        tableName: 'users',
        timestamps: true, 
        })
       
    return User;
    }