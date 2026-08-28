import styles from './FilterBar.module.css';

function FilterBar({
    searchQuery,
    onSearchChange,
    categories,
    selectedCategory,
    onCategoryChange,
    stockFilter,
    onStockFilterChange,
}) {
    return (
        <div className={styles.bar}>
            <input
                type="text"
                className={styles.search}
                placeholder="Search by name or Product ID..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
            />

            <select
                className={styles.select}
                value={selectedCategory}
                onChange={(e) => onCategoryChange(e.target.value)}
            >
                <option value="">All Categories</option>
                {categories.map((cat) => (
                    <option key={cat} value={cat}>
                        {cat}
                    </option>
                ))}
            </select>

            <select
                className={styles.select}
                value={stockFilter}
                onChange={(e) => onStockFilterChange(e.target.value)}
            >
                <option value="">All Stock</option>
                <option value="in">In Stock</option>
                <option value="out">Out of Stock</option>
            </select>
        </div>
    );
}

export default FilterBar;