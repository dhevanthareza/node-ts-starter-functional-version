import { body } from 'express-validator';
import Role from './role.model';

const RoleCreateValidation = [
  body('code')
    .not()
    .isEmpty()
    .withMessage('Kode diperlukan'),
  body('name')
    .not()
    .isEmpty()
    .withMessage('Nama menu diperlukan'),
  body('code').custom(async code => {
    return Role.findOne({ where: { code } }).then(menu => {
      if (menu) {
        return Promise.reject('Kode sudah digunakan')
      }
    });
  }),
];

export { RoleCreateValidation };

