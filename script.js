// Initialize cart
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Function to update the cart display
function updateCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    cartItemsContainer.innerHTML = '';  // Clear current items

    // Loop through cart items and display them
    cart.forEach(item => {
        const cartItemDiv = document.createElement('div');
        cartItemDiv.classList.add('cart-item');
        cartItemDiv.innerHTML = `
            <img src="images/product${item.id}.jpg" alt="${item.name}">
            <p>${item.name} - $${item.price}</p>
            <button class="btn remove-item" data-id="${item.id}">Remove</button>
        `;
        cartItemsContainer.appendChild(cartItemDiv);
    });

    // Update the total price
    const total = cart.reduce((acc, item) => acc + item.price, 0);
    cartTotal.textContent = total.toFixed(2);

    // Store the cart in local storage
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Function to add item to the cart
function addToCart(id, name, price) {
    const item = { id, name, price };
    cart.push(item);
    updateCart();
}

// Function to remove item from the cart
function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCart();
}

// Event listener for "Add to Cart" buttons
const addToCartButtons = document.querySelectorAll('.add-to-cart');
addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
        const product = button.parentElement;
        const id = product.getAttribute('data-id');
        const name = product.getAttribute('data-name');
        const price = parseFloat(product.getAttribute('data-price'));
        addToCart(id, name, price);
    });
});

// Event listener for "Remove" buttons in the cart
document.getElementById('cart-items').addEventListener('click', (event) => {
    if (event.target.classList.contains('remove-item')) {
        const id = event.target.getAttribute('data-id');
        removeFromCart(id);
    }
});

// Initialize the cart display on page load
if (document.getElementById('cart-items')) {
    updateCart();
}