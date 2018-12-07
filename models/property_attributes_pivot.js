/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('property_attributes_pivot', {
    property_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    attribute_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    enabled: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: '0'
    },
    value: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    value_name: {
      type: DataTypes.STRING(50),
      allowNull: true
    }
  }, {
    tableName: 'property_attributes_pivot'
  });
};
