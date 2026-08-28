import { formatDateTime } from '../utils/formatDateTime';
import styles from './History.module.css';

function History({ stockLogs }) {
    return (
        <div>
            <h2 className={styles.heading}>Stock History</h2>

            {stockLogs.length === 0 ? (
                <p className={styles.empty}>
                    No stock movements yet. Add or remove stock from the Products page.
                </p>
            ) : (
                <div className={styles.tableWrapper}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>When</th>
                                <th>Product</th>
                                <th>Type</th>
                                <th>Amount</th>
                                <th>New Stock</th>
                                <th>Note</th>
                            </tr>
                        </thead>
                        <tbody>
                            {stockLogs.map((log) => (
                                <tr key={log.id}>
                                    <td className={styles.muted}>{formatDateTime(log.timestamp)}</td>
                                    <td>{log.productName}</td>
                                    <td>
                                        <span
                                            className={log.type === 'IN' ? styles.typeIn : styles.typeOut}
                                        >
                                            {log.type === 'IN' ? 'Restock' : 'Sale'}
                                        </span>
                                    </td>
                                    <td>
                                        {log.type === 'IN' ? '+' : '−'}
                                        {log.amount}
                                    </td>
                                    <td>{log.newQty}</td>
                                    <td className={styles.muted}>{log.note || '—'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default History;