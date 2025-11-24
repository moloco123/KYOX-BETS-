
export type Prediction = {
  id: number;
  match_name: string;
  league: string;
  tip: string;
  odds: string;
  kickoff: string; // ISO 8601 format string
  type: 'FREE' | 'VIP';
  result: 'pending' | 'WIN' | 'LOSS';
};

export type User = {
  fullName: string;
  email: string;
  password?: string;
  role: 'user' | 'admin';
  status: 'pending' | 'approved';
};

export type Comment = {
  id: number;
  name: string;
  email: string;
  message: string;
  timestamp: string;
};

export type Page = 'home' | 'free' | 'vip' | 'history' | 'profile' | 'admin' | 'admin-register' | 'contact';

export type SiteSettings = {
  siteName: string;
  contactNumber: string;
  adminKey: string;
  email: string;
  telegram: string;
  youtube: string;
  instagram: string;
  facebook: string;
  threads: string;
  tiktok: string;
  splashTitle?: string;
  splashSubtitle?: string;
  splashLogoUrl?: string;
};
