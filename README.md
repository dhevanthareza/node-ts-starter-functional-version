# Node TS Starter

## Instalasi

1. Install Yarn
2. Jalankan `yarn install`
3. Copy `.env.example` ke `.env`
4. Ubah settingan database di src/config.json, khusunya yang `development` untuk keperluan development.

5. Jalankan `yarn dev` untuk run
6. Jalankan yarn build untuk build

## Setup Development Environment

1. Gunakan `Visual Studio Code`
2. Gunakan Prettier

## Development Flow

1. Semua module di taro src/modules/namaModules
2. Didalam folder tersebut mungkin bisa dikasih file controller, middleware, dan lainya
3. penamaan file sesuai type namafile.tipe.ts contoh namaservice.service.ts atau namacontroller.service.ts

## Create Module

1. Buat dulu parent folder di src/modules jika perlu jika sudah ada parent folder nya ya gak usah atau gak mau pake parent module ya gak usah
2. jalankan node generator.js untuk menjalankan generator module
3. Akan terbuat file controller, repository,  validation, model, migration nya
4. tambahkan field2 kolom database yang diperlukan di file migration dan module
4. benerin import pake ctrl + . (saran mulai dari file model)

## Response

1. Klo mau ngasih response pake ResponseService.success contohnya ada di src/modules/management/*
2. Klo mau ngasih error tinggal throw aja pake ApplicationError contohnya ada di src/modules/core/middleware/aut.middleware.ts