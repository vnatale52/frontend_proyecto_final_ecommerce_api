// js/api.js

// Apunta a la URL del backend. 
const BASE_URL = 'https://backend-proyecto-final-ecommerce-api.onrender.com'; // URL de Render o 'http://localhost:3000'

// --- Funciones de Autenticación ---

export async function login(email, password) {
    const response = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });
    if (!response.ok) throw new Error('Error en el login');
    return await response.json(); // Devuelve { token: "..." }
}

// --- Funciones de Productos ---

export async function getProducts() {
    const response = await fetch(`${BASE_URL}/api/products`);
    if (!response.ok) throw new Error('Error al obtener productos');
    return await response.json();
}

export async function createProduct(productData, token) {
    const response = await fetch(`${BASE_URL}/api/products`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token // Envía el token para la autenticación
        },
        body: JSON.stringify(productData)
    });
    if (!response.ok) throw new Error('Error al crear producto');
    return await response.json();
}

export async function updateProduct(id, productData, token) {
    const response = await fetch(`${BASE_URL}/api/products/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify(productData)
    });
    if (!response.ok) throw new Error('Error al actualizar producto');
    return await response.json();
}

export async function deleteProduct(id, token) {
    const response = await fetch(`${BASE_URL}/api/products/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': token }
    });
    // La respuesta DELETE exitosa (204) no tiene cuerpo JSON
    if (!response.ok) throw new Error('Error al eliminar producto');
}