import LibrarySong from "./LibrarySong"

const Library = ({songs, setCurrentSong, setIsPlaying}) => {
    return (
        <div className="library">
            <h2>Library</h2>
            <div className="library-songs">
                {songs.map(song => {
                    return (
                        <LibrarySong key={song.id} song={song} songs={songs} setCurrentSong={setCurrentSong} setIsPlaying={setIsPlaying}/>
                    )
                })}           
            </div>
        </div>
    )
}

export default Library;