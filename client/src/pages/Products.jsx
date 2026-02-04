import { useState, useEffect } from 'react';
import { getProducts, createProduct, deleteProduct } from '../services/api';
import './Pages.css';

function Products() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [sort, setSort] = useState('newest');
    const [newName, setNewName] = useState('');
    const [newPrice, setNewPrice] = useState('');
    const [apiKey, setApiKey] = useState('');

    const fetchProducts = async () => {
        setLoading(true);
        const data = await getProducts(search, sort);
        setProducts(data.data?.products || []);
        setLoading(false);
    };

    useEffect(() => {
        fetchProducts();
    }, [sort]);

    const handleSearch = (e) => {
        e.preventDefault();
        fetchProducts();
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        if (!newName || !newPrice || !apiKey) return;

        const result = await createProduct(newName, Number(newPrice), apiKey);
        if (result.status === 'success') {
            setNewName('');
            setNewPrice('');
            fetchProducts();
        } else {
            alert(result.message || 'Failed to create product');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this product?')) return;

        const result = await deleteProduct(id);
        if (result.status === 'success') {
            fetchProducts();
        }
    };

    const clearFilters = () => {
        setSearch('');
        setSort('newest');
        fetchProducts();
    };

    return (
        <div className="page">
            <h1>Our Professional Catalog</h1>

            <form className="filter-form" onSubmit={handleSearch}>
                <input
                    type="text"
                    placeholder="Search products..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <select value={sort} onChange={(e) => setSort(e.target.value)}>
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                    <option value="price_asc">Price: Low to High</option>
                    <option value="price_desc">Price: High to Low</option>
                </select>
                <button type="submit" className="btn btn-primary">Apply</button>
                <button type="button" className="btn-link" onClick={clearFilters}>Clear</button>
            </form>

            {loading ? (
                <p className="loading">Loading...</p>
            ) : (
                <div className="card-grid">
                    {products.map((product) => (
                        <div key={product._id} className="card">
                            <div className="icon product-icon">$</div>
                            <h3>{product.name}</h3>
                            <p className="price">${product.price}</p>
                            <p className="subtitle">
                                Added {new Date(product.createdAt).toLocaleDateString()}
                            </p>
                            <div className="card-actions">
                                <button className="btn btn-primary">Add to Cart</button>
                                <button
                                    className="btn btn-danger"
                                    onClick={() => handleDelete(product._id)}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <div className="add-form">
                <h2>Add a New Product</h2>
                <form onSubmit={handleCreate}>
                    <input
                        type="text"
                        placeholder="Product Name"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        required
                    />
                    <input
                        type="number"
                        placeholder="Price"
                        value={newPrice}
                        onChange={(e) => setNewPrice(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="API Key"
                        value={apiKey}
                        onChange={(e) => setApiKey(e.target.value)}
                        required
                    />
                    <button type="submit" className="btn btn-success">Create Product</button>
                </form>
            </div>
        </div>
    );
}

export default Products;
