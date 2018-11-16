'use strict';

const config = {
    development: {
        storage: {
            IMDB: {
                username: 'root',
                password: null,
                database: 'IMDB',
                host: '127.0.0.1',
                dialect: 'mysql',
                operatorsAliases: false
            }
        }
    }
};

const env = process.env.NODE_ENV || 'development';
module.exports = config[env];