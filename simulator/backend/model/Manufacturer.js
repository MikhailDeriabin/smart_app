const { DataTypes, Model } = require('sequelize');
const SequelizeUtil = require("../util/SequelizeUtil");

const sequelizeUtil = new SequelizeUtil();

const sequelize = sequelizeUtil.getSequelizeInstance();
const options = {
    sequelize,
    modelName: 'Manufacturer',
    freezeTableName: true,
    timestamps: false
};

/**
 * This class represents row of the Manufacturer SQL table.
 * Used by Sequelize ORM for communicating between Manufacturer SQL table and this software.
 */
class Manufacturer extends Model {}

Manufacturer.init({
    manufacturerName: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    }
}, options);

module.exports = Manufacturer;