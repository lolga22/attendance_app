import React from 'react';
import '../styles.css';

const ThemeToggle = ({ theme, toggleTheme }) => {
    return (
        <button className="theme-toggle" onClick={toggleTheme}>
            Switch to {theme === 'light' ? 'Dark' : 'Light'} Theme
        </button>
    );
};

export default ThemeToggle;
