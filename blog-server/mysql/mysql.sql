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

 Date: 16/09/2023 19:46:40
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
  `category_id` int(10) UNSIGNED NOT NULL COMMENT '分类id',
  `tag_ids` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '标签ids',
  `description` varchar(1024) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '暂无描述' COMMENT '描述',
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
INSERT INTO `article` VALUES (1, '关于LL', 2, '2,3,10,11', '<h1><span style=\"font-family: 仿宋;\">关于我🙄</span></h1><pre><code class=\"language-javascript\">console.log(\'ok!\')\nconsole.log(\'hello!\')</code></pre><p><br></p>', '<h3 style=\"text-align: justify;\">目前的情况</h3><ul><li style=\"text-align: justify;\">M E：前端小趴菜</li><li style=\"text-align: justify;\">目标：少想多做吧</li><li style=\"text-align: justify;\">爱好：写Bug、逛B站</li><li style=\"text-align: justify;\">性格：喜静、偶尔emo，时刻督促自己变得阳光开朗</li></ul><pre><code class=\"language-javascript\">console.log(\'ok!\')\nconsole.log(\'hello!\')</code></pre><h3 style=\"text-align: justify;\">我 &amp; 博客</h3><p style=\"text-align: justify;\">很少对事物起兴趣，有时会因考虑太多做出不明智的决定😅</p><p style=\"text-align: justify;\">因为口嗨放了兄弟几次鸽子，被骂的可惨了，反思中...</p><p style=\"text-align: justify;\">喜欢安静，节奏控，coding 时喜欢听婉转美好的歌曲🎵</p><p style=\"text-align: justify;\"><a href=\"https://github.com/Lzy0730/LBlog\" target=\"_blank\">🍓LBlog个人博客系统</a>，作为学习过程中的产物，参考很多博客，蠢蠢的缝合怪⭐️</p><p style=\"text-align: justify;\">写博客的起因也很简单，日常知识点太多，用md或word不好看，就想弄个博客了。</p>', 0, 275, 0, 1, 0, '2023-09-13 21:45:29', '2023-09-15 23:14:02');
INSERT INTO `article` VALUES (2, '关于LL2', 4, '3,5,6', '暂无描述', '<pre><code class=\"language-javascript\">console.log(\'ok\')</code></pre><p>asdasdasd</p><pre><code class=\"language-javascript\">import \"prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard.min.js\"\r\nimport \"prismjs/plugins/line-numbers/prism-line-numbers.min.js\"</code></pre><p>asd</p>', 111, 213, 0, 0, 0, '2023-09-13 22:42:24', '2023-09-15 19:05:35');

-- ----------------------------
-- Table structure for category
-- ----------------------------
DROP TABLE IF EXISTS `category`;
CREATE TABLE `category`  (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '分类id',
  `name` varchar(16) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '分类名称',
  `color` varchar(16) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '颜色',
  `icon` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '图标名',
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
INSERT INTO `category` VALUES (2, '技术博客', 'orange', 'amazon-fill', 1, 0, '2023-09-11 23:09:03', '2023-09-15 22:52:08');
INSERT INTO `category` VALUES (3, '随心日志', 'grays', 'apps-line', 0, 0, '2023-09-12 19:37:43', '2023-09-15 22:58:23');
INSERT INTO `category` VALUES (4, '随心日志', 'green', 'chat-smile-2-line', 1, 0, '2023-09-12 19:40:52', '2023-09-14 14:17:16');

-- ----------------------------
-- Table structure for custom
-- ----------------------------
DROP TABLE IF EXISTS `custom`;
CREATE TABLE `custom`  (
  `about_audio` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '关于我_播放器',
  `about_content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '关于我_文章',
  `banner` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '首页轮播',
  `site_info` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '站点信息',
  `introduction` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '个人介绍'
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of custom
-- ----------------------------
INSERT INTO `custom` VALUES ('{\"list\":[{\"name\":\"Miss You\",\"artist\":\"塞壬唱片-MSR\",\"url\":\"https://lblog-aliyun.oss-cn-beijing.aliyuncs.com/music/Miss%20You.mp3\",\"cover\":\"https://lblog-aliyun.oss-cn-beijing.aliyuncs.com/music/Miss%20You.webp\"}],\"config\":{\"fixed\":false,\"listFolded\":true,\"autoplay\":true,\"preload\":\"auto\",\"loop\":\"all\",\"order\":\"list\"}}', '{\"content\":\"<h3 style=\\\\\"text-align: justify;\\\\\">目前的情况</h3><ul><li style=\\\\\"text-align: justify;\\\\\">M E：前端小趴菜</li><li style=\\\\\"text-align: justify;\\\\\">目标：少想多做吧</li><li style=\\\\\"text-align: justify;\\\\\">爱好：写Bug、逛B站</li><li style=\\\\\"text-align: justify;\\\\\">性格：喜静、偶尔emo，时刻督促自己变得阳光开朗</li></ul><pre><code class=\\\\\"language-javascript\\\\\">console.log(\'ok!\')}\\\\nconsole.log(\'hello!\')</code></pre><h3 style=\\\\\"text-align: justify;\\\\\">我 &amp; 博客</h3><p style=\\\\\"text-align: justify;\\\\\">很少对事物起兴趣，有时会因考虑太多做出不明智的决定😅</p><p style=\\\\\"text-align: justify;\\\\\">因为口嗨放了兄弟几次鸽子，被骂的可惨了，反思中...</p><p style=\\\\\"text-align: justify;\\\\\">喜欢安静，节奏控，coding 时喜欢听婉转美好的歌曲🎵</p><p style=\\\\\"text-align: justify;\\\\\"><a href=\\\\\"https://github.com/Lzy0730/LBlog\\\\\" target=\\\\\"_blank\\\\\">🍓LBlog个人博客系统</a>，作为学习过程中的产物，参考很多博客，蠢蠢的缝合怪⭐️</p><p style=\\\\\"text-align: justify;\\\\\">写博客的起因也很简单，日常知识点太多，用md或word不好看，就想弄个博客了。</p>\",\"title\":\"关于LL\"}', '{\"bg1\":\"https://lblog-aliyun.oss-cn-beijing.aliyuncs.com/bg1.jpg\",\"bg2\":\"https://lblog-aliyun.oss-cn-beijing.aliyuncs.com/bg2.png\",\"bg3\":\"https://lblog-aliyun.oss-cn-beijing.aliyuncs.com/bg3.jpg\",\"malfunctionText\":\"LL\'s Blog\"}', '{\"blogName\":\"LL\'s Blog\",\"copyright\":{\"title\":\"Copyright © 2023\",\"siteName\":\"LL\'S BLOG\"},\"beian\":\"浙ICP备2023006413号\"}', '{\"name\":\"LL\",\"github\":\"https://github.com/Lzy0730\",\"bilibili\":\"https://space.bilibili.com/2192338\",\"netease\":\"https://music.163.com/#/user/home?id=433024891\",\"rollText\":\"个人简介：我是真菜\",\"avatar\":\"http://lovcc.cn/img/avatar.jpg\"}');

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
INSERT INTO `tag` VALUES (2, 'Vue2', 'green', 1, 0, '2023-09-10 11:20:29', '2023-09-14 14:32:32');
INSERT INTO `tag` VALUES (3, 'HTML', 'blue', 1, 0, '2023-09-10 16:37:26', '2023-09-14 11:13:20');
INSERT INTO `tag` VALUES (5, 'name', 'orange', 0, 1, '2023-09-10 21:44:40', '2023-09-10 21:49:06');
INSERT INTO `tag` VALUES (6, 'name', 'orange', 0, 1, '2023-09-10 21:47:08', '2023-09-10 22:18:59');
INSERT INTO `tag` VALUES (7, 'name', 'orangesz', 0, 1, '2023-09-10 22:15:34', '2023-09-12 19:14:36');
INSERT INTO `tag` VALUES (8, 'name', 'orange', 1, 1, '2023-09-10 22:16:27', '2023-09-11 19:01:07');
INSERT INTO `tag` VALUES (9, 'name', 'orange', 0, 1, '2023-09-10 22:16:45', '2023-09-11 19:01:14');
INSERT INTO `tag` VALUES (10, 'React', 'pink', 1, 0, '2023-09-10 22:16:59', '2023-09-15 22:36:02');
INSERT INTO `tag` VALUES (11, 'test', 'test', 1, 0, '2023-09-11 23:00:42', '2023-09-14 11:11:28');
INSERT INTO `tag` VALUES (12, 'aaa', 'sad', 1, 0, '2023-09-11 23:01:58', '2023-09-14 11:11:28');
INSERT INTO `tag` VALUES (13, 'aaa', 'aaaaa', 1, 0, '2023-09-11 23:41:51', '2023-09-14 11:11:29');
INSERT INTO `tag` VALUES (14, 'asd', 'asd', 0, 0, '2023-09-12 19:14:39', '2023-09-12 19:14:39');

SET FOREIGN_KEY_CHECKS = 1;
