/*
 Navicat Premium Data Transfer

 Source Server         : blog
 Source Server Type    : MySQL
 Source Server Version : 50743
 Source Host           : localhost:3306
 Source Schema         : blog

 Target Server Type    : MySQL
 Target Server Version : 50743
 File Encoding         : 65001

 Date: 14/09/2023 00:49:02
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for article
-- ----------------------------
DROP TABLE IF EXISTS `article`;
CREATE TABLE `article`  (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '文章id',
  `title` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '文章标题',
  `cateogry_id` int(10) UNSIGNED NOT NULL COMMENT '分类id',
  `description` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '暂无描述' COMMENT '描述',
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '内容',
  `views` int(11) NOT NULL DEFAULT 0 COMMENT '查阅数',
  `words` int(11) NOT NULL COMMENT '字数',
  `is_delete` tinyint(1) UNSIGNED NOT NULL DEFAULT 0 COMMENT '1：删除 0：未删除',
  `is_enable` tinyint(1) UNSIGNED NOT NULL DEFAULT 0 COMMENT '1: 启用 0: 停用',
  `is_top` tinyint(4) NOT NULL DEFAULT 0 COMMENT '1：置顶 0：未置顶',
  `create_time` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0) COMMENT '创建时间',
  `update_time` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP(0) COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of article
-- ----------------------------
INSERT INTO `article` VALUES (1, '关于LL', 2, '暂无描述', '<h3 id=\"目前的情况\">目前的情况</h3>\\n<ul>\\n<li>M E：前端小趴菜</li>\\n<li>目标：少想多做吧</li>\\n\\n<li>爱好：写Bug、逛B站</li>\\n<li>性格：喜静、偶尔emo，时刻督促自己变得阳光开朗</li>\\n</ul>\\n<h3 id=\"我--博客\">我 &amp; 博客</h3>\\n<p>很少对事物起兴趣，有时会因考虑太多做出不明智的决定😅</p>\\n<p>因为口嗨放了兄弟几次鸽子，被骂的可惨了，反思中...</p>\\n<p>喜欢安静，节奏控，coding 时喜欢听婉转美好的歌曲🎵</p>\\n\\n<p><a href=\"https://github.com/Lzy0730/LBlog\" target=\"_blank\">🍓LBlog个人博客系统</a>，作为学习过程中的产物，参考很多博客，蠢蠢的缝合怪⭐️</p>\\n<p>写博客的起因也很简单，日常知识点太多，用md或word不好看，就想弄个博客了。</p>\\n', 0, 1000, 0, 0, 0, '2023-09-13 21:45:29', '2023-09-13 22:14:29');
INSERT INTO `article` VALUES (2, '关于LL2', 4, '暂无描述', 'tttt', 111, 213, 0, 0, 0, '2023-09-13 22:42:24', '2023-09-13 22:42:24');

-- ----------------------------
-- Table structure for category
-- ----------------------------
DROP TABLE IF EXISTS `category`;
CREATE TABLE `category`  (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '分类id',
  `name` varchar(16) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '分类名称',
  `color` varchar(16) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '颜色',
  `icon` varchar(16) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '图标名',
  `is_enable` tinyint(1) UNSIGNED NOT NULL DEFAULT 0 COMMENT '1: 启用 0: 停用',
  `is_delete` tinyint(1) UNSIGNED NOT NULL DEFAULT 0 COMMENT '1：删除 0：未删除',
  `create_time` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0) COMMENT '创建时间',
  `update_time` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP(0) COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of category
-- ----------------------------
INSERT INTO `category` VALUES (1, 'name', 'orange', 'icon', 0, 1, '2023-09-11 23:08:42', '2023-09-11 23:24:18');
INSERT INTO `category` VALUES (2, 'asd', 'ds', 'amazon-fill', 0, 0, '2023-09-11 23:09:03', '2023-09-13 21:30:05');
INSERT INTO `category` VALUES (3, 'asd', 'cz', 'asd', 1, 0, '2023-09-12 19:37:43', '2023-09-12 19:40:45');
INSERT INTO `category` VALUES (4, 'asd', 'asd', 'asd', 0, 0, '2023-09-12 19:40:52', '2023-09-12 19:40:52');

-- ----------------------------
-- Table structure for tag
-- ----------------------------
DROP TABLE IF EXISTS `tag`;
CREATE TABLE `tag`  (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '标签id',
  `name` varchar(16) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '标签名',
  `color` varchar(16) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '标签颜色',
  `is_enable` tinyint(1) UNSIGNED NOT NULL DEFAULT 0 COMMENT '1: 启用 0: 停用',
  `is_delete` tinyint(1) UNSIGNED NOT NULL DEFAULT 0 COMMENT '1：删除 0：未删除',
  `create_time` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0) COMMENT '创建时间',
  `update_time` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP(0) COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 15 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of tag
-- ----------------------------
INSERT INTO `tag` VALUES (1, 'good', 'orange', 0, 1, '2023-09-10 11:19:24', '2023-09-10 12:13:30');
INSERT INTO `tag` VALUES (2, 'aaa', 'ggg', 0, 0, '2023-09-10 11:20:29', '2023-09-12 19:14:33');
INSERT INTO `tag` VALUES (3, 'helloName', 'pink', 1, 0, '2023-09-10 16:37:26', '2023-09-10 23:37:50');
INSERT INTO `tag` VALUES (5, 'name', 'orange', 0, 1, '2023-09-10 21:44:40', '2023-09-10 21:49:06');
INSERT INTO `tag` VALUES (6, 'name', 'orange', 0, 1, '2023-09-10 21:47:08', '2023-09-10 22:18:59');
INSERT INTO `tag` VALUES (7, 'name', 'orangesz', 0, 1, '2023-09-10 22:15:34', '2023-09-12 19:14:36');
INSERT INTO `tag` VALUES (8, 'name', 'orange', 1, 1, '2023-09-10 22:16:27', '2023-09-11 19:01:07');
INSERT INTO `tag` VALUES (9, 'name', 'orange', 0, 1, '2023-09-10 22:16:45', '2023-09-11 19:01:14');
INSERT INTO `tag` VALUES (10, 'name', 'orange', 1, 0, '2023-09-10 22:16:59', '2023-09-11 23:25:21');
INSERT INTO `tag` VALUES (11, 'test', 'test', 0, 0, '2023-09-11 23:00:42', '2023-09-11 23:00:42');
INSERT INTO `tag` VALUES (12, 'aaa', 'sad', 0, 0, '2023-09-11 23:01:58', '2023-09-11 23:01:58');
INSERT INTO `tag` VALUES (13, 'aaa', 'aaaaa', 0, 0, '2023-09-11 23:41:51', '2023-09-12 19:14:42');
INSERT INTO `tag` VALUES (14, 'asd', 'asd', 0, 0, '2023-09-12 19:14:39', '2023-09-12 19:14:39');

-- ----------------------------
-- Table structure for tag_rel_article
-- ----------------------------
DROP TABLE IF EXISTS `tag_rel_article`;
CREATE TABLE `tag_rel_article`  (
  `tag_id` int(10) UNSIGNED NOT NULL COMMENT '标签id',
  `article_id` int(10) UNSIGNED NOT NULL COMMENT '文章id'
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of tag_rel_article
-- ----------------------------
INSERT INTO `tag_rel_article` VALUES (2, 1);
INSERT INTO `tag_rel_article` VALUES (3, 1);
INSERT INTO `tag_rel_article` VALUES (3, 2);
INSERT INTO `tag_rel_article` VALUES (5, 2);
INSERT INTO `tag_rel_article` VALUES (6, 2);

SET FOREIGN_KEY_CHECKS = 1;
