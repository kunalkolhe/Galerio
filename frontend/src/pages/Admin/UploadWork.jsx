import React, { useState } from 'react';
import { Upload, Image as ImageIcon, Video, Film } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PHOTO_CATEGORIES = ["Portrait", "Wedding", "Commercial", "Landscape", "Fashion", "Real Estate", "Other"];
const VIDEO_CATEGORIES = ["Cinematic", "Music Video", "Commercial", "Wedding Film", "Vlog", "Documentary", "Other"];
const LUT_CATEGORIES = ["Cinematic LUT", "Vintage LUT", "B&W LUT", "Wedding LUT", "Moody LUT", "Other"];

const UploadWork = () => {
  const navigate = useNavigate();
  const [workType, setWorkType] = useState('Video');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    work_category: VIDEO_CATEGORIES[0]
  });
  
  const [beforeImage, setBeforeImage] = useState(null); // primary file
  const [afterImage, setAfterImage] = useState(null);   // optional secondary file (for LUTs)
  const [beforePreview, setBeforePreview] = useState(null);
  const [afterPreview, setAfterPreview] = useState(null);
  const [status, setStatus] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleWorkTypeChange = (e) => {
    const type = e.target.value;
    setWorkType(type);
    
    let defaultCat = PHOTO_CATEGORIES[0];
    if (type === 'Video') defaultCat = VIDEO_CATEGORIES[0];
    if (type === 'LUTs') defaultCat = LUT_CATEGORIES[0];

    setFormData({ 
      ...formData, 
      work_category: defaultCat 
    });

    // Reset files when switching types
    setBeforeImage(null);
    setAfterImage(null);
    setBeforePreview(null);
    setAfterPreview(null);
  };

  const handleFileChange = (e, type) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (type === 'before') {
        setBeforeImage(file);
        // Only generate image preview if it's an image
        if (file.type.startsWith('image/')) {
          setBeforePreview(URL.createObjectURL(file));
        } else if (file.type.startsWith('video/')) {
          setBeforePreview('VIDEO');
        }
      }
      if (type === 'after') {
        setAfterImage(file);
        setAfterPreview(URL.createObjectURL(file));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!beforeImage || !formData.title) {
      setStatus('Please provide a Title and upload your file.');
      return;
    }
    
    if (workType === 'LUTs' && !afterImage) {
      setStatus('LUTs require both a "Before" and an "After" image.');
      return;
    }

    setIsUploading(true);
    setStatus('Uploading... This might take a moment for video files.');
    
    const data = new FormData();
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('price', formData.price);
    data.append('work_type', workType);
    data.append('work_category', formData.work_category);
    
    data.append('before_image', beforeImage);
    if (afterImage) {
      data.append('after_image', afterImage);
    }

    try {
      const API_BASE_URL = `http://${window.location.hostname}:5000`;
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/api/gallery`, {
        method: 'POST',
        body: data,
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (response.ok) {
        setStatus('Successfully uploaded!');
        setTimeout(() => navigate('/editor'), 1500);
      } else {
        const errorData = await response.json();
        setStatus(`Upload failed: ${errorData.error}`);
        setIsUploading(false);
      }
    } catch (err) {
      setStatus(`Error: ${err.message}`);
      setIsUploading(false);
    }
  };

  const currentCategories = 
    workType === 'Video' ? VIDEO_CATEGORIES : 
    workType === 'Photography' ? PHOTO_CATEGORIES : 
    LUT_CATEGORIES;

  return (
    <div className="pt-24 pb-16 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-brand-gold mb-2">Add Portfolio Work</h1>
        <p className="text-gray-400 mb-8">Upload your best Video, Photography, or LUT transformations.</p>

        <form onSubmit={handleSubmit} className="bg-[#080808] border border-brand-gray p-8 rounded-2xl space-y-6 shadow-2xl">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6 border-b border-brand-gray">
            <div className="space-y-2">
              <label className="text-sm font-medium text-brand-white">Work Type *</label>
              <select 
                value={workType} 
                onChange={handleWorkTypeChange}
                className="w-full bg-brand-black border border-brand-gray rounded-lg px-4 py-3 text-brand-white focus:outline-none focus:border-brand-gold appearance-none"
              >
                <option value="Video">Video Work</option>
                <option value="Photography">Photography Work</option>
                <option value="LUTs">LUTs (Before & After)</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-brand-white">Category *</label>
              <select 
                name="work_category"
                value={formData.work_category} 
                onChange={handleInputChange}
                className="w-full bg-brand-black border border-brand-gray rounded-lg px-4 py-3 text-brand-white focus:outline-none focus:border-brand-gold appearance-none"
              >
                {currentCategories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-brand-white">Project Title *</label>
              <input 
                type="text" 
                name="title" 
                value={formData.title} 
                onChange={handleInputChange}
                className="w-full bg-brand-black border border-brand-gray rounded-lg px-4 py-3 text-brand-white focus:outline-none focus:border-brand-gold"
                placeholder="e.g. Cinematic Wedding Edit"
                required
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-brand-white">Editing Price / Rate</label>
              <input 
                type="text" 
                name="price" 
                value={formData.price} 
                onChange={handleInputChange}
                className="w-full bg-brand-black border border-brand-gray rounded-lg px-4 py-3 text-brand-white focus:outline-none focus:border-brand-gold"
                placeholder="e.g. $150 per project"
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
              placeholder="Describe the editing process..."
            ></textarea>
          </div>

          {/* Upload Areas */}
          <div className={`grid grid-cols-1 ${workType === 'LUTs' ? 'md:grid-cols-2' : ''} gap-6 pt-4`}>
            
            {/* Main Upload Box (Video, Photo, or Before LUT) */}
            <div className="border-2 border-dashed border-brand-gray hover:border-brand-gold/50 rounded-xl p-8 flex flex-col items-center justify-center relative transition-colors overflow-hidden min-h-[250px] bg-brand-black">
              <input 
                type="file" 
                accept={workType === 'Video' ? "video/*" : "image/*"}
                onChange={(e) => handleFileChange(e, 'before')}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                required
              />
              
              {beforePreview === 'VIDEO' ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-brand-gold/10">
                  <Film className="w-16 h-16 text-brand-gold mb-2" />
                  <p className="text-brand-gold font-bold">Video Selected</p>
                  <p className="text-xs text-gray-300 mt-1">{beforeImage.name}</p>
                </div>
              ) : beforePreview ? (
                <img src={beforePreview} alt="Preview" className="absolute inset-0 w-full h-full object-cover opacity-80" />
              ) : null}

              <div className={`flex flex-col items-center text-center space-y-3 pointer-events-none z-20 ${beforePreview ? 'bg-black/60 p-4 rounded-xl backdrop-blur-sm' : ''}`}>
                {workType === 'Video' ? <Video className="w-12 h-12 text-gray-400" /> : <ImageIcon className="w-12 h-12 text-gray-400" />}
                <div>
                  <p className="text-brand-gold font-medium text-lg">
                    {workType === 'Video' ? 'Upload Video File *' : 
                     workType === 'LUTs' ? 'Upload "Before" Image *' : 
                     'Upload Photo *'}
                  </p>
                  <p className="text-sm text-gray-400 mt-2">
                    {workType === 'Video' ? 'MP4, WebM (Max 50MB)' : 'PNG, JPG (Max 10MB)'}
                  </p>
                </div>
              </div>
            </div>

            {/* Optional After Image for LUTs */}
            {workType === 'LUTs' && (
              <div className="border-2 border-dashed border-brand-gray hover:border-brand-gold/50 rounded-xl p-8 flex flex-col items-center justify-center relative transition-colors overflow-hidden min-h-[250px] bg-brand-black">
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, 'after')}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  required={workType === 'LUTs'}
                />
                
                {afterPreview && (
                  <img src={afterPreview} alt="After preview" className="absolute inset-0 w-full h-full object-cover opacity-80" />
                )}

                <div className={`flex flex-col items-center text-center space-y-3 pointer-events-none z-20 ${afterPreview ? 'bg-black/60 p-4 rounded-xl backdrop-blur-sm' : ''}`}>
                  <ImageIcon className="w-12 h-12 text-brand-gold/80" />
                  <div>
                    <p className="text-brand-gold font-medium text-lg">Upload "After" Image *</p>
                    <p className="text-sm text-gray-400 mt-2">PNG, JPG (Max 10MB)</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {status && (
            <div className={`p-4 rounded-lg font-medium ${status.includes('failed') || status.includes('Error') ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'bg-brand-gold/10 text-brand-gold border border-brand-gold/20'}`}>
              {status}
            </div>
          )}

          <div className="pt-6 border-t border-brand-gray">
            <button 
              type="submit" 
              disabled={isUploading}
              className={`w-full bg-brand-gold text-brand-black font-bold text-lg rounded-lg px-4 py-4 flex items-center justify-center gap-3 transition-colors ${isUploading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-yellow-400'}`}
            >
              {workType === 'Video' ? <Film className="w-6 h-6" /> : <Upload className="w-6 h-6" />} 
              {isUploading ? 'Uploading...' : 'Publish to Portfolio'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadWork;
