import React, { useState, useRef, useEffect } from 'react';
import { ModuleType, VideoInfo, StudentProgressMap } from '../types';
import { 
  Play, 
  Maximize, 
  CheckCircle2, 
  FileQuestion,
  AlertCircle
} from 'lucide-react';

export const GRAMMAR_VIDEOS: VideoInfo[] = [
  {
    id: ModuleType.VIDEO_SENTENCE_STRUCTURE,
    title: 'Sentence Structure',
    description: 'Learn about subjects, predicates, independent & dependent clauses, and compound structures.',
    videoSrc: '/videos/sentence_structure.mp4',
    duration: '6:48',
    quizType: ModuleType.VIDEO_SENTENCE_STRUCTURE,
    quizTitle: 'Sentence Structure Quiz',
    category: 'core'
  },
  {
    id: ModuleType.VIDEO_SVA,
    title: 'Subject-Verb Agreement',
    description: 'Master the S-Switch rule, compound subjects, indefinite pronouns, and tricky singular nouns.',
    videoSrc: '/videos/subject_verb_agreement.mp4',
    duration: '6:18',
    quizType: ModuleType.VIDEO_SVA,
    quizTitle: 'Subject-Verb Quiz',
    category: 'core'
  },
  {
    id: ModuleType.VIDEO_RELATIVE_CLAUSES,
    title: 'Relative Clauses',
    description: 'Connect ideas seamlessly using who, which, that, whose, and where in defining & non-defining clauses.',
    videoSrc: '/videos/relative_clauses.mp4',
    duration: '7:01',
    quizType: ModuleType.VIDEO_RELATIVE_CLAUSES,
    quizTitle: 'Relative Clauses Quiz',
    category: 'core'
  },
  {
    id: ModuleType.VIDEO_FRAGMENTS,
    title: 'Fragments & Run-ons',
    description: 'Identify and fix incomplete sentences, comma splices, and fused run-on sentences.',
    videoSrc: '/videos/fragments_runons.mp4',
    duration: '5:17',
    quizType: ModuleType.VIDEO_FRAGMENTS,
    quizTitle: 'Fragments & Run-ons Quiz',
    category: 'core'
  },
  {
    id: ModuleType.VIDEO_CONDITIONALS,
    title: 'Conditionals & If Clauses',
    description: 'Explore zero, first, second, and third conditionals with hypothetical and real scenarios.',
    videoSrc: '/videos/conditionals.mp4',
    duration: '6:02',
    category: 'advanced'
  },
  {
    id: ModuleType.VIDEO_PRESENT_PERFECT,
    title: 'Present Perfect vs Past Simple',
    description: 'Understand time markers, ongoing experiences vs finished past actions in context.',
    videoSrc: '/videos/present_perfect_vs.mp4',
    duration: '6:39',
    category: 'advanced'
  },
  {
    id: ModuleType.VIDEO_PAST_MODALS,
    title: 'Decoding Past Modals',
    description: 'Master could have, should have, and would have to express regret, missed possibilities, and hypothetical past outcomes.',
    videoSrc: '/videos/past_modals.mp4',
    duration: '6:30',
    quizType: ModuleType.VIDEO_PAST_MODALS,
    quizTitle: 'Past Modals Quiz',
    category: 'core'
  },
  {
    id: ModuleType.VIDEO_PARALLEL_STRUCTURE,
    title: 'Parallel Structure',
    description: 'Master structural balance across matching word forms, consistent clauses, lists after colons, and thesis statements.',
    videoSrc: '/videos/parallel_structure.mp4',
    duration: '7:50',
    quizType: ModuleType.VIDEO_PARALLEL_STRUCTURE,
    quizTitle: 'Parallel Structure Quiz',
    category: 'core'
  }
];

const formatDuration = (seconds: number): string => {
  if (!seconds || isNaN(seconds) || !isFinite(seconds)) return '';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

interface VideoCardItemProps {
  video: VideoInfo;
  progressMap: StudentProgressMap;
  playingVideoId: ModuleType | null;
  onPlayVideo: (videoId: ModuleType | null) => void;
  onLaunchQuiz: (quizId: ModuleType) => void;
}

const CompactVideoCard: React.FC<VideoCardItemProps> = ({ 
  video, 
  progressMap, 
  playingVideoId,
  onPlayVideo,
  onLaunchQuiz 
}) => {
  const [progressPercent, setProgressPercent] = useState(0);
  const [exactDuration, setExactDuration] = useState<string>(video.duration);
  const [currentTimeFormatted, setCurrentTimeFormatted] = useState<string>('0:00');
  const [hasError, setHasError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const isCurrentPlaying = playingVideoId === video.id;

  // Single-video playback enforcement: Automatically pause if another video starts
  useEffect(() => {
    if (!isCurrentPlaying && videoRef.current && !videoRef.current.paused) {
      videoRef.current.pause();
    }
  }, [isCurrentPlaying]);

  const quizProgress = video.quizType ? progressMap[video.quizType] : undefined;
  const isQuizCompleted = quizProgress?.completed;
  const quizScore = quizProgress?.score || 0;
  const quizMaxScore = quizProgress?.maxScore || 8;
  const quizAccuracy = quizMaxScore > 0 ? Math.round((quizScore / quizMaxScore) * 100) : 0;

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isCurrentPlaying) {
      videoRef.current.pause();
      onPlayVideo(null);
    } else {
      onPlayVideo(video.id);
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn("Video playback paused or prevented:", err);
        });
      }
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current && videoRef.current.duration) {
      const formatted = formatDuration(videoRef.current.duration);
      if (formatted) {
        setExactDuration(formatted);
      }
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current && videoRef.current.duration) {
      const current = videoRef.current.currentTime;
      const duration = videoRef.current.duration;
      setProgressPercent(Math.round((current / duration) * 100));
      setCurrentTimeFormatted(formatDuration(current));
    }
  };

  const toggleFullscreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(err => console.error(err));
    } else {
      document.exitFullscreen().catch(err => console.error(err));
    }
  };

  return (
    <div className={`bg-white rounded-3xl border transition-all duration-300 overflow-hidden flex flex-col justify-between group ${
      isCurrentPlaying ? 'border-indigo-500 shadow-xl ring-2 ring-indigo-500/20' : 'border-slate-200 shadow-sm hover:shadow-lg'
    }`}>
      {/* Compact Video Screen */}
      <div>
        <div 
          ref={containerRef}
          className="relative aspect-video w-full bg-slate-900 overflow-hidden group/player"
        >
          <video
            ref={videoRef}
            src={video.videoSrc}
            preload="metadata"
            playsInline
            controls={isCurrentPlaying}
            onLoadedMetadata={handleLoadedMetadata}
            onTimeUpdate={handleTimeUpdate}
            onError={() => setHasError(true)}
            onPlay={() => {
              if (playingVideoId !== video.id) {
                onPlayVideo(video.id);
              }
            }}
            onPause={() => {
              if (playingVideoId === video.id) {
                onPlayVideo(null);
              }
            }}
            onEnded={() => {
              onPlayVideo(null);
              setProgressPercent(100);
            }}
            className="w-full h-full object-cover"
          >
            <source src={video.videoSrc} type="video/mp4" />
          </video>

          {/* Custom Overlay when Paused */}
          {!isCurrentPlaying && !hasError && (
            <div 
              onClick={togglePlay}
              className="absolute inset-0 bg-slate-950/40 hover:bg-slate-950/30 flex items-center justify-center cursor-pointer backdrop-blur-[1px] transition-all"
            >
              <div className="w-14 h-14 rounded-full bg-indigo-600/90 text-white flex items-center justify-center shadow-lg transform group-hover/player:scale-110 transition-transform pl-1">
                <Play className="w-7 h-7 fill-current" />
              </div>
            </div>
          )}

          {hasError && (
            <div className="absolute inset-0 bg-slate-900 flex flex-col items-center justify-center p-4 text-center text-slate-300 text-xs">
              <AlertCircle className="w-6 h-6 text-amber-400 mb-1" />
              <span>Video loading...</span>
            </div>
          )}

          {/* Fullscreen Button */}
          <button
            onClick={toggleFullscreen}
            title="Fullscreen"
            className="absolute top-2.5 right-2.5 w-7 h-7 rounded-lg bg-black/60 hover:bg-black/80 text-white flex items-center justify-center opacity-0 group-hover/player:opacity-100 transition-opacity"
          >
            <Maximize className="w-3.5 h-3.5" />
          </button>

          {/* Duration / Status Badge */}
          <div className="absolute bottom-2.5 left-2.5 px-2.5 py-1 rounded-md bg-black/75 backdrop-blur-xs text-white text-[11px] font-semibold tracking-wide flex items-center gap-1.5 shadow-sm">
            {isCurrentPlaying ? (
              <>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>{currentTimeFormatted} / {exactDuration}</span>
              </>
            ) : (
              <span>{exactDuration}</span>
            )}
          </div>
        </div>

        {/* Card Body */}
        <div className="p-5">
          <div className="flex items-center justify-between mb-2">
            <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
              video.category === 'core' ? 'bg-indigo-50 text-indigo-700' : 'bg-purple-50 text-purple-700'
            }`}>
              {video.category === 'core' ? 'Core Lesson' : 'Advanced Concept'}
            </span>
            {isQuizCompleted && (
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                <CheckCircle2 className="w-3 h-3" /> Quiz Passed
              </span>
            )}
          </div>

          <h4 className="text-base sm:text-lg font-bold text-slate-900 mb-1 leading-snug">
            {video.title}
          </h4>
          <p className="text-slate-500 text-xs line-clamp-2 leading-relaxed mb-4">
            {video.description}
          </p>

          {/* Progress & Quiz Accuracy Indicators */}
          <div className="space-y-2 pt-2 border-t border-slate-100 text-xs">
            {/* Video Playback Progress */}
            <div>
              <div className="flex justify-between text-[11px] text-slate-500 mb-1 font-medium">
                <span>Video Progress</span>
                <span className="font-semibold text-slate-700">{progressPercent}%</span>
              </div>
              <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className="bg-indigo-500 h-full rounded-full transition-all duration-300"
                  style={{ width: `${Math.max(progressPercent, 0)}%` }}
                />
              </div>
            </div>

            {/* Quiz Accuracy Bar (if quiz exists) */}
            {video.quizType && (
              <div>
                <div className="flex justify-between text-[11px] text-slate-500 mb-1 font-medium">
                  <span>Quiz Accuracy</span>
                  <span className={`font-semibold ${isQuizCompleted ? 'text-emerald-600' : 'text-slate-500'}`}>
                    {isQuizCompleted ? `${quizScore}/${quizMaxScore} (${quizAccuracy}%)` : 'Not Taken'}
                  </span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-300 ${isQuizCompleted ? 'bg-emerald-500' : 'bg-slate-200'}`}
                    style={{ width: `${isQuizCompleted ? quizAccuracy : 0}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Card Action Footer */}
      <div className="p-5 pt-0">
        {video.quizType ? (
          <button
            onClick={() => {
              if (videoRef.current) {
                videoRef.current.pause();
              }
              onPlayVideo(null);
              onLaunchQuiz(video.quizType!);
            }}
            className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
              isQuizCompleted
                ? 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm hover:shadow-md shadow-indigo-100'
            }`}
          >
            <FileQuestion className="w-3.5 h-3.5" />
            {isQuizCompleted ? 'Retake Review Quiz' : 'Take Review Quiz'}
          </button>
        ) : (
          <div className="text-center py-2 text-xs font-semibold text-slate-400 bg-slate-50 rounded-xl">
            Concept Video
          </div>
        )}
      </div>
    </div>
  );
};

interface VideoHubProps {
  progressMap: StudentProgressMap;
  onLaunchQuiz: (videoQuizId: ModuleType) => void;
}

export const VideoHub: React.FC<VideoHubProps> = ({
  progressMap,
  onLaunchQuiz
}) => {
  const [playingVideoId, setPlayingVideoId] = useState<ModuleType | null>(null);

  return (
    <div className="space-y-6 animate-in">
      {/* 6-Card Compact Video Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {GRAMMAR_VIDEOS.map((video) => (
          <CompactVideoCard
            key={video.id}
            video={video}
            progressMap={progressMap}
            playingVideoId={playingVideoId}
            onPlayVideo={setPlayingVideoId}
            onLaunchQuiz={onLaunchQuiz}
          />
        ))}
      </div>
    </div>
  );
};
