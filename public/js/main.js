// js/main.js

import * as api from './api.js';
import * as ui from './ui.js';

// --- Estado de la Aplicación ---
let products = [];
let token = localStorage.getItem('authToken'); // Recupera el token al cargar

// --- Funciones Principales ---

// Carga y renderiza todos los productos
async function loadProducts() {
    try {
        products = await api.getProducts();
        ui.renderProducts(products);
    } catch (error) {
        console.error(error);
        alert('No se pudieron cargar los productos.');
    }
}

// Maneja el envío del formulario de login
async function handleLogin(event) {
    event.preventDefault(); // Evita que la página se recargue
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    try {
        const data = await api.login(email, password);
        token = data.token;
        localStorage.setItem('authToken', token); // Guarda el token
        ui.updateAuthUI(true, email);
    } catch (error) {
        console.error(error);
        alert('Vincenzo dice: "Login fallido. Revisa tus credenciales".');
    }
}

// Maneja el logout
function handleLogout() {
    token = null;
    localStorage.removeItem('authToken'); // Elimina el token
    ui.updateAuthUI(false);
}

// Maneja el envío del formulario de producto (crear o editar)
async function handleProductFormSubmit(event) {
    event.preventDefault();
    const id = document.getElementById('product-id').value;
    const productData = {
        name: document.getElementById('product-name').value,
        price: parseFloat(document.getElementById('product-price').value),
        category: document.getElementById('product-category').value.split(',').map(s => s.trim()),
    };

    try {
        if (id) {
            // Si hay un ID, actualizamos
            await api.updateProduct(id, productData, token);
        } else {
            // Si no, creamos
            await api.createProduct(productData, token);
        }
        ui.hideModal();
        loadProducts(); // Recargamos la lista de productos
    } catch (error) {
        console.error(error);
        alert('Error al guardar el producto. Asegúrate de estar logueado.');
    }
}

// Maneja los clics en los botones de editar o eliminar
async function handleProductActions(event) {
    const target = event.target;
    const productId = target.dataset.id;

    if (target.matches('.edit-button')) {
        const productToEdit = products.find(p => p.id === productId);
        ui.showModal(productToEdit);
    }

    if (target.matches('.delete-button')) {
        if (confirm('¿Estás seguro de que quieres eliminar este producto?')) {
            try {
                await api.deleteProduct(productId, token);
                loadProducts(); // Recargamos la lista
            } catch (error) {
                console.error(error);
                alert('Error al eliminar el producto. Asegúrate de estar logueado.');
            }
        }
    }
}


// --- Inicialización y Asignación de Eventos ---

// Se ejecuta cuando el DOM está completamente cargado
document.addEventListener('DOMContentLoaded', () => {
    // Asigna los manejadores de eventos
    document.getElementById('login-form').addEventListener('submit', handleLogin);
    document.getElementById('logout-button').addEventListener('click', handleLogout);
    document.getElementById('create-product-button').addEventListener('click', () => ui.showModal());
    document.getElementById('modal-close-button').addEventListener('click', ui.hideModal);
    document.getElementById('product-form').addEventListener('submit', handleProductFormSubmit);
    document.getElementById('product-list-container').addEventListener('click', handleProductActions);

    // Comprueba si ya existe un token al cargar la página
    if (token) {
        // Podríamos añadir una llamada para obtener el email del usuario desde el token decodificado o un endpoint /me
        ui.updateAuthUI(true, 'Usuario Logueado');
    }

    // Carga inicial de productos
    loadProducts();
});