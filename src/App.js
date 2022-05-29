import {useState} from 'react'

import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'

import './App.css';
import NavBar from './components/navBar'
import Grid from './components/grid'
import Favorite from './components/favourite'

// importing context
import FavouriteContext from './context/likedContext' 

function App() {
  const [favouriteCatData,setFavouriteCatData] = useState([])
  return (
    <div className="App">
      <FavouriteContext.Provider value = {{favouriteCatData,setFavouriteCatData}}>
        <Router>
          <NavBar/> 
          <Routes>
            <Route path="/" element={<Grid/>}/>
            <Route path="likedcats" element={<Favorite/>}/>
          </Routes>
        </Router>
      </FavouriteContext.Provider>
    </div>
  );
}

export default App;
