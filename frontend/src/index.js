import React from 'react';
import { createRoot } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import './index.scss'; // Importowanie głównego pliku stylów

createRoot(document.getElementById('root')).render(
    <Router>
        <App />
    </Router>
);
