import toast from 'react-hot-toast';
import CategoryForm from '../components/categories/CategoryForm';
import styles from './Categories.module.css';

function Categories({ categories, products, onAdd, onDelete }) {
    function handleAdd(name) {
        onAdd(name);
        toast.success('Category added');
    }

    function handleDelete(name) {
        const count = products.filter((p) => p.category === name).length;

        if (count > 0) {
            toast.error(`Cannot delete — ${count} product(s) still use this category.`);
            return;
        }

        if (window.confirm(`Delete category "${name}"?`)) {
            const result = onDelete(name);
            if (result.success) {
                toast.success('Category deleted');
            } else {
                toast.error(result.error);
            }
        }
    }

    function getProductCount(name) {
        return products.filter((p) => p.category === name).length;
    }

    return (
        <div>
            <h2 className={styles.heading}>Categories</h2>

            <CategoryForm existingCategories={categories} onSubmit={handleAdd} />

            {categories.length === 0 ? (
                <p className={styles.empty}>
                    No categories yet. Add your first one above.
                </p>
            ) : (
                <ul className={styles.list}>
                    {categories.map((name) => {
                        const count = getProductCount(name);
                        return (
                            <li key={name} className={styles.item}>
                                <div className={styles.info}>
                                    <span className={styles.name}>{name}</span>
                                    <span className={styles.count}>
                                        {count} {count === 1 ? 'product' : 'products'}
                                    </span>
                                </div>
                                <button
                                    className={styles.deleteBtn}
                                    onClick={() => handleDelete(name)}
                                    disabled={count > 0}
                                    title={count > 0 ? 'Remove products from this category first' : 'Delete category'}
                                >
                                    Delete
                                </button>
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
}

export default Categories;