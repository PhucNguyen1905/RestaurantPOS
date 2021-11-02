CREATE DATABASE `shiba-pos`;
USE `shiba-pos`;
CREATE TABLE `food` (
	`id` int NOT NULL AUTO_INCREMENT, 
	`name` varchar(40),
	`price` int,
 	`categories` int,
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
