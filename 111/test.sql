/*
Navicat MySQL Data Transfer

Source Server         : yyy
Source Server Version : 50718
Source Host           : cdb-7jih7z9o.cd.tencentcdb.com:10009
Source Database       : test

Target Server Type    : MYSQL
Target Server Version : 50718
File Encoding         : 65001

Date: 2019-12-18 19:30:14
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('1', 'ykn666', '7ab03129c14e52041a8c94a339e5e88f');
INSERT INTO `user` VALUES ('2', 'asd666', 'ca97bb187334546a5257a6ed23bf5884');
INSERT INTO `user` VALUES ('3', 'ycp666', '907ef8fe597b90d26c7ea5f15c14155a');
INSERT INTO `user` VALUES ('6', '风花雪月', '7c79dd68b400e6b0c9f99f8f221dae26');
INSERT INTO `user` VALUES ('7', '美汁源果粒橙', '200820e3227815ed1756a6b531e7e0d2');
