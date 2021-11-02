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

-- 0: Mon chinh, 1: Mon khai vi, 2: Mon trang mieng, 3: Nuoc uong
INSERT INTO food(name,price,categories,description,image) VALUES('Gà cuộn phô mai chiên xù',119000,0,'Nếu muốn thay đổi khẩu vị và làm mới vị giác. Thử ngay món gà cuộn phô mai chiên xù ăn kèm cùng khoai tây nghiền thơm ngon. Bữa ăn sẽ thật đáng nhớ!','https://drive.google.com/file/d/1xntdzgP_Vl9X0vAv6tyemcsvz9eyfO_X/view?usp=sharing');
INSERT INTO food(name,price,categories,description,image) VALUES('Mỳ ý sốt kem trứng cá chuồn kiểu Nhật',139000,0,'Món ăn có sốt kem beo béo, thơm thơm và trứng cá chuồn lạ miệng ăn kèm chút rong biển sấy, hòa quyện, vương vẫn mãi.','https://drive.google.com/file/d/1cQxrKGi-ZeuAbKce6Vd8ow6wNccMNwKW/view?usp=sharing');
INSERT INTO food(name,price,categories,description,image) VALUES('Sườn heo sốt BBQ',129000,0,'Món sườn heo nướng BBQ thơm ngon đặc trưng và rất Âu nhé! Thưởng thức sốt BBQ chua ngọt này rồi bạn sẽ chẳng quên được hương vị hay miếng sườn mềm rụng này.','https://drive.google.com/file/d/1yyL-GZnTc7V60CIFve0rBClpU2F1iI9-/view?usp=sharing');
INSERT INTO food(name,price,categories,description,image) VALUES('Steak phủ cheese siêu phẩm 200g',289000,0,'Phần Lõi nạc vai là phần thịt ít mỡ, có gân giòn và vị thịt rất đậm đà. Loại thịt có độ béo ở mức 1 và độ mềm ở mức 4. Ăn kèm với sốt BBQ, bắp, khoai tây múi cau, hành tây!','https://drive.google.com/file/d/1hq0DoHwUlXfpFHxdDpv3_6zZ034d8a7D/view?usp=sharing');
INSERT INTO food(name,price,categories,description,image) VALUES('Cajum vẹm chua ngọt đút lò',98000,1,'Đây là phiên bản đặc biệt cho một món ăn vị Thái được kết hợp với nhiều loại rau củ nhiều màu sắc, ngon và đẹp mắt. Tại sao không thử?!','https://drive.google.com/file/d/1kjmX93SDFBqpMRjcGkwZjvVYZ2r_3Wu9/view?usp=sharing');
INSERT INTO food(name,price,categories,description,image) VALUES('Bò Satế Bồ Đào Nha kèm khoai tây nghiền',75000,1,'món ăn thú vị và cay nhè nhẹ. Gây thương nhớ nếu đã dùng qua','https://drive.google.com/file/d/1BHRCsMjQKdTGPLXbzVp-4_Uso7Cq7OK9/view?usp=sharing');
INSERT INTO food(name,price,categories,description,image) VALUES('Passion Fruit Panna Cotta',60000,2,'Món ăn handmade được làm từ trái chanh dây và kem sữa. Vị chua của chanh dây kết hợp với vị ngọt béo, thanh của lớp kem sữa hòa quyện làm tăng kích thích vị giác và giúp tiêu hóa tốt thức ăn.','https://drive.google.com/file/d/1o2nnFgkyJ1CWOl0VJ5Q6WL0XlZZ6X_hu/view?usp=sharing');
INSERT INTO food(name,price,categories,description,image) VALUES('Bánh Socola',45000,2,'Món bánh NY Brownie được decor nhiều dạng từ hình trái tim lung linh cho cặp đôi hẹn hò hay những phần ăn đơn giản cho bữa tối thêm ngọt vị.','https://drive.google.com/file/d/1S4CxNmVxZnZ30x5BLjghJ34B0eR6LA3k/view?usp=sharing');
INSERT INTO food(name,price,categories,description,image) VALUES('Nước ép hỗn hợp homemade',58000,3,'Vị lạ và thơm ngon rất phù hợp dùng chung với steak.','https://drive.google.com/file/d/1hAi6NeDWfhpAiaHy4cUV2crGhRCe2HcO/view?usp=sharing');
INSERT INTO food(name,price,categories,description,image) VALUES('Soda hoa Atiso đỏ homemade',60000,3,'Vị lạ và thơm ngon rất phù hợp dùng chung với steak','https://drive.google.com/file/d/1dVpIoVRfVbvkTofjPk2HDn2iEz-BjCwr/view?usp=sharing');
