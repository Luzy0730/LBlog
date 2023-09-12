/*
SQLyog Professional v12.09 (64 bit)
MySQL - 5.7.43 : Database - blog
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`blog` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;

USE `blog`;

/*Table structure for table `category` */

DROP TABLE IF EXISTS `category`;

CREATE TABLE `category` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '分类id',
  `name` varchar(16) NOT NULL COMMENT '分类名称',
  `color` varchar(16) NOT NULL COMMENT '颜色',
  `icon` varchar(16) NOT NULL COMMENT '图标名',
  `is_enable` tinyint(1) unsigned NOT NULL DEFAULT '0' COMMENT '1: 启用 0: 停用',
  `is_delete` tinyint(1) unsigned NOT NULL DEFAULT '0' COMMENT '1：删除 0：未删除',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;

/*Data for the table `category` */

insert  into `category`(`id`,`name`,`color`,`icon`,`is_enable`,`is_delete`,`create_time`,`update_time`) values (1,'name','orange','icon',0,1,'2023-09-11 23:08:42','2023-09-11 23:24:18'),(2,'name-update','color-update','icon-update',1,0,'2023-09-11 23:09:03','2023-09-11 23:21:57');

/*Table structure for table `tag` */

DROP TABLE IF EXISTS `tag`;

CREATE TABLE `tag` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '标签id',
  `name` varchar(16) NOT NULL COMMENT '标签名',
  `color` varchar(16) NOT NULL COMMENT '标签颜色',
  `is_enable` tinyint(1) unsigned NOT NULL DEFAULT '0' COMMENT '1: 启用 0: 停用',
  `is_delete` tinyint(1) unsigned NOT NULL DEFAULT '0' COMMENT '1：删除 0：未删除',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4;

/*Data for the table `tag` */

insert  into `tag`(`id`,`name`,`color`,`is_enable`,`is_delete`,`create_time`,`update_time`) values (1,'good','orange',0,1,'2023-09-10 11:19:24','2023-09-10 12:13:30'),(2,'aaa','ggg',0,0,'2023-09-10 11:20:29','2023-09-12 19:14:33'),(3,'helloName','pink',1,0,'2023-09-10 16:37:26','2023-09-10 23:37:50'),(5,'name','orange',0,1,'2023-09-10 21:44:40','2023-09-10 21:49:06'),(6,'name','orange',0,1,'2023-09-10 21:47:08','2023-09-10 22:18:59'),(7,'name','orangesz',0,1,'2023-09-10 22:15:34','2023-09-12 19:14:36'),(8,'name','orange',1,1,'2023-09-10 22:16:27','2023-09-11 19:01:07'),(9,'name','orange',0,1,'2023-09-10 22:16:45','2023-09-11 19:01:14'),(10,'name','orange',1,0,'2023-09-10 22:16:59','2023-09-11 23:25:21'),(11,'test','test',0,0,'2023-09-11 23:00:42','2023-09-11 23:00:42'),(12,'aaa','sad',0,0,'2023-09-11 23:01:58','2023-09-11 23:01:58'),(13,'aaa','aaaaa',0,0,'2023-09-11 23:41:51','2023-09-12 19:14:42'),(14,'asd','asd',0,0,'2023-09-12 19:14:39','2023-09-12 19:14:39');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
