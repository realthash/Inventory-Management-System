import styles from './StatCard.module.css';

function StatCard({ label, value, tone = 'default' }) {
    return (
        <div className={`${styles.card} ${styles[tone]}`}>
            <div className={styles.value}>{value}</div>
            <div className={styles.label}>{label}</div>
        </div>
    );
}

export default StatCard;