const { DataTypes, Model } = require('sequelize');
const SequelizeUtil = require("../util/SequelizeUtil");
const Type = require("./Type");
const Status = require("./Status");

const sequelizeUtil = new SequelizeUtil();

const sequelize = sequelizeUtil.getSequelizeInstance();
const options = {
    sequelize,
    modelName: 'AsTypeStatus',
    freezeTableName: true,
    timestamps: false
};

/**
 * This class represents row of the AsTypeStatus SQL table.
 * Used by Sequelize ORM for communicating between AsTypeStatus SQL table and this software.
 */
class AsTypeStatus extends Model {}

AsTypeStatus.init({
    type: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: Type,
            key: 'type'
        }
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: Status,
            key: 'status'
        }
    }
}, options);

Type.belongsToMany(Status, { through: 'AsTypeStatus', foreignKey: 'type', as: 'Status' });
Status.belongsToMany(Type, { through: 'AsTypeStatus', foreignKey: 'status', as: 'Type' });

module.exports = AsTypeStatus;