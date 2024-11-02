// src/MusicPlayer.tsx
import React, {useEffect, useRef, useState} from 'react';
import {songs} from '../../assets/data';
import "./MusicPlayer.less"
import {IconPlay} from "../Icon/icons/iconPlay.tsx";
import {IconPause} from "../Icon/icons/iconPause.tsx";
import Slider from "../Slider/Slider.tsx";
import {IconLeftArrow} from "../Icon/icons/iconLeftArrow.tsx";
import {IconRightArrow} from "../Icon/icons/iconRightArrow.tsx";
import {IconList} from "../Icon/icons/iconList.tsx";

interface MusicPlayerProps {
    initialSongIndex?: number;
    className?: string;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({ initialSongIndex = 0, className }) => {
    const [currentSongIndex, setCurrentSongIndex] = useState(initialSongIndex);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [volume, setVolume] = useState(0);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    //手动切换
    const handleNextSong = () => {
        setCurrentSongIndex((currentSongIndex + 1) % songs.length);
    };

    const handlePrevSong = () => {
        setCurrentSongIndex((currentSongIndex - 1 + songs.length) % songs.length);
    };
    useEffect(() => {
        //准备下一曲
        if(audioRef.current){
            audioRef.current.src = songs[currentSongIndex].url;
            audioRef.current.load();
        }
    }, [currentSongIndex]);

    const handlePlayPause = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                if(Math.ceil(progress) >= 90){
                    setCurrentSongIndex((currentSongIndex + 1) % songs.length);
                }else{
                    audioRef.current.play();
                }
            }
            setIsPlaying(!isPlaying);
        }
    };



    const handleProgressChange = (v: number) => {
        if (audioRef.current && !isNaN(audioRef.current.duration)) {
            audioRef.current.currentTime = (audioRef.current.duration / 0.9 / 100) * v;
            setProgress(v);
        }
    };
    const handleVolumeChange = (v: number) => {
        const newVolume = v;
        setVolume(newVolume);
        if (audioRef.current) {
            audioRef.current.volume = newVolume / 0.9 / 100;
        }
    };
    const handleTimeUpdate =() => {
        console.log("audioRef.current?.currentTime")
        if (audioRef.current && !isNaN(audioRef.current.duration)) {
            const buf = (audioRef.current.currentTime / audioRef.current.duration) * 100 * 0.9;
            setProgress(buf);
            if(Math.ceil(buf) >= 90 && isPlaying){
                setCurrentSongIndex((currentSongIndex + 1) % songs.length);
            }
        }
    };
    const playMusic = ()=>{
        if(audioRef.current && isPlaying){
            console.log(isPlaying)
            audioRef.current.play()
        }
    }
    useEffect(() => {

        if (audioRef.current) {
            audioRef.current.addEventListener('timeupdate', handleTimeUpdate);
            audioRef.current.addEventListener('loadeddata', playMusic);
            return () => {
                audioRef.current?.removeEventListener('timeupdate', handleTimeUpdate);
                audioRef.current?.removeEventListener('loadeddata', handleNextSong);
            };
        }
    }, [isPlaying]);

    return (
        <div className={`music-player ${className ? className : ' '}`} ref={containerRef}>
            <audio ref={audioRef} />
            { !isPlaying ?  <IconPlay className={'music-cover'} onClick={handlePlayPause}/> : <IconPause className={'music-cover'} onClick={handlePlayPause}/> }
            <div className={'music-info'}>
            <div className={'music-title'}>{songs[currentSongIndex].title}-{songs[currentSongIndex].artist}</div>
                <div className="music-controls">
                    <IconLeftArrow width={'20px'} height={'20px'} className={'music-controls-icon'}  onClick={handlePrevSong}/>
                    <IconList width={'20px'} height={'20px'} className={'music-controls-icon'}/>
                    <IconRightArrow width={'20px'} height={'20px'} className={'music-controls-icon'} onClick={handleNextSong}/>
                </div>
                <Slider barClass={'music-progress'} progress={progress} func={handleProgressChange}></Slider>
            </div>
            <Slider barClass={'music-volume'} progress={volume} vertical={true} func={handleVolumeChange}></Slider>
            <div className={'music-list'}></div>
        </div>
    );
};

export default MusicPlayer;
