"use client"
import React, { useState, useRef } from 'react';
import {
    FaPlay,
    FaPause,
    FaVolumeUp,
    FaVolumeMute,
    FaExpand,
    FaCompress,
    FaRedo,
} from 'react-icons/fa';

// =============================================================================
// Audio Player Component
// =============================================================================

export function AudioPlayer({ url, title = 'Listen & Learn' }) {
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [playbackRate, setPlaybackRate] = useState(1);

    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const toggleMute = () => {
        if (audioRef.current) {
            audioRef.current.muted = !isMuted;
            setIsMuted(!isMuted);
        }
    };

    const handleTimeUpdate = () => {
        if (audioRef.current) {
            setCurrentTime(audioRef.current.currentTime);
        }
    };

    const handleLoadedMetadata = () => {
        if (audioRef.current) {
            setDuration(audioRef.current.duration);
        }
    };

    const handleSeek = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const percent = (e.clientX - rect.left) / rect.width;
        const newTime = percent * duration;
        if (audioRef.current) {
            audioRef.current.currentTime = newTime;
            setCurrentTime(newTime);
        }
    };

    const handleEnded = () => {
        setIsPlaying(false);
        setCurrentTime(0);
    };

    const changePlaybackRate = () => {
        const rates = [0.5, 0.75, 1, 1.25, 1.5, 2];
        const currentIndex = rates.indexOf(playbackRate);
        const nextIndex = (currentIndex + 1) % rates.length;
        const newRate = rates[nextIndex];
        setPlaybackRate(newRate);
        if (audioRef.current) {
            audioRef.current.playbackRate = newRate;
        }
    };

    const restart = () => {
        if (audioRef.current) {
            audioRef.current.currentTime = 0;
            setCurrentTime(0);
            audioRef.current.play();
            setIsPlaying(true);
        }
    };

    const formatTime = (time) => {
        if (isNaN(time)) return '0:00';
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    const progress = duration ? (currentTime / duration) * 100 : 0;

    return (
        <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl p-4 max-w-md shadow-md">
            {/* Hidden Audio Element */}
            <audio
                ref={audioRef}
                src={url}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onEnded={handleEnded}
                preload="metadata"
            />

            {/* Title */}
            <div className="flex items-center gap-2 mb-3">
                <div className="bg-purple-600 p-2 rounded-full">
                    <FaVolumeUp className="text-white text-sm" />
                </div>
                <span className="font-medium text-gray-800 text-sm">{title}</span>
            </div>

            {/* Progress Bar */}
            <div
                className="h-2 bg-gray-200 rounded-full cursor-pointer mb-3 overflow-hidden"
                onClick={handleSeek}
            >
                <div
                    className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-100"
                    style={{ width: `${progress}%` }}
                />
            </div>

            {/* Time Display */}
            <div className="flex justify-between text-xs text-gray-600 mb-3">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    {/* Restart */}
                    <button
                        onClick={restart}
                        className="p-2 rounded-full hover:bg-purple-200 transition-colors"
                        title="Restart"
                    >
                        <FaRedo className="text-gray-600 text-sm" />
                    </button>

                    {/* Play/Pause */}
                    <button
                        onClick={togglePlay}
                        className="p-3 bg-purple-600 rounded-full hover:bg-purple-700 transition-colors shadow-md"
                    >
                        {isPlaying ? (
                            <FaPause className="text-white text-sm" />
                        ) : (
                            <FaPlay className="text-white text-sm ml-0.5" />
                        )}
                    </button>

                    {/* Mute */}
                    <button
                        onClick={toggleMute}
                        className="p-2 rounded-full hover:bg-purple-200 transition-colors"
                        title={isMuted ? 'Unmute' : 'Mute'}
                    >
                        {isMuted ? (
                            <FaVolumeMute className="text-gray-600 text-sm" />
                        ) : (
                            <FaVolumeUp className="text-gray-600 text-sm" />
                        )}
                    </button>
                </div>

                <div className="flex items-center gap-2">
                    {/* Playback Speed */}
                    <button
                        onClick={changePlaybackRate}
                        className="px-2 py-1 text-xs font-medium bg-white rounded-full hover:bg-gray-100 transition-colors border border-gray-200"
                        title="Playback Speed"
                    >
                        {playbackRate}x
                    </button>
                </div>
            </div>
        </div>
    );
}

// =============================================================================
// Video Player Component
// =============================================================================

export function VideoPlayer({ url, title = 'Visual Concept', poster = null }) {
    const videoRef = useRef(null);
    const containerRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [showControls, setShowControls] = useState(true);
    const [playbackRate, setPlaybackRate] = useState(1);

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

    const toggleMute = () => {
        if (videoRef.current) {
            videoRef.current.muted = !isMuted;
            setIsMuted(!isMuted);
        }
    };

    const toggleFullscreen = async () => {
        try {
            if (!document.fullscreenElement) {
                await containerRef.current?.requestFullscreen();
                setIsFullscreen(true);
            } else {
                await document.exitFullscreen();
                setIsFullscreen(false);
            }
        } catch (err) {
            console.error('Fullscreen error:', err);
        }
    };

    const handleTimeUpdate = () => {
        if (videoRef.current) {
            setCurrentTime(videoRef.current.currentTime);
        }
    };

    const handleLoadedMetadata = () => {
        if (videoRef.current) {
            setDuration(videoRef.current.duration);
        }
    };

    const handleSeek = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const percent = (e.clientX - rect.left) / rect.width;
        const newTime = percent * duration;
        if (videoRef.current) {
            videoRef.current.currentTime = newTime;
            setCurrentTime(newTime);
        }
    };

    const handleEnded = () => {
        setIsPlaying(false);
    };

    const changePlaybackRate = () => {
        const rates = [0.5, 0.75, 1, 1.25, 1.5, 2];
        const currentIndex = rates.indexOf(playbackRate);
        const nextIndex = (currentIndex + 1) % rates.length;
        const newRate = rates[nextIndex];
        setPlaybackRate(newRate);
        if (videoRef.current) {
            videoRef.current.playbackRate = newRate;
        }
    };

    const formatTime = (time) => {
        if (isNaN(time)) return '0:00';
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    const progress = duration ? (currentTime / duration) * 100 : 0;

    return (
        <div
            ref={containerRef}
            className="bg-gray-900 rounded-xl overflow-hidden max-w-lg shadow-lg"
            onMouseEnter={() => setShowControls(true)}
            onMouseLeave={() => setShowControls(!isPlaying)}
        >
            {/* Title Bar */}
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-2">
                <span className="text-white font-medium text-sm">{title}</span>
            </div>

            {/* Video Container */}
            <div className="relative aspect-video bg-black">
                <video
                    ref={videoRef}
                    src={url}
                    poster={poster}
                    className="w-full h-full object-contain"
                    onTimeUpdate={handleTimeUpdate}
                    onLoadedMetadata={handleLoadedMetadata}
                    onEnded={handleEnded}
                    onClick={togglePlay}
                    preload="metadata"
                />

                {/* Play Overlay (when paused) */}
                {!isPlaying && (
                    <div
                        className="absolute inset-0 flex items-center justify-center bg-black/30 cursor-pointer"
                        onClick={togglePlay}
                    >
                        <div className="p-4 bg-purple-600/90 rounded-full hover:bg-purple-700 transition-colors">
                            <FaPlay className="text-white text-2xl ml-1" />
                        </div>
                    </div>
                )}

                {/* Controls Overlay */}
                <div
                    className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3 transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'
                        }`}
                >
                    {/* Progress Bar */}
                    <div
                        className="h-1 bg-gray-600 rounded-full cursor-pointer mb-3 overflow-hidden"
                        onClick={handleSeek}
                    >
                        <div
                            className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-100"
                            style={{ width: `${progress}%` }}
                        />
                    </div>

                    {/* Controls Row */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            {/* Play/Pause */}
                            <button
                                onClick={togglePlay}
                                className="text-white hover:text-purple-400 transition-colors"
                            >
                                {isPlaying ? (
                                    <FaPause className="text-lg" />
                                ) : (
                                    <FaPlay className="text-lg" />
                                )}
                            </button>

                            {/* Mute */}
                            <button
                                onClick={toggleMute}
                                className="text-white hover:text-purple-400 transition-colors"
                            >
                                {isMuted ? (
                                    <FaVolumeMute className="text-lg" />
                                ) : (
                                    <FaVolumeUp className="text-lg" />
                                )}
                            </button>

                            {/* Time */}
                            <span className="text-white text-xs">
                                {formatTime(currentTime)} / {formatTime(duration)}
                            </span>
                        </div>

                        <div className="flex items-center gap-3">
                            {/* Playback Speed */}
                            <button
                                onClick={changePlaybackRate}
                                className="text-white text-xs font-medium hover:text-purple-400 transition-colors"
                            >
                                {playbackRate}x
                            </button>

                            {/* Fullscreen */}
                            <button
                                onClick={toggleFullscreen}
                                className="text-white hover:text-purple-400 transition-colors"
                            >
                                {isFullscreen ? (
                                    <FaCompress className="text-lg" />
                                ) : (
                                    <FaExpand className="text-lg" />
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// =============================================================================
// YouTube Video Player Component
// =============================================================================

export function YouTubePlayer({ embedUrl, title = 'YouTube Video' }) {
    return (
        <div className="bg-gray-900 rounded-xl overflow-hidden max-w-lg shadow-lg">
            {/* Title Bar */}
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-2">
                <span className="text-white font-medium text-sm">{title}</span>
            </div>

            {/* Video Container */}
            <div className="relative aspect-video bg-black">
                <iframe
                    src={embedUrl}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                />
            </div>
        </div>
    );
}