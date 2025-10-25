import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import type { SiteSettings, User, Comment } from '../types';

interface ContactPageProps {
  siteSettings: SiteSettings;
  currentUser: User | null;
  onAddComment: (comment: Omit<Comment, 'id' | 'timestamp'>) => void;
}

const ContactIcon: React.FC<{ href: string; icon: string; brandColor: string; label: string;}> = ({ href, icon, brandColor, label }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center text-gray-300 hover:text-white transition-colors group">
    <div className={`w-16 h-16 rounded-full flex items-center justify-center text-3xl transition-all duration-300 group-hover:scale-110`} style={{backgroundColor: brandColor}}>
      <i className={icon}></i>
    </div>
    <span className="mt-2 text-xs">{label}</span>
  </a>
);

const ContactPage: React.FC<ContactPageProps> = ({ siteSettings, currentUser, onAddComment }) => {
  const { t } = useTranslation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [feedback, setFeedback] = useState<string | null>(null);

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.fullName);
      setEmail(currentUser.email);
    }
  }, [currentUser]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      alert("Please fill in all fields.");
      return;
    }
    onAddComment({ name, email, message });
    setFeedback(t('contactFormSuccess'));
    setMessage('');
     if (!currentUser) {
      setName('');
      setEmail('');
    }
    setTimeout(() => setFeedback(null), 5000);
  };

  return (
    <div className="space-y-10">
      <section className="bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-700">
        <h2 className="text-2xl font-bold text-green-400 mb-4 text-center">{t('contactGetInTouch')}</h2>
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-4 text-center">
          <ContactIcon href={`https://wa.me/${siteSettings.contactNumber}`} icon="fab fa-whatsapp" brandColor="#25D366" label={t('contactWhatsApp')} />
          <ContactIcon href={`https://t.me/${siteSettings.telegram}`} icon="fab fa-telegram" brandColor="#0088cc" label={t('contactTelegram')} />
          <ContactIcon href={`mailto:${siteSettings.email}`} icon="fas fa-envelope" brandColor="#D44638" label={t('contactGmail')}/>
          <ContactIcon href={`tel:${siteSettings.contactNumber}`} icon="fas fa-phone" brandColor="#34B7F1" label={t('contactCall')}/>
          <ContactIcon href={`sms:${siteSettings.contactNumber}`} icon="fas fa-comment-sms" brandColor="#4CAF50" label={t('contactSms')} />
        </div>
      </section>
      
      <section className="bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-700">
        <h2 className="text-2xl font-bold text-green-400 mb-4 text-center">{t('contactFollowUs')}</h2>
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-4 text-center">
            <ContactIcon href={siteSettings.youtube} icon="fab fa-youtube" brandColor="#FF0000" label={t('contactYouTube')} />
            <ContactIcon href={siteSettings.instagram} icon="fab fa-instagram" brandColor="#C13584" label={t('contactInstagram')} />
            <ContactIcon href={siteSettings.facebook} icon="fab fa-facebook" brandColor="#1877F2" label={t('contactFacebook')} />
            <ContactIcon href={siteSettings.threads} icon="fab fa-threads" brandColor="#000000" label={t('contactThreads')} />
            <ContactIcon href={siteSettings.tiktok} icon="fab fa-tiktok" brandColor="#000000" label={t('contactTikTok')} />
        </div>
      </section>

      <section className="bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-700">
        <h2 className="text-2xl font-bold text-green-400 mb-4 text-center">{t('contactLeaveComment')}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="name">{t('contactName')}</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-gray-700 text-white rounded py-2 px-3 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50"
              required
              disabled={!!currentUser}
            />
          </div>
          <div>
            <label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="email">{t('contactEmail')}</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-gray-700 text-white rounded py-2 px-3 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50"
              required
              disabled={!!currentUser}
            />
          </div>
          <div>
            <label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="message">{t('contactMessage')}</label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              className="w-full bg-gray-700 text-white rounded py-2 px-3 focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            ></textarea>
          </div>
           {feedback && (
              <p className="text-sm text-center p-2 rounded bg-green-900 text-green-300">
                {feedback}
              </p>
            )}
          <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-200">
            {t('contactSubmitComment')}
          </button>
        </form>
      </section>
    </div>
  );
};

export default ContactPage;