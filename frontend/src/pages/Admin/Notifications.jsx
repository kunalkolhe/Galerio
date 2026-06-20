import React, { useState, useEffect } from 'react';
import { Bell, Mail, Trash2, CheckCircle, Clock } from 'lucide-react';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const API_BASE_URL = window.location.hostname === 'localhost' ? 'http://localhost:5000' : '';

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${API_BASE_URL}/api/notifications`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          setNotifications(data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchNotifications();
  }, [API_BASE_URL]);

  const markAsRead = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_BASE_URL}/api/notifications/${id}/read`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        setNotifications(notifications.map(n => n.id === id ? { ...n, is_read: true } : n));
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (isLoading) {
    return (
      <div className="pt-32 pb-16 min-h-screen flex justify-center bg-base">
        <div className="w-8 h-8 rounded-full border-2 border-accent border-t-transparent animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-16 min-h-screen bg-base">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <div className="flex items-center gap-4 mb-8">
          <Bell className="w-8 h-8 text-accent" />
          <h1 className="text-4xl md:text-5xl font-display text-primary">Inbox</h1>
        </div>

        {notifications.length === 0 ? (
          <div className="bg-surface-1 border border-surface-2 p-12 text-center rounded-sm">
            <Bell className="w-12 h-12 text-surface-2 mx-auto mb-4" />
            <p className="text-secondary text-lg font-display italic">You have no notifications yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {notifications.map(notification => (
              <div 
                key={notification.id} 
                className={`p-6 rounded-sm border transition-all ${
                  notification.is_read 
                    ? 'bg-surface-1 border-surface-2 opacity-75' 
                    : 'bg-surface-2 border-accent/30 cinematic-shadow'
                }`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-sm ${
                      notification.type === 'HIRE_REQUEST' ? 'bg-accent/20 text-accent border border-accent/30' : 'bg-surface-3 text-secondary'
                    }`}>
                      {notification.type === 'HIRE_REQUEST' ? 'Project Request' : notification.type}
                    </span>
                    {!notification.is_read && (
                      <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
                    )}
                  </div>
                  <span className="text-xs text-secondary flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {new Date(notification.created_at).toLocaleString()}
                  </span>
                </div>
                
                <div className="mb-6">
                  {notification.from_name && (
                    <p className="text-sm text-secondary mb-1">
                      From: <span className="text-primary font-medium">{notification.from_name}</span> ({notification.from_email})
                    </p>
                  )}
                  <p className="text-primary leading-relaxed whitespace-pre-wrap">{notification.content}</p>
                </div>

                <div className="flex items-center gap-4 border-t border-surface-2/50 pt-4">
                  {!notification.is_read && (
                    <button 
                      onClick={() => markAsRead(notification.id)}
                      className="text-xs font-medium uppercase tracking-widest text-secondary hover:text-primary transition-colors flex items-center gap-2"
                    >
                      <CheckCircle className="w-4 h-4" /> Mark Read
                    </button>
                  )}
                  {notification.from_email && (
                    <a 
                      href={`mailto:${notification.from_email}?subject=Re: Your Project Request on Galerio`}
                      className="text-xs font-medium uppercase tracking-widest text-accent hover:text-accent/80 transition-colors flex items-center gap-2"
                    >
                      <Mail className="w-4 h-4" /> Reply via Email
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;
