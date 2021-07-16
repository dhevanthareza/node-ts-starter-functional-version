'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Permission', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      MenuId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Menu',
          key: 'id',
        },
        onUpdate: 'cascade',
        onDelete: 'cascade',
      },
      name: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
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
    return queryInterface.dropTable('Permission');
  }
};
