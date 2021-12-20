import { useState } from "react";
// import styles
import "./styles/app.scss"; 
//import components
import Song from './components/Song';
import Player from './components/Player';
import Nav from "./components/Nav";
// import songs
import data from './data.js'
import Library from "./components/Library";

function App() {
  // state
  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying]= useState(false);
  const [libraryStatus, setLibraryStatus] = useState(false);

  return (
    <div className="App">
      <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus}/>
      <Song currentSong={currentSong}/>
      <Player currentSong={currentSong} isPlaying={isPlaying} setIsPlaying={setIsPlaying} songs={songs} setCurrentSong={setCurrentSong}/>
      <Library  libraryStatus={libraryStatus} songs={songs} setCurrentSong={setCurrentSong} setIsPlaying={setIsPlaying} setSongs={setSongs}/>
    </div>
  );
}

export default App;
