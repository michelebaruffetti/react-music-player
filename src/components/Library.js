import LibrarySong from "./LibrarySong"

const Library = ({songs, setCurrentSong, setIsPlaying, setSongs, libraryStatus}) => {
    return (
        <div className={`library ${libraryStatus ? 'active-library' : ''}`}>
            <h2>Library</h2>
            <div className="library-songs">
                {songs.map(song => {
                    return (
                        <LibrarySong 
                        key={song.id} 
                        song={song} 
                        songs={songs} 
                        setCurrentSong={setCurrentSong} 
                        setSongs={setSongs}
                        />
                    )
                })}           
            </div>
        </div>
    )
}

export default Library;