CREATE table users(
    userId int auto_increment primary key,
    nombre varchar(50),
    email varchar(100)
);
CREATE table auths(
	authId int auto_increment primary key,
    userId int,
    codigo int,
    email varchar(100),
    fechaLimite varchar(300),
    CONSTRAINT FK_userId FOREIGN KEY (userId)
    REFERENCES users(userId)
);
CREATE table products(
	productId int auto_increment primary key,
    name varchar(100),
    price int
);
CREATE table orders (
    orderId int auto_increment PRIMARY KEY,
    productId varchar(100),
    userId int,
    status varchar(50),
    CONSTRAINT FK_UserIdOrder FOREIGN KEY (userId)
    REFERENCES users(userId)
);