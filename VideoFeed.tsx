
import React from 'react';
import { MOCK_VIDEOS } from '../constants';
import VideoCard from './VideoCard';

const VideoFeed: React.FC = () => {
  return (
    <div className="h-screen w-full md:max-w-md lg:max-w-lg mx-auto bg-emerald-50 overflow-y-scroll snap-y snap-mandatory hide-scrollbar">
      {MOCK_VIDEOS.map((video) => (
        <VideoCard key={video.id} video={video} />
      ))}
      <div className="h-24 w-full snap-start flex items-center justify-center text-emerald-300 text-sm font-bold bg-black">
        وصلت للنهاية.. انتظر مقاطع جديدة! 🇸🇩 ✨
      </div>
    </div>
  );
};

export default VideoFeed;
