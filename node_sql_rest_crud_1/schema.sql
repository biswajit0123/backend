create table users (
    id varchar(100) primary key,
    username varchar(100) not null,
    email varchar(100) not null unique,
    password_hash varchar(255) not null,
);