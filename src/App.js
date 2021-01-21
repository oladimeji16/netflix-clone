import React, { useEffect } from "react";

import Row from './Components/Rows/Rows'
import requests from './Utils/request'

import "./App.css";

function App() {
  useEffect(() => {}, []);
  return (
    <div className="App">
      <h1>Netflix clone</h1>
      <Row title="NETFLIX ORIGINALS" fetchUrl={requests.fetchNetflixOriginals} />
      <Row title="Trending Now" fetchUrl={requests.fetchTrending}/> 
    </div>
  );
}

export default App;
