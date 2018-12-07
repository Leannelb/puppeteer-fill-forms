/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('property_images', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    uuid: {
      type: DataTypes.STRING(36),
      allowNull: true
    },
    position: {
      type: DataTypes.INTEGER(5),
      allowNull: true
    },
    property_id: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    image_thumb_path: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    image_full_path: {
      type: DataTypes.STRING(255),
      allowNull: true
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
    tableName: 'property_images'
  });
};
