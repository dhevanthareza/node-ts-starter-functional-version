'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Provinsi', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      // code: {
      //   allowNull: false,
      //   type: Sequelize.STRING,
      // },
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
        onUpdate: 'cascade',
        onDelete: 'cascade',
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
        onUpdate: 'cascade',
        onDelete: 'cascade',
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
        onUpdate: 'cascade',
        onDelete: 'cascade',
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Provinsi');
  },
};
