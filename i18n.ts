import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: false,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: {
      en: {
        translation: {
          // General
          saveChanges: 'Save Changes',
          contactAdmin: 'Contact Admin',
          
          // Nav
          navHome: 'Home',
          navFree: 'Free',
          navVip: 'VIP',
          navHistory: 'History',
          navContact: 'Contact',
          navProfile: 'Profile',
          navAdmin: 'Admin',
          
          // Errors & Alerts
          errorFailedPredictions: 'Failed to load predictions. Please try again later.',
          errorEmailExists: 'An account with this email already exists.',
          errorInvalidAdminKey: 'The admin key is incorrect.',
          errorInvalidCredentials: 'Invalid email or password.',
          alertCantDeleteSelf: 'You cannot delete your own account.',
          errorPasswordsNoMatch: "Passwords do not match.",
          errorAllFieldsRequired: "All fields are required.",
          errorAccessDenied: "Access Denied. You must be an admin to view this page.",
          alertConfirmDeleteUser: "Are you sure you want to delete this user?",
          alertConfirmDeleteComment: "Are you sure you want to delete this comment?",
          alertKickoffRequired: "Kickoff date and time are required.",
          alertConfirmDeletePrediction: "Are you sure you want to delete this prediction?",
          alertSettingsSuccess: "Site settings updated successfully!",

          // Home Page
          homeMatchOfTheDay: 'Match of the Day',
          homeFreeTips: 'Latest Free Tips',
          noFreeTips: 'No free tips available right now.',
          homeVipTips: 'Latest VIP Tips',
          noVipTips: 'No VIP tips available right now.',
          vipAccessRequired: 'VIP Access Required',
          vipLoginPrompt: 'Login and get your account approved by the admin to see VIP tips.',
          homeRecentResults: 'Recent Results',
          noRecentResults: 'No recent results to show.',
          
          // Free Tips Page
          allFreeTips: 'All Free Tips',
          noFreeTipsLong: 'There are no free tips available at the moment. Please check back later.',
          
          // VIP Tips Page
          vipAccessRequiredTitle: 'VIP Access Required',
          vipAccessRequiredPrompt: 'Your account must be approved by an admin to view these exclusive tips. Please contact us to get started.',

          // History Page
          historyTitle: 'Prediction History',
          noHistory: 'There is no prediction history yet.',

          // Profile & Auth
          profileWelcome: 'Welcome Back!',
          profileCreateAccount: 'Create Your Account',
          profileSignupPrompt: 'Sign up to get access to free tips and request VIP access.',
          profileFullName: 'Full Name',
          profileEmail: 'Email Address',
          profilePassword: 'Password',
          profileHidePassword: 'Hide password',
          profileShowPassword: 'Show password',
          profileConfirmPassword: 'Confirm Password',
          profileLogin: 'Login',
          profileSignup: 'Sign Up',
          profileNeedAccount: "Don't have an account? Sign Up",
          profileHaveAccount: 'Already have an account? Login',
          profileAdminRegistration: 'Admin Registration',
          profileRole: 'Role',
          profileVipStatus: 'VIP Status',
          profileStatusApproved: 'Approved',
          profileStatusPending: 'Pending Approval',
          profilePendingPrompt: 'Your account is pending approval for VIP access.',
          profileLogout: 'Logout',

          // Admin Registration
          adminRegTitle: 'Admin Registration',
          adminRegKey: 'Admin Key',
          adminRegKeyPlaceholder: 'Enter the secret admin key',
          adminRegButton: 'Register as Admin',
          adminRegBackToUser: 'Back to User Login/Signup',
          
          // Admin Page
          adminDashboard: 'Admin Dashboard',
          adminUserManagement: 'User Management',
          adminGrantVip: 'Grant VIP',
          adminRevokeVip: 'Revoke VIP',
          adminPromote: 'Promote to Admin',
          adminDemote: 'Demote to User',
          adminPredictionManagement: 'Prediction Management',
          adminAddNewPrediction: 'Add New Prediction',
          adminUserComments: 'User Comments',
          adminNoComments: 'No user comments yet.',
          adminSiteSettings: 'Site Settings',
          adminSettingsSiteName: 'Site Name',
          adminSettingsContactNumber: 'Contact Number (WhatsApp)',
          adminSettingsContactEmail: 'Contact Email',
          adminSettingsTelegram: 'Telegram Username',
          adminSettingsAdminKey: 'Admin Registration Key',
          adminSettingsSocials: 'Social Media Links',
          adminSettingsYouTube: 'YouTube URL',
          adminSettingsInstagram: 'Instagram URL',
          adminSettingsFacebook: 'Facebook URL',
          adminSettingsThreads: 'Threads URL',
          adminSettingsTikTok: 'TikTok URL',
          adminSettingsSave: 'Save Settings',
          adminModalEditUser: 'Edit User',
          adminModalEditPrediction: 'Edit Prediction',
          adminModalAddPrediction: 'Add New Prediction',
          adminPredictionMatchName: 'Match Name (e.g., Team A vs Team B)',
          adminPredictionLeague: 'League',
          adminPredictionTip: 'Tip',
          adminPredictionOdds: 'Odds',
          adminPredictionKickoff: 'Kickoff Time',
          adminPredictionType: 'Type',
          adminPredictionResult: 'Result',
          adminPredictionResultPending: 'Pending',
          adminPredictionUpdate: 'Update Prediction',
          adminPredictionCreate: 'Create Prediction',

          // Contact Page
          contactGetInTouch: 'Get In Touch',
          contactWhatsApp: 'WhatsApp',
          contactTelegram: 'Telegram',
          contactGmail: 'Gmail',
          contactCall: 'Call',
          contactSms: 'SMS',
          contactFollowUs: 'Follow Us',
          contactYouTube: 'YouTube',
          contactInstagram: 'Instagram',
          contactFacebook: 'Facebook',
          contactThreads: 'Threads',
          contactTikTok: 'TikTok',
          contactLeaveComment: 'Leave a Comment',
          contactFormSuccess: 'Thank you for your comment!',
          contactName: 'Your Name',
          contactEmail: 'Your Email',
          contactMessage: 'Your Message',
          contactSubmitComment: 'Submit Comment',
          
          // Prediction Card
          cardTip: 'Tip',
          cardOdds: 'Odds',
          resultWin: 'WIN',
          resultLoss: 'LOSS',
          resultPending: 'PENDING',
          
          // Modal
          modalClose: 'Close',
        }
      },
      sw: {
        translation: {
          // General
          saveChanges: 'Hifadhi Mabadiliko',
          contactAdmin: 'Wasiliana na Msimamizi',
          
          // Nav
          navHome: 'Nyumbani',
          navFree: 'Bure',
          navVip: 'VIP',
          navHistory: 'Historia',
          navContact: 'Mawasiliano',
          navProfile: 'Wasifu',
          navAdmin: 'Msimamizi',
          
          // Errors & Alerts
          errorFailedPredictions: 'Imeshindwa kupakia dondoo. Tafadhali jaribu tena baadaye.',
          errorEmailExists: 'Akaunti yenye barua pepe hii tayari ipo.',
          errorInvalidAdminKey: 'Nenosiri la msimamizi si sahihi.',
          errorInvalidCredentials: 'Barua pepe au nenosiri si sahihi.',
          alertCantDeleteSelf: 'Huwezi kufuta akaunti yako mwenyewe.',
          errorPasswordsNoMatch: "Nenosiri halifanani.",
          errorAllFieldsRequired: "Sehemu zote zinahitajika.",
          errorAccessDenied: "Ufikiaji umekataliwa. Lazima uwe msimamizi ili kuona ukurasa huu.",
          alertConfirmDeleteUser: "Una uhakika unataka kumfuta mtumiaji huyu?",
          alertConfirmDeleteComment: "Una uhakika unataka kufuta maoni haya?",
          alertKickoffRequired: "Tarehe na saa ya kuanza mechi inahitajika.",
          alertConfirmDeletePrediction: "Una uhakika unataka kufuta dondoo hii?",
          alertSettingsSuccess: "Mipangilio ya tovuti imesasishwa kikamilifu!",
          
          // Home Page
          homeMatchOfTheDay: 'Mechi ya Siku',
          homeFreeTips: 'Dondoo za Bure za Hivi Punde',
          noFreeTips: 'Hakuna dondoo za bure kwa sasa.',
          homeVipTips: 'Dondoo za VIP za Hivi Punde',
          noVipTips: 'Hakuna dondoo za VIP kwa sasa.',
          vipAccessRequired: 'Ufikiaji wa VIP Unahitajika',
          vipLoginPrompt: 'Ingia na upate akaunti yako idhinishwe na msimamizi ili kuona dondoo za VIP.',
          homeRecentResults: 'Matokeo ya Hivi Karibuni',
          noRecentResults: 'Hakuna matokeo ya hivi karibuni ya kuonyesha.',
          
          // Free Tips Page
          allFreeTips: 'Dondoo Zote za Bure',
          noFreeTipsLong: 'Hakuna dondoo za bure zinazopatikana kwa sasa. Tafadhali angalia tena baadaye.',
          
          // VIP Tips Page
          vipAccessRequiredTitle: 'Ufikiaji wa VIP Unahitajika',
          vipAccessRequiredPrompt: 'Akaunti yako lazima iidhinishwe na msimamizi ili kuona dondoo hizi za kipekee. Tafadhali wasiliana nasi ili kuanza.',

          // History Page
          historyTitle: 'Historia ya Dondoo',
          noHistory: 'Hakuna historia ya dondoo bado.',

          // Profile & Auth
          profileWelcome: 'Karibu Tena!',
          profileCreateAccount: 'Fungua Akaunti Yako',
          profileSignupPrompt: 'Jisajili ili kupata dondoo za bure na kuomba ufikiaji wa VIP.',
          profileFullName: 'Jina Kamili',
          profileEmail: 'Anwani ya Barua Pepe',
          profilePassword: 'Nenosiri',
          profileHidePassword: 'Ficha nenosiri',
          profileShowPassword: 'Onyesha nenosiri',
          profileConfirmPassword: 'Thibitisha Nenosiri',
          profileLogin: 'Ingia',
          profileSignup: 'Jisajili',
          profileNeedAccount: "Huna akaunti? Jisajili",
          profileHaveAccount: 'Tayari una akaunti? Ingia',
          profileAdminRegistration: 'Usajili wa Msimamizi',
          profileRole: 'Jukumu',
          profileVipStatus: 'Hali ya VIP',
          profileStatusApproved: 'Imeidhinishwa',
          profileStatusPending: 'Inasubiri Idhini',
          profilePendingPrompt: 'Akaunti yako inasubiri idhini ya ufikiaji wa VIP.',
          profileLogout: 'Toka',

          // Admin Registration
          adminRegTitle: 'Usajili wa Msimamizi',
          adminRegKey: 'Nenosiri la Msimamizi',
          adminRegKeyPlaceholder: 'Weka nenosiri la siri la msimamizi',
          adminRegButton: 'Jisajili kama Msimamizi',
          adminRegBackToUser: 'Rudi kwenye Kuingia/Kujisajili kwa Mtumiaji',
          
          // Admin Page
          adminDashboard: 'Dashibodi ya Msimamizi',
          adminUserManagement: 'Usimamizi wa Watumiaji',
          adminGrantVip: 'Kubali VIP',
          adminRevokeVip: 'Futa VIP',
          adminPromote: 'Pandisha kuwa Msimamizi',
          adminDemote: 'Shusha kuwa Mtumiaji',
          adminPredictionManagement: 'Usimamizi wa Dondoo',
          adminAddNewPrediction: 'Ongeza Dondoo Mpya',
          adminUserComments: 'Maoni ya Watumiaji',
          adminNoComments: 'Hakuna maoni ya watumiaji bado.',
          adminSiteSettings: 'Mipangilio ya Tovuti',
          adminSettingsSiteName: 'Jina la Tovuti',
          adminSettingsContactNumber: 'Namba ya Mawasiliano (WhatsApp)',
          adminSettingsContactEmail: 'Barua Pepe ya Mawasiliano',
          adminSettingsTelegram: 'Jina la Mtumiaji la Telegram',
          adminSettingsAdminKey: 'Nenosiri la Usajili wa Msimamizi',
          adminSettingsSocials: 'Viungo vya Mitandao ya Kijamii',
          adminSettingsYouTube: 'URL ya YouTube',
          adminSettingsInstagram: 'URL ya Instagram',
          adminSettingsFacebook: 'URL ya Facebook',
          adminSettingsThreads: 'URL ya Threads',
          adminSettingsTikTok: 'URL ya TikTok',
          adminSettingsSave: 'Hifadhi Mipangilio',
          adminModalEditUser: 'Hariri Mtumiaji',
          adminModalEditPrediction: 'Hariri Dondoo',
          adminModalAddPrediction: 'Ongeza Dondoo Mpya',
          adminPredictionMatchName: 'Jina la Mechi (k.m., Timu A vs Timu B)',
          adminPredictionLeague: 'Ligi',
          adminPredictionTip: 'Dondoo',
          adminPredictionOdds: 'Odd',
          adminPredictionKickoff: 'Saa ya Kuanza',
          adminPredictionType: 'Aina',
          adminPredictionResult: 'Matokeo',
          adminPredictionResultPending: 'Inasubiri',
          adminPredictionUpdate: 'Sasisha Dondoo',
          adminPredictionCreate: 'Tengeneza Dondoo',

          // Contact Page
          contactGetInTouch: 'Wasiliana Nasi',
          contactWhatsApp: 'WhatsApp',
          contactTelegram: 'Telegram',
          contactGmail: 'Gmail',
          contactCall: 'Piga Simu',
          contactSms: 'SMS',
          contactFollowUs: 'Tufuate',
          contactYouTube: 'YouTube',
          contactInstagram: 'Instagram',
          contactFacebook: 'Facebook',
          contactThreads: 'Threads',
          contactTikTok: 'TikTok',
          contactLeaveComment: 'Acha Maoni',
          contactFormSuccess: 'Asante kwa maoni yako!',
          contactName: 'Jina Lako',
          contactEmail: 'Barua Pepe Yako',
          contactMessage: 'Ujumbe Wako',
          contactSubmitComment: 'Tuma Maoni',

          // Prediction Card
          cardTip: 'Dondoo',
          cardOdds: 'Odd',
          resultWin: 'USHINDI',
          resultLoss: 'USHINDWE',
          resultPending: 'INASUBIRI',
          
          // Modal
          modalClose: 'Funga',
        }
      }
    }
  });

export default i18n;