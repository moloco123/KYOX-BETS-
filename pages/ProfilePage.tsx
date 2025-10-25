import React, { useState } from 'react';
import type { User, Page, SiteSettings } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';


interface ProfilePageProps {
  user: User | null;
  onLogout: () => void;
  onLogin: (credentials: { email: string; password?: string }) => { success: boolean, message: string };
  onRegister: (details: Omit<User, 'status' | 'role'> & { adminKey?: string }) => { success: boolean, message: string };
  siteSettings: SiteSettings;
  setCurrentPage: (page: Page) => void;
}

const AuthForm: React.FC<Omit<ProfilePageProps, 'user' | 'onLogout' | 'siteSettings'>> = ({ onLogin, onRegister, setCurrentPage }) => {
  const { t } = useTranslation();
  const [isLoginView, setIsLoginView] = useState(true);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'error' | 'success', message: string } | null>(null);
  
  const formContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
    exit: { opacity: 0, transition: { duration: 0.2 } },
  };

  const formItemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(null);

    if (isLoginView) {
      const result = onLogin({ email, password });
      if (!result.success) {
        setFeedback({ type: 'error', message: result.message });
      }
    } else {
      if (password !== confirmPassword) {
        setFeedback({ type: 'error', message: t('errorPasswordsNoMatch') });
        return;
      }
      if (!fullName || !email || !password) {
        setFeedback({ type: 'error', message: t('errorAllFieldsRequired') });
        return;
      }
      const result = onRegister({ fullName, email, password });
       if (!result.success) {
        setFeedback({ type: 'error', message: result.message });
      }
    }
  };

  return (
    <div className="bg-gray-800 rounded-xl shadow-lg p-6 max-w-md mx-auto border border-gray-700 overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.h2
          key={isLoginView ? 'loginTitle' : 'registerTitle'}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 20, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="text-2xl font-bold text-center text-white mb-6"
        >
          {isLoginView ? t('profileWelcome') : t('profileCreateAccount')}
        </motion.h2>
      </AnimatePresence>
      <form onSubmit={handleSubmit} className="space-y-4">
       <AnimatePresence mode="wait">
        <motion.div
            key={isLoginView ? 'login' : 'register'}
            variants={formContainerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="space-y-4"
        >
          {!isLoginView && (
              <motion.div variants={formItemVariants}>
                  <p className="text-center text-sm text-gray-300 mb-4">{t('profileSignupPrompt')}</p>
              </motion.div>
          )}

          {!isLoginView && (
            <motion.div variants={formItemVariants}>
              <label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="fullName">{t('profileFullName')}</label>
              <input id="fullName" type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} className="w-full bg-gray-700 text-white rounded py-2 px-3 focus:outline-none focus:ring-2 focus:ring-green-500" required />
            </motion.div>
          )}
          
          <motion.div variants={formItemVariants}>
            <label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="email">{t('profileEmail')}</label>
            <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-gray-700 text-white rounded py-2 px-3 focus:outline-none focus:ring-2 focus:ring-green-500" required />
          </motion.div>

          <motion.div variants={formItemVariants}>
            <label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="password">{t('profilePassword')}</label>
            <div className="relative">
              <input id="password" type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-gray-700 text-white rounded py-2 px-3 pr-10 focus:outline-none focus:ring-2 focus:ring-green-500" required />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-400 hover:text-green-400" aria-label={showPassword ? t('profileHidePassword') : t('profileShowPassword')}>
                <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
              </button>
            </div>
          </motion.div>

          {!isLoginView && (
            <motion.div variants={formItemVariants}>
              <label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="confirmPassword">{t('profileConfirmPassword')}</label>
              <div className="relative">
                <input id="confirmPassword" type={showPassword ? 'text' : 'password'} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-full bg-gray-700 text-white rounded py-2 px-3 pr-10 focus:outline-none focus:ring-2 focus:ring-green-500" required />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-400 hover:text-green-400" aria-label={showPassword ? t('profileHidePassword') : t('profileShowPassword')}>
                  <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                </button>
              </div>
            </motion.div>
          )}
          </motion.div>
        </AnimatePresence>

        {feedback && (
          <p className={`text-sm text-center p-2 rounded ${
            feedback.type === 'error' ? 'bg-red-900 text-red-300' : 'bg-green-900 text-green-300'
          }`}>
            {feedback.message}
          </p>
        )}

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-200"
        >
          {isLoginView ? t('profileLogin') : t('profileSignup')}
        </button>
      </form>
      <div className="text-center mt-4">
        <button
          onClick={() => {
            setIsLoginView(!isLoginView);
            setFeedback(null);
          }}
          className="text-sm text-green-400 hover:underline"
        >
          {isLoginView ? t('profileNeedAccount') : t('profileHaveAccount')}
        </button>
        <div className="mt-2">
            <button
                type="button"
                onClick={() => setCurrentPage('admin-register')}
                className="text-[10px] text-gray-600 hover:text-gray-500 transition-colors duration-150"
            >
                {t('profileAdminRegistration')}
            </button>
        </div>
      </div>
    </div>
  );
};


const ProfilePage: React.FC<ProfilePageProps> = ({ user, onLogout, siteSettings, onLogin, onRegister, setCurrentPage }) => {
  const { t } = useTranslation();
  if (!user) {
    return <AuthForm onLogin={onLogin} onRegister={onRegister} setCurrentPage={setCurrentPage} />;
  }

  const { fullName, email, role, status } = user;

  return (
    <div className="bg-gray-800 rounded-xl shadow-lg p-6 space-y-6 max-w-lg mx-auto border border-gray-700">
      <div className="text-center border-b border-gray-700 pb-4">
        <i className="fas fa-user-circle text-6xl text-green-400 mb-2"></i>
        <h2 className="text-2xl font-bold text-white">{fullName}</h2>
        <p className="text-sm text-gray-400">{email}</p>
      </div>
      
      <div className="space-y-3 text-sm">
        <div className="flex justify-between items-center">
          <span className="text-gray-400 font-semibold">{t('profileRole')}:</span>
          <span className="text-white capitalize px-2 py-1 bg-gray-700 rounded-md">{role}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-400 font-semibold">{t('profileVipStatus')}:</span>
          {status === 'approved' ? (
            <span className="text-xs bg-green-500 text-white px-3 py-1 rounded-full font-bold">{t('profileStatusApproved')}</span>
          ) : (
             <span className="text-xs bg-yellow-500 text-black px-3 py-1 rounded-full font-bold">{t('profileStatusPending')}</span>
          )}
        </div>
      </div>
      
      {status !== 'approved' && role !== 'admin' && (
         <div className="bg-gray-900 p-4 rounded-lg text-center">
            <p className="text-gray-300 mb-3">{t('profilePendingPrompt')}</p>
            <a 
              href={`https://wa.me/${siteSettings.contactNumber}?text=Hello+Admin,+please+approve+my+VIP+access.+My+email+is+${email}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-green-500 to-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:opacity-90 inline-flex items-center"
            >
              <i className="fab fa-whatsapp mr-2"></i>{t('contactAdmin')}
            </a>
         </div>
      )}

      <div className="pt-4 border-t border-gray-700">
        <button
          onClick={onLogout}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-colors duration-200"
        >
          {t('profileLogout')}
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;