import { NavLink, Outlet } from 'react-router-dom';
import styles from './Layout.module.css';
import ThemeToggle from '../common/ThemeToggle';

export function Layout() {
    return (
        <div className={styles.app}>
            <aside className={styles.sidebar}>
                <div className={styles.brand}>
                    <h1>Inventory Management System</h1>
                </div>

                <nav className={styles.nav}>
                    <NavLink
                        to="/"
                        end
                        className={({ isActive }) =>
                            isActive ? `${styles.link} ${styles.linkActive}` : styles.link
                        }
                    >
                        Dashboard
                    </NavLink>
                    <NavLink
                        to="/products"
                        className={({ isActive }) =>
                            isActive ? `${styles.link} ${styles.linkActive}` : styles.link
                        }
                    >
                        Products
                    </NavLink>
                    <NavLink
                        to="/categories"
                        className={({ isActive }) =>
                            isActive ? `${styles.link} ${styles.linkActive}` : styles.link
                        }
                    >
                        Categories
                    </NavLink>
                    <NavLink
                        to="/history"
                        className={({ isActive }) =>
                            isActive ? `${styles.link} ${styles.linkActive}` : styles.link
                        }
                    >
                        History
                    </NavLink>
                </nav>

                <div className={styles.sidebarFooter}>
                    <ThemeToggle />
                </div>
            </aside>

            <main className={styles.main}>
                <header className={styles.pageHeader}>
                    <h1 className={styles.brandTitle}>Inventory Management System</h1>
                </header>
                <Outlet />
            </main>
        </div>
    );
}

export default Layout;