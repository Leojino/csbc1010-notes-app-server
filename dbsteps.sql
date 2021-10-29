USE mysql;

CREATE USER 'notesserver'@'localhost' IDENTIFIED WITH mysql_native_password BY 'mynotesserver';
GRANT ALL PRIVILEGES ON *.* TO 'notesserver'@'localhost';
FLUSH PRIVILEGES;

CREATE TABLE IF NOT EXISTS Notes (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    text VARCHAR(200),
    dateCreated DATE NOT NULL,
    lastModified DATE NOT NULL
)
-- seed data
insert into Notes ( text, dateCreated, lastModified ) values ( "this is the first note", "2021-10-15", "2021-10-16" );
insert into Notes ( text, dateCreated, lastModified ) values ( "this is the second default note", "2021-10-17", "2021-10-18" );