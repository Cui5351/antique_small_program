-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- 主机： localhost
-- 生成日期： 2023-09-11 20:36:29
-- 服务器版本： 8.0.24
-- PHP 版本： 7.4.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 数据库： `antique`
--
CREATE DATABASE IF NOT EXISTS `antique` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `antique`;

-- --------------------------------------------------------

--
-- 表的结构 `bills`
--

DROP TABLE IF EXISTS `bills`;
CREATE TABLE `bills` (
  `id` int NOT NULL,
  `openid` varchar(150) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `name` varchar(30) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `state` enum('show','deleted') COLLATE utf8mb4_general_ci DEFAULT 'show',
  `count` int DEFAULT NULL,
  `src` text COLLATE utf8mb4_general_ci,
  `money` decimal(10,2) DEFAULT NULL,
  `date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `uuid` varchar(36) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `store` varchar(30) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `state2` enum('待发货','待收货','完成') COLLATE utf8mb4_general_ci DEFAULT '待发货'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- 表的结构 `bought_log`
--

DROP TABLE IF EXISTS `bought_log`;
CREATE TABLE `bought_log` (
  `id` int NOT NULL,
  `name` varchar(30) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `bought_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `bought_count` int DEFAULT NULL,
  `openid` varchar(150) COLLATE utf8mb4_general_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- 表的结构 `collections`
--

DROP TABLE IF EXISTS `collections`;
CREATE TABLE `collections` (
  `id` int NOT NULL,
  `openid` varchar(150) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `collection` text COLLATE utf8mb4_general_ci,
  `type` enum('museum','store','antique','workroom') COLLATE utf8mb4_general_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- 表的结构 `community_moments`
--

DROP TABLE IF EXISTS `community_moments`;
CREATE TABLE `community_moments` (
  `id` int NOT NULL,
  `openid` varchar(200) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `browse` int DEFAULT '0',
  `send_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `uuid` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `show_moment` enum('show','hid') COLLATE utf8mb4_general_ci DEFAULT 'show',
  `state` enum('show','deleted') COLLATE utf8mb4_general_ci DEFAULT 'show',
  `place` varchar(50) COLLATE utf8mb4_general_ci DEFAULT '火星'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- 表的结构 `community_moment_comment`
--

DROP TABLE IF EXISTS `community_moment_comment`;
CREATE TABLE `community_moment_comment` (
  `id` int NOT NULL,
  `openid` varchar(150) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `content` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `uuid` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `date` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- 表的结构 `community_moment_pic`
--

DROP TABLE IF EXISTS `community_moment_pic`;
CREATE TABLE `community_moment_pic` (
  `id` int NOT NULL,
  `uuid` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `src` varchar(300) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `mask` varchar(150) COLLATE utf8mb4_general_ci NOT NULL,
  `duration` varchar(15) COLLATE utf8mb4_general_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- 表的结构 `danmu`
--

DROP TABLE IF EXISTS `danmu`;
CREATE TABLE `danmu` (
  `id` int NOT NULL,
  `video_id` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `openid` varchar(150) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `danmu` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `video_time` int DEFAULT '0',
  `send_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- 表的结构 `focus`
--

DROP TABLE IF EXISTS `focus`;
CREATE TABLE `focus` (
  `id` int NOT NULL,
  `openid` varchar(150) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `other_openid` varchar(150) COLLATE utf8mb4_general_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- 表的结构 `goods`
--

DROP TABLE IF EXISTS `goods`;
CREATE TABLE `goods` (
  `id` int NOT NULL,
  `store` varchar(30) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `name` varchar(30) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `description` text COLLATE utf8mb4_general_ci,
  `src` varchar(300) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `money` decimal(10,2) DEFAULT '0.00',
  `transport_money` decimal(8,2) DEFAULT '0.00',
  `sale` int DEFAULT '0',
  `depository` int DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- 表的结构 `goods_comment`
--

DROP TABLE IF EXISTS `goods_comment`;
CREATE TABLE `goods_comment` (
  `id` int NOT NULL,
  `user_avatar` varchar(300) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `goods_name` varchar(30) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `user_name` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `comment` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `grade` enum('1','2','3','4','5') COLLATE utf8mb4_general_ci DEFAULT '5',
  `comment_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- 表的结构 `goods_pic`
--

DROP TABLE IF EXISTS `goods_pic`;
CREATE TABLE `goods_pic` (
  `id` int NOT NULL,
  `name` varchar(30) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `src` varchar(300) COLLATE utf8mb4_general_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- 表的结构 `main_table`
--

DROP TABLE IF EXISTS `main_table`;
CREATE TABLE `main_table` (
  `id` int NOT NULL,
  `name` varchar(20) COLLATE utf8mb4_general_ci DEFAULT '网友',
  `avatar` varchar(300) COLLATE utf8mb4_general_ci DEFAULT 'https://www.mynameisczy.cn/antique/user_avatar/default_avatar.jpg',
  `sex` enum('男','女','未知') COLLATE utf8mb4_general_ci DEFAULT '未知',
  `openid` varchar(150) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `background` varchar(300) COLLATE utf8mb4_general_ci DEFAULT 'https://www.mynameisczy.cn/antique/user_background/default_background.jpg',
  `introduce` varchar(120) COLLATE utf8mb4_general_ci DEFAULT '这个家伙很懒,什么也没留下'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- 表的结构 `persons`
--

DROP TABLE IF EXISTS `persons`;
CREATE TABLE `persons` (
  `id` int NOT NULL,
  `openid` varchar(150) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `other_openid` varchar(150) COLLATE utf8mb4_general_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- 表的结构 `store`
--

DROP TABLE IF EXISTS `store`;
CREATE TABLE `store` (
  `id` int NOT NULL,
  `name` varchar(30) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `description` text COLLATE utf8mb4_general_ci,
  `create_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- 表的结构 `work`
--

DROP TABLE IF EXISTS `work`;
CREATE TABLE `work` (
  `id` int NOT NULL,
  `title` varchar(30) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `name` varchar(30) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `openid` varchar(150) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `src` text COLLATE utf8mb4_general_ci,
  `follow` int DEFAULT '0',
  `collection` int DEFAULT '0',
  `video_id` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `share` int DEFAULT '0',
  `mask` varchar(300) COLLATE utf8mb4_general_ci DEFAULT 'https://www.mynameisczy.cn/antique/video_masks/default_mask.jpg',
  `show_work` enum('show','hid') COLLATE utf8mb4_general_ci DEFAULT 'show',
  `state` enum('show','deleted') COLLATE utf8mb4_general_ci DEFAULT 'show',
  `work_uuid` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `publish_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `duration` varchar(15) COLLATE utf8mb4_general_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- 表的结构 `works`
--

DROP TABLE IF EXISTS `works`;
CREATE TABLE `works` (
  `id` int NOT NULL,
  `title` varchar(30) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `openid` varchar(150) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `show_work` enum('show','hid') COLLATE utf8mb4_general_ci DEFAULT 'show',
  `state` enum('show','deleted') COLLATE utf8mb4_general_ci DEFAULT 'show',
  `mask` varchar(300) COLLATE utf8mb4_general_ci DEFAULT 'https://www.mynameisczy.cn/antique/video_masks/default_mask.jpg',
  `score` int DEFAULT '0',
  `description` varchar(50) COLLATE utf8mb4_general_ci DEFAULT '作者很懒，没有给出作品简介',
  `uuid` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `publish_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 转储表的索引
--

--
-- 表的索引 `bills`
--
ALTER TABLE `bills`
  ADD PRIMARY KEY (`id`),
  ADD KEY `openid_bills` (`openid`);

--
-- 表的索引 `bought_log`
--
ALTER TABLE `bought_log`
  ADD PRIMARY KEY (`id`),
  ADD KEY `goods_id` (`name`),
  ADD KEY `bought_openid` (`openid`);

--
-- 表的索引 `collections`
--
ALTER TABLE `collections`
  ADD PRIMARY KEY (`id`),
  ADD KEY `openid_collections` (`openid`);

--
-- 表的索引 `community_moments`
--
ALTER TABLE `community_moments`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uuid` (`uuid`),
  ADD KEY `community_moments` (`openid`);

--
-- 表的索引 `community_moment_comment`
--
ALTER TABLE `community_moment_comment`
  ADD PRIMARY KEY (`id`),
  ADD KEY `community_moment_comment_uuid` (`uuid`);

--
-- 表的索引 `community_moment_pic`
--
ALTER TABLE `community_moment_pic`
  ADD PRIMARY KEY (`id`),
  ADD KEY `community_moments_p` (`uuid`);

--
-- 表的索引 `danmu`
--
ALTER TABLE `danmu`
  ADD PRIMARY KEY (`id`),
  ADD KEY `damu_openid` (`openid`),
  ADD KEY `video_id` (`video_id`);

--
-- 表的索引 `focus`
--
ALTER TABLE `focus`
  ADD PRIMARY KEY (`id`),
  ADD KEY `openid_focus` (`openid`),
  ADD KEY `other_openid_focus` (`other_openid`);

--
-- 表的索引 `goods`
--
ALTER TABLE `goods`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`),
  ADD KEY `store` (`store`);

--
-- 表的索引 `goods_comment`
--
ALTER TABLE `goods_comment`
  ADD PRIMARY KEY (`id`),
  ADD KEY `goods_id2` (`goods_name`);

--
-- 表的索引 `goods_pic`
--
ALTER TABLE `goods_pic`
  ADD PRIMARY KEY (`id`),
  ADD KEY `goods_id3` (`name`);

--
-- 表的索引 `main_table`
--
ALTER TABLE `main_table`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `openid` (`openid`);

--
-- 表的索引 `persons`
--
ALTER TABLE `persons`
  ADD PRIMARY KEY (`id`),
  ADD KEY `openid_persons` (`openid`),
  ADD KEY `other_openid_persons` (`other_openid`);

--
-- 表的索引 `store`
--
ALTER TABLE `store`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- 表的索引 `work`
--
ALTER TABLE `work`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `video_id` (`video_id`),
  ADD KEY `work_title` (`title`),
  ADD KEY `work_openid` (`openid`);

--
-- 表的索引 `works`
--
ALTER TABLE `works`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `title` (`title`),
  ADD KEY `openid_works` (`openid`);

--
-- 在导出的表使用AUTO_INCREMENT
--

--
-- 使用表AUTO_INCREMENT `bills`
--
ALTER TABLE `bills`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- 使用表AUTO_INCREMENT `bought_log`
--
ALTER TABLE `bought_log`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- 使用表AUTO_INCREMENT `collections`
--
ALTER TABLE `collections`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- 使用表AUTO_INCREMENT `community_moments`
--
ALTER TABLE `community_moments`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- 使用表AUTO_INCREMENT `community_moment_comment`
--
ALTER TABLE `community_moment_comment`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- 使用表AUTO_INCREMENT `community_moment_pic`
--
ALTER TABLE `community_moment_pic`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- 使用表AUTO_INCREMENT `danmu`
--
ALTER TABLE `danmu`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- 使用表AUTO_INCREMENT `focus`
--
ALTER TABLE `focus`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- 使用表AUTO_INCREMENT `goods`
--
ALTER TABLE `goods`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- 使用表AUTO_INCREMENT `goods_comment`
--
ALTER TABLE `goods_comment`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- 使用表AUTO_INCREMENT `goods_pic`
--
ALTER TABLE `goods_pic`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- 使用表AUTO_INCREMENT `main_table`
--
ALTER TABLE `main_table`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- 使用表AUTO_INCREMENT `persons`
--
ALTER TABLE `persons`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- 使用表AUTO_INCREMENT `store`
--
ALTER TABLE `store`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- 使用表AUTO_INCREMENT `work`
--
ALTER TABLE `work`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- 使用表AUTO_INCREMENT `works`
--
ALTER TABLE `works`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- 限制导出的表
--

--
-- 限制表 `bills`
--
ALTER TABLE `bills`
  ADD CONSTRAINT `openid_bills` FOREIGN KEY (`openid`) REFERENCES `main_table` (`openid`);

--
-- 限制表 `bought_log`
--
ALTER TABLE `bought_log`
  ADD CONSTRAINT `bought_openid` FOREIGN KEY (`openid`) REFERENCES `main_table` (`openid`),
  ADD CONSTRAINT `goods_id` FOREIGN KEY (`name`) REFERENCES `goods` (`name`);

--
-- 限制表 `collections`
--
ALTER TABLE `collections`
  ADD CONSTRAINT `openid_collections` FOREIGN KEY (`openid`) REFERENCES `main_table` (`openid`);

--
-- 限制表 `community_moments`
--
ALTER TABLE `community_moments`
  ADD CONSTRAINT `community_moments` FOREIGN KEY (`openid`) REFERENCES `main_table` (`openid`);

--
-- 限制表 `community_moment_comment`
--
ALTER TABLE `community_moment_comment`
  ADD CONSTRAINT `community_moment_comment_uuid` FOREIGN KEY (`uuid`) REFERENCES `community_moments` (`uuid`);

--
-- 限制表 `community_moment_pic`
--
ALTER TABLE `community_moment_pic`
  ADD CONSTRAINT `community_moments_p` FOREIGN KEY (`uuid`) REFERENCES `community_moments` (`uuid`);

--
-- 限制表 `danmu`
--
ALTER TABLE `danmu`
  ADD CONSTRAINT `damu_openid` FOREIGN KEY (`openid`) REFERENCES `main_table` (`openid`),
  ADD CONSTRAINT `video_id` FOREIGN KEY (`video_id`) REFERENCES `work` (`video_id`);

--
-- 限制表 `focus`
--
ALTER TABLE `focus`
  ADD CONSTRAINT `openid_focus` FOREIGN KEY (`openid`) REFERENCES `main_table` (`openid`),
  ADD CONSTRAINT `other_openid_focus` FOREIGN KEY (`other_openid`) REFERENCES `main_table` (`openid`);

--
-- 限制表 `goods`
--
ALTER TABLE `goods`
  ADD CONSTRAINT `store` FOREIGN KEY (`store`) REFERENCES `store` (`name`);

--
-- 限制表 `goods_comment`
--
ALTER TABLE `goods_comment`
  ADD CONSTRAINT `goods_id2` FOREIGN KEY (`goods_name`) REFERENCES `goods` (`name`);

--
-- 限制表 `goods_pic`
--
ALTER TABLE `goods_pic`
  ADD CONSTRAINT `goods_id3` FOREIGN KEY (`name`) REFERENCES `goods` (`name`);

--
-- 限制表 `persons`
--
ALTER TABLE `persons`
  ADD CONSTRAINT `openid_persons` FOREIGN KEY (`openid`) REFERENCES `main_table` (`openid`),
  ADD CONSTRAINT `other_openid_persons` FOREIGN KEY (`other_openid`) REFERENCES `main_table` (`openid`);

--
-- 限制表 `work`
--
ALTER TABLE `work`
  ADD CONSTRAINT `work_openid` FOREIGN KEY (`openid`) REFERENCES `works` (`openid`),
  ADD CONSTRAINT `work_title` FOREIGN KEY (`title`) REFERENCES `works` (`title`);

--
-- 限制表 `works`
--
ALTER TABLE `works`
  ADD CONSTRAINT `openid_works` FOREIGN KEY (`openid`) REFERENCES `main_table` (`openid`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
