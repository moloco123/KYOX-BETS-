import React from 'react';
import { useTranslation } from 'react-i18next';
import type { Prediction, User, SiteSettings } from '../types';
import PredictionCard from '../components/PredictionCard';
import { motion } from 'framer-motion';

interface VipTipsPageProps {
  predictions: Prediction[];
  user: User | null;
  siteSettings: SiteSettings;
}

const listContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const listItemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 }
};


const VipTipsPage: React.FC<VipTipsPageProps> = ({ predictions, user, siteSettings }) => {
  const { t } = useTranslation();
  const isVip = user && user.status === 'approved';

  if (!isVip) {
    return (
       <div className="bg-gray-800 rounded-xl p-8 text-center border border-purple-500 shadow-lg mt-10 max-w-md mx-auto">
        <i className="fas fa-lock text-5xl text-purple-400 mb-4"></i>
        <h3 className="text-2xl font-bold mb-2 text-white">{t('vipAccessRequiredTitle')}</h3>
        <p className="text-gray-300 mb-6">{t('vipAccessRequiredPrompt')}</p>
        <a 
          href={`https://wa.me/${siteSettings.contactNumber}?text=Hello+Admin,+I+need+VIP+Access`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-gradient-to-r from-green-500 to-blue-600 text-white font-bold px-8 py-3 rounded-lg shadow-md hover:opacity-90 inline-flex items-center"
        >
          <i className="fab fa-whatsapp text-xl mr-3"></i>{t('contactAdmin')}
        </a>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-green-400 mb-4">{t('homeVipTips')}</h2>
       {predictions.length > 0 ? (
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          variants={listContainerVariants}
          initial="hidden"
          animate="visible"
        >
          {predictions.map(p => (
            <motion.div key={p.id} variants={listItemVariants}>
              <PredictionCard prediction={p} />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <p className="text-gray-400 text-center mt-8">{t('noVipTips')}</p>
      )}
    </div>
  );
};

export default VipTipsPage;
