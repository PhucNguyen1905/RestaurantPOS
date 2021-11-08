CREATE DATABASE `shiba-pos`;
USE `shiba-pos`;
CREATE TABLE `food` (
	`id` int NOT NULL AUTO_INCREMENT, 
	`name` varchar(40),
	`price` int,
 	`categories` int,
	`brief` varchar(255),
	`description` varchar(255),
	`image` varchar(255),
	PRIMARY KEY (id)
);
-- Image Link: https://raw.githubusercontent.com/PhucNguyen1905/RestaurantPOS/main/images/ + food.image. Just store image name in database
-- 0: Mon chinh, 1: Mon khai vi, 2: Mon trang mieng, 3: Nuoc uong
INSERT INTO food(name,price,categories,brief,description,image) VALUES('Gà cuộn phô mai chiên xù',119000,0,'Thịt gà béo ngậy hòa quyện cùng phô mai.','Nếu muốn thay đổi khẩu vị và làm mới vị giác. Thử ngay món gà cuộn phô mai chiên xù ăn kèm cùng khoai tây nghiền thơm ngon. Bữa ăn sẽ thật đáng nhớ!','chicken-roll.jpg');
INSERT INTO food(name,price,categories,brief,description,image) VALUES('Mỳ ý sốt kem trứng cá chuồn',139000,0,'Mì ý mang hương vị Nhật nguyên chất','Món ăn có sốt kem beo béo, thơm thơm và trứng cá chuồn lạ miệng ăn kèm chút rong biển sấy, hòa quyện, vương vẫn mãi.','Tobiko_cream_pasta_elsol_1.jpg');
INSERT INTO food(name,price,categories,brief,description,image) VALUES('Sườn heo sốt BBQ',129000,0,'Nước sốt nhiều loại, chuẩn vị BBQ','Món sườn heo nướng BBQ thơm ngon đặc trưng và rất Âu nhé! Thưởng thức sốt BBQ chua ngọt này rồi bạn sẽ chẳng quên được hương vị hay miếng sườn mềm rụng này.','suon-heo-sot-bbq-elsol.png');
INSERT INTO food(name,price,categories,brief,description,image) VALUES('Steak phủ cheese',289000,0,'Siêu phẩm trong giới Staek','Phần Lõi nạc vai là phần thịt ít mỡ, có gân giòn và vị thịt rất đậm đà. Loại thịt có độ béo ở mức 1 và độ mềm ở mức 4. Ăn kèm với sốt BBQ, bắp, khoai tây múi cau, hành tây!','the_cheese_steak_elsol_meat_and_wine.jpg');
INSERT INTO food(name,price,categories,brief,description,image) VALUES('Cajun vẹm đút lò',98000,1,'Cajun chua ngọt khai phá vị giác của bạn','Đây là phiên bản đặc biệt cho một món ăn vị Thái được kết hợp với nhiều loại rau củ nhiều màu sắc, ngon và đẹp mắt. Tại sao không thử?!','Sweet-and-sour-cajun-Mussels-elsol-steak.png');
INSERT INTO food(name,price,categories,brief,description,image) VALUES('Bò Satế Bồ Đào Nha + khoai tây nghiền',75000,1,'Nhập khẩu trực tiếp từ Bồ Đào Nha','Món ăn thú vị và cay nhè nhẹ. Gây thương nhớ nếu đã dùng qua, kết hợp tuyệt vời với khoai tây nghiền nhỏ','portuguese-satay-beef-elsol.jpg');
INSERT INTO food(name,price,categories,brief,description,image) VALUES('Passion Fruit Panna Cotta',60000,2,'Cực kỳ bổ dưỡng và mang hương vị đặc trưng của quán','Món ăn handmade được làm từ trái chanh dây và kem sữa. Vị chua của chanh dây kết hợp với vị ngọt béo, thanh của lớp kem sữa hòa quyện làm tăng kích thích vị giác và giúp tiêu hóa tốt thức ăn.','passion_fruit_panna_cotta_elsol_31.jpg');
INSERT INTO food(name,price,categories,brief,description,image) VALUES('Bánh Socola',45000,2,'Được đầu bếp Pháp đích thân tạo ra, Socola tròn vị.','Món bánh NY Brownie được decor nhiều dạng từ hình trái tim lung linh cho cặp đôi hẹn hò hay những phần ăn đơn giản cho bữa tối thêm ngọt vị.','ny_brownie_elsol_meat_and_wine_31.jpg');
INSERT INTO food(name,price,categories,brief,description,image) VALUES('Nước ép hỗn hợp',58000,3,'Handmade theo công thức riêng của quán','Vị lạ và thơm ngon rất phù hợp dùng chung với steak. Kết hợp nhiều loại hoa quả như cam, dừa, dâu, chanh, ổi, mận, đào. ', 'sourcing_breeze_elsol_meat_and_wine_31.jpg');
INSERT INTO food(name,price,categories,brief,description,image) VALUES('Soda hoa Atiso',60000,3,'Vừa ngon, vừa đẹp, thích hợp post Face','Vị lạ và thơm ngon rất phù hợp dùng chung với steak, sẽ không khiến những cô nàng thất vọng bởi cách chúng tôi trang trí nó','hibiscus_soda_elsol_meat_and_wine_31.jpg');
INSERT INTO food(name,price,categories,brief,description,image) VALUES('Cua rang me',100000,0,'Món cua mang lại cảm giác ngon miệng','Cua tươi vừa được bắt và chế biến ngay lập tức, hòa quyện với mùa chua của me tạo nên một kiệt tác ẩm thực khó cưỡng lại được! ', 'pos.jpg');
INSERT INTO food(name,price,categories,brief,description,image) VALUES('Beaf Steak',200000,0,'Một món ăn được ưa chuộng ở Mỹ','Món thịt bò này được chế biến theo đúng tiêu chuẩn của Mỹ, thơm ngon và tốt cho sức khỏe. Thịt bò Mỹ là loại thực phẩm có hàm lượng chất béo rất thấp, có nhiều đạm, bổ sung hàm lượng sắt, rất tốt cho sức khỏe! ', 'beef-steak.jpg');
INSERT INTO food(name,price,categories,brief,description,image) VALUES('Thịt dê nướng',120000,0,'Đặc sản của nước Áo','Thịt sau khi được xắt lát mỏng thì được đập cho mềm, ướp gia vị vừa ăn và lăn qua vụn bánh mì khô, bột chiên giòn và trứng gà. Công đoạn tiếp theo chính là chiên thịt đã tẩm ướp trong dầu hoặc bơ.  ', 'de-nuong.jpg');
INSERT INTO food(name,price,categories,brief,description,image) VALUES('Carbonnade Flamande',110000,0,'Món thịt hầm nổi tiếng của nước Bỉ','Là một trong số những món ăn Châu Âu nổi tiếng, Carbonnade Flamande với nguyên liệu chính là thịt bò, hành tây và bia. ', 'carbonnade.jpeg');
INSERT INTO food(name,price,categories,brief,description,image) VALUES('Gỏi củ hủ dừa',80000,1,'Món gỏi có vị chua cay nên luôn được mọi người chọn là món ăn khai tiệc','Củ hủ dừa còn được gọi bằng cái tên thân quen là đọt dừa. Đọt dừa chính là phần lõi non nhất của ngọn trên thân cây dừa. ', 'goi-dua.jpg');
INSERT INTO food(name,price,categories,brief,description,image) VALUES('Gà xào hạt điều',80000,1,'Một món ăn bổ dưỡng và thơm ngon',' Nó có chứa rất nhiều protein và chất béo. Nó được xem là một món ăn nhẹ, có vị ngọt bùi và là một loại thực phẩm lành mạnh, ngon ngọt và nhiều chất dinh dưỡng. ', 'suon-kinh-do.jpeg');
INSERT INTO food(name,price,categories,brief,description,image) VALUES('Nước nha đam đường phèn',30000,3,'Giải độc cơ thể, giúp làn da tươi sáng.',' Nha đam còn rất tốt cho sức khỏe, chữa bệnh huyết áp, xơ gan, béo phì', 'nha-dam.jpg');
INSERT INTO food(name,price,categories,brief,description,image) VALUES('Bánh chuối nướng',40000,2,'Món tuyệt vời để tráng miệng mà không sợ béo phì','Chuối nướng béo ngậy mùi nước cốt dừa cùng miếng chuối mềm ngon sẽ là món tráng miệng phù hợp với mọi người ', 'banh-chuoi.jpg');
INSERT INTO food(name,price,categories,brief,description,image) VALUES('Bánh cuộn tinh than tre',45000,2,'hương vị đặc biệt, mà nó còn đem lại nhiều lợi ích tốt đẹp cho sức khỏe','Bánh cuộn vốn nổi tiếng bởi sự mềm, xốp mà không loại bánh nào sánh được, sẽ càng thêm ngon khi kết với tinh than tre thanh nhẹ nữa. ', 'tinh-than-tre.jpg');





-- Create table order

CREATE TABLE `Order` (
	`id` int NOT NULL AUTO_INCREMENT, 
	`name` varchar(40),
	`phonen` varchar(10),
 	`orderlist` text,
	`additional_food` varchar(255),
	`how much` int,
	`date_order` date,
	PRIMARY KEY (id)
);

-- Create customer

CREATE TABLE `Customer` (
	`id` int NOT NULL AUTO_INCREMENT, 
	`name` varchar(40),
	`phone` varchar(10),
	`mail` varchar(20),
	`password` varchar(20),
 	`point` int,
	`history` text,
	`feedbackID` int,
	PRIMARY KEY (id) 
);


-- Create Feedback
CREATE TABLE `Feedback` (
    `id` int NOT NULL AUTO_INCREMENT, 
	`content` text,
	`CustomerID` int,
	PRIMARY KEY (id),
	FOREIGN KEY (CustomerID) REFERENCES Customer (ID) ON DELETE CASCADE ON UPDATE CASCADE
);

-- Create Manager
CREATE TABLE `Staff` (
    `id` int NOT NULL AUTO_INCREMENT, 
	`phone` varchar(10),
	`email` varchar(20),
	`password` varchar(20),
	`role_id` int,
	PRIMARY KEY (id)
);

CREATE TABLE `Category` (
    `id` int NOT NULL AUTO_INCREMENT, 
	`foodid` int,
	PRIMARY KEY (id),
    FOREIGN KEY (foodid) REFERENCES food (ID) ON DELETE CASCADE ON UPDATE CASCADE
);


