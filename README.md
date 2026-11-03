# Quantum PC - eCommerce

Quantum PC es un eCommerce desarrollado como proyecto final del curso de React JS de **Talento Tech - Buenos Aires Ciudad**. Permite explorar productos de tecnología por categorías, consultar sus detalles, gestionar un carrito y administrar el catálogo desde un panel protegido.

![React](https://img.shields.io/badge/React-19.2.8-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-13-FFCA28?logo=firebase&logoColor=black)
![React Router](https://img.shields.io/badge/React_Router-7-CA4245?logo=reactrouter&logoColor=white)
![React Toastify](https://img.shields.io/badge/React_Toastify-11-FFAB00)

## Funcionalidades

### Carrito y autenticación

- Estado global del carrito mediante `CartContext`, con agregado, eliminación por unidad o producto completo, vaciado y cálculo de totales.
- Estado de sesión mediante `AuthContext`, con observación de cambios de Firebase Authentication.
- Inicio de sesión con Firebase desde `/admin/login`.
- Panel de administración protegido con `ProtectedRoute` para usuarios autenticados.
- Simulación de finalización de compra desde el carrito.

### CRUD de productos

- Catálogo obtenido desde la colección `Products` de Cloud Firestore.
- Filtrado de productos por categorías y navegación a `/category/:category`.
- Página de detalle de producto en `/product/:id`.
- Alta, edición y eliminación de productos desde `/admin`.
- Validaciones controladas para nombre, precio, categoría, descripción e imagen.
- Carga de imágenes mediante ImgBB.
- Confirmación de eliminación mediante una notificación interactiva.
- Indicadores de carga y mensajes de error en formularios, listado y panel.
- Notificaciones de operaciones mediante React Toastify.

### Diseño responsive y navegación

- Diseño adaptable con CSS responsive y grillas basadas en CSS Grid/Flexbox.
- Iconografía de Font Awesome en navegación, acciones y botones.
- Rutas públicas y administrativas con React Router.
- Navegación por categorías generada a partir de los productos existentes en Firestore.

## Tecnologías utilizadas

| Tecnología | Propósito en el proyecto |
| --- | --- |
| React | Construcción de la interfaz y componentes. |
| React DOM | Renderizado de la aplicación en el navegador. |
| Vite | Servidor de desarrollo, compilación y preview. |
| React Router DOM | Enrutamiento público y protegido. |
| Firebase | Authentication, Firestore y configuración de servicios. |
| React Toastify | Notificaciones y confirmación de acciones. |
| Font Awesome | Iconos SVG en botones, navegación y acciones. |
| Oxlint | Análisis estático del código. |
| CSS | Estilos, layouts responsive y diseño visual. |

## Instalación y ejecución local

### Requisitos previos

- Node.js versión compatible con Vite 8.
- npm incluido con Node.js.
- Una cuenta de Firebase.
- Una cuenta de ImgBB si se desea probar la carga de imágenes.
- Git para clonar el repositorio.

### 1. Clonar y entrar al proyecto

```bash
git clone https://github.com/Francisco-Gismondi/QuantumPC-TalentoTech.git
cd QuantumPC-TalentoTech
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar Firebase

1. Ingresá a [Firebase Console](https://console.firebase.google.com/) y creá un proyecto.
2. Agregá una aplicación web para obtener los datos de configuración.
3. Habilitá **Authentication** y agregá el proveedor **Email/Password**.
4. Creá al menos las credenciales de acceso que usarán las rutas protegidas desde Authentication > Users.
5. Habilitá **Cloud Firestore** y seleccioná el modo adecuado para tu entorno de pruebas.
6. Creá una colección llamada exactamente `Products`.

Cada documento de `Products` puede utilizar esta estructura:

```text
name: string
price: number
category: string
description: string
image: string
```

Las imágenes se cargan desde `UploadImage.js` a ImgBB y se guarda su URL en Firestore. `Firebase Storage` está inicializado por el proyecto, pero actualmente no se utiliza para subir las imágenes.

### 4. Configurar las variables de entorno

Copiá el ejemplo:

```bash
copy .env.example .env
```

Completá `.env` únicamente en tu entorno local. Nunca subas ese archivo al repositorio ni publiques las credenciales reales en el README.

### 5. Iniciar el servidor de desarrollo

```bash
npm run dev
```

Vite mostrará la URL local, normalmente `http://localhost:5173`.

### Otros scripts disponibles

```bash
# Compilar para producción
npm run build

# Previsualizar la compilación
npm run preview
```

## Variables de entorno

El proyecto utiliza variables con prefijo `VITE_`, requerido por Vite:

| Variable | Uso |
| --- | --- |
| `VITE_FIREBASE_API_KEY` | API key pública de la aplicación Firebase. |
| `VITE_FIREBASE_AUTH_DOMAIN` | Dominio de autenticación configurado en Firebase. |
| `VITE_FIREBASE_PROJECT_ID` | Identificador del proyecto Firebase. |
| `VITE_FIREBASE_STORAGE_BUCKET` | Bucket configurado en Firebase Storage. |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Sender ID de Firebase. |
| `VITE_FIREBASE_APP_ID` | ID de la aplicación web Firebase. |
| `VITE_IMGBB_API_KEY` | API key usada para subir imágenes a ImgBB. |

Ejemplo válido sin secretos:

```dotenv
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_IMGBB_API_KEY=
```

El archivo `.env` está excluido por `.gitignore`.

## Despliegue

El proyecto usa Vite, por lo que el directorio de salida de producción es `dist`.

### Vercel

1. Importá [QuantumPC](https://github.com/Francisco-Gismondi/QuantumPC-TalentoTech) en Vercel.
2. Framework Preset: **Vite**.
3. Build Command: `npm run build`.
4. Output Directory: `dist`.
5. Cargá las siete variables de entorno en **Settings > Environment Variables**.
6. Conservá el archivo `vercel.json`; incluye la reescritura SPA necesaria.

### Netlify

1. Importá el repositorio desde GitHub en Netlify.
2. Build Command: `npm run build`.
3. Publish directory: `dist`.
4. Cargá las siete variables de entorno.
5. El archivo `public/_redirects` contiene:

```text
/* /index.html 200
```

Vite copia este archivo a la raíz de `dist`, permitiendo recargar rutas como `/product/:id` sin un 404.

## Acceso de prueba

- **Usuario administrador:** admin@admin.com
- **Contraseña administrativa:** admin123