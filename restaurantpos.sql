-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 26, 2021 at 01:01 PM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 8.0.11

drop database if EXISTS restaurantpos;
create database restaurantpos;

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `restaurantpos`
--

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `id` int(11) NOT NULL,
  `name` varchar(55) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`id`, `name`) VALUES
(1, 'Món chính'),
(2, 'Món khai vị'),
(3, 'Tráng miệng'),
(4, 'Nước uống'),
(7, 'Coconut'),
(8, 'BBC_TEMP'),
(11, 'mysql');

-- --------------------------------------------------------

--
-- Table structure for table `feedback`
--

CREATE TABLE `feedback` (
  `id` int(11) NOT NULL,
  `content` text DEFAULT NULL,
  `CustomerID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `food`
--

CREATE TABLE `food` (
  `id` int(11) NOT NULL,
  `name` varchar(40) DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  `categories` int(11) DEFAULT NULL,
  `brief` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `status` varchar(15) DEFAULT 'on'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `food`
--

INSERT INTO `food` (`id`, `name`, `price`, `categories`, `brief`, `description`, `image`, `status`) VALUES
(1, 'Gà cuộn phô mai chiên xù', 119000, 1, 'Thịt gà béo ngậy hòa quyện cùng phô mai.', 'Nếu muốn thay đổi khẩu vị và làm mới vị giác. Thử ngay món gà cuộn phô mai chiên xù ăn kèm cùng khoai tây nghiền thơm ngon. Bữa ăn sẽ thật đáng nhớ!', 'chicken-roll.jpg', 'on'),
(2, 'Mỳ ý sốt kem trứng cá chuồn', 139000, 1, 'Mì ý mang hương vị Nhật nguyên chất', 'Món ăn có sốt kem beo béo, thơm thơm và trứng cá chuồn lạ miệng ăn kèm chút rong biển sấy, hòa quyện, vương vẫn mãi.', 'Tobiko_cream_pasta_elsol_1.jpg', 'on'),
(3, 'Sườn heo sốt BBQ', 129000, 1, 'Nước sốt nhiều loại, chuẩn vị BBQ', 'Món sườn heo nướng BBQ thơm ngon đặc trưng và rất Âu nhé! Thưởng thức sốt BBQ chua ngọt này rồi bạn sẽ chẳng quên được hương vị hay miếng sườn mềm rụng này.', 'suon-heo-sot-bbq-elsol.png', 'on'),
(4, 'Steak phủ cheese', 289000, 1, 'Siêu phẩm trong giới Staek', 'Phần Lõi nạc vai là phần thịt ít mỡ, có gân giòn và vị thịt rất đậm đà. Loại thịt có độ béo ở mức 1 và độ mềm ở mức 4. Ăn kèm với sốt BBQ, bắp, khoai tây múi cau, hành tây!', 'the_cheese_steak_elsol_meat_and_wine.jpg', 'on'),
(5, 'Cajun vẹm đút lò', 98000, 2, 'Cajun chua ngọt khai phá vị giác của bạn', 'Đây là phiên bản đặc biệt cho một món ăn vị Thái được kết hợp với nhiều loại rau củ nhiều màu sắc, ngon và đẹp mắt. Tại sao không thử?!', 'Sweet-and-sour-cajun-Mussels-elsol-steak.png', 'on'),
(6, 'Bò Satế Bồ Đào Nha + khoai tây nghiền', 75000, 2, 'Nhập khẩu trực tiếp từ Bồ Đào Nha', 'Món ăn thú vị và cay nhè nhẹ. Gây thương nhớ nếu đã dùng qua, kết hợp tuyệt vời với khoai tây nghiền nhỏ', 'portuguese-satay-beef-elsol.jpg', 'on'),
(7, 'Passion Fruit Panna Cotta', 60000, 3, 'Cực kỳ bổ dưỡng và mang hương vị đặc trưng của quán', 'Món ăn handmade được làm từ trái chanh dây và kem sữa. Vị chua của chanh dây kết hợp với vị ngọt béo, thanh của lớp kem sữa hòa quyện làm tăng kích thích vị giác và giúp tiêu hóa tốt thức ăn.', 'passion_fruit_panna_cotta_elsol_31.jpg', 'on'),
(8, 'Bánh Socola', 45000, 3, 'Được đầu bếp Pháp đích thân tạo ra, Socola tròn vị.', 'Món bánh NY Brownie được decor nhiều dạng từ hình trái tim lung linh cho cặp đôi hẹn hò hay những phần ăn đơn giản cho bữa tối thêm ngọt vị.', 'ny_brownie_elsol_meat_and_wine_31.jpg', 'on'),
(9, 'Nước ép hỗn hợp', 58000, 4, 'Handmade theo công thức riêng của quán', 'Vị lạ và thơm ngon rất phù hợp dùng chung với steak. Kết hợp nhiều loại hoa quả như cam, dừa, dâu, chanh, ổi, mận, đào. ', 'sourcing_breeze_elsol_meat_and_wine_31.jpg', 'on'),
(10, 'Soda hoa Atiso', 60000, 4, 'Vừa ngon, vừa đẹp, thích hợp post Face', 'Vị lạ và thơm ngon rất phù hợp dùng chung với steak, sẽ không khiến những cô nàng thất vọng bởi cách chúng tôi trang trí nó', 'hibiscus_soda_elsol_meat_and_wine_31.jpg', 'on'),
(11, 'Cua rang me', 100000, 1, 'Món cua mang lại cảm giác ngon miệng', 'Cua tươi vừa được bắt và chế biến ngay lập tức, hòa quyện với mùa chua của me tạo nên một kiệt tác ẩm thực khó cưỡng lại được! ', 'pos.jpg', 'on'),
(12, 'Beaf Steak', 200000, 1, 'Một món ăn được ưa chuộng ở Mỹ', 'Món thịt bò này được chế biến theo đúng tiêu chuẩn của Mỹ, thơm ngon và tốt cho sức khỏe. Thịt bò Mỹ là loại thực phẩm có hàm lượng chất béo rất thấp, có nhiều đạm, bổ sung hàm lượng sắt, rất tốt cho sức khỏe! ', 'beef-steak.jpg', 'on'),
(13, 'Thịt dê nướng', 120000, 1, 'Đặc sản của nước Áo', 'Thịt sau khi được xắt lát mỏng thì được đập cho mềm, ướp gia vị vừa ăn và lăn qua vụn bánh mì khô, bột chiên giòn và trứng gà. Công đoạn tiếp theo chính là chiên thịt đã tẩm ướp trong dầu hoặc bơ.  ', 'de-nuong.jpg', 'on'),
(14, 'Carbonnade Flamande', 110000, 1, 'Món thịt hầm nổi tiếng của nước Bỉ', 'Là một trong số những món ăn Châu Âu nổi tiếng, Carbonnade Flamande với nguyên liệu chính là thịt bò, hành tây và bia. ', 'carbonnade.jpeg', 'on'),
(15, 'Gỏi củ hủ dừa', 80000, 2, 'Món gỏi có vị chua cay nên luôn được mọi người chọn là món ăn khai tiệc', 'Củ hủ dừa còn được gọi bằng cái tên thân quen là đọt dừa. Đọt dừa chính là phần lõi non nhất của ngọn trên thân cây dừa. ', 'goi-dua.jpg', 'on'),
(16, 'Gà xào hạt điều', 80000, 2, 'Một món ăn bổ dưỡng và thơm ngon', ' Nó có chứa rất nhiều protein và chất béo. Nó được xem là một món ăn nhẹ, có vị ngọt bùi và là một loại thực phẩm lành mạnh, ngon ngọt và nhiều chất dinh dưỡng. ', 'ga-xao-hat-dieu.jpeg', 'on'),
(17, 'Nước nha đam đường phèn', 30000, 4, 'Giải độc cơ thể, giúp làn da tươi sáng.', ' Nha đam còn rất tốt cho sức khỏe, chữa bệnh huyết áp, xơ gan, béo phì', 'nha-dam.jpg', 'on'),
(18, 'Bánh chuối nướng', 40000, 3, 'Món tuyệt vời để tráng miệng mà không sợ béo phì', 'Chuối nướng béo ngậy mùi nước cốt dừa cùng miếng chuối mềm ngon sẽ là món tráng miệng phù hợp với mọi người ', 'banh-chuoi.jpg', 'on'),
(19, 'Bánh cuộn tinh than tre', 45000, 3, 'Hương vị đặc biệt và tốt cho sức khỏe', 'Bánh cuộn vốn nổi tiếng bởi sự mềm, xốp mà không loại bánh nào sánh được, sẽ càng thêm ngon khi kết với tinh than tre thanh nhẹ nữa. ', 'tinh-than-tre.jpg', 'on');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `fullname` varchar(255) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `status` varchar(10) DEFAULT 'wait',
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  `user_id` int(11) DEFAULT NULL,
  `note` text DEFAULT NULL,
  `use_point` varchar(10) DEFAULT 'no',
  `method` varchar(20) DEFAULT 'paypal',
  `takeorhere` varchar(20) DEFAULT 'here',
  `table_num` int(11) DEFAULT 0,
  `total_money` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `fullname`, `phone`, `status`, `created`, `user_id`, `note`, `use_point`, `method`, `takeorhere`, `table_num`, `total_money`) VALUES
(3, 'Nguyen Phuc', '0388542487', 'done', '2021-11-25 14:04:48', 4, NULL, NULL, 'Tiền mặt', 'here', 12, 523000),
(6, 'Nguyen Phuc', '0388542487', 'done', '2021-11-26 11:38:14', 4, NULL, 'no', 'Tiền mặt', 'takeaway', 0, 506000),
(7, 'Nguyen Phuc', '0388542487', 'wait', '2021-11-26 11:39:42', 4, NULL, 'no', 'Paypal', 'here', 12, 1320000);

-- --------------------------------------------------------

--
-- Table structure for table `order_detail`
--

CREATE TABLE `order_detail` (
  `id` int(11) NOT NULL,
  `order_id` int(11) DEFAULT NULL,
  `food_name` varchar(255) DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  `qty` int(11) DEFAULT NULL,
  `total_money` int(11) DEFAULT NULL,
  `note` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `order_detail`
--

INSERT INTO `order_detail` (`id`, `order_id`, `food_name`, `price`, `qty`, `total_money`, `note`) VALUES
(1, 3, 'Mỳ ý sốt kem trứng cá chuồn', 139000, 2, 278000, NULL),
(2, 3, 'Sườn heo sốt BBQ', 129000, 1, 129000, NULL),
(3, 3, 'Nước ép hỗn hợp', 58000, 2, 116000, NULL),
(10, 6, 'Gà cuộn phô mai chiên xù', 119000, 2, 238000, NULL),
(11, 6, 'Mỳ ý sốt kem trứng cá chuồn', 139000, 1, 139000, NULL),
(12, 6, 'Sườn heo sốt BBQ', 129000, 1, 129000, NULL),
(13, 7, 'Gà cuộn phô mai chiên xù', 119000, 3, 357000, NULL),
(14, 7, 'Mỳ ý sốt kem trứng cá chuồn', 139000, 1, 139000, NULL),
(15, 7, 'Sườn heo sốt BBQ', 129000, 2, 258000, NULL),
(16, 7, 'Passion Fruit Panna Cotta', 60000, 1, 60000, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `lname` varchar(40) DEFAULT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `email` varchar(30) DEFAULT NULL,
  `password` varchar(20) DEFAULT NULL,
  `point` int(11) DEFAULT 0,
  `history` text DEFAULT NULL,
  `feedbackID` int(11) DEFAULT NULL,
  `fname` varchar(30) DEFAULT NULL,
  `role_id` int(11) DEFAULT 5,
  `address` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `lname`, `phone`, `email`, `password`, `point`, `history`, `feedbackID`, `fname`, `role_id`, `address`) VALUES
(3, 'Nguyen', '0388542487', 'admin@admin.com', 'admin', 0, NULL, NULL, 'Phuc', 1, 'Vĩnh Long'),
(4, 'Nguyen', '0388542487', 'ninjavip1st@gmail.com', '123456', 2879, NULL, NULL, 'Phuc', 5, 'Vĩnh Long'),
(5, 'Nguyen', '0388542487', 'cashier1@gmail.com', '123456', 0, NULL, NULL, 'Cashier1', 2, 'Vĩnh Long');

-- --------------------------------------------------------

--
-- Table structure for table `reserve`
--

CREATE TABLE `Reserve` (
	`id` int(11) NOT NULL,
	`numberPeople` int DEFAULT 1,
	`message` text(400),
	`time` timestamp,
	`status` ENUM('pending','accepted','not accept','canceled') DEFAULT 'pending',
	`managerResponse` text(100) DEFAULT '', 
	`createAt` timestamp DEFAULT CURRENT_TIMESTAMP,
  `CustomerID` int(11) NOT NULL
);


--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `feedback`
--
ALTER TABLE `feedback`
  ADD PRIMARY KEY (`id`),
  ADD KEY `CustomerID` (`CustomerID`);

--
-- Indexes for table `food`
--
ALTER TABLE `food`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `order_detail`
--
ALTER TABLE `order_detail`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_id` (`order_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `Reserve`
--

ALTER TABLE `Reserve`
  ADD PRIMARY KEY (`id`),
  ADD KEY `CustomerID` (`CustomerID`);


--
-- AUTO_INCREMENT for table `feedback`
--
ALTER TABLE `Reserve`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `feedback`
--
ALTER TABLE `feedback`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `food`
--
ALTER TABLE `food`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `order_detail`
--
ALTER TABLE `order_detail`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `feedback`
--
ALTER TABLE `Reserve`
  ADD CONSTRAINT `reserve_ibfk_1` FOREIGN KEY (`CustomerID`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;


--
-- Constraints for table `feedback`
--
ALTER TABLE `feedback`
  ADD CONSTRAINT `feedback_ibfk_1` FOREIGN KEY (`CustomerID`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

--
-- Constraints for table `order_detail`
--
ALTER TABLE `order_detail`
  ADD CONSTRAINT `order_detail_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
