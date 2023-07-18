const cartItems = document.getElementById('cart-items');
const cartCount = document.getElementById('cart-count');

let cart = JSON.parse(localStorage.getItem('cart')) || [];

cart.forEach(product => {
	const row = document.createElement('tr');
	row.innerHTML = `
		<td>${product.name}</td>
		<td>$${product.price}</td>
		<td>${product.quantity}</td>
		<td>$${product.price * product.quantity}</td>
	`;
	cartItems.appendChild(row);
});

const total = cart.reduce((sum, product) => sum + product.price * product.quantity, 0);
cartCount.innerText = cart.length;
document.title = `Giỏ hàng (${cart.length}) - Trang web bán hàng`;