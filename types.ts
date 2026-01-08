
export interface User {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  bio?: string;
}

export interface Video {
  id: string;
  url: string;
  user: User;
  description: string;
  song: string;
  likes: number;
  comments: number;
  shares: number;
  isAd?: boolean;
  adProvider?: 'Start.io' | 'Unity Ads';
  adCta?: string;
}

export type AdminTab = 'overview' | 'content' | 'advertising' | 'mobile-app';
