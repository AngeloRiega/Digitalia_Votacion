use digitaliavotacion;
-- select * from encuestas;
-- SELECT * FROM digitaliavotacion.opcionesrespuesta where EncuestaId = 1;
-- SELECT * FROM digitaliavotacion.votos;

-- INSERT INTO `digitaliavotacion`.`votos`
-- (`EncuestaId`,
-- `OpcionRespuestaId`)
-- VALUES
-- (
-- 1,
-- 2);

INSERT INTO `digitaliavotacion`.`encuestas`
(
`Titulo`)
VALUES
(
"Encuesta 1: Satisfacción del cliente");

INSERT INTO `digitaliavotacion`.`encuestas`
(
`Titulo`)
VALUES
(
"Encuesta 2: Tiempo de espera");

INSERT INTO `digitaliavotacion`.`encuestas`
(
`Titulo`)
VALUES
(
"Encuesta 3: Tráfico en la ciudad");

INSERT INTO `digitaliavotacion`.`encuestas`
(
`Titulo`)
VALUES
(
"Encuesta 4: Edad de votantes");

INSERT INTO `digitaliavotacion`.`encuestas`
(
`Titulo`)
VALUES
(
"Encuesta 5: Imaginación de los programadores");

-- update encuestas set titulo = ("encuesta11") where id = 1;

INSERT INTO `digitaliavotacion`.`opcionesrespuesta`
(
`EncuestaId`, `Texto`, `Activo`)
VALUES
(
1, "Opción A", 1);

INSERT INTO `digitaliavotacion`.`opcionesrespuesta`
(
`EncuestaId`, `Texto`, `Activo`)
VALUES
(
1, "Opción B", 1);

INSERT INTO `digitaliavotacion`.`opcionesrespuesta`
(
`EncuestaId`, `Texto`, `Activo`)
VALUES
(
1, "Opción C", 1);

INSERT INTO `digitaliavotacion`.`opcionesrespuesta`
(
`EncuestaId`, `Texto`, `Activo`)
VALUES
(
1, "Opción D", 1);

INSERT INTO `digitaliavotacion`.`opcionesrespuesta`
(
`EncuestaId`, `Texto`, `Activo`)
VALUES
(
2, "Opción A", 1);

INSERT INTO `digitaliavotacion`.`opcionesrespuesta`
(
`EncuestaId`, `Texto`, `Activo`)
VALUES
(
2, "Opción B", 1);

INSERT INTO `digitaliavotacion`.`opcionesrespuesta`
(
`EncuestaId`, `Texto`, `Activo`)
VALUES
(
2, "Opción C", 1);

INSERT INTO `digitaliavotacion`.`opcionesrespuesta`
(
`EncuestaId`, `Texto`, `Activo`)
VALUES
(
2, "Opción D", 1);

INSERT INTO `digitaliavotacion`.`opcionesrespuesta`
(
`EncuestaId`, `Texto`, `Activo`)
VALUES
(
3, "Opción A", 1);

INSERT INTO `digitaliavotacion`.`opcionesrespuesta`
(
`EncuestaId`, `Texto`, `Activo`)
VALUES
(
3, "Opción B", 1);

INSERT INTO `digitaliavotacion`.`opcionesrespuesta`
(
`EncuestaId`, `Texto`, `Activo`)
VALUES
(
3, "Opción C", 1);

INSERT INTO `digitaliavotacion`.`opcionesrespuesta`
(
`EncuestaId`, `Texto`, `Activo`)
VALUES
(
3, "Opción D", 1);

INSERT INTO `digitaliavotacion`.`opcionesrespuesta`
(
`EncuestaId`, `Texto`, `Activo`)
VALUES
(
4, "Opción A", 1);

INSERT INTO `digitaliavotacion`.`opcionesrespuesta`
(
`EncuestaId`, `Texto`, `Activo`)
VALUES
(
4, "Opción B", 1);

INSERT INTO `digitaliavotacion`.`opcionesrespuesta`
(
`EncuestaId`, `Texto`, `Activo`)
VALUES
(
4, "Opción C", 1);

INSERT INTO `digitaliavotacion`.`opcionesrespuesta`
(
`EncuestaId`, `Texto`, `Activo`)
VALUES
(
4, "Opción D", 1);
