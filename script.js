const menuData = {
    "Burgerlicious": [
        { name: "Vegan Burger", price: 5.99, img: "./img/gerichte/vegan_burger.jpg" },
        { name: "Vegan BBQ Burger", price: 6.49, img: "./img/gerichte/Vegan-BBQ-Burger.jpg" },
        { name: "Süßkartoffelpommes", price: 5.99, img: "./img/gerichte/Süßkartoffel-Pommes.jpg" },
        { name: "Linsen Burger", price: 7.49, img: "./img/gerichte/linsen_burger.jpg" },
        { name: "Falafel Burger", price: 6.99, img: "./img/gerichte/falafel_burger.jpg" }
    ],
    "Sushi & More": [
        { name: "Maki Avocado", price: 8.99, img: "./img/gerichte/maki_avocado.jpg" },
        { name: "Vegan Sushi Mix", price: 9.49, img: "./img/gerichte/sushi_mix.png" },
        { name: "Vegan Rice Bowl", price: 10.99, img: "./img/gerichte/vegan-rice-bowl.jpg" },
        { name: "Vegan Poke Bowl", price: 9.99, img: "./img/gerichte/vegan_poke_bowl.jpg" },
        { name: "Vegan Tofu Bowl", price: 11.49, img: "./img/gerichte/vegan_tofu_bowl.jpg" }
    ],
    "Pizza Palace": [
        { name: "Vegan Margherita", price: 7.99, img: "./img/gerichte/pizza_margherita.jpg" },
        { name: "Vegan Funghi", price: 8.99, img: "./img/gerichte/pizza_funghi.jpg" },
        { name: "Vegan Peperoni", price: 9.49, img: "./img/gerichte/pizza_peperoni.jpg" },
        { name: "Vegan Verdura", price: 9.99, img: "./img/gerichte/pizza_gemüse.jpg" },
        { name: "Vegan Hawaii", price: 8.49, img: "./img/gerichte/pizza_vegan_hawaii.jpg" }
    ],
    "Sandwi(t)ches": [
        { name: "Vegan BLT", price: 6.99, img: "./img/gerichte/Vegan-BLT.jpg" },
        { name: "Vegan Rye", price: 7.49, img: "./img/gerichte/Vegan-rye.jpg" },
        { name: "Vegan Banh Mi", price: 6.49, img: "./img/gerichte/veganes-banh-mi.jpg" },
        { name: "Vegan Tuna", price: 7.99, img: "./img/gerichte/vegan_tuna.jpg" },
        { name: "Vegan Avocado", price: 8.49, img: "./img/gerichte/vegan_avocado.jpg" }
    ]
};

let shoppingCart = [];

function goHome() {
    document.getElementById('menu').classList.add('hidden');
    document.getElementById('restaurant-list').classList.remove('hidden');
}

function showMenu(name) {
    document.getElementById('menu-title').innerText = name;
    document.getElementById('menu').classList.remove('hidden');
    document.getElementById('restaurant-list').classList.add('hidden');
    renderMenuItems(name);
}

function renderMenuItems(name) {
    const menuContainer = document.getElementById('menu-items');
    menuContainer.innerHTML = menuData[name].map(item => `
        <div class="card menu-item">
            <img src="${item.img}" class="dish-img" alt="${item.name}">
            <span>${item.name} - ${item.price.toFixed(2)}€</span>
            <div>
                <button class="btn" onclick="addToCart('${item.name}', ${item.price})">+</button>
                <button class="btn" onclick="removeFromCart('${item.name}')">-</button>
            </div>
        </div>
    `).join('');
}

function addToCart(name, price) {
    let item = shoppingCart.find(i => i.name === name);
    item ? item.quantity++ : shoppingCart.push({ name, price, quantity: 1 });
    updateCart();
}

function removeFromCart(name) {
    shoppingCart = shoppingCart.filter(item => item.name !== name || --item.quantity > 0);
    updateCart();
}

function updateCart() {
    let cartContainer = document.getElementById('cart-items');
    cartContainer.innerHTML = '';
    let total = 2.99;

    shoppingCart.forEach(item => {
        total += item.price * item.quantity;
        cartContainer.innerHTML += `
            <div class="cart-item">
                <span>${item.name} (${item.quantity}) - ${(item.price * item.quantity).toFixed(2)}€</span>
                <div>
                    <button class="btn" onclick="changeQuantity('${item.name}', 1)">+</button>
                    <button class="btn" onclick="changeQuantity('${item.name}', -1)">-</button>
                </div>
            </div>
        `;
    });

    document.getElementById('cart-count').innerText = shoppingCart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('total-price').innerText = total.toFixed(2);
}

function changeQuantity(name, amount) {
    let item = shoppingCart.find(i => i.name === name);
    if (item) {
        item.quantity += amount;
        if (item.quantity <= 0) shoppingCart = shoppingCart.filter(i => i.name !== name);
    }
    updateCart();
}

function checkout() {
    if (!shoppingCart.length) return;
    let modal = document.createElement('div');
    modal.innerHTML = `
        <div class="modal">
            <div class="modal-content">
                <h2>Bestellung bestätigt!</h2>
                <p>Vielen Dank für Ihre Bestellung.</p>
                <button class="btn" onclick="closeModal()">Schließen</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    shoppingCart = [];
    updateCart();
}

function closeModal() {
    document.querySelector('.modal').remove();
}

function clearCart() {
    shoppingCart = [];
    updateCart();
}

const cartConfig = { buttonId: "cart-button", cartId: "cart", icon: "🛒" };

function toggleCart() {
    const cart = document.getElementById(cartConfig.cartId);
    cart.style.display = cart.style.display === "block" ? "none" : "block";
}

function createCartButton() {
    const cartButton = document.createElement("button");
    cartButton.id = cartConfig.buttonId;
    cartButton.innerHTML = cartConfig.icon;
    cartButton.onclick = toggleCart;
    document.body.appendChild(cartButton);
}

(function() {
  
  function $(id) { return document.getElementById(id); }

  if (typeof window.clearCart === 'undefined') {
    window.clearCart = function() {
      const cartItems = $('cart-items');
      const cartCount = $('cart-count');
      const totalPrice = $('total-price');
      if (cartItems) cartItems.innerHTML = '';
      if (cartCount) cartCount.textContent = '0';
      if (totalPrice) totalPrice.textContent = '0';
    };
  }

  if (typeof window.checkout === 'undefined') {
    window.checkout = function() {
     
      const msg = $('order-message');
      if (msg) {
        msg.classList.remove('hidden');
      
        setTimeout(function() {
          msg.classList.add('hidden');
        }, 3000);
      }
    
      if (typeof window.clearCart === 'function') {
        window.clearCart();
      }
    };
  }

  })();

createCartButton();
