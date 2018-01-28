let Sequelize = require('sequelize');
let db = new Sequelize('postgres://localhost:5432/betsydb', {
    logging: false
});

let User = db.define('User', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    }, 
    email: {
        type: Sequelize.STRING,
        isEmail: true,
        allowNull: false
    }
})

let Product = db.define('Product', {
    productTitle: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    content: {
        type: Sequelize.TEXT,
        allowNull: false
    }, 
    price: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    tags: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        defaultValue: [],
        set: function (tags) {

            tags = tags || [];

            if (typeof tags === 'string') {
                tags = tags.split(',').map(function (str) {
                    return str.trim();
                });
            }

            this.setDataValue('tags', tags);

        }
    }
})

Product.belongsTo(User, {
    as: 'order'
});

module.exports = {
    User: User,
    Product: Product
};