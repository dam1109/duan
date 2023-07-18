const addToCartButtons = document.querySelectorAll('.add-to-cart');
const cartCount = document.getElementById('cart-count');

addToCartButtons.forEach(button => {
	button.addEventListener('click', addToCartClicked);
})

function addToCartClicked(event) {
	const button = event.target;
	button.innerText = "Đã thêm";
	button.disabled = true;

	let count = parseInt(cartCount.innerText);
	count++;
	cartCount.innerText = count;

	// Lưu trữ sản phẩm vào localStorage
	const product = event.target.parentNode;
	const productId = product.dataset.id;
	const productName = product.querySelector('h2').innerText;
	const productPrice = product.querySelector('p').innerText.replace('$', '');

	let cart = JSON.parse(localStorage.getItem('cart')) || [];
	let productToAdd = cart.find(product => product.id == productId);
	if (productToAdd) {
		productToAdd.quantity++;
	} else {
		productToAdd = {
			id: productId,
			name: productName,
			price: productPrice,
			quantity: 1
		}
		cart.push(productToAdd);
	}

	localStorage.setItem('cart', JSON.stringify(cart));
  
    window.location.href = "giohang.html";
}





function addToCart() {
	if (!localStorage.getItem('cart')) {
		// Nếu không có, tạo một giỏ hàng mới
		var cart = {};
		cart[cartItem.productId] = cartItem;
		localStorage.setItem('cart', JSON.stringify(cart));
	} else {
		// Nếu có, lấy thông tin giỏ hàng từ localStorage và thêm sản phẩm mới vào
		var cart = JSON.parse(localStorage.getItem('cart'));
		cart[cartItem.productId] = cartItem;
		localStorage.setItem('cart', JSON.stringify(cart));
	}

	// Chuyển đến trang giỏ hàng
	window.location.href = "giohang.html";
}