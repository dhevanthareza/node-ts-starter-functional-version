'use strict';
const moment = require('moment');
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Role',
      [
        {
          id: 1,
          name: 'Developer',
          code: 'developer',
          createdAt: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
          updatedAt: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
        },
        {
          id: 2,
          name: 'Admin',
          code: 'developer',
          createdAt: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
          updatedAt: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
        },
      ],
      {},
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Role', null, {});
  },
};
