const { DataTypes, Model } = require('sequelize');
const SequelizeUtil = require("../util/SequelizeUtil");

const sequelizeUtil = new SequelizeUtil();

const sequelize = sequelizeUtil.getSequelizeInstance();
const options = {
    sequelize,
    modelName: 'Type',
    freezeTableName: true,
    timestamps: false
};

/**
 * This class represents row of the Type SQL table.
 * Used by Sequelize ORM for communicating between Type SQL table and this software.
 */
class Type extends Model {}

Type.init({
    type: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    }
}, options);

module.exports = Type;