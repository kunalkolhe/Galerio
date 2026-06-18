# Galerio - The Global Editor Marketplace 🎨🎥

Galerio (formerly Photo LUTs Gallery) is a premium, modern marketplace platform designed to connect clients with elite photo editors, video editors, colorists, and retouchers from around the world.

![Galerio Hero Section](frontend/public/hero-bg.png)

## 🌟 Key Features

### 1. 3-in-1 Smart Portfolio System
Editors can showcase their work exactly how it's meant to be seen. Our unified upload system intelligently handles:
- **Video Work**: Upload direct video files (e.g., MP4) that are displayed in a sleek, integrated video player.
- **Photography**: Upload high-res final images for standard portfolio showcases.
- **LUTs & Color Grading**: Upload "Before" and "After" image pairs to automatically generate interactive, draggable comparison sliders.

### 2. Editor Profiles & Social Integration
Every editor gets a dedicated, premium profile page that acts as their personal storefront:
- Display specialties (e.g., Senior Colorist, Hybrid Editor).
- Set standard rates and pricing.
- Link directly to **Instagram**, **YouTube**, **Personal Websites**, and other portfolios.
- Track total project counts and client feedback.

### 3. Client Reviews & Ratings
A built-in review system allows authenticated clients to rate editors out of 5 stars and leave written feedback. This builds trust and highlights the platform's top talent.

### 4. Dynamic Masonry Gallery
A highly responsive, Pinterest-style masonry grid gallery that seamlessly renders videos, static images, and interactive sliders side-by-side. Includes instant category filtering and real-time search.

### 5. Role-Based Access Control
Secure authentication using JWTs and bcrypt:
- **Clients**: Can browse galleries, view editor profiles, and leave reviews.
- **Editors**: Can upload portfolio items, manage their public profiles, and set pricing.

---

## 🛠️ Tech Stack

### Frontend
- **React.js** (Vite)
- **Tailwind CSS** (for styling and modern UI design)
- **Framer Motion** (for smooth animations and 3D tilt effects)
- **React Router** (for navigation)
- **React Player** (for seamless video integration)
- **Lucide React** (for crisp SVG icons)
- **React Masonry CSS** (for the dynamic gallery grid)

### Backend
- **Node.js & Express.js**
- **Prisma ORM** (Database management and schema)
- **PostgreSQL** (Relational database)
- **Multer** (Handling multipart/form-data for direct image and video uploads)
- **JWT & bcrypt** (Authentication and password hashing)

---

## 🚀 How to Run Locally

### Prerequisites
- [Node.js](https://nodejs.org/) installed
- A running [PostgreSQL](https://www.postgresql.org/) database server

### 1. Database & Backend Setup
Navigate to the `backend` directory:
```bash
cd backend
npm install
```

Create a `.env` file in the `backend` folder and add your database URL:
```env
DATABASE_URL="postgresql://USERNAME:PASSWORD@localhost:5432/photogallery"
JWT_SECRET="your_secret_key"
```

Push the database schema and start the server:
```bash
npx prisma db push
npx prisma generate
npm run dev
```
The backend API will start on `http://localhost:5000`.

### 2. Frontend Setup
Open a new terminal and navigate to the `frontend` directory:
```bash
cd frontend
npm install
```

Start the Vite development server:
```bash
npm run dev
```
The frontend will start on `http://localhost:5173`.

---

## 👨‍💻 Developed By
**Kunal Kolhe**
