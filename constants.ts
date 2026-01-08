
import { Video } from './types';

export const MOCK_VIDEOS: Video[] = [
  {
    id: '1',
    url: 'https://assets.mixkit.co/videos/preview/mixkit-dancing-in-a-studio-with-red-lighting-40011-large.mp4',
    user: {
      // Added missing id for the user
      id: 'user-ahmed',
      name: 'أحمد السوداني',
      handle: 'ahmed_sd',
      avatar: 'https://picsum.photos/seed/ahmed/100/100'
    },
    description: 'أجواء العيد في الخرطوم! 😍✨ #سودان #الخرطوم #عيد_سعيد',
    song: 'أغنية سودانية تراثية - الفنان زيدان',
    likes: 12400,
    comments: 450,
    shares: 890
  },
  {
    id: 'ad-start-io',
    url: 'https://assets.mixkit.co/videos/preview/mixkit-city-traffic-at-night-seen-from-a-high-angle-view-4432-large.mp4',
    user: {
      // Added missing id for the user
      id: 'user-startio',
      name: 'Start.io Ads',
      handle: 'sponsored',
      avatar: 'https://www.start.io/wp-content/uploads/2021/05/start-io-logo.png'
    },
    description: 'استهدف جمهورك في السودان بدقة مع Start.io. أفضل منصة إعلانية للجوال! 🚀',
    song: 'محتوى ترويجي - Start.io',
    likes: 540,
    comments: 12,
    shares: 100,
    isAd: true,
    adProvider: 'Start.io',
    adCta: 'جرب الآن'
  },
  {
    id: '2',
    url: 'https://assets.mixkit.co/videos/preview/mixkit-girl-dancing-to-the-rhythm-of-music-40003-large.mp4',
    user: {
      // Added missing id for the user
      id: 'user-sara',
      name: 'سارة ميكس',
      handle: 'sara_vibe',
      avatar: 'https://picsum.photos/seed/sara/100/100'
    },
    description: 'تجربة جديدة في المطبخ السوداني اليوم! رقاق باللبن 🥛❤️',
    song: 'موسيقى هادئة - بيانو سوداني',
    likes: 8900,
    comments: 120,
    shares: 45
  },
  {
    id: 'ad-unity',
    url: 'https://assets.mixkit.co/videos/preview/mixkit-neon-lights-of-a-futuristic-city-4367-large.mp4',
    user: {
      // Added missing id for the user
      id: 'user-unity',
      name: 'Unity Ads',
      handle: 'ads_unity',
      avatar: 'https://unity.com/sites/default/files/styles/16_9_l/public/2021-04/Unity-logo-white.png?itok=f-O-x-P-'
    },
    description: 'ارفع أداء ألعابك وتطبيقاتك في السودان مع Unity Ads. حلول إعلانية متكاملة. 🎮✨',
    song: 'Unity Ads - Global Network',
    likes: 2100,
    comments: 45,
    shares: 320,
    isAd: true,
    adProvider: 'Unity Ads',
    adCta: 'تنزيل الحزمة'
  },
  {
    id: '3',
    url: 'https://assets.mixkit.co/videos/preview/mixkit-man-dancing-under-a-street-light-40005-large.mp4',
    user: {
      // Added missing id for the user
      id: 'user-nile',
      name: 'ود النيل',
      handle: 'nile_boy',
      avatar: 'https://picsum.photos/seed/nile/100/100'
    },
    description: 'جمال النيل عند الغروب.. سبحان الله 🌅 #النيل #السودان',
    song: 'صوت الطبيعة - خرير الماء',
    likes: 45000,
    comments: 3200,
    shares: 12000
  }
];
