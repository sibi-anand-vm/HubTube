import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserProvider from './contexts/UserProvider';
import VideoProvider from './contexts/VideoProvider';
import Landingpage from './pages/Landing';
import Moviespage from './pages/Movies';
import Signup from './pages/Signup';
import Seriespage from './pages/Series';
import Videopage from './pages/Videopage';
import Loginpage from './pages/Loginpage';
import Myground from './pages/Myground';
import Adminpage from './pages/Adminpage';
import Home from './pages/Home'; 

function App() {
  return (
    <UserProvider>
      <VideoProvider>
        <Router>
          <Routes>
            {/* Removed ProtectedRoute for testing */}
            <Route path="/videoscreen" element={<Videopage />} />
            <Route path="/login" element={<Loginpage />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/" element={<Landingpage />} />
            <Route path="/Admindash" element={<Adminpage />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/Movies" element={<Moviespage />} />
            <Route path="/Series" element={<Seriespage />} />
            <Route path="/Ground" element={<Myground />} />
          </Routes>
        </Router>
      </VideoProvider>
    </UserProvider>
  );
}

export default App;
