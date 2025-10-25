import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { User, Page } from '../types';
import { motion } from 'framer-motion';

interface AdminRegistrationPageProps {
  onRegister: (details: Omit<User, 'status' | 'role'> & { adminKey?: string }) => { success: boolean, message: string };
  setCurrentPage: (page: Page) => void;
}

const AdminRegistrationPage: React.FC<AdminRegistrationPageProps> = ({ onRegister, setCurrentPage }) => {
  const { t } = useTranslation();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [adminKey, setAdminKey] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'error' | 'success', message: string } | null>(null);

  const formContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
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

    if (password !== confirmPassword) {
      setFeedback({ type: 'error', message: t('errorPasswordsNoMatch') });
      return;
    }
    if (!fullName || !email || !password || !adminKey) {
      setFeedback({ type: 'error', message: t('errorAllFieldsRequired') });
      return;
    }
   
    const result = onRegister({ fullName, email, password, adminKey });
    if (!result.success) {
      setFeedback({ type: 'error', message: result.message });
    }
    // Success is handled by the onRegister function which changes the page
  };

  return (
    <div className="bg-gray-800 rounded-xl shadow-lg p-6 max-w-md mx-auto border border-yellow-500">
      <h2 className="text-2xl font-bold text-center text-yellow-400 mb-6">{t('adminRegTitle')}</h2>
      <motion.form 
        onSubmit={handleSubmit} 
        className="space-y-4"
        variants={formContainerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={formItemVariants}>
          <label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="fullName">
            {t('profileFullName')}
          </label>
          <input
            id="fullName"
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full bg-gray-700 text-white rounded py-2 px-3 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            required
          />
        </motion.div>
        <motion.div variants={formItemVariants}>
          <label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="email">
            {t('profileEmail')}
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-gray-700 text-white rounded py-2 px-3 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            required
          />
        </motion.div>
        <motion.div variants={formItemVariants}>
          <label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="password">
            {t('profilePassword')}
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-gray-700 text-white rounded py-2 px-3 pr-10 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-400 hover:text-yellow-400"
              aria-label={showPassword ? t('profileHidePassword') : t('profileShowPassword')}
            >
              <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
            </button>
          </div>
        </motion.div>
        <motion.div variants={formItemVariants}>
          <label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="confirmPassword">
            {t('profileConfirmPassword')}
          </label>
          <div className="relative">
            <input
              id="confirmPassword"
              type={showPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full bg-gray-700 text-white rounded py-2 px-3 pr-10 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-400 hover:text-yellow-400"
              aria-label={showPassword ? t('profileHidePassword') : t('profileShowPassword')}
            >
              <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
            </button>
          </div>
        </motion.div>
        <motion.div variants={formItemVariants}>
          <label className="block text-yellow-400 text-sm font-bold mb-2" htmlFor="adminKey">
            {t('adminRegKey')}
          </label>
          <input
            id="adminKey"
            type="password"
            value={adminKey}
            onChange={(e) => setAdminKey(e.target.value)}
            className="w-full bg-gray-700 text-white rounded py-2 px-3 focus:outline-none focus:ring-2 focus:ring-yellow-500 border border-gray-600"
            placeholder={t('adminRegKeyPlaceholder')}
            required
          />
        </motion.div>

        {feedback && (
          <p className={`text-sm text-center p-2 rounded ${
            feedback.type === 'error' ? 'bg-red-900 text-red-300' : 'bg-green-900 text-green-300'
          }`}>
            {feedback.message}
          </p>
        )}

        <motion.div variants={formItemVariants}>
            <button
            type="submit"
            className="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-200"
            >
            {t('adminRegButton')}
            </button>
        </motion.div>
      </motion.form>
      <div className="text-center mt-4">
        <button
          onClick={() => setCurrentPage('profile')}
          className="text-sm text-green-400 hover:underline"
        >
          {t('adminRegBackToUser')}
        </button>
      </div>
    </div>
  );
};

export default AdminRegistrationPage;