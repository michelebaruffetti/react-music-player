import { useState } from "react";
// import styles
import "./styles/app.scss"; 
//import components
import Song from './components/Song';
import Player from './components/Player';
// import songs
import data from './data.js'

function App() {
  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying]= useState(false);

  return (
    <div className="App">
      <h1>Music Player</h1>
      <Song currentSong={currentSong}/>
      <Player currentSong={currentSong} isPlaying={isPlaying} setIsPlaying={setIsPlaying}/>
    </div>
  );
}

export default App;
