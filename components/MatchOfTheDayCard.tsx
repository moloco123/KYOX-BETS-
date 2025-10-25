import React from 'react';
import { useTranslation } from 'react-i18next';
import type { Prediction } from '../types';
import { format } from 'date-fns';
import { motion } from 'framer-motion';

interface MatchOfTheDayCardProps {
  prediction: Prediction;
}

const MatchOfTheDayCard: React.FC<MatchOfTheDayCardProps> = ({ prediction }) => {
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
      className="bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-600 p-0.5 rounded-xl shadow-lg"
      whileHover={{ scale: 1.02, boxShadow: '0 0 20px rgba(250, 204, 21, 0.6)' }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
        <div className="bg-gray-800 rounded-lg p-5 flex flex-col justify-between">
            <div>
                <div className="flex justify-between items-start mb-3">
                <span className="text-sm font-semibold uppercase tracking-wider text-gray-400">{league}</span>
                <span className={`text-xs font-bold uppercase px-2 py-0.5 rounded-full ${resultStyles[result]}`}>
                    {getResultText(result)}
                </span>
                </div>
                <h3 className="text-xl font-bold text-white mb-4 text-center">{match_name}</h3>
                <div className="flex justify-around items-center text-lg mb-4 bg-gray-900 p-3 rounded-lg">
                <span className="text-gray-300">{t('cardTip')}: <span className="font-bold text-yellow-300">{tip}</span></span>
                <span className="text-gray-300">{t('cardOdds')}: <span className="font-bold text-yellow-300">{odds}</span></span>
                </div>
            </div>
            <div className="border-t border-gray-700 pt-3 mt-3 flex justify-between items-end text-sm text-gray-400">
                <div>
                  <span>{formattedDate} - {formattedTime}</span>
                </div>
                <span className={`self-center font-bold py-1 px-3 rounded-lg text-xs ${type === 'VIP' ? 'bg-purple-600 text-white' : 'bg-blue-600 text-white'}`}>{type}</span>
            </div>
        </div>
    </motion.div>
  );
};

export default MatchOfTheDayCard;