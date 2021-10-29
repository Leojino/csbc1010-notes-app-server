USE mysql;

CREATE USER 'notesserver'@'localhost' IDENTIFIED WITH mysql_native_password BY 'mynotesserver';
GRANT ALL PRIVILEGES ON *.* TO 'notesserver'@'localhost';
FLUSH PRIVILEGES;

-- seed data
CREATE TABLE IF NOT EXISTS Notes (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    text VARCHAR(200),
    dateModified DATE NOT NULL,
    lastModified DATE NOT NULL
)