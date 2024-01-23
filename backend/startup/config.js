const config = require('config');

module.exports = function () {
    if (!config.get('JwtSecret')) {
        throw new Error('FATAL ERROR: jwtSecret is not defined');
    }
    if (!config.get('DataBase')) {
        throw new Error('FATAL ERROR: db is not defined');
    }
    if (!config.get('Port')) {
        throw new Error('FATAL ERROR: Port is not defined');
    }
}