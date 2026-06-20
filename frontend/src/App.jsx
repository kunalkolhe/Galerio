import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Public/Home';
import Gallery from './pages/Public/Gallery';
import EditorDashboard from './pages/Admin/EditorDashboard';
import UploadWork from './pages/Admin/UploadWork';
import Settings from './pages/Admin/Settings';
import Notifications from './pages/Admin/Notifications';

import Login from './pages/Public/Login';
import Register from './pages/Public/Register';
import EditorProfile from './pages/Public/EditorProfile';
import About from './pages/Public/About';
import Contact from './pages/Public/Contact';

import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow selection:bg-accent selection:text-base">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/profile/:id" element={<EditorProfile />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Protected Routes */}
            <Route path="/editor" element={
              <ProtectedRoute allowedRoles={['EDITOR', 'ADMIN']}>
                <EditorDashboard />
              </ProtectedRoute>
            } />
            <Route path="/upload" element={
              <ProtectedRoute allowedRoles={['EDITOR', 'ADMIN']}>
                <UploadWork />
              </ProtectedRoute>
            } />
            <Route path="/notifications" element={
              <ProtectedRoute allowedRoles={['EDITOR', 'ADMIN']}>
                <Notifications />
              </ProtectedRoute>
            } />
            <Route path="/settings" element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            } />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
