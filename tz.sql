-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Время создания: Янв 17 2022 г., 23:55
-- Версия сервера: 5.7.33
-- Версия PHP: 7.1.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `api_info`
--

-- --------------------------------------------------------

--
-- Структура таблицы `tz`
--

CREATE TABLE `tz` (
  `id` int(30) NOT NULL,
  `date` date NOT NULL,
  `name` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  `number` int(30) NOT NULL,
  `distance` int(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `tz`
--

INSERT INTO `tz` (`id`, `date`, `name`, `count`, `distance`) VALUES
(1, '2022-01-17', 'Bmw', 1, 320),
(2, '2022-01-18', 'Volvo', 760, 7858),
(3, '2022-01-12', 'Lifan', 22, 25452),
(4, '2022-01-28', 'Nissan', 25, 959),
(5, '2022-01-28', 'mercedes', 520, 66959),
(6, '2022-01-02', 'Cadillac', 666, 542452),
(7, '2022-01-31', 'VW', 1, 328);

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `tz`
--
ALTER TABLE `tz`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `tz`
--
ALTER TABLE `tz`
  MODIFY `id` int(30) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
