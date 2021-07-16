'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('UmkmCategory', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
        type: Sequelize.INTEGER,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      description: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      createdBy: {
        allowNull: false,
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
    return queryInterface.dropTable('UmkmCategory');
  },
};
