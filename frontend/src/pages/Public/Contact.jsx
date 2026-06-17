import React, { useState } from 'react';
import { Mail, MessageSquare, Send } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate sending message
    setStatus('Message sent successfully! We will get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
    
    setTimeout(() => {
      setStatus('');
    }, 5000);
  };

  return (
    <div className="pt-24 pb-16 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-brand-white mb-4">Get in Touch</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Have questions about our LUTs or need custom color grading work? We'd love to hear from you.
          </p>
        </div>

        <div className="bg-[#080808] border border-brand-gray rounded-3xl p-8 md:p-12 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-brand-white">Your Name</label>
                <div className="relative">
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-brand-black border border-brand-gray rounded-lg px-4 py-3 text-brand-white focus:outline-none focus:border-brand-gold transition-colors"
                    placeholder="John Doe"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-brand-white">Email Address</label>
                <div className="relative">
                  <Mail className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-brand-black border border-brand-gray rounded-lg pl-10 pr-4 py-3 text-brand-white focus:outline-none focus:border-brand-gold transition-colors"
                    placeholder="john@example.com"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-brand-white">Message</label>
              <div className="relative">
                <MessageSquare className="w-5 h-5 absolute left-3 top-4 text-gray-500" />
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows="5"
                  className="w-full bg-brand-black border border-brand-gray rounded-lg pl-10 pr-4 py-3 text-brand-white focus:outline-none focus:border-brand-gold transition-colors resize-none"
                  placeholder="How can we help you?"
                  required
                ></textarea>
              </div>
            </div>

            {status && (
              <div className="p-4 bg-brand-gold/10 border border-brand-gold/20 text-brand-gold rounded-lg text-center">
                {status}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-brand-gold text-brand-black font-bold rounded-lg px-6 py-4 flex items-center justify-center gap-2 hover:bg-yellow-400 transition-colors"
            >
              <Send className="w-5 h-5" /> Send Message
            </button>
            
          </form>
        </div>

      </div>
    </div>
  );
};

export default Contact;
