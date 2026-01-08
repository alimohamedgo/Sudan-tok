
import React, { useRef, useState, useEffect } from 'react';
import { Video } from '../types';

interface VideoCardProps {
  video: Video;
}

const VideoCard: React.FC<VideoCardProps> = ({ video }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    const link = document.createElement('a');
    link.href = video.url;
    link.download = `SudanTok_${video.id}.mp4`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    alert('بدأ تحميل الفيديو...');
  };

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.7,
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          videoRef.current?.play().catch(() => {});
          setIsPlaying(true);
        } else {
          videoRef.current?.pause();
          setIsPlaying(false);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, options);
    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative h-screen w-full snap-start bg-black flex items-center justify-center overflow-hidden">
      <video
        ref={videoRef}
        src={video.url}
        loop
        className="h-full w-full object-cover cursor-pointer"
        onClick={togglePlay}
        playsInline
      />

      {video.isAd && (
        <div className="absolute top-20 right-4 z-10 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 flex items-center gap-2">
          <span className="text-[10px] font-bold text-yellow-400 uppercase tracking-wider">إعلان ترويجي</span>
          <div className="h-3 w-[1px] bg-white/30"></div>
          <span className="text-[10px] text-white/80">{video.adProvider}</span>
        </div>
      )}

      {!isPlaying && (
        <div 
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          onClick={togglePlay}
        >
          <i className="fa-solid fa-play text-6xl text-white opacity-50"></i>
        </div>
      )}

      {/* Right Side Actions */}
      <div className="absolute left-4 bottom-24 flex flex-col gap-5 items-center">
        <div className="flex flex-col items-center group">
          <div className="relative">
            <img src={video.user.avatar} className="w-12 h-12 rounded-full border-2 border-white object-cover bg-white" alt="avatar" />
            {!video.isAd && (
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center text-[10px] border-2 border-black">
                <i className="fa-solid fa-plus text-white"></i>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col items-center" onClick={() => setIsLiked(!isLiked)}>
          <div className={`w-11 h-11 rounded-full bg-black/20 backdrop-blur-md flex items-center justify-center transition-colors cursor-pointer border border-white/10 ${isLiked ? 'text-red-500' : 'text-white'}`}>
            <i className={`fa-solid fa-heart text-xl`}></i>
          </div>
          <span className="text-[11px] text-white mt-1 font-bold drop-shadow-md">{video.likes.toLocaleString()}</span>
        </div>

        <div className="flex flex-col items-center">
          <div className="w-11 h-11 rounded-full bg-black/20 backdrop-blur-md flex items-center justify-center text-white cursor-pointer border border-white/10">
            <i className="fa-solid fa-comment-dots text-xl"></i>
          </div>
          <span className="text-[11px] text-white mt-1 font-bold drop-shadow-md">{video.comments.toLocaleString()}</span>
        </div>

        <div className="flex flex-col items-center">
          <div className="w-11 h-11 rounded-full bg-black/20 backdrop-blur-md flex items-center justify-center text-white cursor-pointer border border-white/10">
            <i className="fa-solid fa-share text-xl"></i>
          </div>
          <span className="text-[11px] text-white mt-1 font-bold drop-shadow-md">{video.shares.toLocaleString()}</span>
        </div>

        <div className="flex flex-col items-center" onClick={handleDownload}>
          <div className="w-11 h-11 rounded-full bg-emerald-600/40 backdrop-blur-md flex items-center justify-center text-white cursor-pointer border border-emerald-400/30 hover:bg-emerald-600 transition-colors">
            <i className="fa-solid fa-download text-xl"></i>
          </div>
          <span className="text-[11px] text-white mt-1 font-bold drop-shadow-md">حفظ</span>
        </div>

        <div className={`w-11 h-11 rounded-full bg-black/40 flex items-center justify-center overflow-hidden border-2 border-gray-400 ${!video.isAd ? 'animate-spin-slow' : ''}`}>
           <img src={video.user.avatar} className="w-7 h-7 rounded-full" alt="disc" />
        </div>
      </div>

      {/* Bottom Info Overlay */}
      <div className="absolute bottom-0 right-0 left-0 p-4 bg-gradient-to-t from-black/90 via-black/40 to-transparent">
        <div className="max-w-[85%] space-y-3">
          <div className="flex items-center gap-2 text-white">
            <h3 className="font-bold text-lg hover:underline cursor-pointer">@{video.user.handle}</h3>
            {video.isAd && <span className="bg-white/20 text-[10px] px-1.5 py-0.5 rounded uppercase font-bold">Sponsored</span>}
          </div>
          <p className="text-sm text-white/90 line-clamp-2 leading-relaxed">{video.description}</p>
          
          {video.isAd && video.adCta && (
            <button className="w-full mt-2 py-2.5 bg-white text-black font-bold rounded flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors shadow-lg">
              {video.adCta}
              <i className="fa-solid fa-chevron-left text-[10px]"></i>
            </button>
          )}

          <div className="flex items-center gap-2 text-sm text-gray-300">
            <i className="fa-solid fa-music text-xs"></i>
            <div className="overflow-hidden whitespace-nowrap w-48">
               <div className="animate-marquee inline-block">{video.song}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
