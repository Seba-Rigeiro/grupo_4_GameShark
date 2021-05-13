-- MySQL dump 10.13  Distrib 8.0.23, for Win64 (x86_64)
--
-- Host: localhost    Database: gameshark_db
-- ------------------------------------------------------
-- Server version	8.0.23

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_category_id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;category_id
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Deportes',NULL,NULL),(2,'Accion',NULL,NULL),(3,'Aventura',NULL,NULL),(4,'Accesorios',NULL,NULL);
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `platforms`
--

DROP TABLE IF EXISTS `platforms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `platforms` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `platforms`
--

LOCK TABLES `platforms` WRITE;
/*!40000 ALTER TABLE `platforms` DISABLE KEYS */;
INSERT INTO `platforms` VALUES (1,'PS',NULL,NULL),(2,'XBOX',NULL,NULL),(3,'PC',NULL,NULL),(4,'SWITCH',NULL,NULL);
/*!40000 ALTER TABLE `platforms` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `category_id` int DEFAULT NULL,
  `platform_id` int DEFAULT NULL,
  `description` varchar(500) DEFAULT NULL,
  `price` decimal(10,0) DEFAULT NULL,
  `image` varchar(300) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `product_category_idx` (`category_id`),
  KEY `product_platform_idx` (`platform_id`),
  CONSTRAINT `product_category` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`),
  CONSTRAINT `product_platform` FOREIGN KEY (`platform_id`) REFERENCES `platforms` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'F1 2020',1,1,NULL,6099,'product-1.jpg',NULL,NULL),(2,'Cyberpunk 2077',2,1,NULL,5499,'product-2.jpg',NULL,NULL),(3,'Spiderman Miles Morales',2,1,NULL,4999,'product-3.jpg',NULL,NULL),(4,'Fortnite',3,1,NULL,5099,'product-4.jpg',NULL,NULL),(5,'Prey',2,3,NULL,3599,'product-5.jpg',NULL,NULL),(6,'Tomb Raider',3,3,NULL,5199,'product-6.jpg',NULL,NULL),(7,'Dishonored 2',2,3,'Segunda entrega del videojuego Dishonored creado por Arkane Studios, que apuesta por dos protagonistas y una ambientación en Karnaka que tiene lugar 15 años después del original. Su fórmula de juego combina acción en primera persona, asesinatos, sigilo, movilidad y el brutal sistema de combate que vimos en Dishonored, pero mejorado.\r\n',2499,'product-7.jpg',NULL,'2021-04-30 21:10:34'),(8,'Call of Duty (Black Ops)',2,3,NULL,5399,'product-8.jpg',NULL,NULL),(9,'Fifa 2021',1,2,'Fifa es el videojuego de fútbol más vendido de la actualidad y con más de 25 años de desarrollo. Vas a poder jugar con tus equipos y futbolistas preferidos en diversos modos. ¡Preparate para convertirte en campeón de todas las copas y torneos!',4399,'product-9.jpg',NULL,NULL),(10,'Minecraft',3,2,'Minecraft es un videojuego líder dentro del género de la aventura y la acción, donde quien juega puede elegir entre supervivencia, creatividad y dificultad extrema. Gracias al casi infinito mundo de terrenos que presenta, es posible jugar durante horas y encontrar múltiples desafíos.',3599,'product-10.jpg',NULL,NULL),(11,'Pes 2020',1,1,NULL,5550,'product-11.jpg',NULL,NULL),(12,'Mortal Kombat X',2,2,NULL,3999,'product-12.jpg',NULL,NULL),(16,'prueba',1,1,'',4999,NULL,'2021-04-16 21:58:15','2021-04-24 18:42:21'),(17,'prueba',3,3,NULL,4999,'product-image-default.jpg','2021-04-19 02:41:35','2021-04-19 02:41:35'),(18,'Zelda: Breath of the Wild',3,4,'Los juegos de la franquicia The Legend of Zelda marcaron un antes y después en el género de aventura. Convertite en Link para vencer a los villanos que hicieron de un pacífico reino un lugar inmerso en las tinieblas.',5700,'product-1619816386935.jpg','2021-04-20 19:47:02','2021-04-30 20:59:47'),(19,'prueba10',1,2,'qwerty',3000,'product-image-default.jpg','2021-04-30 19:25:28','2021-04-30 19:25:28'),(20,'Joystick inalámbrico Sony Dualshock 4',4,1,'Con Sony no solo podrás ver y oír todo con más detalle; también sentirás vibraciones mucho más intensas.\r\nTomá el control con más comodidad, disfrutá de un sonido de alta fidelidad y ganá precisión en el juego gracias a las mejoras en su diseño y botones.\r\n',8799,'product-1619842269059.jpg','2021-04-30 19:26:45','2021-05-01 04:11:09'),(21,'prueba10',1,1,'dasasd',1111,'product-image-default.jpg','2021-04-30 19:29:32','2021-04-30 19:29:32'),(22,'Super Mario Party',3,4,'Con este juego de Mario podrás disfrutar de una experiencia inigualable, ya que te permite jugar con tus amistades y compartir momentos inolvidables.',6500,'product-1619816077296.jpg','2021-04-30 19:48:17','2021-04-30 20:54:37'),(23,'Lego Jurassic World',3,4,'Excelente juego. Muy entretenido. En el vas a encontrar toda la saga de jurassic park',3999,'product-1619816918195.jpg','2021-04-30 19:49:24','2021-04-30 21:08:38'),(24,'Kit Vr Original + Gran Turismo',4,1,'PlayStation VR es un dispositivo de realidad virtual compatible tanto con PlayStation 4 como con los nuevos modelos PS4 Slim y PS4 Pro. Una nueva forma de jugar con la que los jugadores se sentirán una mayor sensación de inmersión que nunca.',74599,'product-1619817888160.jpg','2021-04-30 20:24:25','2021-04-30 21:24:48');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(200) NOT NULL,
  `image` varchar(300) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'prueba','','a@a.com','$2a$10$JGGJx1mfFkS3TTHFMk9w4uMyU6cHvY9DJ5BGIvhqbZ31pbIlKm8.C',NULL,'2021-03-25 21:14:42','2021-03-25 21:14:42'),(14,'seba','','seba_rigeiro@yahoo.com.ar','$2a$10$JGGJx1mfFkS3TTHFMk9w4uMyU6cHvY9DJ5BGIvhqbZ31pbIlKm8.C','user-1618943479248.jpg','2021-04-13 19:12:10','2021-04-13 19:12:10');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-05-01  1:16:32
