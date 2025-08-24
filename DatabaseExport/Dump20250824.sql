CREATE DATABASE  IF NOT EXISTS `shop_online_manager_db` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `shop_online_manager_db`;
-- MySQL dump 10.13  Distrib 8.0.42, for Win64 (x86_64)
--
-- Host: localhost    Database: shop_online_manager_db
-- ------------------------------------------------------
-- Server version	8.0.42

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
-- Table structure for table `commands`
--

DROP TABLE IF EXISTS `commands`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `commands` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `date` date DEFAULT NULL,
  `deleted` bit(1) NOT NULL,
  `details` text NOT NULL,
  `payment_status` enum('CANCELLED','CONFIRMED','PENDING','REJECTED') DEFAULT NULL,
  `total` double NOT NULL,
  `customer_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK2q4ikcys21qcquhxcxsjajm56` (`customer_id`),
  CONSTRAINT `FK2q4ikcys21qcquhxcxsjajm56` FOREIGN KEY (`customer_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `commands`
--

LOCK TABLES `commands` WRITE;
/*!40000 ALTER TABLE `commands` DISABLE KEYS */;
INSERT INTO `commands` VALUES (1,'2025-08-23',_binary '\0','Livrare1','PENDING',2095,1),(2,'2025-08-23',_binary '','','PENDING',1191,2),(3,'2025-08-23',_binary '\0','adminaddress','PENDING',1702,1);
/*!40000 ALTER TABLE `commands` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `commands_products`
--

DROP TABLE IF EXISTS `commands_products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `commands_products` (
  `command_id` bigint NOT NULL,
  `product_id` bigint NOT NULL,
  KEY `FKql5521art8gmvf5ylg7ca427s` (`product_id`),
  KEY `FK45hfrj12aky6jkdkwbim2c707` (`command_id`),
  CONSTRAINT `FK45hfrj12aky6jkdkwbim2c707` FOREIGN KEY (`command_id`) REFERENCES `commands` (`id`),
  CONSTRAINT `FKql5521art8gmvf5ylg7ca427s` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `commands_products`
--

LOCK TABLES `commands_products` WRITE;
/*!40000 ALTER TABLE `commands_products` DISABLE KEYS */;
INSERT INTO `commands_products` VALUES (1,2),(1,3),(2,2),(2,4),(2,6),(3,1),(3,2),(3,4),(3,6);
/*!40000 ALTER TABLE `commands_products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `images`
--

DROP TABLE IF EXISTS `images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `images` (
  `id` int NOT NULL AUTO_INCREMENT,
  `image_url` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `images`
--

LOCK TABLES `images` WRITE;
/*!40000 ALTER TABLE `images` DISABLE KEYS */;
INSERT INTO `images` VALUES (6,'https://xcdn.next.co.uk/common/items/default/default/itemimages/3_4Ratio/product/lge/F64640s.jpg?im=Resize,width=750'),(7,'https://xcdn.next.co.uk/common/items/default/default/itemimages/3_4Ratio/product/lge/AY7770s.jpg?im=Resize,width=750'),(8,'https://xcdn.next.co.uk/common/items/default/default/itemimages/3_4Ratio/product/lge/AN8743s.jpg?im=Resize,width=750'),(9,'https://xcdn.next.co.uk/common/items/default/default/itemimages/3_4Ratio/product/lge/AN8743s3.jpg?im=Resize,width=480'),(10,'https://xcdn.next.co.uk/common/items/default/default/itemimages/3_4Ratio/product/lge/AN8743s4.jpg?im=Resize,width=480'),(11,'https://xcdn.next.co.uk/common/items/default/default/itemimages/3_4Ratio/product/lge/F29049s.jpg?im=Resize,width=750'),(12,'https://xcdn.next.co.uk/common/items/default/default/itemimages/3_4Ratio/product/lge/F29049s2.jpg?im=Resize,width=480'),(13,'https://xcdn.next.co.uk/common/items/default/default/itemimages/3_4Ratio/product/lge/F29049s3.jpg?im=Resize,width=480'),(14,'https://xcdn.next.co.uk/common/items/default/default/itemimages/3_4Ratio/product/lge/F29049s4.jpg?im=Resize,width=480'),(15,'https://xcdn.next.co.uk/common/items/default/default/itemimages/3_4Ratio/product/lge/AT6528s.jpg?im=Resize,width=750'),(16,'https://xcdn.next.co.uk/common/items/default/default/itemimages/3_4Ratio/product/lge/AT6528s2.jpg?im=Resize,width=480'),(17,'https://xcdn.next.co.uk/common/items/default/default/itemimages/3_4Ratio/product/lge/AT6528s3.jpg?im=Resize,width=480'),(18,'https://xcdn.next.co.uk/common/items/default/default/itemimages/3_4Ratio/product/lge/AT6528s5.jpg?im=Resize,width=480'),(19,'https://xcdn.next.co.uk/common/items/default/default/itemimages/3_4Ratio/product/lge/W73640s.jpg?im=Resize,width=750'),(20,'https://xcdn.next.co.uk/common/items/default/default/itemimages/3_4Ratio/product/lge/W73640s2.jpg?im=Resize,width=480'),(21,'https://xcdn.next.co.uk/common/items/default/default/itemimages/3_4Ratio/product/lge/W73640s3.jpg?im=Resize,width=480'),(22,'https://xcdn.next.co.uk/common/items/default/default/itemimages/3_4Ratio/product/lge/W73640s4.jpg?im=Resize,width=480'),(23,'https://xcdn.next.co.uk/common/items/default/default/itemimages/3_4Ratio/product/lge/AU1210s.jpg?im=Resize,width=750'),(24,'https://xcdn.next.co.uk/common/items/default/default/itemimages/3_4Ratio/product/lge/AU1210s2.jpg?im=Resize,width=480'),(25,'https://xcdn.next.co.uk/common/items/default/default/itemimages/3_4Ratio/product/lge/AU1210s3.jpg?im=Resize,width=480'),(26,'https://xcdn.next.co.uk/common/items/default/default/itemimages/3_4Ratio/product/lge/AU1210s4.jpg?im=Resize,width=480');
/*!40000 ALTER TABLE `images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `deleted` bit(1) NOT NULL,
  `description` text NOT NULL,
  `name` varchar(255) NOT NULL,
  `price` double NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,_binary '\0','Lavabil la mașina de spălat.  100% Nailon.','Maro Ciocolată - Trenci impermeabil',511),(2,_binary '\0','Obișnuit centru spate gât până la tiv 48.5\"/ 123cm.  Lavabil la mașina de spălat.  Shell 96% poliester reciclat, 4% Elastan. Căptușeală 52% poliester reciclat, 48% vâscoză.','Maro Ciocolată - Trenci din piele întoarsă artificială',613),(3,_binary '\0','Main 54% Recycled polyester, 41% Recycled wool, 5% Acrylic. Lining 100% Recycled polyester. Wadding 100% Recycled polyester.','Palton Joules Field Tweed Contemporary',1482),(4,_binary '\0','100% bumbac.','Maro - Gap Cotton Oversized Jumper',335),(5,_binary '\0','Gât lateral obișnuit până la tiv 35.5\"/ 90cm.  Lavabil la mașina de spălat.  95% poliester reciclat, 5% elastan.','Brown Spliced Animal Print - Long Sleeve A-Line Mini Dress',224),(6,_binary '','Mărime normală dimensiune între picioare 29\" / 74cm.  Lavabil la mașina de spălat.  51% LENZING ™ ECOVERO ™ Viscoză, 45% poliester, 4% elastan.','Taupe Maro neutre - Pantaloni de trening largi cu dungă laterală Slinky',243),(7,_binary '\0','Lavabil la mașina de spălat.  95% bumbac, 5% elastan.','Rochie tip cămașă din carouri Jerseu Joules',439);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products_images`
--

DROP TABLE IF EXISTS `products_images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products_images` (
  `product_id` bigint NOT NULL,
  `images_id` int NOT NULL,
  UNIQUE KEY `UK68u3rm4tfmsixwa8nyfjg36xa` (`images_id`),
  KEY `FKgt41wyswrex82sy6iwdup2eak` (`product_id`),
  CONSTRAINT `FK1y02706a7p37urafhqnn3c0l9` FOREIGN KEY (`images_id`) REFERENCES `images` (`id`),
  CONSTRAINT `FKgt41wyswrex82sy6iwdup2eak` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products_images`
--

LOCK TABLES `products_images` WRITE;
/*!40000 ALTER TABLE `products_images` DISABLE KEYS */;
INSERT INTO `products_images` VALUES (1,8),(1,9),(1,10),(2,11),(2,12),(2,13),(2,14),(3,15),(3,16),(3,17),(3,18),(4,19),(4,20),(4,21),(4,22),(5,6),(6,7),(7,23),(7,24),(7,25),(7,26);
/*!40000 ALTER TABLE `products_images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `address` text NOT NULL,
  `deleted` bit(1) NOT NULL,
  `email` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `user_role` enum('ADMIN','CUSTOMER') NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK6dotkott2kjsp8vw4d0m25fb7` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'admin',_binary '\0','admin@admin.com','admin','$2a$10$K0jJgSrlL1O5Ut173W/Id.S0VzZhR3TIElfYw43QQRpGFaWMRfTka','0758877225','CUSTOMER'),(2,'useraddress',_binary '','user1@user1.com','user1','$2a$10$es4jmqf1nuwRiGPdFCm2OuAXFmCKoLgcYdveZ0IgXZa9TsWbRGewe','0759595959','CUSTOMER'),(3,'useraddress',_binary '\0','user2@user2.com','user2','$2a$10$2pdhrxbFl5u42KiP/0G4WujiIYd0xeyh6AbaFtrWFUveI/rR8LaKi','0754545454','CUSTOMER');
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

-- Dump completed on 2025-08-24 13:10:24
