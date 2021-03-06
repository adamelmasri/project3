
module.exports = function(sequelize, DataTypes) {
    const BicycleParkingMetaData = sequelize.define("BicycleParkingMetaData", {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
            primaryKey: true
        },
        // unique package identifier
        packageId: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        name: {
            type: DataTypes.STRING
        },
        revisionId: {
            type: DataTypes.STRING,
            allowNull: false
        },
        packageLastRefreshed: {
            type: DataTypes.DATE,
            allowNull: false
        }
    });

    return BicycleParkingMetaData;
};
