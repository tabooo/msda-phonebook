/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50505
Source Host           : 127.0.0.1:3306
Source Database       : msda_phonebook

Target Server Type    : MYSQL
Target Server Version : 50505
File Encoding         : 65001

Date: 2019-04-15 16:14:51
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for groups
-- ----------------------------
DROP TABLE IF EXISTS `groups`;
CREATE TABLE `groups` (
  `GROUP_ID` int(11) NOT NULL AUTO_INCREMENT,
  `NAME` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  `USER_ID` int(11) DEFAULT NULL,
  `STATE` int(2) DEFAULT NULL,
  `INSERT_DATE` datetime DEFAULT NULL,
  `UPDATE_DATE` datetime DEFAULT NULL,
  PRIMARY KEY (`GROUP_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of groups
-- ----------------------------
INSERT INTO `groups` VALUES ('1', 'test', '1', '1', '2019-04-15 11:37:46', '2019-04-15 11:35:20');
INSERT INTO `groups` VALUES ('2', 'aaaaa', '68', '1', null, '2019-04-15 15:33:14');

-- ----------------------------
-- Table structure for group_phones
-- ----------------------------
DROP TABLE IF EXISTS `group_phones`;
CREATE TABLE `group_phones` (
  `GROUP_PHONE_ID` int(11) NOT NULL AUTO_INCREMENT,
  `GROUP_ID` int(11) DEFAULT NULL,
  `PHONE_ID` int(11) DEFAULT NULL,
  `STATE` int(2) DEFAULT NULL,
  `USER_ID` int(11) DEFAULT NULL,
  `INSERT_DATE` datetime DEFAULT NULL,
  `UPDATE_DATE` datetime DEFAULT NULL,
  PRIMARY KEY (`GROUP_PHONE_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of group_phones
-- ----------------------------
INSERT INTO `group_phones` VALUES ('1', '1', '2', '2', '1', '2019-04-15 14:05:01', '2019-04-15 14:13:07');
INSERT INTO `group_phones` VALUES ('2', '1', '1', '2', '1', '2019-04-15 14:11:11', '2019-04-15 14:24:12');
INSERT INTO `group_phones` VALUES ('3', '1', '2', '2', '1', '2019-04-15 14:15:30', '2019-04-15 14:22:58');
INSERT INTO `group_phones` VALUES ('4', '1', '2', '2', '1', '2019-04-15 14:23:03', '2019-04-15 14:24:11');
INSERT INTO `group_phones` VALUES ('5', '1', '2', '1', '1', '2019-04-15 14:24:25', null);
INSERT INTO `group_phones` VALUES ('6', '1', '1', '1', '1', '2019-04-15 14:50:00', null);
INSERT INTO `group_phones` VALUES ('7', '2', '4', '1', '68', '2019-04-15 15:33:18', null);

-- ----------------------------
-- Table structure for phones
-- ----------------------------
DROP TABLE IF EXISTS `phones`;
CREATE TABLE `phones` (
  `PHONE_ID` int(11) NOT NULL AUTO_INCREMENT,
  `PHONE` varchar(30) DEFAULT NULL,
  `FIRST_NAME` varchar(50) CHARACTER SET utf8 DEFAULT NULL,
  `LAST_NAME` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  `STATE` int(2) DEFAULT NULL,
  `USER_ID` int(11) NOT NULL,
  `INSERT_DATE` datetime DEFAULT NULL,
  `UPDATE_DATE` datetime DEFAULT NULL,
  PRIMARY KEY (`PHONE_ID`,`USER_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of phones
-- ----------------------------
INSERT INTO `phones` VALUES ('1', '123123123', 'კახა', 'თაბაგარი', '1', '1', null, null);
INSERT INTO `phones` VALUES ('2', '555', 'aaa', 'aaa', '1', '1', '2019-04-12 18:42:15', '2019-04-12 18:27:26');
INSERT INTO `phones` VALUES ('3', '555', 'adssadsa', 'asddsa', '2', '1', null, '2019-04-15 12:18:16');
INSERT INTO `phones` VALUES ('4', '123', 'asd', 'asd', '1', '68', null, '2019-04-15 15:33:06');

-- ----------------------------
-- Table structure for recovers
-- ----------------------------
DROP TABLE IF EXISTS `recovers`;
CREATE TABLE `recovers` (
  `RECOVER_ID` int(11) NOT NULL AUTO_INCREMENT,
  `START_TIME` datetime DEFAULT NULL,
  `END_TIME` datetime DEFAULT NULL,
  `CODE` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  `USERNAME` varchar(100) DEFAULT NULL,
  `EMAIL` varchar(100) DEFAULT NULL,
  `STATE` int(2) DEFAULT NULL,
  PRIMARY KEY (`RECOVER_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of recovers
-- ----------------------------

-- ----------------------------
-- Table structure for rights
-- ----------------------------
DROP TABLE IF EXISTS `rights`;
CREATE TABLE `rights` (
  `RIGHT_ID` int(11) NOT NULL AUTO_INCREMENT,
  `RIGHT_NAME` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `RIGHT_KEY` varchar(255) CHARACTER SET utf8 NOT NULL,
  PRIMARY KEY (`RIGHT_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of rights
-- ----------------------------
INSERT INTO `rights` VALUES ('1', 'მომხმარებლის დამატება/რედაქტირება', 'USER_ADD_EDIT');
INSERT INTO `rights` VALUES ('2', 'მომხმარებლების ნახვა', 'USERS_VIEW');

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `USERNAME` varchar(60) CHARACTER SET utf8 NOT NULL,
  `PASSWORD` varchar(255) CHARACTER SET utf8 NOT NULL,
  `FIRST_NAME` varchar(60) CHARACTER SET utf8 DEFAULT NULL,
  `LAST_NAME` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `EMAIL` varchar(60) CHARACTER SET utf8 DEFAULT NULL,
  `PHONE` varchar(60) CHARACTER SET utf8 DEFAULT NULL,
  `STATE` int(11) NOT NULL DEFAULT '1',
  `CREATE_DATETIME` datetime DEFAULT NULL,
  `MODIFY_DATETIME` datetime DEFAULT NULL,
  PRIMARY KEY (`ID`,`USERNAME`)
) ENGINE=InnoDB AUTO_INCREMENT=69 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES ('1', 'admin', 'pmWkWSBCL51Bfkhn79xPuKBKHz//H6B+mY6G9/eieuM=', 'კახა', 'თაბაგარი', 'tabagari89@gmail.com', '555626531', '1', '2019-04-15 16:14:28', null);

-- ----------------------------
-- Table structure for user_rights
-- ----------------------------
DROP TABLE IF EXISTS `user_rights`;
CREATE TABLE `user_rights` (
  `USER_RIGHT_ID` int(11) NOT NULL AUTO_INCREMENT,
  `USER_ID` int(11) NOT NULL,
  `RIGHT_ID` int(11) DEFAULT NULL,
  PRIMARY KEY (`USER_RIGHT_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of user_rights
-- ----------------------------
INSERT INTO `user_rights` VALUES ('1', '1', '2');
INSERT INTO `user_rights` VALUES ('2', '1', '1');
INSERT INTO `user_rights` VALUES ('5', '1', '23');
INSERT INTO `user_rights` VALUES ('6', '1', '22');
INSERT INTO `user_rights` VALUES ('7', '1', '21');
