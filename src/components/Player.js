import { useRef, useState, useEffect } from 'react';
// import fontawesome icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faAngleLeft, faAngleRight, faPause } from '@fortawesome/free-solid-svg-icons'

const Player = ({currentSong, isPlaying, setIsPlaying, setCurrentSong, songs, setSongs}) => {
    // ref
    const audioRef = useRef(null);
    //useEffect to update active song in library
    useEffect(() => {
        setSongs(
            songs.map( el => {
                return({
                    ...el,
                    active: el.id === currentSong.id
                })
            })
        );
    }, [currentSong])
    // event handlers
    const playSongHandler = () => {
        if (isPlaying){
            audioRef.current.pause();
            setIsPlaying(!isPlaying);
        }else{
        audioRef.current.play();
        setIsPlaying(!isPlaying);
        }
    }
    const timeUpdateHandler = (e) => {
        const current = e.target.currentTime; 
        const duration = e.target.duration || 0; 
        setSongInfo({...songInfo, currentTime: current, duration: duration});
    }
    const getTime = (time) => {
        return (
            Math.floor(time/60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
        )
    }
    const drugHandler = (e) => {
        audioRef.current.currentTime = e.target.value; 
        setSongInfo({...songInfo, currentTime: e.target.value});
    }
    const autoPlayHandler = () => {
        if (isPlaying) {
          audioRef.current.play();
        }
    }
    const skipTrackHandler = (direction) => {
        let currentSongIndex = songs.findIndex(song => song.id === currentSong.id);
        if(direction === 'skip-forward'){
            setCurrentSong(songs[currentSongIndex+1 === songs.length ? 0 : currentSongIndex+1]);
        }
        if(direction === 'skip-back'){
            setCurrentSong(songs[currentSongIndex-1 < 0 ? songs.length-1 : currentSongIndex-1]);
        }
    }
    const songEndHandler = () => {
        let currentSongIndex = songs.findIndex(song => song.id === currentSong.id);
        if(isPlaying){
            setCurrentSong(songs[currentSongIndex+1 === songs.length ? 0 : currentSongIndex+1]);
        }
    }
    
    //state for this component only
    const [songInfo, setSongInfo] = useState({
        currentTime: 0,
        duration: 0
    });
    
    return (
        <div className="player">
            <div className="time-control">
                <p>{getTime(songInfo.currentTime)}</p>
                <input onChange={drugHandler} min={0} max={songInfo.duration || 0} value={songInfo.currentTime} type="range" />
                <p>{getTime(songInfo.duration)}</p>
            </div>
            <div className="play-control">
            <FontAwesomeIcon onClick={() => skipTrackHandler('skip-back')} className='skip-back' icon={ faAngleLeft } size='2x' />
            <FontAwesomeIcon onClick={playSongHandler} className='play' icon={ isPlaying ? faPause : faPlay} />
            <FontAwesomeIcon onClick={() => skipTrackHandler('skip-forward')}className='skip-forward' icon={ faAngleRight } size='2x' />
            </div>
            <audio 
                ref={audioRef} 
                src={currentSong.audio} 
                onTimeUpdate={timeUpdateHandler}
                onLoadedMetadata={timeUpdateHandler}
                onLoadedData={autoPlayHandler}
                onEnded={songEndHandler}
            ></audio>
        </div>
    )
}

export default Player; 