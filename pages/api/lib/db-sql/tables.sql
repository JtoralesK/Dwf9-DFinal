CREATE table user(
    userId int auto_increment primary key,
    nombre varchar(50),
    email varchar(100)
);
CREATE table auth(
	authId int auto_increment primary key,
    userId int,
    codigo int,
    email varchar(100),
    fechaLimite varchar(300),
    CONSTRAINT FK_userId FOREIGN KEY (userId)
    REFERENCES user(userId)
);
CREATE table product(
	productId int auto_increment primary key,
    name varchar(100),
    price int
);
CREATE TABLE orders (
    orderID int auto_increment PRIMARY KEY,
    productID int,
    userId int,
    status varchar(50),
    CONSTRAINT FK_UserIdOrder FOREIGN KEY (userId)
    REFERENCES user(userId),
    CONSTRAINT FK_ProductIdOrder FOREIGN KEY (productID)
    REFERENCES product(productID)
);