

import React from 'react';
import { useTranslation } from 'react-i18next';
import type { Prediction } from '../types';
import PredictionCard from '../components/PredictionCard';
import { motion } from 'framer-motion';

interface FreeTipsPageProps {
  predictions: Prediction[];
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

const FreeTipsPage: React.FC<FreeTipsPageProps> = ({ predictions }) => {
  const { t } = useTranslation();
  return (
    <div>
      <h2 className="text-2xl font-bold text-green-400 mb-4">{t('allFreeTips')}</h2>
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
        <p className="text-gray-400 text-center mt-8">{t('noFreeTipsLong')}</p>
      )}
    </div>
  );
};

export default FreeTipsPage;
