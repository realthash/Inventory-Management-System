import { useState } from 'react';
import toast from 'react-hot-toast';
import ProductForm from '../components/ProductForm';
import FilterBar from '../components/FilterBar';
import ProductTable from '../components/ProductTable';
import './Products.css';

function Products({ products, categories, onAdd, onUpdate, onAdjustStock, onDelete, isSkuTaken }) {

    const [showForm, setShowForm] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [stockFilter, setStockFilter] = useState('');

    const filteredProducts = products.filter((product) => {
        const query = searchQuery.trim().toLowerCase();
        const matchesSearch =
            query === '' ||
            product.name.toLowerCase().includes(query) ||
            product.id.toLowerCase().includes(query);

        const matchesCategory =
            selectedCategory === '' || product.category === selectedCategory;

        const matchesStock =
            stockFilter === '' ||
            (stockFilter === 'in' && product.quantity > 0) ||
            (stockFilter === 'out' && product.quantity === 0);

        return matchesSearch && matchesCategory && matchesStock;
    });

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

    function handleDelete(id) {
        onDelete(id);
        toast.success('Product deleted');
    }

    function handleAdjustStock(productId, type, amount, note) {
        const result = onAdjustStock(productId, type, amount, note);
        if (result.success) {
            toast.success(type === 'IN' ? 'Stock added' : 'Stock removed');
        } else {
            toast.error(result.error);
        }
        return result;
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
                <>
                    <FilterBar
                        searchQuery={searchQuery}
                        onSearchChange={setSearchQuery}
                        categories={categories}
                        selectedCategory={selectedCategory}
                        onCategoryChange={setSelectedCategory}
                        stockFilter={stockFilter}
                        onStockFilterChange={setStockFilter}
                    />

                    <ProductTable
                        products={filteredProducts}
                        onEdit={openEditForm}
                        onDelete={handleDelete}
                        onAdjustStock={handleAdjustStock}
                    />
                </>
            )}
        </div>
    );
}


export default Products;