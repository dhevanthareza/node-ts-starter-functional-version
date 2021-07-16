import { body } from 'express-validator';
import { Op } from 'sequelize';
import Menu from './menu.model';

const MenuCreateValidation = [
  body('code')
    .not()
    .isEmpty()
    .withMessage('Kode diperlukan'),
  body('name')
    .not()
    .isEmpty()
    .withMessage('Nama menu diperlukan'),
  body('code').custom(async (code, { req }) => {
    const where = req.params.id
      ? {
          where: { code, id: { [Op.not]: req.params.id } },
        }
      : { where: { code } };
    return Menu.findOne(where).then(menu => {
      if (menu) {
        return Promise.reject('Kode sudah digunakan');
      }
    });
  }),
];

export { MenuCreateValidation };

