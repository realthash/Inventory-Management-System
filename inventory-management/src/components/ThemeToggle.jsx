import { useTheme } from '../hooks/useTheme';
import { Sun, Moon } from 'lucide-react';
import styles from './ThemeToggle.module.css';

function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className={styles.toggle}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
            {theme === 'light' ? (
                <Moon size={25} className={styles.moonIcon} />
            ) : (
                <Sun size={25} className={styles.sunIcon} />
            )}
        </button>
    );
}

export default ThemeToggle;