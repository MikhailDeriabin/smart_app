//Sequelize dependencies:
//npm install --save sequelize
//npm install --save mariadb

const { Sequelize } = require('sequelize');

'use strict';

let instance = undefined;

const dbSettings = {
    host: process.env.DATABASE_HOST,
    dialect: process.env.DATABASE_DIALECT || "mariadb",
    logging: true
}

const createInstance = () => {
    return new Sequelize(
        process.env.DATABASE,
        process.env.DATABASE_USER,
        process.env.DATABASE_PASSWORD,
        dbSettings
    );
}

/**
 * This class is a lazy singleton for the Sequalize ORM instanse.
 * For making queries to the DB, Sequalize instance must be created, for example at the beginning of the program
 */
class SequelizeUtil {
    getSequelizeInstance = () => {
        if (!instance)
            instance = createInstance();

        return instance;
    }

    isSequelizeConnected = () => {
        try {
            const sequelize = this.getSequelizeInstance();
            return sequelize.authenticate().then(() => {
                return true;
            });
        } catch (error) {
            console.error('Unable to connect to the database:', error);
            return false;
        }
    }
}

module.exports = SequelizeUtil;