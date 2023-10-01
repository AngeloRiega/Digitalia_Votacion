-- Creo schema(db)
-- drop database `digitaliavotacion`;
CREATE DATABASE `digitaliavotacion` /*!40100 DEFAULT CHARACTER SET latin1 */;

-- Selecciono db
use digitaliavotacion;

-- Crear tabla de Encuestas
CREATE TABLE Encuestas (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Titulo VARCHAR(255) NOT NULL,
    FechaCreacion DATETIME DEFAULT CURRENT_TIMESTAMP,
    FechaModificacion DATETIME ON UPDATE CURRENT_TIMESTAMP
);

-- Crear tabla de Opciones de Respuesta
CREATE TABLE OpcionesRespuesta (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Texto VARCHAR(255) NOT NULL,
    Activo INT NOT NULL default 1,
    FechaModificacion DATETIME ON UPDATE CURRENT_TIMESTAMP
);

-- Crear tabla de Votos
CREATE TABLE Votos (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    EncuestaId INT NOT NULL,
    OpcionRespuestaId INT NOT NULL,
    FechaVoto DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (EncuestaId) REFERENCES Encuestas(Id),
    FOREIGN KEY (OpcionRespuestaId) REFERENCES OpcionesRespuesta(Id)
);