import { useState, useRef, useCallback, useEffect } from 'react';
import { ArrowLeft, ArrowRight, X, ZoomIn, ZoomOut, Play, Pause, Volume2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { BackgroundBeams } from './background-beams';

// Video playlist per instruction id — всегда начинается с CNTB
const VIDEO_PLAYLISTS = {
    default: [{ src: '/video/CNTB.mp4', label: '' }],
    instruction_3: [
        { src: '/video/CNTB.mp4', label: '' },
        { src: '/video/oblojka.mp4', label: 'Как создать обложку' },
    ],
};


export function InstructionView({
    instruction,
    step,
    activeStepIndex,
    totalSteps,
    closeInstruction,
    goPrevStep,
    goNextStep,
    markInstructionComplete,
    handleCrosslink,
}) {
    const [imgExpanded, setImgExpanded] = useState(false);
    const [videoOpen, setVideoOpen] = useState(false);
    const [playlistIdx, setPlaylistIdx] = useState(0);
    const [playbackRate, setPlaybackRate] = useState(1);
    const videoRef = useRef(null);
    const sidebarRef = useRef(null);

    // Auto-scroll the step tracker
    useEffect(() => {
        if (sidebarRef.current) {
            const activeElement = sidebarRef.current.children[activeStepIndex];
            if (activeElement) {
                activeElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    }, [activeStepIndex]);

    const playlist = VIDEO_PLAYLISTS[instruction.id] ?? VIDEO_PLAYLISTS.default;

    const openVideo = () => {
        setPlaylistIdx(0);
        setVideoOpen(true);
    };

    const closeVideo = () => {
        if (videoRef.current) videoRef.current.pause();
        setVideoOpen(false);
        setPlaylistIdx(0);
    };

    const handleVideoEnd = useCallback(() => {
        if (playlistIdx < playlist.length - 1) {
            setPlaylistIdx(i => i + 1);
        } else {
            closeVideo();
        }
    }, [playlistIdx, playlist.length]);

    return (
        <div className="relative h-[100dvh] bg-[#f5f5f7] flex flex-col animate-fade-in overflow-hidden font-sans">
            {/* Background */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <BackgroundBeams />
            </div>

            {/* ── Header ── */}
            <div className="z-10 bg-white/60 backdrop-blur-2xl px-6 md:px-10 py-4 flex justify-between items-center border-b border-gray-200/60 shrink-0">
                <h2 className="text-lg md:text-xl font-semibold tracking-tight text-[#1d1d1f] lowercase truncate mr-4">
                    {instruction.title}
                </h2>
                <button
                    onClick={closeInstruction}
                    className="bg-gray-200/60 hover:bg-gray-200 text-[#1d1d1f] rounded-full font-medium px-5 py-2 transition-all flex items-center gap-2 lowercase shrink-0"
                >
                    закрыть <X size={16} />
                </button>
            </div>

            {/* ── Main body: sidebar + content ── */}
            <div className="z-10 flex flex-1 overflow-hidden min-h-0">

                {/* ── Vertical step tracker ── */}
                <div
                    ref={sidebarRef}
                    className="hidden md:flex flex-col items-center py-10 px-5 gap-0 shrink-0 overflow-y-auto max-h-full [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
                >
                    {Array.from({ length: totalSteps }).map((_, i) => {
                        const isDone = i < activeStepIndex;
                        const isCurrent = i === activeStepIndex;
                        return (
                            <div key={i} className="flex flex-col items-center">
                                {/* Dot */}
                                <div className="relative w-7 h-7 flex items-center justify-center">
                                    {/* Background track circle */}
                                    <div className="absolute inset-0 rounded-full bg-gray-200/80" />
                                    {/* Animated fill */}
                                    <motion.div
                                        className="absolute inset-0 rounded-full"
                                        style={{ backgroundColor: '#0071e3' }}
                                        initial={{ scale: 0, opacity: 0 }}
                                        animate={
                                            isDone
                                                ? { scale: 1, opacity: 1 }
                                                : isCurrent
                                                    ? { scale: 0.68, opacity: 1 }
                                                    : { scale: 0, opacity: 0 }
                                        }
                                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                                    />
                                    {/* Step number */}
                                    <span
                                        className="relative z-10 text-xs font-bold"
                                        style={{ color: isDone || isCurrent ? '#fff' : '#94a3b8' }}
                                    >
                                        {i + 1}
                                    </span>
                                </div>

                                {/* Connector line between dots */}
                                {i < totalSteps - 1 && (
                                    <div className="relative w-0.5 h-10 bg-gray-200/80 overflow-hidden rounded-full my-0.5">
                                        <motion.div
                                            className="absolute top-0 left-0 right-0 rounded-full bg-[#0071e3]"
                                            initial={{ height: '0%' }}
                                            animate={{ height: isDone ? '100%' : '0%' }}
                                            transition={{ duration: 0.4, ease: 'easeOut' }}
                                        />
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* ── Content area ── */}
                <div className="flex-1 flex flex-col justify-center px-6 md:px-10 py-8 overflow-y-auto">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeStepIndex}
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -12 }}
                            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                            className="flex flex-col md:flex-row gap-6 items-start"
                        >
                            {/* Text card */}
                            <div className="flex-1 bg-white/70 backdrop-blur-xl border border-gray-200/50 rounded-[24px] p-8 md:p-12 shadow-sm flex items-center justify-center min-h-[280px]">
                                <div
                                    className="text-xl md:text-3xl font-semibold leading-relaxed tracking-tight text-[#1d1d1f] hover-line-breaks text-center"
                                    dangerouslySetInnerHTML={{ __html: step.text.replace(/<br\s*\/?>/gi, '<br />') }}
                                />
                            </div>

                            {/* Thumbnail — shows placeholder if no image, expandable on click */}
                            <div className="shrink-0 w-full md:w-56 flex flex-col items-center gap-3">
                                <button
                                    onClick={() => setImgExpanded(true)}
                                    className="group relative w-full md:w-56 aspect-[4/3] rounded-[20px] overflow-hidden border border-gray-200/60 shadow-md bg-gray-100 flex items-center justify-center transition-transform hover:scale-[1.03]"
                                    title="нажмите для увеличения"
                                >
                                    {step.image ? (
                                        <img
                                            src={step.image}
                                            alt="шаг"
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="flex flex-col items-center gap-2 text-gray-400">
                                            <ZoomIn size={28} />
                                            <span className="text-xs lowercase">нет изображения</span>
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors rounded-[20px] flex items-center justify-center">
                                        <ZoomIn size={22} className="text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-lg" />
                                    </div>
                                </button>

                                {/* Animated Tooltip built for the first 2 steps */}
                                {(step.step === 1 || step.step === 2) && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -5 }}
                                        animate={{ opacity: 1, y: [0, -4, 0] }}
                                        transition={{
                                            duration: 2,
                                            repeat: Infinity,
                                            ease: "easeInOut"
                                        }}
                                        className="text-xs font-medium text-[#0071e3] bg-[#0071e3]/10 px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm border border-[#0071e3]/20"
                                    >
                                        <ZoomIn size={14} />
                                        <span>нажми, чтобы увеличить</span>
                                    </motion.div>
                                )}
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Cross-link action */}
                    {step.actionButton && (
                        <div className="mt-8 flex justify-center">
                            <button
                                onClick={() => handleCrosslink(step.actionButton.target)}
                                className="bg-[#0071e3] text-white hover:bg-[#005bb5] rounded-full font-medium py-3 px-8 text-base flex items-center gap-2 transition-colors shadow-md lowercase"
                            >
                                {step.actionButton.label} <ArrowRight size={20} />
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* ── Navigation footer ── */}
            <div className="z-20 bg-white/60 backdrop-blur-2xl flex justify-between items-center px-6 md:px-10 py-4 border-t border-gray-200/60 shrink-0 gap-3">
                {/* Step counter mobile */}
                <div className="md:hidden absolute left-1/2 -translate-x-1/2 bottom-[22px] text-xs text-gray-400 lowercase">
                    шаг {activeStepIndex + 1}/{totalSteps}
                </div>

                <button
                    onClick={goPrevStep}
                    disabled={activeStepIndex === 0}
                    className={`scan-btn bg-gray-200 hover:bg-gray-300 text-[#1d1d1f] rounded-full font-medium py-3 px-6 text-base flex items-center gap-2 transition-all lowercase ${activeStepIndex === 0 ? 'opacity-30 cursor-not-allowed' : ''
                        }`}
                >
                    <ArrowLeft size={20} />
                    <span className="hidden md:inline">назад</span>
                </button>

                {/* Video button — center */}
                <button
                    onClick={openVideo}
                    className="group flex items-center gap-2 rounded-full px-5 py-3 bg-gradient-to-r from-[#0071e3] to-[#5e5ce6] text-white shadow-md hover:shadow-[0_0_20px_rgba(0,113,227,0.45)] transition-all duration-300 hover:scale-[1.03] lowercase"
                >
                    <span className="relative flex h-4 w-4 shrink-0">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-30" />
                        <span className="relative flex h-4 w-4 items-center justify-center">
                            <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                            </svg>
                        </span>
                    </span>
                    <span className="text-sm font-semibold hidden sm:inline">Видео Инструкция</span>
                </button>

                {activeStepIndex < totalSteps - 1 ? (
                    <button
                        onClick={goNextStep}
                        className="scan-btn bg-black text-white rounded-full font-medium py-3 px-8 text-base flex items-center gap-2 hover:bg-gray-800 transition-all shadow-xl lowercase"
                    >
                        <span className="hidden md:inline">далее</span>
                        <ArrowRight size={20} />
                    </button>
                ) : (
                    <button
                        onClick={markInstructionComplete}
                        className="scan-btn bg-black text-white rounded-full font-medium py-3 px-8 text-base flex items-center gap-2 hover:bg-gray-800 transition-all shadow-xl lowercase"
                    >
                        <span className="hidden md:inline">завершить</span>
                    </button>
                )}
            </div>

            {/* ── Lightbox overlay ── */}
            <AnimatePresence>
                {imgExpanded && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-6"
                        onClick={() => setImgExpanded(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.85, opacity: 0 }}
                            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                            className="relative max-w-4xl w-full rounded-[28px] overflow-hidden shadow-2xl bg-gray-900"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {step.image ? (
                                <img src={step.image} alt="шаг" className="w-full h-auto max-h-[80vh] object-contain" />
                            ) : (
                                <div className="flex items-center justify-center h-64 text-gray-500">нет изображения</div>
                            )}
                            <button
                                onClick={() => setImgExpanded(false)}
                                className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors"
                            >
                                <ZoomOut size={20} />
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ── Video Player Modal ── */}
            <AnimatePresence>
                {videoOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md"
                    >
                        <button
                            onClick={closeVideo}
                            className="absolute top-4 right-4 text-white hover:bg-white/20 rounded-full p-2 transition-colors z-50"
                        >
                            <X size={28} />
                        </button>

                        <div className="w-full max-w-5xl px-4 flex flex-col items-center">
                            {playlist[playlistIdx].label && (
                                <h3 className="text-white text-xl font-medium mb-4 text-center">
                                    {playlist[playlistIdx].label}
                                </h3>
                            )}
                            <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black shadow-2xl ring-1 ring-white/10">
                                <video
                                    ref={videoRef}
                                    src={playlist[playlistIdx].src}
                                    autoPlay
                                    controls
                                    className="w-full h-full object-contain"
                                    onEnded={handleVideoEnd}
                                    onLoadedMetadata={() => {
                                        if (videoRef.current) {
                                            videoRef.current.playbackRate = playbackRate;
                                        }
                                    }}
                                />

                                {/* Playback Speed Control overlay (top right inside video or above it) */}
                                <div className="absolute top-4 right-4 z-50 flex items-center gap-2 bg-black/60 backdrop-blur-md rounded-full px-3 py-1.5 border border-white/10">
                                    <span className="text-white/80 text-xs font-medium">Скорость:</span>
                                    <select
                                        value={playbackRate}
                                        onChange={(e) => {
                                            const rate = parseFloat(e.target.value);
                                            setPlaybackRate(rate);
                                            if (videoRef.current) {
                                                videoRef.current.playbackRate = rate;
                                            }
                                        }}
                                        className="bg-transparent text-white text-sm font-semibold outline-none cursor-pointer [&>option]:bg-gray-800"
                                    >
                                        <option value="0.5">0.5x</option>
                                        <option value="0.75">0.75x</option>
                                        <option value="1">1x</option>
                                        <option value="1.25">1.25x</option>
                                        <option value="1.5">1.5x</option>
                                        <option value="2">2x</option>
                                    </select>
                                </div>
                            </div>

                            {/* Playlist indicator if more than 1 video */}
                            {playlist.length > 1 && (
                                <div className="flex gap-2 mt-8">
                                    {playlist.map((item, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => {
                                                setPlaylistIdx(idx);
                                                if (videoRef.current) {
                                                    videoRef.current.src = item.src;
                                                    videoRef.current.play();
                                                }
                                            }}
                                            className={`h-1.5 rounded-full transition-all duration-300 ${idx === playlistIdx
                                                ? 'w-12 bg-[#0071e3]'
                                                : 'w-4 bg-white/20 hover:bg-white/40'
                                                }`}
                                            title={item.label}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
