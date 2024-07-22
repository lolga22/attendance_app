import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Employees from './components/Employees';
import Timesheets from './components/Timesheets';
import ThemeToggle from './components/ThemeToggle';
import './App.css';
import './styles.css';

function App() {
    const [theme, setTheme] = useState('light');

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    return (
        <Router>
            <div className={theme === 'light' ? 'light-mode' : 'dark-mode'}>
                <nav>
                    <ul>
                        <li><Link to="/employees">Employees</Link></li>
                        <li><Link to="/timesheets">Timesheets</Link></li>
                    </ul>
                    <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
                </nav>
                <Routes>
                    <Route path="/employees" element={<Employees />} />
                    <Route path="/timesheets" element={<Timesheets />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
