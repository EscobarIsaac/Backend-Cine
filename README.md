# Nombre: Isaac Escobar, Alejandro Escobar

Sistema de gestión de cine basado en arquitectura de microservicios.  
Permite gestionar usuarios, películas (eventos), venta de entradas, notificaciones y control de asistencia, todo coordinado por un API Gateway y RabbitMQ.

---

## Índice

- [Descripción del Proyecto](#descripción-del-proyecto)  
- [Arquitectura](#arquitectura)  
- [Tecnologías](#tecnologías)  
- [Estructura del Proyecto](#estructura-del-proyecto)  
- [Variables de Entorno](#variables-de-entorno)  
- [Instalación](#instalación)  
- [Uso](#uso)  
  - [Levantando con Docker Compose](#levantando-con-docker-compose)  
  - [Endpoints](#endpoints)  
- [Flujo de Mensajería (RabbitMQ)](#flujo-de-mensajería-rabbitmq)  
- [Bases de Datos](#bases-de-datos)  
- [Volúmenes y Redes](#volúmenes-y-redes)  
- [Pruebas](#pruebas)  
- [Contribuir](#contribuir)  
- [Licencia](#licencia)

---

## Descripción del Proyecto

Cine Encuentro es una plataforma para la gestión integral de un cine, que abarca:

- **Gestión de usuarios** (registro, autenticación JWT)  
- **Gestión de películas** (creación y listado de eventos)  
- **Venta de entradas** (comprar y listar)  
- **Notificaciones** (enviar mensajes a colas de RabbitMQ)  
- **Control de asistencia** (registrar asistencia de entradas)  

Todo a través de un **API Gateway** que enruta las peticiones al microservicio correspondiente.

---

## Arquitectura

```
[ Cliente ] 
    ↓ HTTP 
[ API Gateway ] 
    ↙   ↓    ↘    ↙      ↘
 MS-Usuarios  MS-Eventos  MS-Entradas  MS-Notificaciones  MS-Asistencia
      ↘           ↙           ↘          ↘                   ↙
   PostgreSQL   PostgreSQL   PostgreSQL RabbitMQ            PostgreSQL
                  (eventos)    (entradas)  (colas)          (asistencia)
```

- Cada microservicio es una aplicación Node.js + Express + Sequelize  
- Comunicación asíncrona con **RabbitMQ** para eventos y notificaciones  
- Bases de datos **PostgreSQL** independientes por servicio  
- Orquestación con **Docker Compose**

---

## Tecnologías

- **Node.js** y **Express**  
- **Sequelize** ORM (PostgreSQL)  
- **RabbitMQ** (colas y publish/subscribe)  
- **Docker** & **Docker Compose**  
- **JWT** para autenticación  
- **dotenv** para configuración

---

## Estructura del Proyecto

```
cine-encuentro2/
├── backend/
│   ├── docker-compose.yml
│   ├── .env
│   ├── gateway/
│   │   ├── src/
│   │   │   └── app.js
│   │   └── server.js
│   ├── ms-usuarios/
│   │   ├── src/
│   │   │   ├── routes/usuario.routes.js
│   │   │   ├── controllers/usuario.controller.js
│   │   │   ├── models/user.model.js
│   │   │   └── database/db.js
│   │   └── .env
│   ├── ms-eventos/
│   ├── ms-entradas/
│   ├── ms-notificaciones/
│   └── ms-asistencia/
└── README.md
```

---

## Variables de Entorno

Cada microservicio y el Gateway usan su propio archivo `.env`:

### backend/.env
```dotenv
RABBITMQ_URL=amqp://admin:admin@rabbitmq:5672
```

### ms-usuarios/.env
```dotenv
PORT=3001
DB_HOST=postgres-usuarios
DB_PORT=5432
DB_NAME=usuarios_db
DB_USER=postgres
DB_PASS=isaac
USUARIOS_JWT_SECRET=supersecreto123
RABBITMQ_URL=amqp://admin:admin@rabbitmq:5672
```

*(y de forma similar en otros servicios)*

---

## Instalación

1. Clona el repositorio:  
   ```bash
   git clone https://github.com/tu-usuario/cine-encuentro2.git
   cd cine-encuentro2/backend
   ```

2. Crea la red externa de Docker (si no existe):  
   ```bash
   docker network create notificaciones_default
   ```

3. Construye e inicia todo con Docker Compose:  
   ```bash
   docker-compose up --build -d
   ```

4. Verifica logs:  
   ```bash
   docker-compose logs -f
   ```

---

## Uso

### Levantando con Docker Compose
```bash
cd cine-encuentro2/backend
docker-compose up --build
```

### Endpoints

| Servicio          | Método | Ruta                               | Descripción               |
|-------------------|--------|------------------------------------|---------------------------|
| API Gateway       |        |                                    |                           |
| – Usuarios        | POST   | `/api/usuarios/register`           | Registra nuevo usuario    |
|                   | POST   | `/api/usuarios/login`              | Login → JWT               |
| – Eventos         | POST   | `/api/eventos/peliculas`           | Crear película/evento     |
|                   | GET    | `/api/eventos/peliculas`           | Listar películas          |
| – Entradas        | GET    | `/api/entradas/entradas`           | Listar entradas           |
|                   | POST   | `/api/entradas/entradas`           | Comprar nueva entrada     |
| – Notificaciones  | POST   | `/api/notificaciones/enviar`       | Enviar notificación       |
| – Asistencia      | POST   | `/api/asistencia/verificar`        | Registrar asistencia      |

---

## Flujo de Mensajería (RabbitMQ)

- **Colas utilizadas**:  
  - `evento.cola`  
  - `notificaciones.cola`

Visualiza en http://localhost:15672 (admin/admin).

---

## Bases de Datos

Cada servicio tiene su propia base de datos PostgreSQL con un volumen Docker.

---

## Volúmenes y Redes

- **Volúmenes**: usuarios_data, eventos_data, entradas_data, notificaciones_data, asistencia_data  
- **Red**: notificaciones_default

---

## Pruebas

Usa Postman o curl para probar el API Gateway y revisa RabbitMQ UI.

---

## Contribuir

1. Fork y crea rama: `git checkout -b feature/<nombre>`  
2. Commit: `git commit -m "feat: descripción"`  
3. Pull request.

---

## Licencia

MIT License
