const { DataTypes, Model } = require('sequelize');
const SequelizeUtil = require("../util/SequelizeUtil");

const sequelizeUtil = new SequelizeUtil();

const sequelize = sequelizeUtil.getSequelizeInstance();
const options = {
    sequelize,
    modelName: 'Status',
    freezeTableName: true,
    timestamps: false
};

/**
 * This class represents row of the Status SQL table.
 * Used by Sequelize ORM for communicating between Status SQL table and this software.
 */
class Status extends Model {}

Status.init({
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    }
}, options);

module.exports = Status;