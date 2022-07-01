-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 01, 2022 at 06:29 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `netgluay-db`
--

-- --------------------------------------------------------

--
-- Table structure for table `content`
--

CREATE TABLE `content` (
  `id` int(11) NOT NULL,
  `name` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `year` int(11) NOT NULL,
  `homeImage` varchar(500) COLLATE utf8_unicode_ci NOT NULL,
  `posterImage` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `imdb` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `genre` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `type` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `homepage` int(11) DEFAULT NULL,
  `youtube` varchar(300) COLLATE utf8_unicode_ci NOT NULL,
  `watch` int(11) DEFAULT NULL,
  `image` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `link` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `content`
--

INSERT INTO `content` (`id`, `name`, `year`, `homeImage`, `posterImage`, `imdb`, `genre`, `type`, `homepage`, `youtube`, `watch`, `image`, `link`) VALUES
(1, 'Spider-Man: No Way...', 2021, 'https://media-cache.cinematerial.com/p/500x/go3qcuzt/spider-man-no-way-home-movie-poster.jpg?v=1648063206', 'https://i.imgur.com/yhYqMEo.jpg', 'tt10872600', 'action adventure fantasy', 'movie', 4, 'JfVOs4VSpmA', 0, '', ''),
(2, 'Dune', 2021, 'https://media-cache.cinematerial.com/p/500x/u3venqet/dune-movie-cover.jpg?v=1639252832', 'https://i.imgur.com/2PFgxn2.jpg', 'tt1160419', 'action adventure drama', 'movie', 4, '8g18jFHCLXk', 0, '', ''),
(3, 'The Matrix', 1999, '', 'https://i.imgur.com/hmMATy5.jpg', 'tt0133093', 'action scifi ', 'movie', NULL, 'vKQi3bBA1y8', 0, '', ''),
(4, 'Avengers: Endgame', 2019, '', 'https://i.imgur.com/EgK4Lxm.jpg', 'tt4154796', 'action adventure drama', 'movie', NULL, 'TcMBFSGVi1c', 0, '', ''),
(5, 'The Shawshank Red...', 1994, '', 'https://i.imgur.com/B32LXFn.jpg', 'tt0111161', 'drama', 'movie', NULL, '6hB3S9bIaco', 0, '', ''),
(6, 'The GodFather', 1972, '', 'https://i.imgur.com/DKUVnjX.jpg', 'tt0068646', 'drama crime', 'movie', NULL, 'UaVTIH8mujA', 0, '', ''),
(7, 'Harry Potter and ...', 2011, '', 'https://i.imgur.com/VVfrsOJ.jpg', 'tt1201607', 'adventure mystery', 'movie', NULL, 'mObK5XD8udk', 0, '', ''),
(8, 'The Dark Knight', 1972, '', 'https://i.imgur.com/OoBQwPA.jpg', 'tt0468569', 'action drama crime', 'movie', NULL, 'EXeTwQWrcwY', 0, '', ''),
(9, 'Scream', 2022, '', 'https://i.imgur.com/Tzq8LcT.jpg', 'tt11245972', 'horror thriller', 'movie', NULL, 'beToTslH17s', 0, '', ''),
(10, 'Eternals', 2021, 'https://media-cache.cinematerial.com/p/500x/mle9fo9y/eternals-indian-movie-poster.jpg?v=1634158163', 'https://i.imgur.com/DalFjH2.jpg', 'tt9032400', 'adventure action fantasy', 'movie', 4, 'x_me3xsvDgk', 0, '', ''),
(11, 'Don\'t Look Up', 2021, '', 'https://i.imgur.com/s19DEJb.jpg', 'tt11286314', 'drama comedy scifi', 'movie', NULL, 'RbIxYm3mKzI', 0, '', ''),
(12, 'The Power of the Dog', 2021, '', 'https://i.imgur.com/BzmitHe.jpg', 'tt10293406', 'drama romance western', 'movie', NULL, 'LRDPo0CHrko', 0, '', ''),
(13, 'The Lost Daughter', 2021, '', 'https://i.imgur.com/Te4GhZe.jpg', 'tt9100054', 'drama', 'movie', NULL, 'xNq9YOfL0Zs', 0, '', ''),
(14, 'The Matrix Res...', 2021, '', 'https://i.imgur.com/j61bQGd.jpg', 'tt10838180', 'action scifi', 'movie', NULL, '9ix7TUGVYIo', 0, '', ''),
(15, 'Encanto', 2021, '', 'https://i.imgur.com/OvEqgPD.jpg', 'tt2953050', 'animation comedy family', 'movie', NULL, 'CaimKeDcudo', 0, '', ''),
(16, 'Jai Bhim', 2021, '', 'https://m.media-amazon.com/images/M/MV5BOTM0NWFjNGYtNjExMS00ZTZlLWFiYmMtZmU4ZjZkMmMxZTNjXkEyXkFqcGdeQXVyODEyNjEwMDk@._V1_FMjpg_UX1200_.jpg', 'tt15097216', 'drama crime mystery', 'movie', NULL, 'nnXpbTFrqXA', 0, '', ''),
(17, 'The GodFather II', 1974, '', 'https://i.imgur.com/lDF2w0J.jpg', 'tt0071562', 'drama', 'movie', NULL, '9O1Iy9od7-A', 0, '', ''),
(18, 'Inception', 2010, '', 'https://i.imgur.com/KbCkFCh.jpg', 'tt1375666', 'action adventure scifi', 'movie', NULL, 'YoHD9XEInc0', 0, '', ''),
(19, 'Fight Club', 1999, '', 'https://i.imgur.com/SLmY7Vu.jpg', 'tt0137523', 'drama', 'movie', NULL, 'qtRKdVHc-cE', 0, '', ''),
(20, 'Forrest Gump', 2021, '', 'https://i.imgur.com/hk8LNui.jpg', 'tt0109830', 'drama romance', 'movie', NULL, 'bLvqoHBptjg', 0, '', ''),
(21, 'Demon Slayer: Mug..', 2020, '', 'https://i.imgur.com/AfHjq00.jpg', 'tt11032374', 'animation action adventure', 'movie', NULL, 'bFwdl2PDAFM', 0, '', ''),
(22, 'Hamilton', 2020, '', 'https://i.imgur.com/0rd85Ok.jpg', 'tt8503618', 'drama biography history', 'movie', NULL, 'DSCKfXpAGHc', 0, '', ''),
(23, 'The Father', 2020, '', 'https://i.imgur.com/HncSERf.jpg', 'tt10272386', 'drama mystery', 'movie', NULL, '4TZb7YfK-JI', 0, '', ''),
(24, '1917', 2019, '', 'https://i.imgur.com/uefujL3.jpg', 'tt8579674', 'action drama war', 'movie', NULL, 'YqNYrYUiMfg', 0, '', ''),
(25, 'Klaus', 2019, '', 'https://i.imgur.com/MViwvll.jpg', 'tt4729430', 'animation adventure comedy', 'movie', NULL, 'taE3PwurhYM', 0, '', ''),
(26, 'The Last Duel', 2021, '', 'https://i.imgur.com/AQZzNCz.jpg', 'tt4244994', 'action drama history', 'movie', NULL, 'mgygUwPJvYk', 0, '', ''),
(27, 'The Tragedy of..', 2021, '', 'https://i.imgur.com/UATzwsZ.jpg', 'tt10095582', 'drama history thriller', 'movie', NULL, 'HM3hsVrBMA4', 0, '', ''),
(28, 'The Witcher', 2019, 'https://media-cache.cinematerial.com/p/500x/s7iedhzl/the-witcher-movie-poster.jpg?v=1652827371', 'https://i.imgur.com/RK1Seq1.jpg', 'tt5180504', 'action adventure series drama', 'series', 4, 'ndl1W4ltcmg', 0, '', ''),
(29, 'Arcane', 2021, 'https://media-cache.cinematerial.com/p/500x/irsdyrfc/arcane-league-of-legends-movie-poster.jpg?v=1635975591', 'https://i.imgur.com/nagmR1B.jpg', 'tt11126994', 'adventure  animation', 'series', 4, 'fXmAurh012s', 0, '', ''),
(30, 'Wheel of Time', 2021, '', 'https://i.imgur.com/l2Avpdw.jpg', 'tt7462410', 'action adventure series drama', 'series', NULL, '11ZozKfRqvA', 0, '', ''),
(31, 'Hawkeye', 2021, '', 'https://i.imgur.com/PFVmg3d.jpg', 'tt10160804', 'action adventure', 'series', NULL, '5VYb3B1ETlk', 0, '', ''),
(32, 'Yellowjackets', 2021, '', 'https://i.imgur.com/Edcwagg.jpg', 'tt11041332', 'drama horror', 'series', NULL, 'mX22D65TqAs', 0, '', ''),
(33, 'Station', 2021, '', 'https://i.imgur.com/dUjju9K.jpg', 'tt10574236', 'drama adventure', 'series', NULL, 'LPm52rq8CZA', 0, '', ''),
(34, 'Landscapers', 2021, '', 'https://i.imgur.com/INNkImS.jpg', 'tt11471892', 'comedy drama', 'series', NULL, 'WYSpdaYTW1Y', 0, '', ''),
(35, 'Lucifer', 2016, '', 'https://i.imgur.com/YHMzh4s.jpg', 'tt4052886', 'drama', 'series', NULL, 'X4bF_quwNtw', 0, '', ''),
(36, 'Dota: Dragon\'s Blood', 2021, '', 'https://i.imgur.com/gO62Lnb.jpg', 'tt14069590', 'animation action adventur', 'series', NULL, 'F0evM-hBlcI', 0, '', ''),
(37, 'Iron fist', 2017, '', 'https://i.imgur.com/0rYEcYg.jpg', 'tt3322310', 'action adventure crime', 'series', NULL, 'f9OKL5no-S0', 0, '', ''),
(38, 'Fast & Furious S..', 2019, '', 'https://i.imgur.com/XtD7F0n.jpg', 'tt8322592', 'animation action adventure', 'series', NULL, 'Dtwx1rvd-eA', 0, '', ''),
(39, 'Formula 1: Dri..', 2019, '', 'https://i.imgur.com/sEgKmQS.jpg', 'tt8289930', 'documentary sport', 'series', NULL, 'wtJPe1ksS6E', 0, '', ''),
(40, 'Archive 81', 2022, '', 'https://i.imgur.com/lv0t8b0.jpg', 'tt13365348', 'drama horror mystery', 'series', NULL, 'ibxKEqxARkE', 0, '', ''),
(41, 'After Life', 2019, '', 'https://i.imgur.com/r4jszjM.jpg', 'tt8398600', 'comedy drama', 'series', NULL, 'eIGGKSHMQOM', 0, '', ''),
(42, 'Ozark', 2017, '', 'https://i.imgur.com/K8mgJYG.jpg', 'tt5071412', 'drama crime thriller', 'series', NULL, '5hAXVqrljbs', 0, '', ''),
(43, 'Inventing Anna', 2022, '', 'https://m.media-amazon.com/images/M/MV5BM2QzMWM5OTgtZDE1MC00ZmMyLWIyODItMmQ4NjNlZGRjYTUzXkEyXkFqcGdeQXVyMTEyMjM2NDc2._V1_.jpg', 'tt8740976', 'drama', 'series', NULL, '65xa8TG2G8o', 0, '', ''),
(44, 'Top Gun: Maverick', 2022, 'https://media-cache.cinematerial.com/p/500x/c3okhvcu/top-gun-maverick-poster.jpg?v=1653621655', 'https://m.media-amazon.com/images/M/MV5BOWQwOTA1ZDQtNzk3Yi00ZmVmLWFiZGYtNjdjNThiYjJhNzRjXkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_FMjpg_UX988_.jpg', 'tt1745960', 'action drama', 'movie', 1, 'qSqVVswa420', 0, '', ''),
(45, 'Morbius', 2022, 'https://media-cache.cinematerial.com/p/500x/3qkdjbd6/morbius-russian-movie-poster.jpg?v=1645041244', 'https://m.media-amazon.com/images/M/MV5BNTA3N2Q0ZTAtODJjNy00MmQzLWJlMmItOGFmNDI0ODgxN2QwXkEyXkFqcGdeQXVyMTM0NTUzNDIy._V1_FMjpg_UX980_.jpg', 'tt5108870', 'action adventure drama', 'movie', 1, 'oZ6iiRrz1SY', 0, '', ''),
(46, 'The Bob\'s Burgers...', 2022, 'https://media-cache.cinematerial.com/p/500x/tqyad3yv/the-bobs-burgers-movie-video-on-demand-movie-cover.jpg?v=1631340640', 'https://m.media-amazon.com/images/M/MV5BYzFhNDNkY2UtYjc3ZS00NzVkLTlhNzEtYmZiZGMzYmRjMjVhXkEyXkFqcGdeQXVyMjQwMDg0Ng@@._V1_.jpg', 'tt7466442', 'animation adventure comedy', 'movie', 1, 'hbGXqUumtqg', 0, '', ''),
(47, 'Doctor Strange Mul...', 2022, 'https://media-cache.cinematerial.com/p/500x/qprfqn5a/doctor-strange-in-the-multiverse-of-madness-movie-poster.jpg?v=1650697491', 'https://m.media-amazon.com/images/M/MV5BNWM0ZGJlMzMtZmYwMi00NzI3LTgzMzMtNjMzNjliNDRmZmFlXkEyXkFqcGdeQXVyMTM1MTE1NDMx._V1_.jpg', 'tt9419884', 'action adventure fantasy', 'movie', 1, 'mvRxgOX7Kes', 0, '', ''),
(48, 'Everything Every...', 2022, 'https://media-cache.cinematerial.com/p/500x/yocivlex/everything-everywhere-all-at-once-movie-cover.jpg?v=1651675730', 'https://m.media-amazon.com/images/M/MV5BYTdiOTIyZTQtNmQ1OS00NjZlLWIyMTgtYzk5Y2M3ZDVmMDk1XkEyXkFqcGdeQXVyMTAzMDg4NzU0._V1_.jpg', 'tt6710474', 'action adventure comedy', 'movie', 1, 'wxN1T1uxQ2g', 0, '', ''),
(49, 'The Northman', 2022, 'https://media-cache.cinematerial.com/p/500x/cx3uqciw/the-northman-movie-cover.jpg?v=1650953995', 'https://m.media-amazon.com/images/M/MV5BMzVlMmY2NTctODgwOC00NDMzLWEzMWYtM2RiYmIyNTNhMTI0XkEyXkFqcGdeQXVyNTAzNzgwNTg@._V1_.jpg', 'tt11138512', 'action adventure drama', 'movie', 2, 'oMSdFM12hOw', 0, '', ''),
(50, 'Chip \'n Dale', 2022, 'https://media-cache.cinematerial.com/p/500x/i2jwhqch/chip-n-dale-rescue-rangers-movie-poster.jpg?v=1652120488', 'https://m.media-amazon.com/images/M/MV5BZjBlMjIxN2ItNTMyNi00NDk5LWFhMzEtNzdiODE0Y2M4MWI2XkEyXkFqcGdeQXVyMTM1MTE1NDMx._V1_.jpg', 'tt3513500', 'animation adventure comedy', 'movie', 2, 'F4Z0GHWHe60', 0, '', ''),
(51, 'The Innocents', 2021, 'https://media-cache.cinematerial.com/p/500x/4dfxxfxo/the-innocents-poster.jpg?v=1653818397', 'https://m.media-amazon.com/images/M/MV5BNDgwNGFmMDMtNGQzMC00Mjc2LWFhNzItYWIxMGJlM2Q2MzZlXkEyXkFqcGdeQXVyODA0MjgyNzM@._V1_FMjpg_UX692_.jpg', 'tt4028464', 'drama fantasy horror', 'movie', 2, 'hm45yGSwArY', 0, '', ''),
(52, 'The Lost City\r\n', 2022, 'https://media-cache.cinematerial.com/p/500x/imj1bugq/the-lost-city-poster.jpg?v=1653160447', 'https://m.media-amazon.com/images/M/MV5BMmIwYzFhODAtY2I1YS00ZDdmLTkyYWQtZjI5NDIwMDc2MjEyXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_.jpg', 'tt13320622', 'action adventure comedy', 'movie', 2, 'nfKO9rYDmE8', 0, '', ''),
(53, 'The Batman', 2022, 'https://media-cache.cinematerial.com/p/500x/hlghingg/the-batman-poster.jpg?v=1648123974', 'https://m.media-amazon.com/images/M/MV5BMDdmMTBiNTYtMDIzNi00NGVlLWIzMDYtZTk3MTQ3NGQxZGEwXkEyXkFqcGdeQXVyMzMwOTU5MDk@._V1_.jpg', 'tt1877830', 'action crime drama', 'movie', 2, 'mqqft2x_Aa4', 0, '', ''),
(54, 'Sonic the Hed...', 2022, 'https://media-cache.cinematerial.com/p/500x/lumxajwc/sonic-the-hedgehog-2-french-poster.jpg?v=1648747542', 'https://m.media-amazon.com/images/M/MV5BMGI1NjA1MjUtNGQxNC00NDYyLThjODgtZjFkZjQ4OGM0NDc5XkEyXkFqcGdeQXVyMTM0NTUzNDIy._V1_FMjpg_UX1080_.jpg', 'tt12412888', 'action adventure comedy', 'movie', 3, '47r8FXYZWNU', 0, '', ''),
(55, 'Downton Abbey', 2022, 'https://media-cache.cinematerial.com/p/500x/szjrxvav/downton-abbey-a-new-era-british-movie-poster.jpg?v=1648814020', 'https://m.media-amazon.com/images/M/MV5BZDdjZjM1YWItNWRmOS00OTEzLWJmYjAtOGQzNTAyNmEwNDhjXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg', 'tt11703710', 'drama romance', 'movie', 3, 'wN0Spmq610Q', 0, '', ''),
(56, 'Fantastic Beasts', 2022, 'https://media-cache.cinematerial.com/p/500x/ta1nenq4/fantastic-beasts-the-secrets-of-dumbledore-movie-cover.jpg?v=1653422953', 'https://m.media-amazon.com/images/M/MV5BZGQ1NjQyNDMtNzFlZS00ZGIzLTliMWUtNGJkMGMzNTBjNDg0XkEyXkFqcGdeQXVyMTE1NDI5MDQx._V1_.jpg', 'tt4123432', 'action adventure fantasy', 'movie', 3, 'Y9dr2zw-TXQ', 0, '', ''),
(57, 'Old', 2021, 'https://media-cache.cinematerial.com/p/500x/nnqkuwti/old-movie-cover.jpg?v=1631799483', 'https://m.media-amazon.com/images/M/MV5BMjJjZGRhM2YtNTU4NC00OWMwLThhYWUtMWUxNDNhMDZlOTNmXkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_FMjpg_UX1154_.jpg', 'tt10954652', 'drama horror mystery', 'movie', 3, 'A4U2pMRV9_k', 0, '', ''),
(58, 'The Bad Guys', 2022, 'https://media-cache.cinematerial.com/p/500x/8i7vfdiv/the-bad-guys-movie-cover.jpg?v=1650551627', 'https://m.media-amazon.com/images/M/MV5BMDhkYmU0MzctMWEzNy00ODg1LWI3ZjAtMGZlZjkzNWVmMzVjXkEyXkFqcGdeQXVyMTM1MTE1NDMx._V1_.jpg', 'tt8115900', 'animation adventure comedy', 'movie', 3, 'm8Xt0yXaDPU', 0, '', ''),
(59, 'Rampage', 2018, '', 'https://m.media-amazon.com/images/M/MV5BNDA1NjA3ODU3OV5BMl5BanBnXkFtZTgwOTg3MTIwNTM@._V1_FMjpg_UX1012_.jpg', 'tt2231461', 'action adventure sci-fi', 'movie', NULL, 'coOKvrsmQiI', 0, '', '');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `img` varchar(500) COLLATE utf8_unicode_ci NOT NULL,
  `admin` varchar(11) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `img`, `admin`) VALUES
(3, 'admin', 'admin@admin.com', '$2a$08$ZA7/Z2UbAi/jynUyrXqgtes3i2jObPHyFJ1VelzW.hCJtE9n94NO2', 'https://i.imgur.com/9S77aYT.jpg', '1'),
(13, 'Siranut', 'siranut.poko@hotmail.com', '$2a$08$uHjmyoIf7I1Kyp3UpvXw6u8hTCtX2bj7jQIZ8mM4XTtA1w/SmMS9S', 'https://i.imgur.com/9S77aYT.jpg', '0');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `content`
--
ALTER TABLE `content`
  ADD UNIQUE KEY `id` (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `content`
--
ALTER TABLE `content`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
