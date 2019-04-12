/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50505
Source Host           : 127.0.0.1:3306
Source Database       : msda_phonebook

Target Server Type    : MYSQL
Target Server Version : 50505
File Encoding         : 65001

Date: 2019-04-12 18:45:53
*/

SET FOREIGN_KEY_CHECKS=0;

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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of phones
-- ----------------------------
INSERT INTO `phones` VALUES ('1', '123123123', 'კახა', 'თაბაგარი', '1', '0', null, null);
INSERT INTO `phones` VALUES ('2', '555', 'aaa', 'aaa', '1', '1', '2019-04-12 18:42:15', '2019-04-12 18:27:26');
INSERT INTO `phones` VALUES ('3', '555', 'adssadsa', 'asddsa', '1', '1', null, '2019-04-12 18:41:31');

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
) ENGINE=InnoDB AUTO_INCREMENT=67 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES ('1', 'admin', 'pmWkWSBCL51Bfkhn79xPuKBKHz//H6B+mY6G9/eieuM=', 'admin', null, '', '555626531', '1', null, null);
INSERT INTO `users` VALUES ('2', 'mimtani', 'pmWkWSBCL51Bfkhn79xPuKBKHz//H6B+mY6G9/eieuM=', 'ssss', null, '', 'sssss', '2', null, null);
INSERT INTO `users` VALUES ('3', 'Natia', 'pmWkWSBCL51Bfkhn79xPuKBKHz//H6B+mY6G9/eieuM=', 'Natia', null, '', '', '2', null, null);
INSERT INTO `users` VALUES ('4', 'ana', 'JNS5b1jabUqFEjE7vQKijr8MqV3sbkyG73jOfwHniKw=', 'ana', null, '', '', '2', null, null);
INSERT INTO `users` VALUES ('5', 'nino', 'XGD+DUkpGdGW46VzUtYJw0uhLdwh+aae9EKyENbtUVM=', 'nino', null, '', '', '2', null, null);
INSERT INTO `users` VALUES ('6', 'ლუკა', 'a4ayc/80/OGda4BO/1o/V0etpOqiLx1JwB5S3beHW0s=', 'ლუკა გიორგაზე', null, '', '', '2', null, null);
INSERT INTO `users` VALUES ('7', 'გოშა', 'q4IqsuvInCTf+n+QdOdfPuAufiNZqrS1yAK2cUzuSEE=', 'გიორგი სუხანოვი', null, '', '557779757', '2', null, null);
INSERT INTO `users` VALUES ('8', 'Sofo', 'pmWkWSBCL51Bfkhn79xPuKBKHz//H6B+mY6G9/eieuM=', 'სოფო', null, '', '', '2', null, null);
INSERT INTO `users` VALUES ('9', 'ზურა', 'P4PprVvmO9W/L9AJ//5rfdQGYkOXW8li7cN0WcF+Zbk=', 'ზურაბი აბაზაშვილი', null, '', '598224183', '2', null, null);
INSERT INTO `users` VALUES ('10', 'სოფიო', 'dEuT+ZUPw42tcFVWkx6kgZO5ncsZHMm9dwl/Zfvi8Lg=', 'სოფიო გავაშელი', null, '', '591109990', '2', null, null);
INSERT INTO `users` VALUES ('11', 'ლევანი', 'eXN6xG2tEhFmSD4ISgcn5dZ2n7R/qbC2J+ukEH5pYHg=', 'ლევან ლომიძე', null, '', '571090568', '2', null, null);
INSERT INTO `users` VALUES ('12', 'თამუნა', 'ZGBmLiF8ep+JkgjdcKLCir3qQvEoZmqbeObAwGSEZJM=', 'თამუნა', null, '', '', '2', null, null);
INSERT INTO `users` VALUES ('13', 'ნატა', 'vVzi/PUv2ScJ5lOIFR1jzvxlt18LvH3MjUAXZL365Cc=', 'ნატა სპანდერაშვილი', null, '', '555220628', '2', null, null);
INSERT INTO `users` VALUES ('14', 'დროებით', 'rErAP+OyWlKJQ50CX3NNyI4Aopw3ME8HLmNnjsrlclA=', '', null, '', '', '2', null, null);
INSERT INTO `users` VALUES ('15', 'სალომე', '548nqz7xd6mSbmuQ5XK5hTzmz02HUSg26a6FgH7J1/4=', 'სალომე ჩანქსელიანი', null, '', '593546420', '2', null, null);
INSERT INTO `users` VALUES ('16', 'kaxa', 'pmWkWSBCL51Bfkhn79xPuKBKHz//H6B+mY6G9/eieuM=', 'asdasd', null, '', '', '2', null, null);
INSERT INTO `users` VALUES ('17', 'გელა', 'pmWkWSBCL51Bfkhn79xPuKBKHz//H6B+mY6G9/eieuM=', 'გელა', null, '', '', '2', null, null);
INSERT INTO `users` VALUES ('18', 'გიორგი', 'TAe6uaAGJtkgLejgKjtCOno04FZJ3JCxBQevWh5RgOw=', 'გიორგი ჯავახიშვილი', null, '', '595451211', '2', null, null);
INSERT INTO `users` VALUES ('19', 'ანასტასია', 'QCByQOxD+NgXuW8u4+eKrNUI3SvqVjS7MoQVfrgkg5o=', 'ანასტასია', null, '', '557931317', '2', null, null);
INSERT INTO `users` VALUES ('20', 'ხატია', 'pmWkWSBCL51Bfkhn79xPuKBKHz//H6B+mY6G9/eieuM=', 'ხატია ხიდეშელი', null, '', '597070324', '1', null, null);
INSERT INTO `users` VALUES ('21', 'გიორგი', 'j4RyovbsNIv8dXegNcfzSgTGLwx1e1RofhF1I23POTs=', 'გიორგი ჯავახიშვილი', null, '', '595451211', '2', null, null);
INSERT INTO `users` VALUES ('22', 'ვანო', 'lsrjXOipsCRBeL8o5JZsLOG4OFcjqWprg4hYzdbKCh4=', 'ივანე შალვაშვილი', null, '', '557960813', '2', null, null);
INSERT INTO `users` VALUES ('23', 'მარიამი', 'LwrRCSbcAeUPzGUnkVY5B6c2u0p9bxBQk+4d91lBj10=', 'მარიამი', null, '', '', '2', null, null);
INSERT INTO `users` VALUES ('24', 'მარიამი ', 'jnGyRTTp8/s6cSYzWf7St/+wCCZeDTQ4PjGfG29cCPI=', 'მარიამი ცოფურაშვილი', null, 'mariami.maria@yahoo.com', '598970309', '2', null, null);
INSERT INTO `users` VALUES ('25', 'dato_russ', '9PMbmklyL1YkS2waEzvumMLf/3N4Ur+FACUCYAORMEA=', 'Dato Gortlishvili', null, '232323', '3232323', '1', null, null);
INSERT INTO `users` VALUES ('26', 'ვალერი', '/KqXSOPLhM12/HBmLvMAKWN3f4sw/ZX5ecAge1M3UCQ=', 'ვალერი', null, '', '568646424', '2', null, null);
INSERT INTO `users` VALUES ('27', 'ანასტასია', 'QCByQOxD+NgXuW8u4+eKrNUI3SvqVjS7MoQVfrgkg5o=', 'ანი ცერცვაძე', null, '', '557931317', '2', null, null);
INSERT INTO `users` VALUES ('28', 'თამუნა', 'A6xnQhbz4Vx2HuGl4lXwZ5U2I8iziLRFnhP5eNfIRvQ=', 'თამუნა ', null, '', '599 013126', '1', null, null);
INSERT INTO `users` VALUES ('29', 'მაია', '98NTGj3ZaPsW9xfwnhsm38KnGYNc8bQeXNH5EMhAGEs=', 'მაია ', null, '', '', '1', null, null);
INSERT INTO `users` VALUES ('30', 'გიორგი1', '6NUB2+DTrhphwob4WeYW+rioa/gReZAnlphEZIxJHoo=', 'გიორგი ქართველიშვილი', null, '', '597377709', '2', null, null);
INSERT INTO `users` VALUES ('31', 'ვანო', 'xa+Dl4dLFtapfWBYDBLrQVhQHrUzu9fseD/CkI7WssQ=', 'ვანო ბერიაშვილი', null, '', '598915770', '2', null, null);
INSERT INTO `users` VALUES ('32', 'manika', 'cHZn5MiAL1GE1cGtqkQOXt5LJKTI2Be0Uu/rHWA3Ei8=', 'manika', null, 'maia.lukhoshvili@heidelbergcement.ge', '577503920', '2', null, null);
INSERT INTO `users` VALUES ('33', 'ნათია', 'AJw500hjw7V4330Qg3u0+5ZefkOaOQ7lQMABKpTDWIo=', 'ნათია ტალახაძე', null, '', '551 53 28 49', '2', null, null);
INSERT INTO `users` VALUES ('34', 'ელენე', 'TkmAD7w877drG4h/o2qNvW3Sg2ZyWMYT4XVPo9Jm/vs=', 'ელენე ბაუერ', null, '', '599350271', '2', null, null);
INSERT INTO `users` VALUES ('35', 'ვანო', 'WZRHGrsBESr8wYFZ9sx0tPURuZgG2lmzyvWpwXPKz8U=', 'ვანო შალვაშვილი', null, '', '557960813', '2', null, null);
INSERT INTO `users` VALUES ('36', 'გოშა', 'dEuT+ZUPw42tcFVWkx6kgZO5ncsZHMm9dwl/Zfvi8Lg=', 'გოშა', null, '', '577666858', '2', null, null);
INSERT INTO `users` VALUES ('37', 'რომა', 'G8MgGp8kov5I9jT5DUBqr2y/XjbikocOy6mNdLBl7hs=', 'რომა', null, '', '558741466', '2', null, null);
INSERT INTO `users` VALUES ('38', 'ეკატერინე', 'V2yFxYT2BVXCoCTLuZ37vbX1jDvc8o28jqMV/UajiPM=', 'ეკატერინე', null, '', '557 25 40 28', '1', null, null);
INSERT INTO `users` VALUES ('39', 'ვანო', '548nqz7xd6mSbmuQ5XK5hTzmz02HUSg26a6FgH7J1/4=', 'ვანო ბიწაძე', null, '', '579068268', '2', null, null);
INSERT INTO `users` VALUES ('40', 'კახა', 'V2yFxYT2BVXCoCTLuZ37vbX1jDvc8o28jqMV/UajiPM=', 'კახა', null, '', '595900660', '2', null, null);
INSERT INTO `users` VALUES ('41', 'ლიკუნა', 'QcmR62pmJCwEVBkSRCeBg85Yz0przTcveZ5LnMAYhq8=', 'ლიკა ხუნაშვილი', null, '', '577953026', '2', null, null);
INSERT INTO `users` VALUES ('42', 'ზურა', 'Li9CY8+q7nqqHULvSKkGtR+q9qog1yytCnlwBSOMgi4=', 'ზურა', null, '', '557161327', '2', null, null);
INSERT INTO `users` VALUES ('43', 'ლიკა', 'TDqto3z3/TgZstpQKhX3j3zlos5tWEtjA0T/AN/8dKw=', 'ლიკა', null, '', '555626531', '2', null, null);
INSERT INTO `users` VALUES ('44', 'ზურა', '+KXaIU8/bCgeAIkkkU597PmhNjdzcgRYnu0EN53GAKg=', 'ზურა  ქარქუსაშვილი', null, '', '557161327', '2', null, null);
INSERT INTO `users` VALUES ('45', 'bachana', 'e1ljEnI/CHG+ViwxUUcQyhas5ZE0G0CBPVhvoxuAtqA=', 'bachana', null, '', '571880035', '2', null, null);
INSERT INTO `users` VALUES ('46', 'ნანიკო', 'jnGyRTTp8/s6cSYzWf7St/+wCCZeDTQ4PjGfG29cCPI=', 'ნანიკო', null, '', '579133219', '2', null, null);
INSERT INTO `users` VALUES ('47', 'ანა', '7e4p+IJUO5VmILJtDuDn6VA5mxxCIvXeBeBkJbTJlek=', 'ანა', null, '', '592059227', '2', null, null);
INSERT INTO `users` VALUES ('48', 'ბაჩი', 'wfMw0K/zHByHQD8eQ0e8whr/fBeZCHI1NfKzFyNwJSU=', 'ბაჩი', null, '', '', '2', null, null);
INSERT INTO `users` VALUES ('49', 'ილია', 'SDAp1SYhn4Fujo9qneB7QiYz26GA/8JvqsIoYqAXUZ8=', 'ილია', null, '', '579073073', '2', null, null);
INSERT INTO `users` VALUES ('50', 'ზურა', 'P4PprVvmO9W/L9AJ//5rfdQGYkOXW8li7cN0WcF+Zbk=', 'ზურა', null, '', '568020187', '2', null, null);
INSERT INTO `users` VALUES ('51', 'ტიმო', '12l1cEYvdWK4PoEljeDx5Bgy6YBy5Ew27I7+xGeG4k4=', 'ტიმო', null, '', '579182316', '2', null, null);
INSERT INTO `users` VALUES ('52', 'დათო', '838/Kw3Feobe5Lpv+FUoO7TS8N6hxb0bcIhTREwv/Ow=', 'დათო', null, '', '558508640', '2', null, null);
INSERT INTO `users` VALUES ('53', 'ვახო', 'zoRX1ZB4ppmstwQW+IFVqWqQa3t6rUNwhALjo7zIpLQ=', 'ვახო', null, '', '598525275', '2', null, null);
INSERT INTO `users` VALUES ('54', 'ალექსანდრე', 'D/4avRoIIVNTwjPW4AlhPpXuxCU4Mqdhryj/N6xaFQw=', 'ალექსანდრე', null, '', '555-279-666', '2', null, null);
INSERT INTO `users` VALUES ('55', 'მიკი', 'OYoVvJvcTbJtHSHdqb8ObgGK44gCDg4TmPXsyXicGOA=', 'მიკი', null, '', '555668288', '2', null, null);
INSERT INTO `users` VALUES ('56', 'შაკო', 'jptmkQnfiWILlPI4fcUyBqgt3HHWWPj3orOptBc3DT4=', 'შაკო', null, '', '593 42-42 52', '1', null, null);
INSERT INTO `users` VALUES ('57', 'ზურა', 'P4PprVvmO9W/L9AJ//5rfdQGYkOXW8li7cN0WcF+Zbk=', 'ზურა', null, '', '568-02-01-87', '2', null, null);
INSERT INTO `users` VALUES ('58', 'გიგი', 'mvFbM25qlhmShTffMLLmojdlafz51+dz7M7eZWBlKaA=', 'გიგი', null, '', '555-13-55-76', '2', null, null);
INSERT INTO `users` VALUES ('59', 'თეო', 'KSaicx9LMSwImCys+AYesUv2XBqHzF1w6GTgecYiBzE=', 'თეო', null, '', '593-35-17-21', '1', null, null);
INSERT INTO `users` VALUES ('60', 'ლიკა', 'QcmR62pmJCwEVBkSRCeBg85Yz0przTcveZ5LnMAYhq8=', 'ლიკა', null, '', '557-450-465', '2', null, null);
INSERT INTO `users` VALUES ('61', 'tural', 'cfRf7VH4pfp6P0X/+UuT5Ft1eFWu4e13SQlgbzshkC8=', 'tural', null, '', '579-02-91-01', '2', null, null);
INSERT INTO `users` VALUES ('62', 'ნამიკ', 'jptmkQnfiWILlPI4fcUyBqgt3HHWWPj3orOptBc3DT4=', 'ნამიკ', null, '', '555-761-661', '2', null, null);
INSERT INTO `users` VALUES ('63', 'ჯანგო', 'G8MgGp8kov5I9jT5DUBqr2y/XjbikocOy6mNdLBl7hs=', 'ჯანგო', null, 'cahangirasadov@mail.ru', '557667010', '2', null, null);
INSERT INTO `users` VALUES ('64', 'გიორგი', 'jK63VYxT6z8G+xggb7AcxOrOZqqP6M1JSVWZlmYi+xA=', 'გიორგი', null, '', '593001995', '1', null, null);
INSERT INTO `users` VALUES ('65', 'ვალერი', '/iWStCpyfpd/BVlHOFtwnMgrFrmof4jGq/OQDWXQzcM=', 'ვალერი', null, '', '568646424', '1', null, null);
INSERT INTO `users` VALUES ('66', 'ვანიკო', '548nqz7xd6mSbmuQ5XK5hTzmz02HUSg26a6FgH7J1/4=', 'ვანიკო', null, 'vaniko@gmail.com', '579068268', '1', null, null);

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
INSERT INTO `user_rights` VALUES ('4', '29', '1');
INSERT INTO `user_rights` VALUES ('5', '1', '23');
INSERT INTO `user_rights` VALUES ('6', '1', '22');
INSERT INTO `user_rights` VALUES ('7', '1', '21');
