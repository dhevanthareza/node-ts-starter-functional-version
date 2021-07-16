import { body } from "express-validator";

const provinsiCreateValidation = [
  //basi validation example
  // body('code')
  //   .not()
  //   .isEmpty()
  //   .withMessage('Kode diperlukan'),
  body('name')
    .not()
    .isEmpty()
    .withMessage('Nama Provinsi diperlukan'),

  //custom validation example
  // body('code').custom(async code => {
  //   return Role.findOne({ where: { code } }).then(menu => {
  //     if(menu) {
  //       return Promise.reject('Kode sudah digunakan')
  //     }
  //   });
  // }),
];

export { provinsiCreateValidation };

