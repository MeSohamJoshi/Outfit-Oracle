import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './Components/Landing.jsx';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Navbar from './Components/Navbar';
import Wardrobe from "./Components/Wardrobe.jsx";
import fbconfig from "./firebase/firebaseConfig.js";
import { initializeApp } from "firebase/app";
import { AuthProvider } from "./Context/AuthContext.jsx";
import OutfitsPage from "./Components/Outfits";

const app = initializeApp(fbconfig);

function App() {
    return (
        <Router>
            <AuthProvider>
            <Navbar />
            <Routes>
                <Route path="/wardrobe" element={<Wardrobe />} />
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/outfits-ai" element={<OutfitsPage />} />
            </Routes>
            </AuthProvider>
        </Router>
    );
}

export default App;
