module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define('Product', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        name: {
            type: DataTypes.STRING
        },
        category_id: {
            type: DataTypes.INTEGER
        },
        platform_id: {
            type: DataTypes.INTEGER
        },        
        price: {
            type: DataTypes.DECIMAL,
        },
        image: {
            type: DataTypes.STRING ,
        },
        },   
        {
        tableName: 'products',
        timestamps: true
                 
        })

        Product.associate = (models) => {
            Product.belongsTo (models.Category, {
                as: 'category',
                foreingKey: 'category_id'
            })
            Product.belongsTo (models.Platform, {
                as: 'platform',
                foreingKey: 'platform_id'
            })
        }
       
    return Product;
    }