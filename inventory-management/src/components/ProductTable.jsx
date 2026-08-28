import { formatCurrency } from '../utils/formatCurrency';
import styles from './ProductTable.module.css';

function ProductTable({ products, onEdit, onDelete }) {
    if (products.length === 0) {
        return <p className={styles.empty}>No products match your filters.</p>;
    }

    function handleDelete(product) {
        if (window.confirm(`Delete "${product.name}"? This cannot be undone.`)) {
            onDelete(product.id);
        }
    }

    return (
        <div className={styles.tableWrapper}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Product ID</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Stock</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product.id}>
                            <td>{product.name}</td>
                            <td className={styles.mono}>{product.id}</td>
                            <td>{product.category}</td>
                            <td>{formatCurrency(product.price)}</td>
                            <td>
                                <span
                                    className={
                                        product.quantity === 0
                                            ? styles.stockOut
                                            : product.quantity < 10
                                                ? styles.stockLow
                                                : styles.stockOk
                                    }
                                >
                                    {product.quantity}
                                </span>
                            </td>
                            <td>
                                <div className={styles.actions}>
                                    <button className={styles.editBtn} onClick={() => onEdit(product)}>
                                        Edit
                                    </button>
                                    <button
                                        className={styles.deleteBtn}
                                        onClick={() => handleDelete(product)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ProductTable;