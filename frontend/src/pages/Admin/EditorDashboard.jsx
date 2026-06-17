import React, { useState } from 'react';
import { Upload, Image as ImageIcon } from 'lucide-react';

const EditorDashboard = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: ''
  });
  const [beforeImage, setBeforeImage] = useState(null);
  const [afterImage, setAfterImage] = useState(null);
  const [beforePreview, setBeforePreview] = useState(null);
  const [afterPreview, setAfterPreview] = useState(null);
  const [status, setStatus] = useState('');

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e, type) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (type === 'before') {
        setBeforeImage(file);
        setBeforePreview(URL.createObjectURL(file));
      }
      if (type === 'after') {
        setAfterImage(file);
        setAfterPreview(URL.createObjectURL(file));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!beforeImage || !afterImage || !formData.title) {
      setStatus('Please provide all required fields (Title, Before Image, After Image)');
      return;
    }

    setStatus('Uploading...');
    const data = new FormData();
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('price', formData.price);
    data.append('before_image', beforeImage);
    data.append('after_image', afterImage);

    try {
      const API_BASE_URL = `http://${window.location.hostname}:5000`;
      const response = await fetch(`${API_BASE_URL}/api/gallery`, {
        method: 'POST',
        body: data,
        // Assuming Editor is logged in, you'd attach a token here in a real app
      });
      
      if (response.ok) {
        setStatus('Successfully uploaded!');
        setFormData({ title: '', description: '', price: '' });
        setBeforeImage(null);
        setAfterImage(null);
        setBeforePreview(null);
        setAfterPreview(null);
      } else {
        const errorData = await response.json();
        setStatus(`Upload failed: ${errorData.error}`);
      }
    } catch (err) {
      setStatus(`Error: ${err.message}`);
    }
  };

  return (
    <div className="pt-24 pb-16 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-brand-gold mb-2">Editor Dashboard</h1>
        <p className="text-gray-400 mb-8">Upload your latest editing work and set a price for this look.</p>

        <form onSubmit={handleSubmit} className="bg-brand-gray/30 border border-brand-gray p-8 rounded-2xl space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-brand-white">Project Title *</label>
              <input 
                type="text" 
                name="title" 
                value={formData.title} 
                onChange={handleInputChange}
                className="w-full bg-brand-black border border-brand-gray rounded-lg px-4 py-3 text-brand-white focus:outline-none focus:border-brand-gold"
                placeholder="e.g. Cinematic Teal & Orange"
                required
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-brand-white">Editing Price</label>
              <input 
                type="text" 
                name="price" 
                value={formData.price} 
                onChange={handleInputChange}
                className="w-full bg-brand-black border border-brand-gray rounded-lg px-4 py-3 text-brand-white focus:outline-none focus:border-brand-gold"
                placeholder="e.g. $25.00"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-brand-white">Description</label>
            <textarea 
              name="description" 
              value={formData.description} 
              onChange={handleInputChange}
              rows="3"
              className="w-full bg-brand-black border border-brand-gray rounded-lg px-4 py-3 text-brand-white focus:outline-none focus:border-brand-gold"
              placeholder="Describe the editing process or the vibe of this LUT..."
            ></textarea>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
            {/* Before Image Upload */}
            <div className="border-2 border-dashed border-brand-gray hover:border-brand-gold/50 rounded-xl p-6 flex flex-col items-center justify-center relative transition-colors overflow-hidden">
              <input 
                type="file" 
                accept="image/*"
                onChange={(e) => handleFileChange(e, 'before')}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                required
              />
              {beforePreview && (
                <img src={beforePreview} alt="Before preview" className="absolute inset-0 w-full h-full object-cover opacity-80" />
              )}
              <div className="flex flex-col items-center text-center space-y-3 pointer-events-none z-20">
                <ImageIcon className="w-10 h-10 text-gray-500" />
                <div>
                  <p className="text-brand-gold font-medium">Upload "Before" Image *</p>
                  <p className="text-xs text-gray-300 mt-1">{beforeImage ? beforeImage.name : 'PNG, JPG up to 10MB'}</p>
                </div>
              </div>
            </div>

            {/* After Image Upload */}
            <div className="border-2 border-dashed border-brand-gray hover:border-brand-gold/50 rounded-xl p-6 flex flex-col items-center justify-center relative transition-colors overflow-hidden">
              <input 
                type="file" 
                accept="image/*"
                onChange={(e) => handleFileChange(e, 'after')}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                required
              />
              {afterPreview && (
                <img src={afterPreview} alt="After preview" className="absolute inset-0 w-full h-full object-cover opacity-80" />
              )}
              <div className="flex flex-col items-center text-center space-y-3 pointer-events-none z-20">
                <ImageIcon className="w-10 h-10 text-brand-gold/50" />
                <div>
                  <p className="text-brand-gold font-medium">Upload "After" Image *</p>
                  <p className="text-xs text-gray-300 mt-1">{afterImage ? afterImage.name : 'PNG, JPG up to 10MB'}</p>
                </div>
              </div>
            </div>
          </div>

          {status && (
            <div className={`p-4 rounded-lg ${status.includes('failed') || status.includes('Error') ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'bg-brand-gold/10 text-brand-gold border border-brand-gold/20'}`}>
              {status}
            </div>
          )}

          <div className="pt-6">
            <button 
              type="submit" 
              className="w-full bg-brand-gold text-brand-black font-semibold rounded-lg px-4 py-4 flex items-center justify-center gap-2 hover:bg-yellow-400 transition-colors"
            >
              <Upload className="w-5 h-5" /> Publish to Gallery
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditorDashboard;
