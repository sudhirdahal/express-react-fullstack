import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Products from './pages/Products';
import Users from './pages/Users';
import './App.css';

function App() {
    return (
        <BrowserRouter>
            <div className="app">
                <Navbar />
                <main>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/products" element={<Products />} />
                        <Route path="/users" element={<Users />} />
                    </Routes>
                </main>
            </div>
        </BrowserRouter>
    );
}

export default App;
