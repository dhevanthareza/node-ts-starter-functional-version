import { body } from 'express-validator';
import User from './user.model';

const UserCreateValidations = [
  body('email')
    .not()
    .isEmpty()
    .withMessage('email diperlukan'),
  body('username')
    .not()
    .isEmpty()
    .withMessage('username diperlukan'),
  body('email')
    .isLength({ min: 2 })
    .withMessage('minimal 10 karakter'),
  body('email').custom(async email => {
    return User.findOne({ where: { email } }).then(user => {
      if (user) {
        return Promise.reject('Email sudah digunakan')
      }
    });
  }),
  body('username').custom(async username => {
    return User.findOne({ where: { username } }).then(user => {
      if (user) {
        return Promise.reject('Username sudah digunakan')
      }
    });
  }),
];

export { UserCreateValidations };

