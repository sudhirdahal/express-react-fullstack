import { useState, useEffect } from 'react';
import { getUsers, createUser, deleteUser } from '../services/api';
import './Pages.css';

function Users() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [sort, setSort] = useState('newest');
    const [newName, setNewName] = useState('');

    const fetchUsers = async () => {
        setLoading(true);
        const data = await getUsers(search, sort);
        setUsers(data.data?.users || []);
        setLoading(false);
    };

    useEffect(() => {
        fetchUsers();
    }, [sort]);

    const handleSearch = (e) => {
        e.preventDefault();
        fetchUsers();
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        if (!newName) return;

        const result = await createUser(newName);
        if (result.status === 'success') {
            setNewName('');
            fetchUsers();
        } else {
            alert(result.message || 'Failed to create user');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this user?')) return;

        const result = await deleteUser(id);
        if (result.status === 'success') {
            fetchUsers();
        }
    };

    const clearFilters = () => {
        setSearch('');
        setSort('newest');
        fetchUsers();
    };

    return (
        <div className="page">
            <h1>Our Team</h1>

            <form className="filter-form" onSubmit={handleSearch}>
                <input
                    type="text"
                    placeholder="Search users..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <select value={sort} onChange={(e) => setSort(e.target.value)}>
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                    <option value="name_asc">Name: A-Z</option>
                    <option value="name_desc">Name: Z-A</option>
                </select>
                <button type="submit" className="btn btn-primary">Apply</button>
                <button type="button" className="btn-link" onClick={clearFilters}>Clear</button>
            </form>

            {loading ? (
                <p className="loading">Loading...</p>
            ) : (
                <div className="card-grid">
                    {users.map((user) => (
                        <div key={user._id} className="card">
                            <div className="icon avatar">
                                {user.name.charAt(0).toUpperCase()}
                            </div>
                            <h3>{user.name}</h3>
                            <p className="subtitle">
                                Joined {new Date(user.createdAt).toLocaleDateString()}
                            </p>
                            <div className="card-actions">
                                <button
                                    className="btn btn-danger"
                                    onClick={() => handleDelete(user._id)}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <div className="add-form">
                <h2>Add a New User</h2>
                <form onSubmit={handleCreate}>
                    <input
                        type="text"
                        placeholder="User Name"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        required
                    />
                    <button type="submit" className="btn btn-success">Create User</button>
                </form>
            </div>
        </div>
    );
}

export default Users;
