import { useState, useEffect } from "react";
import { Routes, Route } from 'react-router-dom'
import { KEYS, readFromLocalStorage, saveToLocalStorage } from "./utils/storage";
import { generateSku } from "./utils/generator";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Products from './pages/Products';
import Categories from './pages/Categories'
import History from './pages/History';
import './App.css';

function App() {

  const [products, setProducts] = useState(() => readFromLocalStorage(KEYS.PRODUCTS, []));
  const [categories, setCategories] = useState(() => readFromLocalStorage(KEYS.CATEGORIES, []));
  const [stockLogs, setStockLogs] = useState(() => readFromLocalStorage(KEYS.STOCK_LOGS, []));


  useEffect(() => {
    saveToLocalStorage(KEYS.PRODUCTS, products)
  }, [products])

  useEffect(() => {
    saveToLocalStorage(KEYS.CATEGORIES, categories)
  }, [categories])

  useEffect(() => {
    saveToLocalStorage(KEYS.STOCK_LOGS, stockLogs)
  }, [stockLogs])


  function addLog(entry) {
    setStockLogs((prev) => [
      { id: crypto.randomUUID(), timestamp: new Date().toISOString(), ...entry },
      ...prev,
    ]);
  }

  function addProduct(values) {
    const product = {
      id: values.id || generateSku(),
      name: values.name,
      category: values.category,
      price: Number(values.price),
      quantity: Number(values.quantity),
      createdAt: new Date().toISOString(),
    };

    setProducts((prev) => [product, ...prev]);

    if (product.quantity > 0) {
      addLog({
        productId: product.id,
        productName: product.name,
        type: 'IN',
        amount: product.quantity,
        newQty: product.quantity,
        note: 'Initial stock',
      });
    }
  }

  function updateProduct(id, values) {
    setProducts((prev) =>
      prev.map((product) =>
        product.id === id
          ? { ...product, name: values.name, category: values.category, price: Number(values.price) }
          : product
      )
    );
  }

  function deleteProduct(id) {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    setStockLogs((prev) => prev.filter((log) => log.productId !== id));
  }

  function isSkuTaken(sku) {
    return products.some((p) => p.id.toLowerCase() === sku.toLowerCase());
  }

  function adjustStock(productId, type, amount, note = '') {
    const product = products.find((p) => p.id === productId);
    const qty = Number(amount);
    const newQty = type === 'IN' ? product.quantity + qty : product.quantity - qty;

    if (newQty < 0) {
      return { success: false, error: `Only ${product.quantity} units in stock.` };
    }

    setProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, quantity: newQty } : p))
    );

    addLog({
      productId,
      productName: product.name,
      type,
      amount: qty,
      newQty,
      note,
    });

    return { success: true };
  }

  function addCategory(name) {
    setCategories((prev) => [...prev, name]);
  }

  function deleteCategory(name) {
    const inUse = products.filter((p) => p.category === name).length;
    if (inUse > 0) {
      return { success: false, error: `${inUse} product(s) still use this category.` };
    }
    setCategories((prev) => prev.filter((c) => c !== name));
    return { success: true };
  }

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route
          path="products"
          element={
            <Products
              products={products}
              categories={categories}
              onAdd={addProduct}
              onUpdate={updateProduct}
              onDelete={deleteProduct}
              onAdjustStock={adjustStock}
              isSkuTaken={isSkuTaken}
            />
          }
        />
        <Route
          path="categories"
          element={
            <Categories
              categories={categories}
              products={products}
              onAdd={addCategory}
              onDelete={deleteCategory}
            />
          }
        />
        <Route
          path="history"
          element={<History stockLogs={stockLogs} />}
        />
      </Route>
    </Routes>
  );
}

export default App
