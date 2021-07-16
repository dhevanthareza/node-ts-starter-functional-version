'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Menu', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      code: {
        unique: true,
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
      path: {
        type: Sequelize.STRING
      },
      icon: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT
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
      order: {
        allowNull: false,
        deaultValue: 0,
        type: Sequelize.INTEGER
      },
      ParentId: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
    });
    return queryInterface.addConstraint('Menu', ['ParentId'], {
      type: 'foreign key',
      references: {
        table: 'Menu',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Menu');
  }
};
