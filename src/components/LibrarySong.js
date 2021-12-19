
const LibrarySong = ({song, setCurrentSong, songs, setSongs}) => {
    //handler
    const songSelectHandler = () =>{
        setCurrentSong(song);
        setSongs(
            songs.map( el => {
                return({
                    ...el,
                    active: el.id === song.id
                })
            })
        );
    }

    return (
        <div onClick={songSelectHandler} className={`library-song ${song.active ? 'selected' : ''}`} >
            <img alt={song.name} src={song.cover}></img>
            <div className="song-description">
                <h3>{song.name}</h3>
                <h4>{song.artist}</h4>
            </div>
        </div>
    )
}

export default LibrarySong;  