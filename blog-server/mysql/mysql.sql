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

 Date: 17/09/2023 22:28:49
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
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of article
-- ----------------------------
INSERT INTO `article` VALUES (1, '前端实现文件预览（pdf、excel、word）', 2, '2,3', '<h1><span style=\"font-family: 仿宋;\">前端实现文件预览（pdf、excel、word）</span></h1><p><span style=\"color: rgb(89, 89, 89); font-size: 14px; font-family: Arial;\">需求：实现在线预览pdf、excel、word文件的功能。</span></p><p><span style=\"color: rgb(89, 89, 89); font-size: 14px; font-family: Arial;\">介绍：支持pdf、xlsx、docx</span></p>', '<h1>@vue-office</h1><p><span style=\"color: rgb(51, 51, 51); background-color: rgb(255, 255, 255); font-size: 16px;\">支持多种文件(</span><span style=\"color: rgb(0, 0, 0); background-color: rgb(255, 255, 255); font-size: 16px;\">docx、excel、pdf</span><span style=\"color: rgb(51, 51, 51); background-color: rgb(255, 255, 255); font-size: 16px;\">)预览的vue组件库，支持vue2/3。也支持非Vue框架的预览。本文以vue3使用作为演示。</span></p><p><span style=\"color: rgb(36, 41, 46); background-color: rgb(255, 242, 204); font-size: 16px; font-family: Arial;\">Vue Demi是一个让你可以开发同时支持Vue2和3的通用的Vue库的开发工具，而无需担心用户安装的版本。</span></p><pre><code class=\"language-javascript\">#docx文档预览组件\nnpm install @vue-office/docx vue-demi\ns\n#excel文档预览组件\nnpm install @vue-office/excel vue-demi\n\n#pdf文档预览组件\nnpm install @vue-office/pdf vue-demi</code></pre><p>如果是vue2.6版本或以下还需要额外安装 @vue/composition-api</p><pre><code class=\"language-javascript\">npm install @vue/composition-api/</code></pre><h1>使用示例</h1><p><span style=\"background-color: rgb(233, 233, 233);\">文档预览场景大致可以分为两种：</span></p><ul><li style=\"text-align: left;\">有文档网络地址，比如 https://***.docx</li><li style=\"text-align: left;\">文件上传时预览，此时可以获取文件的ArrayBuffer或Blob</li></ul><h3 style=\"text-align: left;\"><span style=\"color: rgb(0, 0, 0); background-color: rgb(255, 255, 255);\">网络地址预览</span></h3><pre><code class=\"language-javascript\">&lt;script setup&gt;\nimport { ref } from \'vue\'\n\n//引入VueOfficeDocx组件\nimport VueOfficeDocx from \'@vue-office/docx\'\n//引入相关样式\nimport \'@vue-office/docx/lib/index.css\'\n\nconst docx = ref(\'http://static.shanhuxueyuan.com/test6.docx\')\n\nconst rendered = () =&gt; {\n  console.log(\"渲染完成\")\n}\n\nconst errorHandler = () =&gt; {\n  console.log(\'渲染失败\')\n}\n\n&lt;/script&gt;\n\n&lt;template&gt;\n  &lt;vue-office-docx :src=\"docx\" style=\"width: 100vw;\" @rendered=\"rendered\" @error=\"errorHandler\"/&gt;\n&lt;/template&gt;</code></pre><h3><span style=\"color: rgb(51, 51, 51); background-color: rgb(255, 255, 255);\">读取文件ArrayBuffer</span></h3><pre><code class=\"language-javascript\">&lt;script setup&gt;\nimport { ref } from \'vue\'\n//引入VueOfficeDocx组件\nimport VueOfficeDocx from \'@vue-office/docx\'\n//引入相关样式\nimport \'@vue-office/docx/lib/index.css\'\n\nconst docx = ref(\'\')\n\nconst rendered = () =&gt; {\n  console.log(\"渲染完成\")\n}\n\nconst errorHandler = () =&gt; {\n  console.log(\'渲染失败\')\n}\n\nconst changeHandle = (event) =&gt; {\n  let file = event.target.files[0]\n  let fileReader = new FileReader()\n  fileReader.readAsArrayBuffer(file)\n  fileReader.onload = () =&gt; {\n    docx.value = fileReader.result\n  }\n}\n&lt;/script&gt;\n\n&lt;template&gt;\n  &lt;input type=\"file\" @change=\"changeHandle\" /&gt;\n  &lt;vue-office-docx :src=\"docx\" style=\"width: 100vw;\" @rendered=\"rendered\" @error=\"errorHandler\"/&gt;\n&lt;/template&gt;</code></pre><h3>关于@vue-office/excel、@vue-office/pdf</h3><pre><code class=\"language-javascript\">通过网络地址预览示例如下，通过文件ArrayBuffer预览和上面docx的使用方式一致。\n&lt;script&gt;\n//引入VueOfficeExcel组件\nimport VueOfficeExcel from \'@vue-office/excel\'\n//示例在线地址\nconst src = ref(\'http://static.shanhuxueyuan.com/demo/excel.xlsx\')\n\n//引入VueOfficePdf组件\nimport VueOfficePdf from \'@vue-office/pdf\'\n//示例在线地址\nconst src = ref(\'http://static.shanhuxueyuan.com/test.pdf\')\n\n&lt;/script&gt;</code></pre><p><br></p>', 222, 1981, 0, 1, 0, '2023-09-13 21:45:29', '2023-09-17 20:11:27');
INSERT INTO `article` VALUES (2, '关于LL2', 4, '2,3,10', '暂无描述', '<pre><code class=\"language-javascript\">console.log(\'ok\')</code></pre><p>asdasdasd</p><pre><code class=\"language-javascript\">import \"prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard.min.js\"\r\nimport \"prismjs/plugins/line-numbers/prism-line-numbers.min.js\"</code></pre><p>asd</p>', 111, 213, 0, 1, 0, '2023-09-13 22:42:24', '2023-09-17 21:39:52');
INSERT INTO `article` VALUES (3, 'test', 3, '2', '暂无描述', 'test', 0, 4, 0, 1, 0, '2023-09-17 21:33:39', '2023-09-17 21:39:31');
INSERT INTO `article` VALUES (4, 'test2', 2, '2,3', 'tt', 'aaa', 0, 3, 0, 1, 0, '2023-09-17 21:33:58', '2023-09-17 21:34:36');
INSERT INTO `article` VALUES (5, 'test3', 2, '3', '暂无aa述', 'zzz', 0, 3, 0, 1, 0, '2023-09-17 21:34:14', '2023-09-17 21:34:36');

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
INSERT INTO `category` VALUES (3, '随心日志', 'grays', 'apps-line', 1, 0, '2023-09-12 19:37:43', '2023-09-17 21:39:27');
INSERT INTO `category` VALUES (4, '随心日志2', 'green', 'chat-smile-2-line', 1, 0, '2023-09-12 19:40:52', '2023-09-17 21:39:10');

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
INSERT INTO `custom` VALUES ('{\"list\":[{\"name\":\"Miss You\",\"artist\":\"塞壬唱片-MSR\",\"url\":\"https://lblog-aliyun.oss-cn-beijing.aliyuncs.com/music/Miss%20You.mp3\",\"cover\":\"https://lblog-aliyun.oss-cn-beijing.aliyuncs.com/music/Miss%20You.webp\"}],\"config\":{\"fixed\":false,\"listFolded\":true,\"autoplay\":true,\"preload\":\"auto\",\"loop\":\"all\",\"order\":\"list\"}}', '\"<h3 style=\\\"text-align: justify;\\\">目前的情况</h3><ul><li style=\\\"text-align: justify;\\\">M E：前端小趴菜</li><li style=\\\"text-align: justify;\\\">目标：少想多做吧</li><li style=\\\"text-align: justify;\\\">爱好：写Bug、逛B站</li><li style=\\\"text-align: justify;\\\">性格：喜静、偶尔emo，时刻督促自己变得阳光开朗</li></ul><h3 style=\\\"text-align: justify;\\\">我 &amp; 博客</h3><p style=\\\"text-align: justify;\\\">很少对事物起兴趣，有时会因考虑太多做出不明智的决定😅</p><p style=\\\"text-align: justify;\\\">因为口嗨的习惯，造成了很多不可挽回的错误，在改正。</p><p style=\\\"text-align: justify;\\\">喜欢安静，节奏控，coding 时喜欢听婉转美好的歌曲🎵</p><p style=\\\"text-align: justify;\\\"><a href=\\\"https://github.com/Lzy0730/LBlog\\\" target=\\\"_blank\\\">🍓LBlog个人博客系统</a>，作为学习过程中的产物，参考很多博客，蠢蠢的缝合怪⭐️</p><p style=\\\"text-align: justify;\\\">写博客的起因也很简单，日常知识点太多，用md或word不好看，就想弄个博客了。</p>\"', '{\"bg1\":\"https://lblog-aliyun.oss-cn-beijing.aliyuncs.com/bg1.jpg\",\"bg2\":\"https://lblog-aliyun.oss-cn-beijing.aliyuncs.com/bg2.png\",\"bg3\":\"https://lblog-aliyun.oss-cn-beijing.aliyuncs.com/bg3.jpg\",\"malfunctionText\":\"LL\'s Blog\"}', '{\"blogName\":\"LL\'s Blog\",\"copyright\":{\"title\":\"Copyright © 2023\",\"siteName\":\"LL\'S BLOG\"},\"beian\":\"浙ICP备2023006413号\"}', '{\"name\":\"LL\",\"github\":\"https://github.com/Lzy0730\",\"bilibili\":\"https://space.bilibili.com/2192338\",\"netease\":\"https://music.163.com/#/user/home?id=433024891\",\"rollText\":\"个人简介：我是真菜\",\"avatar\":\"http://lovcc.cn/img/avatar.jpg\"}');

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
INSERT INTO `tag` VALUES (11, 'test', 'test', 1, 1, '2023-09-11 23:00:42', '2023-09-17 17:05:43');
INSERT INTO `tag` VALUES (12, 'aaa', 'sad', 1, 1, '2023-09-11 23:01:58', '2023-09-17 17:05:45');
INSERT INTO `tag` VALUES (13, 'aaa', 'aaaaa', 1, 1, '2023-09-11 23:41:51', '2023-09-17 17:05:46');
INSERT INTO `tag` VALUES (14, 'Typescript', '#409eff', 1, 0, '2023-09-12 19:14:39', '2023-09-17 17:06:13');

SET FOREIGN_KEY_CHECKS = 1;
