const products = document.querySelectorAll('#products li button.buy');
const cart = document.querySelector('#cart');
const cartItems = document.querySelector('#cart ul');
const cartTotal = document.querySelector('#cart p.total');
const checkoutButton = document.querySelector('#cart button.checkout');

let items = [];
let total = 0;

function addItem(title, price) {
  let found = false;
  for (let i = 0; i < items.length; i++) {
    if (items[i].title === title) {
      items[i].quantity++;
      found = true;
      break;
    }
  }
  if (!found) {
    items.push({ title, price, quantity: 1 });
  }
  renderCart();
}

function removeItem(title) {
  for (let i = 0; i < items.length; i++) {
    if (items[i].title === title) {
      items.splice(i, 1);
      break;
    }
  }
  renderCart();
}

function calculateTotal() {
  total = 0;
  for (let i = 0; i < items.length; i++) {
    total += (items[i].price * items[i].quantity);
  }
}

function renderCart() {
  cartItems.innerHTML = '';
  for (let i = 0; i < items.length; i++) {
    cartItems.innerHTML += `<li>
      <h3>${items[i].title}</h3>
      <p>${items[i].quantity} x ${items[i].price} VND</p>
      <button class="remove" data-title="${items[i].title}">Xóa</button>
    </li>`;
  }
  calculateTotal();
  cartTotal.innerHTML = `Tổng giá trị đơn hàng: ${total} VND`;
  if (items.length === 0) {
    checkoutButton.disabled = true;
  } else {
    checkoutButton.disabled = false;
  }
}

products.forEach(product => {
  product.addEventListener('click', event => {
    const title = event.target.parentElement.querySelector('h3').textContent;
    const price = parseInt(event.target.parentElement.querySelector('p').textContent.replace(/\D/g, ''));
    addItem(title, price);
  });
});

cartItems.addEventListener('click', event => {
  if (event.target.classList.contains('remove')) {
    const title = event.target.dataset.title;
    removeItem(title);
  }
});






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
function goToCheckout() {

  var cartItems = document.querySelectorAll('#cart ul li');

  var items = [];


  for (var i = 0; i < cartItems.length; i++) {
    var item = {};
    item.name = cartItems[i].querySelector('h3').textContent;
    item.price = cartItems[i].querySelector('p').textContent.match(/\d+/)[0];
    item.quantity = cartItems[i].querySelector('p').textContent.match(/\d+/)[1];
    items.push(item);
  }

  var form = document.createElement('form');
  form.setAttribute('method', 'thanhtoan.html');
  form.setAttribute('action', 'thanhtoan.html');

  var input = document.createElement('input');
  input.setAttribute('type', 'hidden');
  input.setAttribute('name', 'items');
  input.setAttribute('value', JSON.stringify(items));
  form.appendChild(input);

  document.body.appendChild(form);
  form.submit();
}
