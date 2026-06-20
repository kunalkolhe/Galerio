import React, { useState } from 'react';
import { Upload, Image as ImageIcon, Video, Film } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CATEGORIES = [
  "Cinematic", "Wedding", "Portrait", "Commercial / Brand", "Fashion", 
  "Travel", "Music Video", "Social Media Content", "Black & White", "Color Grading"
];

const UploadWork = () => {
  const navigate = useNavigate();
  const [workType, setWorkType] = useState('Video');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    work_category: CATEGORIES[0]
  });
  
  const [beforeImage, setBeforeImage] = useState(null);
  const [afterImage, setAfterImage] = useState(null);
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
    setFormData({ ...formData, work_category: CATEGORIES[0] });

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
        if (workType === 'Video') {
          setBeforePreview('VIDEO');
        } else {
          setBeforePreview(URL.createObjectURL(file));
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
      setStatus('Add a Title and upload your file.');
      return;
    }
    
    if (workType === 'LUTs' && !afterImage) {
      setStatus('LUTs need a "Before" and "After" image.');
      return;
    }

    setIsUploading(true);
    setStatus('Uploading...');
    
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
      const API_BASE_URL = window.location.hostname === 'localhost' ? 'http://localhost:5000' : '';
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/api/gallery`, {
        method: 'POST',
        body: data,
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (response.ok) {
        setStatus('Uploaded successfully!');
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

  const inputClass = "w-full bg-surface-2 border border-surface-2 rounded-sm px-4 py-3 text-primary placeholder-secondary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all";

  return (
    <div className="pt-32 pb-16 min-h-screen bg-base">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <h1 className="text-4xl md:text-5xl font-display text-primary mb-4">Add Portfolio Work</h1>
        <p className="text-secondary text-lg mb-10">Upload your portfolio work.</p>

        <form onSubmit={handleSubmit} className="bg-surface-1 border border-surface-2 p-8 rounded-sm space-y-8 cinematic-shadow">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-8 border-b border-surface-2">
            <div className="space-y-3">
              <label className="text-sm font-medium tracking-wide text-primary">Work Type *</label>
              <select 
                value={workType} 
                onChange={handleWorkTypeChange}
                className={`${inputClass} appearance-none cursor-pointer [&>option]:bg-surface-2 [&>option]:text-primary`}
              >
                <option value="Video">Video Work</option>
                <option value="Photography">Photo Editing</option>
                <option value="LUTs">LUT / Color Grading</option>
                <option value="Retouching">Retouching</option>
              </select>
            </div>
            
            <div className="space-y-3">
              <label className="text-sm font-medium tracking-wide text-primary">Category *</label>
              <select 
                name="work_category"
                value={formData.work_category} 
                onChange={handleInputChange}
                className={`${inputClass} appearance-none cursor-pointer [&>option]:bg-surface-2 [&>option]:text-primary`}
              >
                {CATEGORIES.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <label className="text-sm font-medium tracking-wide text-primary">Project Title *</label>
              <input 
                type="text" 
                name="title" 
                value={formData.title} 
                onChange={handleInputChange}
                className={inputClass}
                placeholder="e.g. Cinematic Wedding Edit"
                required
              />
            </div>
            
            <div className="space-y-3">
              <label className="text-sm font-medium tracking-wide text-primary">Rate</label>
              <input 
                type="text" 
                name="price" 
                value={formData.price} 
                onChange={handleInputChange}
                className={inputClass}
                placeholder="e.g. $150 per project"
              />
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-sm font-medium tracking-wide text-primary">Description</label>
            <textarea 
              name="description" 
              value={formData.description} 
              onChange={handleInputChange}
              rows="3"
              className={inputClass}
              placeholder="Describe your work."
            ></textarea>
          </div>

          {/* Upload Areas */}
          <div className={`grid grid-cols-1 ${workType === 'LUTs' ? 'md:grid-cols-2' : ''} gap-8 pt-4`}>
            
            {/* Main Upload Box */}
            <div className="border-2 border-dashed border-surface-2 hover:border-accent/50 rounded-sm p-8 flex flex-col items-center justify-center relative transition-colors overflow-hidden min-h-[250px] bg-surface-2 group">
              <input 
                type="file" 
                accept={workType === 'Video' ? "video/*" : "image/*"}
                onChange={(e) => handleFileChange(e, 'before')}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                required
              />
              
              {beforePreview === 'VIDEO' ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-surface-1">
                  <Film className="w-16 h-16 text-accent mb-4" />
                  <p className="text-primary font-medium tracking-wide">Video Selected</p>
                  <p className="text-xs text-secondary mt-2 truncate px-4">{beforeImage.name}</p>
                </div>
              ) : beforePreview ? (
                <img src={beforePreview} alt="Preview" className="absolute inset-0 w-full h-full object-cover opacity-80" />
              ) : null}

              <div className={`flex flex-col items-center text-center space-y-4 pointer-events-none z-20 ${beforePreview ? 'bg-surface-1/80 p-6 rounded-sm backdrop-blur-md border border-surface-2' : ''}`}>
                {workType === 'Video' ? <Video className={`w-10 h-10 ${beforePreview ? 'text-accent' : 'text-secondary group-hover:text-accent'} transition-colors`} /> : <ImageIcon className={`w-10 h-10 ${beforePreview ? 'text-accent' : 'text-secondary group-hover:text-accent'} transition-colors`} />}
                <div>
                  <p className={`font-medium tracking-wide ${beforePreview ? 'text-primary' : 'text-secondary group-hover:text-primary'} transition-colors`}>
                    {workType === 'Video' ? 'Upload Video *' : 
                     workType === 'LUTs' ? 'Upload "Before" Image *' : 
                     'Upload Photo *'}
                  </p>
                  <p className={`text-xs mt-2 ${beforePreview ? 'text-secondary' : 'text-surface-2 group-hover:text-secondary'} transition-colors`}>
                    {workType === 'Video' ? 'MP4, WebM (Max 50MB)' : 'PNG, JPG (Max 10MB)'}
                  </p>
                </div>
              </div>
            </div>

            {/* Optional After Image for LUTs */}
            {workType === 'LUTs' && (
              <div className="border-2 border-dashed border-surface-2 hover:border-accent/50 rounded-sm p-8 flex flex-col items-center justify-center relative transition-colors overflow-hidden min-h-[250px] bg-surface-2 group">
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

                <div className={`flex flex-col items-center text-center space-y-4 pointer-events-none z-20 ${afterPreview ? 'bg-surface-1/80 p-6 rounded-sm backdrop-blur-md border border-surface-2' : ''}`}>
                  <ImageIcon className={`w-10 h-10 ${afterPreview ? 'text-accent' : 'text-secondary group-hover:text-accent'} transition-colors`} />
                  <div>
                    <p className={`font-medium tracking-wide ${afterPreview ? 'text-primary' : 'text-secondary group-hover:text-primary'} transition-colors`}>Upload "After" Image *</p>
                    <p className={`text-xs mt-2 ${afterPreview ? 'text-secondary' : 'text-surface-2 group-hover:text-secondary'} transition-colors`}>PNG, JPG (Max 10MB)</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {status && (
            <div className={`p-4 rounded-sm text-sm font-medium ${status.includes('failed') || status.includes('Error') ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'bg-accent/10 text-accent border border-accent/20'}`}>
              {status}
            </div>
          )}

          <div className="pt-8 border-t border-surface-2">
            <button 
              type="submit" 
              disabled={isUploading}
              className={`w-full bg-accent text-base font-medium tracking-widest uppercase text-sm rounded-sm px-4 py-4 flex items-center justify-center gap-3 transition-colors ${isUploading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-yellow-400'}`}
            >
              {workType === 'Video' ? <Film className="w-5 h-5" /> : <Upload className="w-5 h-5" />} 
              {isUploading ? 'Uploading...' : 'Upload'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadWork;
