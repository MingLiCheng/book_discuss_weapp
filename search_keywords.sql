/*
 Navicat Premium Data Transfer

 Source Server         : bookdis
 Source Server Type    : MySQL
 Source Server Version : 50717
 Source Host           : 47.112.22.111:3306
 Source Schema         : cauth

 Target Server Type    : MySQL
 Target Server Version : 50717
 File Encoding         : 65001

 Date: 19/04/2019 15:38:30
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for search_keywords
-- ----------------------------
DROP TABLE IF EXISTS `search_keywords`;
CREATE TABLE `search_keywords`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `is_default` int(2) NULL DEFAULT NULL,
  `is_hot` int(2) NULL DEFAULT NULL,
  `is_show` int(2) NOT NULL DEFAULT 1,
  `keyword` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

SET FOREIGN_KEY_CHECKS = 1;
