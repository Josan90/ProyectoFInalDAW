CREATE DATABASE ultimaguias_db
CHARSET utf8mb4
COLLATE utf8mb4_spanish2_ci;
use ultimaguias_db;

CREATE TABLE usuarios (
idUsuario INT AUTO_INCREMENT,
nombreUsuario VARCHAR(45),
emailUsuario VARCHAR(100),
claveUsuario VARCHAR(256),
registroUsuario TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
PRIMARY KEY (idUsuario)
);

CREATE TABLE juegos (
idJuego INT AUTO_INCREMENT,
nombreJuego VARCHAR (100),
generoJuego VARCHAR (100),
desarrolladorJuego VARCHAR (100),
fechaJuego VARCHAR (100),
descripcionJuego TEXT,
imagenJuego VARCHAR (255),
PRIMARY KEY (idJuego)
);

CREATE TABLE completacion (
idCompletacion INT AUTO_INCREMENT,
fechaInicioCompletacion DATE,
fechaFinCompletacion DATE,
estadoCompletacion VARCHAR(45),
totalCompletacion DECIMAL(10, 2),
idUsuarioFK INT,
idJuegoFK INT,
PRIMARY KEY (idCompletacion),
FOREIGN KEY (idUsuarioFK) REFERENCES usuarios (idUsuario),
FOREIGN KEY (idJuegoFK) REFERENCES juegos (idJuego)
);

CREATE USER 'creador'@'localhost' IDENTIFIED BY 'creadorja987';
FLUSH PRIVILEGES;
GRANT ALL ON ultimaguias_db.* TO 'creador'@'localhost';

ALTER TABLE completacion
ADD COLUMN estadoCompletacion VARCHAR(45) AFTER fechaFinCompletacion;

INSERT INTO juegos (nombreJuego, generoJuego, desarrolladorJuego, fechaJuego, descripcionJuego, imagenJuego) VALUES
('Alan Wake 2', 'Acción, Aventura', 'Remedy Entertainment', '2023', 'Alan Wake 2 es un juego de terror y acción desarrollado por Remedy Entertainment, que sigue la historia del escritor Alan Wake mientras intenta desentrañar un oscuro misterio en una pequeña ciudad.', 'coverBD/alanWake2C.jpeg'),
('Dead Space Remake', 'Survival Horror', 'Motive Studio', '2023', 'Dead Space Remake es una reimaginación del clásico juego de survival horror, que sigue a Isaac Clarke mientras lucha contra monstruos necromorfos en una nave espacial infestada.', 'coverBD/deadSpaceC.jpeg'),
('Hollow Knight', 'Metroidvania', 'Team Cherry', '2017', 'Hollow Knight es un juego de acción y aventuras en un mundo subterráneo lleno de insectos y misterios, donde los jugadores exploran cuevas, luchan contra enemigos y descubren secretos.', 'coverBD/hollowKnightC.jpeg'),
('Final Fantasy 7 Rebirth', 'JRPG', 'Square Enix', '2024', 'Final Fantasy 7 Rebirth es la segunda parte del remake del clásico juego de rol Final Fantasy VII, que continúa la épica historia de Cloud y sus amigos mientras luchan contra la corporación Shinra.', 'coverBD/ff7RebirthC.jpg');

UPDATE juegos
SET imagenJuego = 'images/coverBD/deadSpaceC.jpg'
WHERE nombreJuego = 'Dead Space Remake';

UPDATE juegos
SET fechaJuego = '29 / 2 / 2024'
WHERE nombreJuego = 'Final Fantasy 7 Rebirth';


