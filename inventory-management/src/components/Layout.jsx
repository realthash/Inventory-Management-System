import { NavLink, Outlet } from 'react-router-dom';
import styles from './Layout.module.css';
// import ThemeToggle from './ThemeToggle';

export function Layout() {
    return (
        <div className={styles.app}>
            <aside className={styles.sidebar}>
                <div className={styles.brand}>
                    <h1>Inventory Management System</h1>
                    {/* <ThemeToggle /> */}
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
                </nav>
            </aside>

            <main className={styles.main}>
                <Outlet />
            </main>
        </div>
    );
}

export default Layout;