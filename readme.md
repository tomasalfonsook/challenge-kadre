🚛 Challenge Kadre

Este proyecto es una aplicación fullstack para la gestión de viajes de camiones, desarrollada con React (frontend), Node.js/Express (backend) y MongoDB (base de datos). Incluye autenticación de usuarios, panel de control protegido y operaciones CRUD sobre viajes.

  

📁 Estructura del Proyecto

```

challenge-kadre/
│
├── backend/ # API REST en Node.js/Express
│ ├── src/
│ │ ├── config/ # Configuración de base de datos
│ │ ├── controllers/ # Lógica de negocio (auth, viajes)
│ │ ├── middleware/ # Middlewares (auth, validaciones, etc.)
│ │ ├── models/ # Modelos de datos (User, Viaje)
│ │ ├── routes/ # Rutas de la API
│ │ ├── utils/ # Utilidades (JWT, helpers)
│ │ └── index.js # Punto de entrada
│ ├── Dockerfile
│ ├── package.json
│ └── .env.example
│
├── frontend/ # Aplicación React (Vite)
│ ├── src/
│ │ ├── assets/ # Imágenes y recursos
│ │ ├── components/ # Componentes reutilizables (Navbar, SideNav, etc.)
│ │ ├── context/ # Contextos de React (Auth)
│ │ ├── pages/ # Vistas principales (Login, Register, Viajes)
│ │ ├── services/ # Axios y servicios API
│ │ ├── styles/ # Tailwind y DaisyUI
│ │ ├── App.jsx # Rutas y layout principal
│ │ └── main.jsx # Entry point de React
│ ├── Dockerfile
│ ├── package.json
│ └── .env.example
│
├── docker-compose.yml # Orquestación de servicios
├── .gitignore
└── README.md # Este archivo
  ```

✨ Funcionalidades

✅ Autenticación de usuarios (registro, login, logout)
🚛 CRUD completo de viajes
🔐 Rutas protegidas mediante JWT
🧭 Panel administrativo con navegación lateral
📱 Responsive design (Tailwind + DaisyUI)
🐳 Contenedores Docker para levantar todo el stack fácilmente

  

🚀 Cómo ejecutar el proyecto

Requisitos:
- Docker
- Docker Compose
- (Opcional) Node.js y npm si querés ejecutar sin Docker  

1. Cloná el repositorio

```
git clone https://github.com/tuusuario/challenge-kadre.git
cd challenge-kadre
```

  

2. Configurá las variables de entorno

Copiá los archivos .env.example a .env:
```
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```
  

Asegurate de que la URI de MongoDB sea:

```
MONGO_URI=mongodb://root:example@mongo:27017/challenge?authSource=admin
```

Y en el frontend:
```
VITE_API_URL=http://localhost:4000/api
```
  
3. Levantá todo con Docker Compose

```
docker-compose up --build
```

Esto lanzará:  

🛢️ MongoDB (puerto 27017)
🔙 Backend (http://localhost:4000)
🎨 Frontend (http://localhost:5173)

  

4. Accedé a la app

👉 Abrí http://localhost:5173 en tu navegador.


🧑‍💻 Desarrollo local (sin Docker)

1. Backend


```
cd backend

npm install

npm run dev
```
  

2. Frontend


```
cd frontend

npm install

npm run dev
```
  

🧠 Notas técnicas

- El backend expone la API en /api
- JWT se guarda en localStorage
- El login protege rutas desde el frontend
- MongoDB se levanta automáticamente en Docker con usuario y contraseña
 

👤 Autor

Desarrollado por Tomás Alfonso para el challenge de Kadre.