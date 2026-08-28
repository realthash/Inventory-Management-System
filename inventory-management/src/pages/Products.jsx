import { useState } from 'react';
import toast from 'react-hot-toast';
import ProductForm from '../components/ProductForm';
import './Products.css';

function Products({ products, categories, onAdd, onUpdate, isSkuTaken }) {

    const [showForm, setShowForm] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);

    function openAddForm() {
        setEditingProduct(null);
        setShowForm(true);
    }

    function openEditForm(product) {
        setEditingProduct(product);
        setShowForm(true);
    }

    function closeForm() {
        setShowForm(false);
        setEditingProduct(null);
    }

    function handleSubmit(values) {
        if (editingProduct) {
            onUpdate(editingProduct.id, values);
            toast.success('Product updated');
        } else {
            onAdd(values);
            toast.success('Product added');
        }
        closeForm();
    }

    return (
        <div>
            <div className="header">
                <h2>Products</h2>
                {!showForm && (
                    <button className="addBtn" onClick={openAddForm}>
                        + Add Product
                    </button>
                )}
            </div>

            {categories.length === 0 && (
                <p className="hint">
                    Tip: create a category first so you can assign products to it.
                </p>
            )}

            {showForm && (
                <ProductForm
                    categories={categories}
                    initialProduct={editingProduct}
                    onSubmit={handleSubmit}
                    onCancel={closeForm}
                    isSkuTaken={isSkuTaken}
                />
            )}

            {products.length === 0 ? (
                <p className="empty">No products yet. Click "Add Product" to start.</p>
            ) : (
                <ul className="tempList">
                    {products.map((p) => (
                        <li key={p.id}>
                            {p.name} — {p.id} — {p.category} — ${p.price} — Qty: {p.quantity}
                            <button onClick={() => openEditForm(p)}>Edit</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}


export default Products;