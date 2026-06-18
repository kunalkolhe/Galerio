import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Public/Home';
import Gallery from './pages/Public/Gallery';
import EditorDashboard from './pages/Admin/EditorDashboard';
import UploadWork from './pages/Admin/UploadWork';
import Settings from './pages/Admin/Settings';

import Login from './pages/Public/Login';
import Register from './pages/Public/Register';
import EditorProfile from './pages/Public/EditorProfile';
import About from './pages/Public/About';
import Contact from './pages/Public/Contact';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-brand-black text-brand-white flex flex-col font-sans">
        <Navbar />
        <main className="flex-grow selection:bg-brand-gold selection:text-brand-black">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/profile/:id" element={<EditorProfile />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/editor" element={<EditorDashboard />} />
            <Route path="/upload" element={<UploadWork />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
