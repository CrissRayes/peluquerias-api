# Backend Gestión de Peluquerías

Este proyecto es una aplicación de gestión de peluquerías que proporciona una API para administrar usuarios, peluquerías, servicios, peluqueros, comentarios, citas, disponibilidades y favoritos.

## Instalación

1. Clona este repositorio en tu máquina local.
2. Instala las dependencias utilizando npm

```bash
npm install
```

## Configuración

Antes de ejecutar la aplicación, debes configurar las variables de entorno. Para ello, crea un archivo .env en la raíz del proyecto y añade las siguientes variables:

```bash
PORT
DB_HOST
DB_USER
DB_PASS
DB_NAME
```

## Ejecución

Para iniciar el servidor debes ejecutar el siguiente comando:

```bash
npm start
```

## Endpoints

### Citas (Reservas)

- GET /citas - Obtener todas las citas
- POST /peluquerias/:id/citas - Crear una cita
- PUT /peluquerias/:id/citas/:id - Actualizar una cita
- DELETE /peluquerias/:id/citas/:id - Eliminar una cita

#### Comentarios

- GET /comentarios - Obtener todos los comentarios
- POST /peluquerias/:id/comentarios - Crear un comentario
- PUT /peluquerias/:id/comentarios/:id - Actualizar un comentario
- DELETE /peluquerias/:id/comentarios/:id - Eliminar un comentario

#### Disponibilidades

- GET /peluquerias/id/disponibilidad - Obtener todas las disponibilidades de una peluquería
- POST /peluquerias/:id/disponibilidad - Crear una disponibilidad
- PUT /peluquerias/:id/disponibilidad/:id - Actualizar una disponibilidad
- DELETE /peluquerias/:id/disponibilidad/:id - Eliminar una disponibilidad

#### Favoritos

GET /favoritos - Obtener todos los favoritos
POST /peluquerias/:id/favoritos - Crear un favorito
DELETE /peluquerias/:id/favoritos/:id - Eliminar un favorito

#### Peluquerías

- GET /peluquerias - Obtener todas las peluquerías
- GET /peluquerias - Obtener peluquerias de un usuario
- GET / peluquerias/:id - Obtener una peluquería
- POST /peluquerias - Crear una peluquería
- PUT /peluquerias/:id - Actualizar una peluquería
- DELETE /peluquerias/:id - Eliminar una peluquería

#### Peluqueros

- GET /peluqueros - Obtener todos los peluqueros
- POST /peluquerias/:id/peluqueros - Crear un peluquero
- PUT /peluquerias/:id/peluqueros/:id - Actualizar un peluquero
- DELETE /peluquerias/:id/peluqueros/:id - Eliminar un peluquero

#### Servicios

- GET /peluqueria/:id/servicios - Obtener todos los servicios de una peluquería
- POST /peluquerias/:id/servicios - Crear un servicio
- PUT /peluquerias/:id/servicios/:id - Actualizar un servicio
- DELETE /peluquerias/:id/servicios/:id - Eliminar un servicio

#### Usuarios

- GET /usuario/:id - Obtener un usuario
- POST /registro - Crear un usuario
- POST /login - Iniciar sesión

## Contribuciones

Si deseas contribuir a este proyecto, siéntete libre de hacer un fork y enviar un pull request.
