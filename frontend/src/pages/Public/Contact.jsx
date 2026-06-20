import React, { useState } from 'react';
import { Mail, MessageSquare, MapPin } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus('Sending message...');

    try {
      const API_BASE_URL = `http://${window.location.hostname}:5000`;
      const response = await fetch(`${API_BASE_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('Message sent successfully! We will get back to you shortly.');
        setFormData({ name: '', email: '', message: '' });
      } else {
        const errorData = await response.json();
        setStatus(errorData.error || 'Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Contact error:', error);
      setStatus('Network error. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const inputClass = "w-full bg-surface-2 border border-surface-2 rounded-sm px-4 py-3 text-primary placeholder-secondary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all";

  return (
    <div className="pt-32 pb-16 min-h-screen bg-base">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h1 className="text-hero font-display text-primary mb-6">
            Contact Support.
          </h1>
          <p className="text-secondary text-lg leading-relaxed">
            Need help? Send us a message.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="bg-surface-1 border border-surface-2 p-8 rounded-sm cinematic-shadow">
              <h2 className="text-3xl font-display text-primary mb-8">Get in Touch</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Mail className="w-6 h-6 text-accent shrink-0 mt-1" />
                  <div>
                    <h4 className="font-medium tracking-wide text-primary">Email Us</h4>
                    <p className="text-secondary text-sm mt-1">support@galerio.com</p>
                    <p className="text-secondary text-sm mt-1">billing@galerio.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 text-accent shrink-0 mt-1" />
                  <div>
                    <h4 className="font-medium tracking-wide text-primary">Galerio HQ</h4>
                    <p className="text-secondary text-sm mt-1">123 Creative Studio Way<br/>San Francisco, CA 94105</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-accent/5 border border-accent/20 p-8 rounded-sm">
              <h3 className="text-xl font-display text-accent mb-2">Editor Support</h3>
              <p className="text-secondary text-sm">
                If you are an editor experiencing issues with your portfolio, please reach out via your dashboard.
              </p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="bg-surface-1 border border-surface-2 p-8 rounded-sm space-y-6 cinematic-shadow">
            <h2 className="text-3xl font-display text-primary mb-8">Send a Message</h2>
            <div className="space-y-3">
              <label className="text-sm font-medium tracking-wide text-primary">Name</label>
              <input 
                type="text" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
                className={inputClass}
              />
            </div>
            <div className="space-y-3">
              <label className="text-sm font-medium tracking-wide text-primary">Email</label>
              <input 
                type="email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
                className={inputClass}
              />
            </div>
            <div className="space-y-3">
              <label className="text-sm font-medium tracking-wide text-primary">Message</label>
              <textarea 
                rows="5" required value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})}
                className={inputClass}
              ></textarea>
            </div>
            {status && (
              <div className={`p-4 rounded-sm text-sm font-medium tracking-wide border ${
                status.includes('successfully') 
                  ? 'bg-green-500/10 text-green-400 border-green-500/20' 
                  : 'bg-red-500/10 text-red-400 border-red-500/20'
              }`}>
                {status}
              </div>
            )}
            
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full bg-surface-2 text-primary border border-surface-2 text-base tracking-widest uppercase text-sm font-medium rounded-sm py-4 hover:text-accent hover:border-accent/50 transition-colors disabled:opacity-50"
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
