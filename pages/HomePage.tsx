import React from 'react';
import { useTranslation } from 'react-i18next';
import type { Prediction, User, SiteSettings } from '../types';
import PredictionCard from '../components/PredictionCard';
import MatchOfTheDayCard from '../components/MatchOfTheDayCard';
import { motion } from 'framer-motion';

interface HomePageProps {
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


const HomePage: React.FC<HomePageProps> = ({ predictions, user, siteSettings }) => {
  const { t } = useTranslation();
  
  const pendingPredictions = predictions.filter(p => p.result === 'pending');
  
  const matchOfTheDay = pendingPredictions.find(p => p.type === 'VIP') || pendingPredictions[0] || null;

  const freeTips = pendingPredictions.filter(p => p.type === 'FREE' && p.id !== matchOfTheDay?.id).slice(0, 4);
  const vipTips = pendingPredictions.filter(p => p.type === 'VIP' && p.id !== matchOfTheDay?.id).slice(0, 4);
  const recentResults = predictions.filter(p => p.result !== 'pending').sort((a, b) => new Date(b.kickoff).getTime() - new Date(a.kickoff).getTime()).slice(0, 4);
  const isVip = user && user.status === 'approved';

  return (
    <div className="space-y-8">

      {matchOfTheDay && (
        <motion.section
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
            <h2 className="text-2xl font-bold text-yellow-300 mb-4 animate-pulse text-center tracking-wider">{`⭐ ${t('homeMatchOfTheDay')} ⭐`}</h2>
            <MatchOfTheDayCard prediction={matchOfTheDay} />
        </motion.section>
      )}

      <section>
        <h2 className="text-2xl font-bold text-green-400 mb-4">{t('homeFreeTips')}</h2>
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          variants={listContainerVariants}
          initial="hidden"
          animate="visible"
        >
          {freeTips.length > 0 ? freeTips.map(p => <motion.div key={p.id} variants={listItemVariants}><PredictionCard prediction={p} /></motion.div>) : <p className="text-gray-400">{t('noFreeTips')}</p>}
        </motion.div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-green-400 mb-4">{t('homeVipTips')}</h2>
        {isVip ? (
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            variants={listContainerVariants}
            initial="hidden"
            animate="visible"
          >
            {vipTips.length > 0 ? vipTips.map(p => <motion.div key={p.id} variants={listItemVariants}><PredictionCard prediction={p} /></motion.div>) : <p className="text-gray-400">{t('noVipTips')}</p>}
          </motion.div>
        ) : (
          <div className="bg-gray-800 rounded-xl p-6 text-center border border-purple-500 shadow-lg">
            <i className="fas fa-lock text-4xl text-purple-400 mb-4"></i>
            <h3 className="text-xl font-semibold mb-2">{t('vipAccessRequired')}</h3>
            <p className="text-gray-300 mb-4">{t('vipLoginPrompt')}</p>
            <a 
              href={`https://wa.me/${siteSettings.contactNumber}?text=Hello+Admin,+I+need+VIP+Access`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-green-500 to-blue-600 text-white px-6 py-2 rounded-lg shadow-md hover:opacity-90 inline-block"
            >
              <i className="fab fa-whatsapp mr-2"></i>{t('contactAdmin')}
            </a>
          </div>
        )}
      </section>

      <section>
        <h2 className="text-2xl font-bold text-green-400 mb-4">{t('homeRecentResults')}</h2>
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          variants={listContainerVariants}
          initial="hidden"
          animate="visible"
        >
          {recentResults.length > 0 ? recentResults.map(p => <motion.div key={p.id} variants={listItemVariants}><PredictionCard prediction={p} /></motion.div>) : <p className="text-gray-400">{t('noRecentResults')}</p>}
        </motion.div>
      </section>
    </div>
  );
};

export default HomePage;
