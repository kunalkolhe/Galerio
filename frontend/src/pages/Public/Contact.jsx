import React, { useState } from 'react';
import { Mail, MessageSquare, MapPin } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Message sent to Galerio Support! We will get back to you shortly.');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="pt-24 pb-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 mb-4">
            Contact Support
          </h1>
          <p className="text-gray-400">
            Have questions about hiring an editor, or need help with your marketplace account? We are here to help.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="bg-[#080808] border border-brand-gray p-8 rounded-2xl">
              <h2 className="text-2xl font-bold text-brand-white mb-6">Get in Touch</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Mail className="w-6 h-6 text-brand-gold shrink-0 mt-1" />
                  <div>
                    <h4 className="font-medium text-brand-white">Email Us</h4>
                    <p className="text-gray-400 text-sm mt-1">support@galerio.com</p>
                    <p className="text-gray-400 text-sm">billing@galerio.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 text-brand-gold shrink-0 mt-1" />
                  <div>
                    <h4 className="font-medium text-brand-white">Galerio HQ</h4>
                    <p className="text-gray-400 text-sm mt-1">123 Creative Studio Way<br/>San Francisco, CA 94105</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-brand-gold/5 border border-brand-gold/20 p-8 rounded-2xl">
              <h3 className="text-xl font-bold text-brand-gold mb-2">Editor Support</h3>
              <p className="text-gray-400 text-sm">
                If you are an editor experiencing issues with your portfolio uploads, please reach out to our dedicated talent support team directly via your dashboard.
              </p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="bg-[#080808] border border-brand-gray p-8 rounded-2xl space-y-6">
            <h2 className="text-2xl font-bold text-brand-white mb-6">Send a Message</h2>
            <div className="space-y-2">
              <label className="text-sm font-medium text-brand-white">Your Name</label>
              <input 
                type="text" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
                className="w-full bg-brand-black border border-brand-gray rounded-lg px-4 py-3 text-brand-white focus:border-brand-gold outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-brand-white">Email Address</label>
              <input 
                type="email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
                className="w-full bg-brand-black border border-brand-gray rounded-lg px-4 py-3 text-brand-white focus:border-brand-gold outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-brand-white">How can we help?</label>
              <textarea 
                rows="5" required value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})}
                className="w-full bg-brand-black border border-brand-gray rounded-lg px-4 py-3 text-brand-white focus:border-brand-gold outline-none"
              ></textarea>
            </div>
            <button type="submit" className="w-full bg-brand-gold text-brand-black font-bold py-4 rounded-lg hover:bg-yellow-400 transition-colors">
              Submit Request
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
