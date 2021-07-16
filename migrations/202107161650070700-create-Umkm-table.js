'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Umkm', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
        type: Sequelize.BIGINT,
      },
      phone: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      nik: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      fullname: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      dateOfBirth: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      businessName: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      address: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      ktpPhoto: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      selfiePhoto: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      productPhoto: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      isActive: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        default: false
      },
      lattiude: {
        allowNull: false,
        type: Sequelize.DECIMAL(10,10),
      },
      longitude: {
        allowNull: false,
        type: Sequelize.DECIMAL(10,10),
      },
      UmkmCategoryId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'UmkmCategory',
          key: 'id',
        },
        onUpdate: 'restrict',
        onDelete: 'restrict',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      createdBy: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'User',
          key: 'id',
        },
        onUpdate: 'restrict',
        onDelete: 'restrict',
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE,
      },
      updatedBy: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'User',
          key: 'id',
        },
        onUpdate: 'restrict',
        onDelete: 'restrict',
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE,
      },
      deletedBy: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'User',
          key: 'id',
        },
        onUpdate: 'restrict',
        onDelete: 'restrict',
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Umkm');
  },
};
