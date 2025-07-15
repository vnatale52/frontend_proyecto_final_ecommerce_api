// js/ui.js

const productListContainer = document.getElementById('product-list-container');
const loginForm = document.getElementById('login-form');
const userInfo = document.getElementById('user-info');
const userEmailSpan = document.getElementById('user-email');
const createProductButton = document.getElementById('create-product-button');
const productModal = document.getElementById('product-modal');
const modalTitle = document.getElementById('modal-title');
const productForm = document.getElementById('product-form');

// Renderiza la lista de productos en el contenedor principal
export function renderProducts(products) {
    productListContainer.innerHTML = ''; // Limpia la lista actual
    products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <h3>${product.name}</h3>
            <p class="price">$${product.price}</p>
            <p>Categoría: ${product.category ? product.category.join(', ') : 'N/A'}</p>
            <div class="actions">
                <button class="edit-button" data-id="${product.id}">Editar</button>
                <button class="delete-button" data-id="${product.id}">Eliminar</button>
            </div>
        `;
        productListContainer.appendChild(card);
    });
}

// Actualiza la UI para mostrar si el usuario está logueado o no
export function updateAuthUI(isLoggedIn, email = '') {
    if (isLoggedIn) {
        loginForm.classList.add('hidden');
        userInfo.classList.remove('hidden');
        userEmailSpan.textContent = email;
        createProductButton.classList.remove('hidden');
    } else {
        loginForm.classList.remove('hidden');
        userInfo.classList.add('hidden');
        createProductButton.classList.add('hidden');
    }
}

// Muestra el modal para crear o editar
export function showModal(product = null) {
    productForm.reset(); // Limpia el formulario
    if (product) {
        modalTitle.textContent = 'Editar Producto';
        document.getElementById('product-id').value = product.id;
        document.getElementById('product-name').value = product.name;
        document.getElementById('product-price').value = product.price;
        document.getElementById('product-category').value = product.category ? product.category.join(', ') : '';
    } else {
        modalTitle.textContent = 'Crear Producto';
    }
    productModal.classList.remove('hidden');
}

export function hideModal() {
    productModal.classList.add('hidden');
}