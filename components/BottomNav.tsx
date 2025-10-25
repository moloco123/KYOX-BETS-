import React from 'react';
import { useTranslation } from 'react-i18next';
import type { Page, User } from '../types';
import { motion, LayoutGroup } from 'framer-motion';

interface BottomNavProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
  user: User | null;
}

const NavItem: React.FC<{
  page: Page;
  icon: string;
  label: string;
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
}> = ({ page, icon, label, currentPage, setCurrentPage }) => {
  const isActive = currentPage === page;
  return (
    <motion.button
      onClick={() => setCurrentPage(page)}
      className={`relative flex flex-col items-center justify-center text-center w-full h-full transition-colors duration-200 ${
        isActive ? 'text-green-400' : 'text-gray-400 hover:text-green-300'
      }`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <i className={`fas ${icon} text-xl`}></i>
      <span className="text-xs mt-1">{label}</span>
      {isActive && (
        <motion.div
          className="absolute bottom-0 h-1 w-8 bg-green-400 rounded-full"
          layoutId="active-nav-indicator"
          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
        />
      )}
    </motion.button>
  );
};

const BottomNav: React.FC<BottomNavProps> = ({ currentPage, setCurrentPage, user }) => {
  const { t } = useTranslation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-gray-800 border-t border-gray-700 shadow-lg z-20">
      <div className="flex justify-around items-center h-16 max-w-2xl mx-auto">
        <LayoutGroup>
          <NavItem page="home" icon="fa-home" label={t('navHome')} currentPage={currentPage} setCurrentPage={setCurrentPage} />
          <NavItem page="free" icon="fa-lightbulb" label={t('navFree')} currentPage={currentPage} setCurrentPage={setCurrentPage} />
          <NavItem page="vip" icon="fa-lock" label={t('navVip')} currentPage={currentPage} setCurrentPage={setCurrentPage} />
          <NavItem page="history" icon="fa-history" label={t('navHistory')} currentPage={currentPage} setCurrentPage={setCurrentPage} />
          <NavItem page="contact" icon="fa-address-book" label={t('navContact')} currentPage={currentPage} setCurrentPage={setCurrentPage} />
          <NavItem page="profile" icon="fa-user" label={t('navProfile')} currentPage={currentPage} setCurrentPage={setCurrentPage} />
          {user && user.role === 'admin' && (
            <NavItem page="admin" icon="fa-user-shield" label={t('navAdmin')} currentPage={currentPage} setCurrentPage={setCurrentPage} />
          )}
        </LayoutGroup>
      </div>
    </nav>
  );
};

export default BottomNav;
