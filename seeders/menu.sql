/*
 Navicat Premium Data Transfer

 Source Server         : MYSQL 8 LOCAL
 Source Server Type    : MySQL
 Source Server Version : 80023
 Source Host           : localhost:3308
 Source Schema         : dasaran

 Target Server Type    : MySQL
 Target Server Version : 80023
 File Encoding         : 65001

 Date: 16/07/2021 16:34:24
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for Menu
-- ----------------------------
DROP TABLE IF EXISTS `Menu`;
CREATE TABLE `Menu`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `path` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `icon` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL,
  `createdAt` datetime(0) NOT NULL,
  `createdBy` int NOT NULL,
  `updatedAt` datetime(0) NULL DEFAULT NULL,
  `updatedBy` int NULL DEFAULT NULL,
  `deletedAt` datetime(0) NULL DEFAULT NULL,
  `deletedBy` int NULL DEFAULT NULL,
  `order` int NOT NULL,
  `ParentId` int NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `code`(`code`) USING BTREE,
  INDEX `createdBy`(`createdBy`) USING BTREE,
  INDEX `updatedBy`(`updatedBy`) USING BTREE,
  INDEX `deletedBy`(`deletedBy`) USING BTREE,
  INDEX `Menu_ParentId_Menu_fk`(`ParentId`) USING BTREE,
  CONSTRAINT `Menu_ibfk_1` FOREIGN KEY (`createdBy`) REFERENCES `User` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Menu_ibfk_2` FOREIGN KEY (`updatedBy`) REFERENCES `User` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Menu_ibfk_3` FOREIGN KEY (`deletedBy`) REFERENCES `User` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Menu_ParentId_Menu_fk` FOREIGN KEY (`ParentId`) REFERENCES `Menu` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of Menu
-- ----------------------------
INSERT INTO `Menu` VALUES (1, 'management', 'Management', NULL, NULL, 'management', '2021-07-16 15:21:48', 1, '2021-07-16 15:21:48', 1, NULL, NULL, 1, NULL);
INSERT INTO `Menu` VALUES (2, 'role', 'Role', '/management/role', NULL, 'role', '2021-07-16 15:24:43', 1, '2021-07-16 15:24:43', 1, NULL, NULL, 1, 1);
INSERT INTO `Menu` VALUES (3, 'user', 'User', '/management/user', NULL, 'user', '2021-07-16 15:27:34', 1, '2021-07-16 15:27:34', 1, NULL, NULL, 2, 1);
INSERT INTO `Menu` VALUES (4, 'menu', 'Menu', '/management/menu', NULL, 'menu', '2021-07-16 15:31:06', 1, '2021-07-16 15:31:06', 1, NULL, NULL, 3, 1);
INSERT INTO `Menu` VALUES (5, 'permission', 'Permission', '/management/permission', NULL, 'permission', '2021-07-16 15:31:27', 1, '2021-07-16 15:31:27', 1, NULL, NULL, 3, 1);
INSERT INTO `Menu` VALUES (6, 'kecamatan', 'Kecamatan', '/management/kecamatan', NULL, 'kecamatan', '2021-07-16 15:34:57', 1, '2021-07-16 15:34:57', 1, NULL, NULL, 5, 1);
INSERT INTO `Menu` VALUES (7, 'kelurahan', 'Kelurahan', '/management/kelurahan', NULL, 'kelurahan', '2021-07-16 15:35:21', 1, '2021-07-16 15:35:21', 1, NULL, NULL, 6, 1);

-- ----------------------------
-- Table structure for Permission
-- ----------------------------
DROP TABLE IF EXISTS `Permission`;
CREATE TABLE `Permission`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `MenuId` int NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `createdAt` datetime(0) NOT NULL,
  `createdBy` int NOT NULL,
  `updatedAt` datetime(0) NULL DEFAULT NULL,
  `updatedBy` int NULL DEFAULT NULL,
  `deletedAt` datetime(0) NULL DEFAULT NULL,
  `deletedBy` int NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `MenuId`(`MenuId`) USING BTREE,
  INDEX `createdBy`(`createdBy`) USING BTREE,
  INDEX `updatedBy`(`updatedBy`) USING BTREE,
  INDEX `deletedBy`(`deletedBy`) USING BTREE,
  CONSTRAINT `Permission_ibfk_1` FOREIGN KEY (`MenuId`) REFERENCES `Menu` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Permission_ibfk_2` FOREIGN KEY (`createdBy`) REFERENCES `User` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Permission_ibfk_3` FOREIGN KEY (`updatedBy`) REFERENCES `User` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Permission_ibfk_4` FOREIGN KEY (`deletedBy`) REFERENCES `User` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of Permission
-- ----------------------------
INSERT INTO `Permission` VALUES (1, 1, 'index', 'Make user can reading data', '2021-07-16 15:21:48', 1, '2021-07-16 15:21:48', 1, NULL, NULL);
INSERT INTO `Permission` VALUES (2, 1, 'create', 'Make user can create data', '2021-07-16 15:21:48', 1, '2021-07-16 15:21:48', 1, NULL, NULL);
INSERT INTO `Permission` VALUES (3, 1, 'update', 'Make user can update data', '2021-07-16 15:21:48', 1, '2021-07-16 15:21:48', 1, NULL, NULL);
INSERT INTO `Permission` VALUES (4, 1, 'delete', 'Make user can delete data', '2021-07-16 15:21:48', 1, '2021-07-16 15:21:48', 1, NULL, NULL);
INSERT INTO `Permission` VALUES (5, 2, 'index', 'Make user can reading data', '2021-07-16 15:24:43', 1, '2021-07-16 15:24:43', 1, NULL, NULL);
INSERT INTO `Permission` VALUES (6, 2, 'create', 'Make user can create data', '2021-07-16 15:24:43', 1, '2021-07-16 15:24:43', 1, NULL, NULL);
INSERT INTO `Permission` VALUES (7, 2, 'update', 'Make user can update data', '2021-07-16 15:24:43', 1, '2021-07-16 15:24:43', 1, NULL, NULL);
INSERT INTO `Permission` VALUES (8, 2, 'delete', 'Make user can delete data', '2021-07-16 15:24:43', 1, '2021-07-16 15:24:43', 1, NULL, NULL);
INSERT INTO `Permission` VALUES (9, 3, 'index', 'Make user can reading data', '2021-07-16 15:27:34', 1, '2021-07-16 15:27:34', 1, NULL, NULL);
INSERT INTO `Permission` VALUES (10, 3, 'create', 'Make user can create data', '2021-07-16 15:27:34', 1, '2021-07-16 15:27:34', 1, NULL, NULL);
INSERT INTO `Permission` VALUES (11, 3, 'update', 'Make user can update data', '2021-07-16 15:27:34', 1, '2021-07-16 15:27:34', 1, NULL, NULL);
INSERT INTO `Permission` VALUES (12, 3, 'delete', 'Make user can delete data', '2021-07-16 15:27:34', 1, '2021-07-16 15:27:34', 1, NULL, NULL);
INSERT INTO `Permission` VALUES (13, 4, 'index', 'Make user can reading data', '2021-07-16 15:31:06', 1, '2021-07-16 15:31:06', 1, NULL, NULL);
INSERT INTO `Permission` VALUES (14, 4, 'create', 'Make user can create data', '2021-07-16 15:31:06', 1, '2021-07-16 15:31:06', 1, NULL, NULL);
INSERT INTO `Permission` VALUES (15, 4, 'update', 'Make user can update data', '2021-07-16 15:31:06', 1, '2021-07-16 15:31:06', 1, NULL, NULL);
INSERT INTO `Permission` VALUES (16, 4, 'delete', 'Make user can delete data', '2021-07-16 15:31:06', 1, '2021-07-16 15:31:06', 1, NULL, NULL);
INSERT INTO `Permission` VALUES (17, 5, 'index', 'Make user can reading data', '2021-07-16 15:31:27', 1, '2021-07-16 15:31:27', 1, NULL, NULL);
INSERT INTO `Permission` VALUES (18, 5, 'create', 'Make user can create data', '2021-07-16 15:31:27', 1, '2021-07-16 15:31:27', 1, NULL, NULL);
INSERT INTO `Permission` VALUES (19, 5, 'update', 'Make user can update data', '2021-07-16 15:31:27', 1, '2021-07-16 15:31:27', 1, NULL, NULL);
INSERT INTO `Permission` VALUES (20, 5, 'delete', 'Make user can delete data', '2021-07-16 15:31:27', 1, '2021-07-16 15:31:27', 1, NULL, NULL);
INSERT INTO `Permission` VALUES (21, 6, 'index', 'Make user can reading data', '2021-07-16 15:34:57', 1, '2021-07-16 15:34:57', 1, NULL, NULL);
INSERT INTO `Permission` VALUES (22, 6, 'create', 'Make user can create data', '2021-07-16 15:34:57', 1, '2021-07-16 15:34:57', 1, NULL, NULL);
INSERT INTO `Permission` VALUES (23, 6, 'update', 'Make user can update data', '2021-07-16 15:34:57', 1, '2021-07-16 15:34:57', 1, NULL, NULL);
INSERT INTO `Permission` VALUES (24, 6, 'delete', 'Make user can delete data', '2021-07-16 15:34:57', 1, '2021-07-16 15:34:57', 1, NULL, NULL);
INSERT INTO `Permission` VALUES (25, 7, 'index', 'Make user can reading data', '2021-07-16 15:35:21', 1, '2021-07-16 15:35:21', 1, NULL, NULL);
INSERT INTO `Permission` VALUES (26, 7, 'create', 'Make user can create data', '2021-07-16 15:35:21', 1, '2021-07-16 15:35:21', 1, NULL, NULL);
INSERT INTO `Permission` VALUES (27, 7, 'update', 'Make user can update data', '2021-07-16 15:35:21', 1, '2021-07-16 15:35:21', 1, NULL, NULL);
INSERT INTO `Permission` VALUES (28, 7, 'delete', 'Make user can delete data', '2021-07-16 15:35:21', 1, '2021-07-16 15:35:21', 1, NULL, NULL);

SET FOREIGN_KEY_CHECKS = 1;
