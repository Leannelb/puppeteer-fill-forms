/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('site', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    uuid: {
      type: DataTypes.STRING(36),
      allowNull: true
    },
    name: {
      type: DataTypes.STRING(150),
      allowNull: true
    },
    domain: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    default_property_type: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    client_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    deleted_at: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'site'
  });
};
