# Galerio - The Global Editor Marketplace 🎨🎥

Galerio (formerly Photo LUTs Gallery) is a premium, modern marketplace platform designed to connect clients with elite photo editors, video editors, colorists, and retouchers from around the world.

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
- **React Masonry CSS** (for the dynamic gallery grid)

### Backend
- **Node.js & Express.js**
- **Prisma ORM** (Database management and schema)
- **Supabase (PostgreSQL)** (Cloud relational database)
- **Cloudinary** (Secure cloud storage for image and video uploads)
- **JWT & bcrypt** (Authentication and password hashing)

---

## 🚀 How to Run Locally

### Prerequisites
- [Node.js](https://nodejs.org/) installed
- A running [PostgreSQL](https://www.postgresql.org/) database or [Supabase](https://supabase.com) account
- A [Cloudinary](https://cloudinary.com) account for media uploads

### 1. Database & Backend Setup
Navigate to the `backend` directory:
```bash
cd backend
npm install
```

Create a `.env` file in the `backend` folder and add your keys:
```env
DATABASE_URL="postgresql://USERNAME:PASSWORD@localhost:5432/photogallery"
JWT_SECRET="your_secret_key"
CLOUDINARY_CLOUD_NAME="your_cloud_name"
CLOUDINARY_API_KEY="your_api_key"
CLOUDINARY_API_SECRET="your_api_secret"
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

## ☁️ Vercel Deployment

This project is configured as a Monorepo ready for zero-config Vercel deployment. 

1. Import the repository into Vercel.
2. In the **Build and Output Settings**, override the defaults with:
   - **Build Command:** `npm run build`
   - **Output Directory:** `frontend/dist`
   - **Install Command:** `npm run install:all`
3. Add your Environment Variables:
   - `DATABASE_URL` *(ensure `?pgbouncer=true` is appended if using a Supabase connection pooler)*
   - `JWT_SECRET`
   - `CLOUDINARY_CLOUD_NAME`
   - `CLOUDINARY_API_KEY`
   - `CLOUDINARY_API_SECRET`
   - `VITE_API_BASE_URL` *(set this to your Vercel URL, e.g., `https://galerio.vercel.app`)*
4. Click Deploy! Vercel will automatically build the React app and deploy the Express API as a Serverless Function.

---

## 👨‍💻 Developed By
**Kunal Kolhe**
