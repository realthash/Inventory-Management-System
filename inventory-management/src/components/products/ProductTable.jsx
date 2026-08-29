import { Fragment, useState } from 'react';
import StockAdjustForm from './StockAdjustForm';
import { formatCurrency } from '../../utils/formatCurrency';
import styles from './ProductTable.module.css';

function ProductTable({ products, onEdit, onDelete, onAdjustStock }) {
    const [stockRow, setStockRow] = useState(null);

    if (products.length === 0) {
        return <p className={styles.empty}>No products match your filters.</p>;
    }

    function handleDelete(product) {
        if (window.confirm(`Delete "${product.name}"? This cannot be undone.`)) {
            onDelete(product.id);
        }
    }

    function openStockForm(productId, type) {
        setStockRow({ productId, type });
    }

    function closeStockForm() {
        setStockRow(null);
    }

    function handleStockSubmit(product, values) {
        const result = onAdjustStock(product.id, stockRow.type, values.amount, values.note);
        if (result.success) {
            closeStockForm();
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
                    {products.map((product) => {
                        const isAdjusting = stockRow?.productId === product.id;
                        return (
                            <Fragment key={product.id}>
                                <tr >
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
                                            <button
                                                className={styles.stockInBtn}
                                                onClick={() => openStockForm(product.id, 'IN')}
                                                title="Add stock"
                                            >
                                                +
                                            </button>
                                            <button
                                                className={styles.stockOutBtn}
                                                onClick={() => openStockForm(product.id, 'OUT')}
                                                title="Remove stock"
                                                disabled={product.quantity === 0}
                                            >
                                                −
                                            </button>
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
                                {isAdjusting && (
                                    <tr key={`${product.id}-adjust`} className={styles.adjustRow}>
                                        <td colSpan={6}>
                                            <StockAdjustForm
                                                product={product}
                                                type={stockRow.type}
                                                onSubmit={(values) => handleStockSubmit(product, values)}
                                                onCancel={closeStockForm}
                                            />
                                        </td>
                                    </tr>
                                )}
                            </Fragment>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default ProductTable;