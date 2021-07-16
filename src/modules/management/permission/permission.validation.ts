import { body } from 'express-validator';
import Permission from './permission.model';

const PermissionCreateValidation = [
  body('name')
    .not()
    .isEmpty()
    .withMessage('Nama Permission diperlukan'),
  body('MenuId')
    .not()
    .isEmpty()
    .withMessage('Menu Permission diperlukan'),
  body('name').custom(async code => {
    return Permission.findOne({ where: { code } }).then(permission => {
      if (permission) {
        return Promise.reject('Kode sudah digunakan')
      }
    });
  }),
];

export { PermissionCreateValidation };

