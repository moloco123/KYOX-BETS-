
import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import type { User, Prediction, SiteSettings, Comment } from '../types';
import Modal from '../components/Modal';
import { motion } from 'framer-motion';

interface AdminPageProps {
  currentUser: User;
  allUsers: User[];
  predictions: Prediction[];
  allComments: Comment[];
  siteSettings: SiteSettings;
  onToggleVipStatus: (email: string) => void;
  onUpdatePrediction: (id: number, updates: Partial<Prediction>) => void;
  onPromoteUser: (email: string) => void;
  onDemoteUser: (email: string) => void;
  onAddPrediction: (prediction: Omit<Prediction, 'id'>) => void;
  onDeletePrediction: (id: number) => void;
  onUpdateUser: (email: string, updatedDetails: Partial<User>) => void;
  onDeleteUser: (email: string) => void;
  onUpdateSiteSettings: (settings: SiteSettings) => void;
  onDeleteComment: (id: number) => void;
}

const toDateTimeLocalString = (date: Date): string => {
  if (!date || isNaN(date.getTime())) return '';
  const offset = date.getTimezoneOffset();
  const adjustedDate = new Date(date.getTime() - (offset * 60 * 1000));
  return adjustedDate.toISOString().slice(0, 16);
};

const listContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05
    }
  }
};

const listItemVariants = {
  hidden: { x: -20, opacity: 0 },
  visible: { x: 0, opacity: 1 }
};


const AdminPage: React.FC<AdminPageProps> = (props) => {
  const { t } = useTranslation();
  const { currentUser, allUsers, predictions, allComments, siteSettings, onToggleVipStatus, onUpdatePrediction, onPromoteUser, onDemoteUser, onAddPrediction, onDeletePrediction, onUpdateUser, onDeleteUser, onUpdateSiteSettings, onDeleteComment } = props;

  const [isUserModalOpen, setUserModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [userFormData, setUserFormData] = useState({ fullName: '', email: '' });

  const [isPredictionModalOpen, setPredictionModalOpen] = useState(false);
  const [editingPrediction, setEditingPrediction] = useState<Prediction | null>(null);
  const [predictionFormData, setPredictionFormData] = useState<Omit<Prediction, 'id'>>({
    match_name: '', league: '', tip: '', odds: '', kickoff: '', type: 'FREE', result: 'pending'
  });

  const [settingsFormData, setSettingsFormData] = useState<SiteSettings>(siteSettings);

  useEffect(() => {
    if (editingUser) setUserFormData({ fullName: editingUser.fullName, email: editingUser.email });
  }, [editingUser]);

  useEffect(() => {
    if (editingPrediction) {
      const localKickoff = editingPrediction.kickoff ? toDateTimeLocalString(new Date(editingPrediction.kickoff)) : '';
      setPredictionFormData({ ...editingPrediction, kickoff: localKickoff });
    } else {
      setPredictionFormData({
        match_name: '', league: '', tip: '', odds: '',
        kickoff: toDateTimeLocalString(new Date()),
        type: 'FREE', result: 'pending'
      });
    }
  }, [editingPrediction]);


  const handleOpenUserModal = (user: User) => {
    setEditingUser(user);
    setUserModalOpen(true);
  };

  const handleUserFormChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserFormData({ ...userFormData, [e.target.name]: e.target.value });
  };

  const handleUserFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (editingUser) {
      onUpdateUser(editingUser.email, userFormData);
      setUserModalOpen(false);
      setEditingUser(null);
    }
  };

  const handleDeleteUserClick = (email: string) => {
    if (window.confirm(t('alertConfirmDeleteUser'))) {
      onDeleteUser(email);
    }
  };
  
  const handleDeleteCommentClick = (id: number) => {
    if (window.confirm(t('alertConfirmDeleteComment'))) {
      onDeleteComment(id);
    }
  }

  const handleOpenPredictionModal = (prediction: Prediction | null) => {
    setEditingPrediction(prediction);
    setPredictionModalOpen(true);
  };

  const handlePredictionFormChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setPredictionFormData({ ...predictionFormData, [e.target.name]: e.target.value });
  };

  const handlePredictionFormSubmit = (e: FormEvent) => {
    e.preventDefault();
     if (!predictionFormData.kickoff) {
      alert(t('alertKickoffRequired'));
      return;
    }
    const finalPredictionData = {
      ...predictionFormData,
      kickoff: new Date(predictionFormData.kickoff).toISOString(),
    };

    if (editingPrediction) {
      onUpdatePrediction(editingPrediction.id, finalPredictionData);
    } else {
      onAddPrediction(finalPredictionData);
    }
    setPredictionModalOpen(false);
    setEditingPrediction(null);
  };

  const handleDeletePredictionClick = (id: number) => {
    if (window.confirm(t('alertConfirmDeletePrediction'))) {
      onDeletePrediction(id);
    }
  };

  const handleSettingsChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSettingsFormData({ ...settingsFormData, [e.target.name]: e.target.value });
  };
  
  const handleSettingsSubmit = (e: FormEvent) => {
    e.preventDefault();
    onUpdateSiteSettings(settingsFormData);
    alert(t('alertSettingsSuccess'));
  };


  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-green-400 text-center">{t('adminDashboard')}</h2>

      {/* User Management */}
      <section className="bg-gray-800 rounded-lg shadow-lg p-4">
        <h3 className="text-2xl font-semibold text-gray-200 mb-4 border-b-2 border-gray-700 pb-2">{t('adminUserManagement')}</h3>
        <motion.div
          className="space-y-3 max-h-96 overflow-y-auto"
          variants={listContainerVariants}
          initial="hidden"
          animate="visible"
        >
          {allUsers.map(user => (
            <motion.div key={user.email} variants={listItemVariants}>
              <div className="flex flex-wrap items-center justify-between bg-gray-700 p-3 rounded-md gap-2">
                <div>
                  <p className="font-bold text-white">{user.fullName} <span className="text-xs capitalize font-light bg-gray-600 px-2 py-0.5 rounded-full">{user.role}</span></p>
                  <p className="text-sm text-gray-400">{user.email}</p>
                  <span className={`text-xs font-bold capitalize mt-1 inline-block px-2 py-0.5 rounded-full ${user.status === 'approved' ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'}`}>
                    {user.status === 'approved' ? t('profileStatusApproved') : t('profileStatusPending')}
                  </span>
                </div>
                <div className="flex items-center space-x-2 flex-wrap gap-2">
                  {user.role !== 'admin' && (
                    user.status === 'pending' ? (
                      <button onClick={() => onToggleVipStatus(user.email)} className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-2 rounded text-xs">{t('adminGrantVip')}</button>
                    ) : (
                      <button onClick={() => onToggleVipStatus(user.email)} className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-1 px-2 rounded text-xs">{t('adminRevokeVip')}</button>
                    )
                  )}
                  {user.role === 'user' && <button onClick={() => onPromoteUser(user.email)} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-2 rounded text-xs">{t('adminPromote')}</button>}
                  {user.role === 'admin' && user.email !== currentUser.email && <button onClick={() => onDemoteUser(user.email)} className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-1 px-2 rounded text-xs">{t('adminDemote')}</button>}
                  <button onClick={() => handleOpenUserModal(user)} className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-1 px-2 rounded text-xs"><i className="fas fa-edit"></i></button>
                  {user.email !== currentUser.email && <button onClick={() => handleDeleteUserClick(user.email)} className="bg-red-600 hover:bg-red-700 text-white font-bold py-1 px-2 rounded text-xs"><i className="fas fa-trash"></i></button>}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Prediction Management */}
      <section className="bg-gray-800 rounded-lg shadow-lg p-4">
        <div className="flex justify-between items-center mb-4 border-b-2 border-gray-700 pb-2">
          <h3 className="text-2xl font-semibold text-gray-200">{t('adminPredictionManagement')}</h3>
          <button onClick={() => handleOpenPredictionModal(null)} className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">{t('adminAddNewPrediction')}</button>
        </div>
        <motion.div 
          className="space-y-3 max-h-96 overflow-y-auto"
          variants={listContainerVariants}
          initial="hidden"
          animate="visible"
        >
          {predictions.map(p => (
            <motion.div key={p.id} variants={listItemVariants}>
              <div className="flex flex-wrap items-center justify-between bg-gray-700 p-3 rounded-md gap-2">
                <div>
                  <p className="font-bold text-white">{p.match_name}</p>
                  <p className="text-sm text-gray-400">{p.tip} @ {p.odds}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button onClick={() => handleOpenPredictionModal(p)} className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-1 px-2 rounded text-xs"><i className="fas fa-edit"></i></button>
                  <button onClick={() => handleDeletePredictionClick(p.id)} className="bg-red-600 hover:bg-red-700 text-white font-bold py-1 px-2 rounded text-xs"><i className="fas fa-trash"></i></button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>
      
       {/* User Comments */}
      <section className="bg-gray-800 rounded-lg shadow-lg p-4">
        <h3 className="text-2xl font-semibold text-gray-200 mb-4 border-b-2 border-gray-700 pb-2">{t('adminUserComments')}</h3>
        <motion.div
          className="space-y-3 max-h-96 overflow-y-auto"
          variants={listContainerVariants}
          initial="hidden"
          animate="visible"
        >
          {allComments.length > 0 ? allComments.map(comment => (
            <motion.div key={comment.id} variants={listItemVariants}>
              <div className="bg-gray-700 p-3 rounded-md">
                <div className="flex justify-between items-start">
                    <div>
                      <p className="font-bold text-white">{comment.name} <span className="text-xs text-gray-400">({comment.email})</span></p>
                      <p className="text-sm text-gray-300 mt-1">{comment.message}</p>
                      <p className="text-xs text-gray-500 mt-2">{new Date(comment.timestamp).toLocaleString()}</p>
                    </div>
                    <button onClick={() => handleDeleteCommentClick(comment.id)} className="bg-red-600 hover:bg-red-700 text-white font-bold py-1 px-2 rounded text-xs"><i className="fas fa-trash"></i></button>
                </div>
              </div>
            </motion.div>
          )) : <p className="text-gray-400">{t('adminNoComments')}</p>}
        </motion.div>
      </section>

      {/* Site Settings */}
      <section className="bg-gray-800 rounded-lg shadow-lg p-4">
        <h3 className="text-2xl font-semibold text-gray-200 mb-4 border-b-2 border-gray-700 pb-2">{t('adminSiteSettings')}</h3>
        <form onSubmit={handleSettingsSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <div><label className="block text-gray-400 text-sm font-bold mb-1">{t('adminSettingsSiteName')}</label><input type="text" name="siteName" value={settingsFormData.siteName} onChange={handleSettingsChange} className="w-full bg-gray-700 text-white rounded py-2 px-3" /></div>
             <div><label className="block text-gray-400 text-sm font-bold mb-1">{t('adminSettingsAdminKey')}</label><input type="text" name="adminKey" value={settingsFormData.adminKey} onChange={handleSettingsChange} className="w-full bg-gray-700 text-white rounded py-2 px-3" /></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <div><label className="block text-gray-400 text-sm font-bold mb-1">{t('adminSettingsSplashTitle')}</label><input type="text" name="splashTitle" placeholder="Defaults to Site Name" value={settingsFormData.splashTitle || ''} onChange={handleSettingsChange} className="w-full bg-gray-700 text-white rounded py-2 px-3" /></div>
             <div><label className="block text-gray-400 text-sm font-bold mb-1">{t('adminSettingsSplashSubtitle')}</label><input type="text" name="splashSubtitle" placeholder="e.g. Welcome" value={settingsFormData.splashSubtitle || ''} onChange={handleSettingsChange} className="w-full bg-gray-700 text-white rounded py-2 px-3" /></div>
          </div>
          <div><label className="block text-gray-400 text-sm font-bold mb-1">{t('adminSettingsSplashLogo')}</label><input type="text" name="splashLogoUrl" placeholder="Image URL (e.g., https://...)" value={settingsFormData.splashLogoUrl || ''} onChange={handleSettingsChange} className="w-full bg-gray-700 text-white rounded py-2 px-3" /></div>

          <div><label className="block text-gray-400 text-sm font-bold mb-1">{t('adminSettingsContactNumber')}</label><input type="text" name="contactNumber" value={settingsFormData.contactNumber} onChange={handleSettingsChange} className="w-full bg-gray-700 text-white rounded py-2 px-3" /></div>
          <div><label className="block text-gray-400 text-sm font-bold mb-1">{t('adminSettingsContactEmail')}</label><input type="email" name="email" value={settingsFormData.email} onChange={handleSettingsChange} className="w-full bg-gray-700 text-white rounded py-2 px-3" /></div>
          <div><label className="block text-gray-400 text-sm font-bold mb-1">{t('adminSettingsTelegram')}</label><input type="text" name="telegram" placeholder="username (without @)" value={settingsFormData.telegram} onChange={handleSettingsChange} className="w-full bg-gray-700 text-white rounded py-2 px-3" /></div>
          
          <h4 className="text-lg font-semibold text-gray-300 pt-2 border-t border-gray-700">{t('adminSettingsSocials')}</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><label className="block text-gray-400 text-sm font-bold mb-1">{t('adminSettingsYouTube')}</label><input type="url" name="youtube" value={settingsFormData.youtube} onChange={handleSettingsChange} className="w-full bg-gray-700 text-white rounded py-2 px-3" /></div>
            <div><label className="block text-gray-400 text-sm font-bold mb-1">{t('adminSettingsInstagram')}</label><input type="url" name="instagram" value={settingsFormData.instagram} onChange={handleSettingsChange} className="w-full bg-gray-700 text-white rounded py-2 px-3" /></div>
            <div><label className="block text-gray-400 text-sm font-bold mb-1">{t('adminSettingsFacebook')}</label><input type="url" name="facebook" value={settingsFormData.facebook} onChange={handleSettingsChange} className="w-full bg-gray-700 text-white rounded py-2 px-3" /></div>
            <div><label className="block text-gray-400 text-sm font-bold mb-1">{t('adminSettingsThreads')}</label><input type="url" name="threads" value={settingsFormData.threads} onChange={handleSettingsChange} className="w-full bg-gray-700 text-white rounded py-2 px-3" /></div>
            <div><label className="block text-gray-400 text-sm font-bold mb-1">{t('adminSettingsTikTok')}</label><input type="url" name="tiktok" value={settingsFormData.tiktok} onChange={handleSettingsChange} className="w-full bg-gray-700 text-white rounded py-2 px-3" /></div>
          </div>

          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">{t('adminSettingsSave')}</button>
        </form>
      </section>

      {/* User Edit Modal */}
      <Modal isOpen={isUserModalOpen} onClose={() => setUserModalOpen(false)} title={t('adminModalEditUser')}>
        <form onSubmit={handleUserFormSubmit} className="space-y-4">
          <div><label className="block text-gray-400">{t('profileFullName')}</label><input type="text" name="fullName" value={userFormData.fullName} onChange={handleUserFormChange} className="w-full bg-gray-700 text-white rounded py-2 px-3" /></div>
          <div><label className="block text-gray-400">{t('profileEmail')}</label><input type="email" name="email" value={userFormData.email} onChange={handleUserFormChange} className="w-full bg-gray-700 text-white rounded py-2 px-3" /></div>
          <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">{t('saveChanges')}</button>
        </form>
      </Modal>

      {/* Prediction Edit/Add Modal */}
      <Modal isOpen={isPredictionModalOpen} onClose={() => setPredictionModalOpen(false)} title={editingPrediction ? t('adminModalEditPrediction') : t('adminModalAddPrediction')}>
        <form onSubmit={handlePredictionFormSubmit} className="space-y-4">
          <div><label className="block text-gray-400">{t('adminPredictionMatchName')}</label><input type="text" name="match_name" value={predictionFormData.match_name} onChange={handlePredictionFormChange} className="w-full bg-gray-700 text-white rounded py-2 px-3" required /></div>
          <div><label className="block text-gray-400">{t('adminPredictionLeague')}</label><input type="text" name="league" value={predictionFormData.league} onChange={handlePredictionFormChange} className="w-full bg-gray-700 text-white rounded py-2 px-3" required /></div>
          <div><label className="block text-gray-400">{t('adminPredictionTip')}</label><input type="text" name="tip" value={predictionFormData.tip} onChange={handlePredictionFormChange} className="w-full bg-gray-700 text-white rounded py-2 px-3" required /></div>
          <div><label className="block text-gray-400">{t('adminPredictionOdds')}</label><input type="text" name="odds" value={predictionFormData.odds} onChange={handlePredictionFormChange} className="w-full bg-gray-700 text-white rounded py-2 px-3" required /></div>
          <div><label className="block text-gray-400">{t('adminPredictionKickoff')}</label><input type="datetime-local" name="kickoff" value={predictionFormData.kickoff} onChange={handlePredictionFormChange} className="w-full bg-gray-700 text-white rounded py-2 px-3" required /></div>
          <div><label className="block text-gray-400">{t('adminPredictionType')}</label><select name="type" value={predictionFormData.type} onChange={handlePredictionFormChange} className="w-full bg-gray-700 text-white rounded py-2 px-3"><option value="FREE">FREE</option><option value="VIP">VIP</option></select></div>
          <div><label className="block text-gray-400">{t('adminPredictionResult')}</label><select name="result" value={predictionFormData.result} onChange={handlePredictionFormChange} className="w-full bg-gray-700 text-white rounded py-2 px-3"><option value="pending">{t('adminPredictionResultPending')}</option><option value="WIN">{t('resultWin')}</option><option value="LOSS">{t('resultLoss')}</option></select></div>
          <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            {editingPrediction ? t('adminPredictionUpdate') : t('adminPredictionCreate')}
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default AdminPage;
