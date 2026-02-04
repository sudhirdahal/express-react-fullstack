import { Link } from 'react-router-dom';
import './Pages.css';

function Home() {
    return (
        <div className="page home">
            <h1>Welcome to My App</h1>
            <p className="intro">A modern e-commerce platform built with React and Express</p>

            <div className="card-grid home-cards">
                <Link to="/products" className="card home-card">
                    <div className="icon product-icon">$</div>
                    <h3>Products</h3>
                    <p className="subtitle">Browse our catalog</p>
                </Link>

                <Link to="/users" className="card home-card">
                    <div className="icon avatar">U</div>
                    <h3>Users</h3>
                    <p className="subtitle">Meet our team</p>
                </Link>
            </div>
        </div>
    );
}

export default Home;
