import StatCard from '../components/StatCard';
import { formatCurrency } from '../utils/formatCurrency';
import styles from './Dashboard.module.css';

const LOW_STOCK_THRESHOLD = 10;

function Dashboard({ products, categories }) {

    const totalProducts = products.length;

    const totalValue = products.reduce(
        (sum, product) => sum + product.price * product.quantity,
        0
    );

    const outOfStock = products.filter((p) => p.quantity === 0);
    const lowStock = products.filter(
        (p) => p.quantity > 0 && p.quantity < LOW_STOCK_THRESHOLD
    );

    const categoryCounts = categories.map((cat) => ({
        name: cat,
        count: products.filter((p) => p.category === cat).length,
    }));

    // ---------- Render ----------
    return (
        <div>
            <h2 className={styles.heading}>Dashboard</h2>

            <div className={styles.stats}>
                <StatCard label="Products" value={totalProducts} />
                <StatCard label="Total Value" value={formatCurrency(totalValue)} tone="success" />
                <StatCard label="Categories" value={categories.length} />
                <StatCard
                    label="Out of Stock"
                    value={outOfStock.length}
                    tone={outOfStock.length > 0 ? 'danger' : 'default'}
                />
            </div>

            <div className={styles.grid}>
                <section className={styles.panel}>
                    <h3 className={styles.panelTitle}>Products by Category</h3>
                    {categoryCounts.length === 0 ? (
                        <p className={styles.empty}>No categories yet.</p>
                    ) : (
                        <ul className={styles.categoryList}>
                            {categoryCounts.map(({ name, count }) => (
                                <li key={name} className={styles.categoryItem}>
                                    <span>{name}</span>
                                    <span className={styles.categoryCount}>{count}</span>
                                </li>
                            ))}
                        </ul>
                    )}
                </section>

                <section className={styles.panel}>
                    <h3 className={styles.panelTitle}>Needs Attention</h3>
                    {outOfStock.length === 0 && lowStock.length === 0 ? (
                        <p className={styles.empty}>No items currently require restocking or review.</p>
                    ) : (
                        <ul className={styles.alertList}>
                            {outOfStock.map((p) => (
                                <li key={p.id} className={styles.alertItem}>
                                    <span>{p.name}</span>
                                    <span className={styles.badgeDanger}>Out of Stock</span>
                                </li>
                            ))}
                            {lowStock.map((p) => (
                                <li key={p.id} className={styles.alertItem}>
                                    <span>{p.name}</span>
                                    <span className={styles.badgeWarning}>Low ({p.quantity})</span>
                                </li>
                            ))}
                        </ul>
                    )}
                </section>
            </div>
        </div>
    );
}

export default Dashboard;