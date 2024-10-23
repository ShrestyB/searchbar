import React, { useState } from 'react';
import axios from 'axios';
import './App.css'; // Import CSS

const App = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(`http://localhost:5000/search?q=${query}`);
            setResults(response.data);
        } catch (error) {
            console.error('Error fetching search results:', error);
        }
    };

    return (
        <div className="container">
            <h1 className="title">Search Bar</h1>
            <form onSubmit={handleSearch} className="search-form">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search for items..."
                    className="search-input"
                />
                <button type="submit" className="search-button">
                    🔍 Search
                </button>
            </form>

            <ul className="results-list">
                {results.map((item, index) => (
                    <li key={index} className="result-item">
                        <h3>{item.name}</h3>
                        <p>{item.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default App;
