import { useRef, useState } from 'react';
// import fontawesome icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faAngleLeft, faAngleRight, faPause } from '@fortawesome/free-solid-svg-icons'

const Player = ({currentSong, isPlaying, setIsPlaying}) => {
    // ref
    const audioRef = useRef(null);
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
            <FontAwesomeIcon className='skip-back' icon={ faAngleLeft } size='2x' />
            <FontAwesomeIcon onClick={playSongHandler} className='play' icon={ isPlaying ? faPause : faPlay} />
            <FontAwesomeIcon className='skip-forward' icon={ faAngleRight } size='2x' />
            </div>
            <audio 
                ref={audioRef} 
                src={currentSong.audio} 
                onTimeUpdate={timeUpdateHandler}
                onLoadedMetadata={timeUpdateHandler}
                onLoadedData={autoPlayHandler}
            ></audio>
        </div>
    )
}

export default Player; 