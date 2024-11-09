// src/MusicPlayer.tsx
import React, {useEffect, useRef, useState} from 'react';
import "./MusicPlayer.less"
import {IconPlay} from "../Icon/icons/iconPlay.tsx";
import {IconPause} from "../Icon/icons/iconPause.tsx";
import Slider from "../Slider/Slider.tsx";
import {IconLeftArrow} from "../Icon/icons/iconLeftArrow.tsx";
import {IconRightArrow} from "../Icon/icons/iconRightArrow.tsx";
import {IconList} from "../Icon/icons/iconList.tsx";
import {Song} from "../../api/musicService.tsx";
interface MusicPlayerProps {
    className?: string;
    songs: Song[];
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({className,songs=[]}) => {
    const [currentSongIndex, setCurrentSongIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isFirst, setIsFirst] = useState(true);
    const [progress, setProgress] = useState(0);
    const [volume, setVolume] = useState(0);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    //手动切换
    const handleNextSong = () => {
        setCurrentSongIndex((currentSongIndex + 1) % songs.length);
    };
    const handlePrevSong = () => {
        setCurrentSongIndex((currentSongIndex - 1 + songs.length) % songs.length);
    };
    const playMusic = ()=>{
        if(isPlaying) audioRef.current?.play();
    }

    useEffect(() => {
        if(isFirst){
            handleVolumeChange(0)
        }
        //准备下一曲
        if(songs.length > 0 && audioRef.current &&  (isFirst || ( isPlaying && audioRef.current.src.indexOf(songs[currentSongIndex].url) === -1 ))){
            setIsFirst(false)
            audioRef.current.src = songs[currentSongIndex].url;
            audioRef.current.load();
        }
        audioRef.current?.addEventListener('timeupdate', handleTimeUpdate)
        audioRef.current?.addEventListener('loadeddata',playMusic)
        return () => {
            audioRef.current?.removeEventListener('loadeddata',playMusic)
            audioRef.current?.removeEventListener('timeupdate', handleTimeUpdate)
        };
    }, [currentSongIndex, isPlaying, songs]);
    const handlePlayPause = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };
    const handleProgressChange = (v: number) => {
        if (audioRef.current && !isNaN(audioRef.current.duration)) {
            if(v >= 100){
                v = 99
            }
            audioRef.current.currentTime = (audioRef.current.duration / 100) * v;
            setProgress(v);
        }
    };
    const handleTimeUpdate =() => {
        if (audioRef.current && !isNaN(audioRef.current.duration)) {
            const buf = (audioRef.current.currentTime / audioRef.current.duration) * 100;
            setProgress(buf);
            if(buf >= 100){
                setCurrentSongIndex((currentSongIndex + 1) % songs.length);
            }
        }
    };
    const handleVolumeChange = (v: number) => {
        const newVolume = v;
        setVolume(newVolume);
        if (audioRef.current) {
            audioRef.current.volume = newVolume < 0.01 ? 0 : newVolume / 100;
        }
    };

    return (
        songs.length > 0 &&
        <div className={`music-player ${className ? className : ' '}`}>
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

export default React.memo(MusicPlayer);
