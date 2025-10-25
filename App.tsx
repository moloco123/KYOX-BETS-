import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import type { Prediction, Page, User, SiteSettings, Comment } from './types';
import { fetchPredictions } from './services/geminiService';
import { motion, AnimatePresence } from 'framer-motion';

import Header from './components/Header';
import BottomNav from './components/BottomNav';
import Spinner from './components/Spinner';

import HomePage from './pages/HomePage';
import FreeTipsPage from './pages/FreeTipsPage';
import VipTipsPage from './pages/VipTipsPage';
import HistoryPage from './pages/HistoryPage';
import ProfilePage from './pages/ProfilePage';
import AdminPage from './pages/AdminPage';
import AdminRegistrationPage from './pages/AdminRegistrationPage';
import ContactPage from './pages/ContactPage';

const App: React.FC = () => {
  const { t } = useTranslation();
  const [predictions, setPredictions] = useState<Prediction[]>(() => {
     try {
      const savedPredictions = localStorage.getItem('predictions');
      return savedPredictions ? JSON.parse(savedPredictions) : [];
    } catch (e) {
      return [];
    }
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<Page>('home');

  const [siteSettings, setSiteSettings] = useState<SiteSettings>(() => {
    try {
      const saved = localStorage.getItem('siteSettings');
      const defaults = {
        siteName: "GEMINI BETS",
        contactNumber: "1234567890",
        adminKey: "GEMINI_ADMIN_2024",
        email: "admin@geminibets.com",
        telegram: "#",
        youtube: "#",
        instagram: "#",
        facebook: "#",
        threads: "#",
        tiktok: "#",
      };
      return saved ? { ...defaults, ...JSON.parse(saved) } : defaults;
    } catch (e) {
      return {
        siteName: "GEMINI BETS",
        contactNumber: "1234567890",
        adminKey: "GEMINI_ADMIN_2024",
        email: "admin@geminibets.com",
        telegram: "#",
        youtube: "#",
        instagram: "#",
        facebook: "#",
        threads: "#",
        tiktok: "#",
      };
    }
  });

  const [allUsers, setAllUsers] = useState<User[]>(() => {
    try {
      const users = localStorage.getItem('allUsers');
      return users ? JSON.parse(users) : [];
    } catch (e) {
      return [];
    }
  });

  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    try {
      const user = localStorage.getItem('currentUser');
      return user ? JSON.parse(user) : null;
    } catch (e) {
      return null;
    }
  });
  
  const [allComments, setAllComments] = useState<Comment[]>(() => {
    try {
      const comments = localStorage.getItem('allComments');
      return comments ? JSON.parse(comments) : [];
    } catch (e) {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('allUsers', JSON.stringify(allUsers));
  }, [allUsers]);

  useEffect(() => {
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('siteSettings', JSON.stringify(siteSettings));
  }, [siteSettings]);
  
   useEffect(() => {
    localStorage.setItem('predictions', JSON.stringify(predictions));
  }, [predictions]);
  
  useEffect(() => {
    localStorage.setItem('allComments', JSON.stringify(allComments));
  }, [allComments]);


  useEffect(() => {
    const loadPredictions = async () => {
      // Only fetch from API if there are no predictions in local storage
      if (predictions.length > 0) {
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const data = await fetchPredictions();
        setPredictions(data);
        setError(null);
      } catch (err) {
        setError(t('errorFailedPredictions'));
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadPredictions();
  }, []);

  const handleRegister = (details: Omit<User, 'status' | 'role'> & { adminKey?: string }) => {
    if (allUsers.find(u => u.email === details.email)) {
      return { success: false, message: t('errorEmailExists') };
    }

    if (details.adminKey !== undefined) {
      if (details.adminKey === siteSettings.adminKey) {
        const newUser: User = { ...details, role: 'admin', status: 'approved' };
        setAllUsers(prev => [...prev, newUser]);
        setCurrentUser(newUser);
        setCurrentPage('home');
        return { success: true, message: 'Admin registration successful! Welcome.' };
      } else {
        return { success: false, message: t('errorInvalidAdminKey') };
      }
    }

    const newUser: User = { ...details, role: 'user', status: 'pending' };
    setAllUsers(prev => [...prev, newUser]);
    setCurrentUser(newUser);
    setCurrentPage('home');
    return { success: true, message: 'Registration successful! Welcome.' };
  };

  const handleLogin = (credentials: { email: string; password?: string }) => {
    const user = allUsers.find(u => u.email === credentials.email);
    if (user && user.password === credentials.password) {
      setCurrentUser(user);
      setCurrentPage('home');
      return { success: true, message: 'Login successful!' };
    }
    return { success: false, message: t('errorInvalidCredentials') };
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentPage('home');
  };

  const handleToggleVipStatus = (email: string) => {
    setAllUsers(prev => prev.map(u => {
      if (u.email === email && u.role !== 'admin') {
        const newStatus = u.status === 'approved' ? 'pending' : 'approved';
        return { ...u, status: newStatus };
      }
      return u;
    }));
    if (currentUser?.email === email && currentUser.role !== 'admin') {
      setCurrentUser(prev => {
        if (!prev) return null;
        const newStatus = prev.status === 'approved' ? 'pending' : 'approved';
        return { ...prev, status: newStatus };
      });
    }
  };
  
  const handleUpdateUser = (email: string, updatedDetails: Partial<User>) => {
    setAllUsers(prev => prev.map(u => u.email === email ? { ...u, ...updatedDetails } : u));
    if (currentUser?.email === email) {
      setCurrentUser(prev => prev ? { ...prev, ...updatedDetails } : null);
    }
  };

  const handleDeleteUser = (email: string) => {
    if (currentUser?.email === email) {
      alert(t('alertCantDeleteSelf'));
      return;
    }
    setAllUsers(prev => prev.filter(u => u.email !== email));
  };

  const handlePromoteUser = (email: string) => setAllUsers(prev => prev.map(u => u.email === email ? { ...u, role: 'admin' } : u));
  const handleDemoteUser = (email: string) => setAllUsers(prev => prev.map(u => u.email === email ? { ...u, role: 'user' } : u));

  const handleUpdatePrediction = (id: number, updates: Partial<Prediction>) => setPredictions(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
  const handleDeletePrediction = (id: number) => setPredictions(prev => prev.filter(p => p.id !== id));
  const handleAddPrediction = (predictionData: Omit<Prediction, 'id'>) => {
    const newId = predictions.length > 0 ? Math.max(...predictions.map(p => p.id)) + 1 : 1;
    const newPrediction: Prediction = { id: newId, ...predictionData as any };
    setPredictions(prev => [newPrediction, ...prev]);
  };
  
  const handleUpdateSiteSettings = (settings: SiteSettings) => setSiteSettings(settings);

  const handleAddComment = (comment: Omit<Comment, 'id' | 'timestamp'>) => {
    const newId = allComments.length > 0 ? Math.max(...allComments.map(c => c.id)) + 1 : 1;
    const newComment: Comment = {
      id: newId,
      ...comment,
      timestamp: new Date().toISOString()
    };
    setAllComments(prev => [newComment, ...prev]);
  };
  
  const handleDeleteComment = (id: number) => {
    setAllComments(prev => prev.filter(c => c.id !== id));
  };


  const renderContent = () => {
    if (loading && currentPage !== 'profile') return <div className="flex justify-center items-center h-64"><Spinner /></div>;
    if (error) return <div className="text-center text-red-400 p-8 bg-gray-800 rounded-lg">{error}</div>;

    switch (currentPage) {
      case 'home': return <HomePage predictions={predictions} user={currentUser} siteSettings={siteSettings} />;
      case 'free': return <FreeTipsPage predictions={predictions.filter(p => p.type === 'FREE')} />;
      case 'vip': return <VipTipsPage predictions={predictions.filter(p => p.type === 'VIP')} user={currentUser} siteSettings={siteSettings} />;
      case 'history': return <HistoryPage predictions={predictions.filter(p => p.result !== 'pending')} />;
      case 'profile':
        return <ProfilePage user={currentUser} onLogin={handleLogin} onRegister={handleRegister} onLogout={handleLogout} siteSettings={siteSettings} setCurrentPage={setCurrentPage} />;
      case 'contact':
        return <ContactPage siteSettings={siteSettings} currentUser={currentUser} onAddComment={handleAddComment} />;
      case 'admin':
        return currentUser?.role === 'admin' ? (
          <AdminPage
            currentUser={currentUser}
            allUsers={allUsers}
            predictions={predictions}
            allComments={allComments}
            siteSettings={siteSettings}
            onToggleVipStatus={handleToggleVipStatus}
            onUpdatePrediction={handleUpdatePrediction}
            onPromoteUser={handlePromoteUser}
            onDemoteUser={handleDemoteUser}
            onAddPrediction={handleAddPrediction}
            onDeletePrediction={handleDeletePrediction}
            onUpdateUser={handleUpdateUser}
            onDeleteUser={handleDeleteUser}
            onUpdateSiteSettings={handleUpdateSiteSettings}
            onDeleteComment={handleDeleteComment}
          />
        ) : <p className="text-center text-red-400">{t('errorAccessDenied')}</p>;
      case 'admin-register': return <AdminRegistrationPage onRegister={handleRegister} setCurrentPage={setCurrentPage} />;
      default: return <HomePage predictions={predictions} user={currentUser} siteSettings={siteSettings} />;
    }
  };
  
  const pageVariants = {
    initial: { opacity: 0, x: -20 },
    in: { opacity: 1, x: 0 },
    out: { opacity: 0, x: 20 },
  };

  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.4
  };

  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen font-sans pb-20">
      <Header siteName={siteSettings.siteName} />
      <main className="container mx-auto p-4 max-w-2xl overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>
      <BottomNav currentPage={currentPage} setCurrentPage={setCurrentPage} user={currentUser} />
    </div>
  );
};

export default App;
