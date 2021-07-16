import { body } from "express-validator";

const umkmCategoryCreateValidation = [
  //basi validation example
  body('name')
    .not()
    .isEmpty()
    .withMessage('Nama menu diperlukan'),

  //custom validation example
  // body('code').custom(async code => {
  //   return Role.findOne({ where: { code } }).then(menu => {
  //     if(menu) {
  //       return Promise.reject('Kode sudah digunakan')
  //     }
  //   });
  // }),
];

export { umkmCategoryCreateValidation };

