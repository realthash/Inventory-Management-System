import { useState, useEffect } from 'react';
import { KEYS, readFromLocalStorage, saveToLocalStorage } from '../utils/storage';

export function useTheme() {
    const [theme, setTheme] = useState(() => readFromLocalStorage(KEYS.THEME, 'light'));

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        saveToLocalStorage(KEYS.THEME, theme);
    }, [theme]);

    function toggleTheme() {
        setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
    }

    return { theme, toggleTheme };
}