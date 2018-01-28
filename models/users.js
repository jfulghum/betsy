let Sequelize = require('sequelize');
let db = new Sequelize('postgres://localhost:5432/betsydb', {
    logging: false
});




module.exports = {
    User: User
};