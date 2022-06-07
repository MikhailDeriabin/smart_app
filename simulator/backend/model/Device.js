const { DataTypes, Model } = require('sequelize');
const SequelizeUtil = require("../util/SequelizeUtil");
const Manufacturer = require("./Manufacturer");
const Type = require("./Type");
const Status = require("./Status");

const sequelizeUtil = new SequelizeUtil();

const sequelize = sequelizeUtil.getSequelizeInstance();
const options = {
    sequelize,
    modelName: 'Device',
    freezeTableName: true,
    timestamps: false
};

/**
 * This class represents row of the Device SQL table.
 * Used by Sequelize ORM for communicating between Device SQL table and this software.
 */
class Device extends Model {}

Device.init({
    deviceId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    powerConsumption: {
        type: DataTypes.DOUBLE,
        allowNull: true
    },
    manufacturerName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        allowNull: true,
        default: 'OFF'
    },
}, options);

Manufacturer.hasMany(Device, { foreignKey: 'manufacturerName' });
Type.hasMany(Device, { foreignKey: 'type' });
Status.hasMany(Device, { foreignKey: 'status' });

Device.belongsTo(Manufacturer, { foreignKey: 'manufacturerName' });
Device.belongsTo(Type, { foreignKey: 'type' });
Device.belongsTo(Status, { foreignKey: 'status' });

module.exports = Device;