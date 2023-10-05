# Reto Digitalia
> Aplicación de votación simple.

## Table of Contents
* [General Info](#general-information)
* [Technologies Used](#technologies-used)
* [Features](#features)
* [Screenshots](#screenshots)
* [Setup](#setup)
* [Usage](#usage)
* [Room for Improvement](#room-for-improvement)
* [Contact](#contact)


## General Information
Requerimientos Técnicos:

1. Creación de Encuestas (Base de Datos):
Backend Simulado: Implementa una simulación de backend que permita crear y almacenar encuestas en una base de datos.

2. Pantalla de Selección y Votación:
Pantalla de Selección: Crea una pantalla para que los usuarios elijan entre las encuestas disponibles.
Pantalla de Votación: Desarrolla una pantalla donde los usuarios puedan votar por una opción de la encuesta seleccionada.

3. Pantalla de Resultados:
Pantalla de Resultados: Crea una pantalla que muestre los resultados de la encuesta, destacando la opción más votada.

Instrucciones y Entregables:
- Crea un repositorio público en Github.
- Crea una rama con tu nombre y apellido.
- Utiliza tecnologías .Net y React para implementar las funcionalidades descritas.
- Documenta tu código y agrega comentarios donde sea necesario para explicar tu enfoque y decisiones.
- Sube el código a tu repositorio en GitHub con una rama 'main' o 'master' y una rama 'dev'.
- Prepara un archivo README conciso que explique cómo ejecutar la aplicación y cómo se logran los objetivos técnicos.
- Realiza al menos un commit por cada funcionalidad implementada.


## Technologies Used
- asp.net core with react.js (React + Vite)
- .net7 v7.0.401
- node v18.17.0
- mysql 5.7 + entity framework core (https://dev.mysql.com/downloads/windows/installer/5.7.html)
- radix-ui
- tailwind
- npm 9.8.1

## Features
- Realizar votaciones en las encuestas que se encuentran en la base de datos.
- Ver los resultados de cada encuesta.


## Screenshots
- Listado de encuestas

![Encuestas](./public/img/encuestas.png)

- Pantalla(Dialog) de votación

![Votacion](./public/img/votacion.png)

- Pantalla de resultados

![Resultados](./public/img/resultados.png)


## Setup
Para el backend: Dentro del proyecto webapi.

- Para restaurar las dependencias.

	`dotnet restore`

- Ejecutar los scripts 'tablas.sql' y 'datos.sql'.

- Corregir 'ConnectionString' dentro de 'appsettings.json' de ser necesario.

Para el frontend: Dentro del proyecto reactapp.

- Para restaurar las dependencias.

	`npm install`


## Usage
Para el backend: Dentro del proyecto webapi.

- Para levantar el proyecto.

	`dotnet run`

Para el frontend: Dentro del proyecto reactapp.

- Para levantar el proyecto.

	`npm run dev`


## Room for Improvement
Room for improvement:
- Creación de encuestas, opciones de respuesta dentro de la aplicación.
- Dockerizar

To do:
- Corregir scrollbar, se va al final despues de salir del Dialog.
- Agregar datos para correr sin base de datos mysql.
- Agregar tests. (Vitest + React Testing Library)


## Contact
Creado por Angelo Riega.
angelo.riega.iriarte@gmail.com
