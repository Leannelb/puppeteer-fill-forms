/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('property', {
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
    site_id: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    client_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    slug: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    property_type_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '1'
    },
    excerpt: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    location: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    image_listing_thumb_path: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    image_home_thumb_path: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    image_featured_path: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    price_from: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    price_to: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    sleeps: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    bedrooms: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    bathrooms: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    size: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    latitude: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    longitude: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    meta_keywords: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    meta_description: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    temp_old_reference: {
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
      allowNull: true,
      unique: true
    }
  }, {
    tableName: 'property'
  });
};
