import React from 'react';
import { useTranslation } from 'react-i18next';
import type { Prediction } from '../types';
import { format } from 'date-fns';
import { motion } from 'framer-motion';

interface PredictionCardProps {
  prediction: Prediction;
}

const PredictionCard: React.FC<PredictionCardProps> = ({ prediction }) => {
  const { t } = useTranslation();

  const { match_name, league, tip, odds, kickoff, type, result } = prediction;

  const resultStyles = {
    WIN: 'bg-green-500 text-white',
    LOSS: 'bg-red-500 text-white',
    pending: 'bg-gray-600 text-gray-300',
  };

  const getResultText = (resultStatus: 'pending' | 'WIN' | 'LOSS') => {
    switch(resultStatus) {
      case 'WIN': return t('resultWin');
      case 'LOSS': return t('resultLoss');
      case 'pending': return t('resultPending');
      default: return '';
    }
  }

  const formattedDate = kickoff ? format(new Date(kickoff), 'MMM dd, yyyy') : 'N/A';
  const formattedTime = kickoff ? format(new Date(kickoff), 'HH:mm') : 'N/A';

  return (
    <motion.div 
      className="bg-gray-800 rounded-lg shadow-lg p-4 flex flex-col justify-between border-l-4 border-green-500 hover:border-green-400 transition-colors h-full"
      whileHover={{ scale: 1.03, y: -5, boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.2), 0 4px 6px -2px rgba(0, 0, 0, 0.1)' }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <div>
        <div className="flex justify-between items-start mb-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">{league}</span>
          <span className={`text-xs font-bold uppercase px-2 py-0.5 rounded-full ${resultStyles[result]}`}>
            {getResultText(result)}
          </span>
        </div>
        <h3 className="text-lg font-bold text-white mb-2">{match_name}</h3>
        <div className="flex justify-between items-center text-sm mb-3">
          <span className="text-gray-300">{t('cardTip')}: <span className="font-bold text-green-400">{tip}</span></span>
          <span className="text-gray-300">{t('cardOdds')}: <span className="font-bold text-green-400">{odds}</span></span>
        </div>
      </div>
      <div className="border-t border-gray-700 pt-3 mt-3 flex justify-between items-center text-xs text-gray-400">
        <span>{formattedDate} - {formattedTime}</span>
        <span className={`font-bold py-1 px-2 rounded ${type === 'VIP' ? 'bg-purple-600 text-white' : 'bg-blue-600 text-white'}`}>{type}</span>
      </div>
    </motion.div>
  );
};

export default PredictionCard;
