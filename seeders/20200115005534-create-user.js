'use strict';
const moment = require('moment');
const bcrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'User',
      [
        {
          id: 1,
          email: 'developer@gmail.com',
          username: 'developer',
          fullname: 'Admin Ganteng',
          password: bcrypt.hashSync('secret', 10),
          RoleId: 1,
          createdAt: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
          updatedAt: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
        },
      ],
      {},
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('User', null, {});
  },
};
