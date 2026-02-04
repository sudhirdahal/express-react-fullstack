const API_URL = import.meta.env.VITE_API_URL;

// Users API
export const getUsers = async (search = '', sort = 'newest') => {
    const params = new URLSearchParams();
    if (search) params.append('search', search);
    if (sort) params.append('sort', sort);

    const response = await fetch(`${API_URL}/users?${params}`);
    return response.json();
};

export const createUser = async (name) => {
    const response = await fetch(`${API_URL}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name })
    });
    return response.json();
};

export const deleteUser = async (id) => {
    const response = await fetch(`${API_URL}/users/${id}`, {
        method: 'DELETE'
    });
    return response.json();
};

// Products API
export const getProducts = async (search = '', sort = 'newest') => {
    const params = new URLSearchParams();
    if (search) params.append('search', search);
    if (sort) params.append('sort', sort);

    const response = await fetch(`${API_URL}/products?${params}`);
    return response.json();
};

export const createProduct = async (name, price, apiKey) => {
    const response = await fetch(`${API_URL}/products`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': apiKey
        },
        body: JSON.stringify({ name, price })
    });
    return response.json();
};

export const deleteProduct = async (id) => {
    const response = await fetch(`${API_URL}/products/${id}`, {
        method: 'DELETE'
    });
    return response.json();
};
