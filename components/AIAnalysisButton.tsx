import React, { useState } from 'react';
import { GoogleGenAI } from '@google/genai';
import { useTranslation } from 'react-i18next';
import type { Prediction } from '../types';
import Modal from './Modal';
import Spinner from './Spinner';

interface AIAnalysisButtonProps {
  prediction: Prediction;
}

const AIAnalysisButton: React.FC<AIAnalysisButtonProps> = ({ prediction }) => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [analysis, setAnalysis] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getAnalysis = async () => {
    if (analysis) {
      setIsModalOpen(true);
      return;
    }

    setLoading(true);
    setIsModalOpen(true);
    setError(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `Provide a brief analysis for the following soccer bet prediction:
      - Match: ${prediction.match_name}
      - League: ${prediction.league}
      - Tip: ${prediction.tip}
      - Odds: ${prediction.odds}
      Focus on team form, head-to-head stats, and key player news that justify this prediction. Keep it concise and easy to understand for a general audience.`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });

      setAnalysis(response.text);
    } catch (err) {
      console.error(err);
      setError(t('aiErrorAnalysis'));
    } finally {
      setLoading(false);
    }
  };


  return (
    <>
      <button
        onClick={getAnalysis}
        className="text-xs text-blue-400 hover:text-blue-300 hover:underline flex items-center gap-1"
        aria-label={`${t('aiAnalysis')} for ${prediction.match_name}`}
      >
        <i className="fas fa-robot"></i>
        {t('aiAnalysis')}
      </button>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={`${t('aiAnalysisFor')} ${prediction.match_name}`}>
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <Spinner />
          </div>
        ) : error ? (
          <p className="text-red-400">{error}</p>
        ) : (
          <div className="text-gray-300 whitespace-pre-wrap max-h-80 overflow-y-auto p-2 bg-gray-900 rounded">
            {analysis}
          </div>
        )}
      </Modal>
    </>
  );
};

export default AIAnalysisButton;
