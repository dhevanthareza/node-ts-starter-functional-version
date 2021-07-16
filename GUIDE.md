# Guideline Struktur Project HRIS

## Struktur Modul

Project ini dibuat dengan konsep modular, yaitu file-file yang terkait dalam sebuah modul dikumpulkan dalam 1 folder yang terpisah dengan satu sama lain. Harapannya dengan struktur ini, kita tidak perlu lagi pindah-pindah folder `controllers`, `routes`, `services`, dsb yang filenya bisa menjadi sangat banyak dan susah dicari.

### Core Module

Modul ini adalah modul dasar aplikasi yang berisi modul authentication dan home. Modul ini berada pada `src/modules/core`. Di modul ini juga dibuat middleware yang secara umum akan digunakan oleh berbagai modul lain.

## Modul Aplikasi

Modul aplikasi kita yang di sini nantinya akan berisi logic-logic aplikasi dan ditaruh pada folder `src/modules/xx`.

### Modul Employee

Satu modul modul yang sudah saya buat contohnya adalah modul Employee yang bertanggung jawab untuk CRUD data diri dari sebuah pegawai. Modul Employee ini adalah sebuah submodule dari modul Master Data sehingga saya taruh di bawah folder master.

Modul-modul lain terkait modul Master Data, seperti jabatan struktural, resiko jabatan, pendidikan, nantinya juga akan dimasukkan ke modul ini.

## Penambahan modul

Untuk menambahkan modul ke dalam aplikasi, tambahkan model dan controller yang sudah dibuat ke `app.ts` bagian dibawah ini

```
sequelize.addModels([User, Employee])
```

```
private controllers() {
  this.app.use(authController)
  this.app.use(homeController)
  this.app.use(employeeController)
}
```

Sepertinya ini memang bukan struktur modul yang paling ideal, setelah ini akan dibuatkan struktur lain yang lebih ideal.

## Penamaan File

File-file di dalam sebuah modul yang bertipe `Controller`, `Service`, `Middleware` dan `Model` dibuat menjadi format `nama.tipe.ts`, contoh

1. `employee.controller.ts`
1. `employee.model.ts`
1. `employeeSidebar.middleware.ts`.

Untuk file-file selain 4 tipe tersebut, bisa dibuat menyesuaikan kebutuhan.

## Struktur Controller

Yang cukup berbeda dari controller di project ini dan project-project sebelumnya adalah kita memisah 1 fungsional ke dalam controller yang terpisah. Misalkan pada modul employee terdapat 5 controller sebagai berikut

1. employee.controller.ts
1. employeeCreate.controller.ts
1. employeeDetail.controller.ts
1. employeeList.controller.ts
1. employeeUpdate.controller.ts

`employee.controller.ts` digunakan apabila ada middleware-middleware umum yang digunakan untuk seluruh controller di dalam employee. Pada kasus kali ini, middleware yang dipakai adalah `isAuthenticated` yang mana itu berarti seluruh fungsi-fungsi pada modul Employee hanya bisa diakses oleh user yang sudah login.

`employeeXXX.controller.ts` digunakan untuk 1 fungsionalitas di dalam modul Employee. Hal ini ditujukan supaya file controller tidak terlalu besar dan sulit untuk dimanage. Salah satu controller yang akan saya bahas di sini adalah `employeeUpdate.controller.ts`

### Employee Update Controller

Pada controller ini hal-hal terkait dengan update, termasuk menampilkan view update dan updatenya dimasukkan ke controller ini. Contohnya adalah seperti di bawah ini.
 
```
employeeUpdateController.get(
  '/:id/update',
  async (req: Request, res: Response) => {
    ...
  },
)

employeeUpdateController.post(
  '/:id/update',
  async (req: Request, res: Response) => {
    ...
  },
)
```

Kasus lain yang baiknya dijadikan 1 controller adalah untuk membuat tabel menggunakan datatable yang datanya diambil dari API. Dalam case ini, menampilkan halaman list dan api untuk datatablenya dibuat dalam 1 file.

## Model

Project ini menggunakan [Sequelize Typescript](https://github.com/RobinBuschmann/sequelize-typescript#readme). Silahkan dibaca tentang pembuatan modelnya.

## Request Validation

Validasi request menggunakan modul `joi` untuk typescript, yaitu [Typesafe Joi](https://github.com/hjkcai/typesafe-joi)

## View

Untuk view kita menggunakan library bernama `pug`. Terdapat beberapa hal berbeda dari penggunakan pug di project ini dan project-project sebelumnya. Yaitu di project ini saya mencoba untuk memaksimalkan fitur `mixin` dan `includes` dari `pug`.

Sebagai contoh, saya membuat 2 mixin untuk menhandle input sebuah field (`mixins/forms/input.pug`) dan menampilkan field tersebut (`mixins/forms/field.pug`). Ke depannya saya kemungkinan akan membuat supaya field-field ini bisa digenerate dari yaml maupun json. Karena sepertinya project ini akan banyak field-field custom yang akan diminta oleh client.

Untuk fitur includes, saya membuat beberapa hal yang dipakai di berbagai page menjadi 1 view tersendiri yang disimpan pada `partials`. Satu contoh yang sudah dibuat adalah sidebar employee, dan subheader dari employee.

## Helpers

Folder yang berisi fungsi-fungsi umum di dalam sebuah aplikasi diletakkan pada folder `src/helpers`.
