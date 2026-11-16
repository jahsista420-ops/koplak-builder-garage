// ==================== DATA DEFAULT ====================
const DEFAULT_PRODUCTS = [
  {
    id: "1",
    name: "Turbo Charger GT28",
    category: "mesin",
    price: 4500000,
    stock: 5,
    description:
      "Turbo charger high performance untuk meningkatkan tenaga mesin. Cocok untuk mobil sport dan modifikasi berat.",
    image:
      "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400&h=300&fit=crop",
  },
  {
    id: "2",
    name: "Spoiler Rear Wing Carbon",
    category: "eksterior",
    price: 2800000,
    stock: 8,
    description:
      "Spoiler belakang bahan carbon fiber, ringan dan kuat. Memberikan downforce yang optimal.",
    image:
      "https://images.unsplash.com/photo-1619405399517-d7fce0f13302?w=400&h=300&fit=crop",
  },
  {
    id: "3",
    name: "Jok Racing Bucket Seat",
    category: "interior",
    price: 3200000,
    stock: 4,
    description:
      "Jok racing bucket seat dengan bahan premium. Nyaman untuk harian dan track day.",
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400&h=300&fit=crop",
  },
  {
    id: "4",
    name: "Coilover Adjustable",
    category: "kaki-kaki",
    price: 5500000,
    stock: 3,
    description:
      "Suspensi coilover adjustable 32 level. Bisa atur tinggi rendah sesuai selera.",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&h=300&fit=crop",
  },
  {
    id: "5",
    name: "LED Headlight Projector",
    category: "eksterior",
    price: 1800000,
    stock: 12,
    description:
      "Lampu depan LED projector dengan angel eye. Terang dan stylish.",
    image:
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400&h=300&fit=crop",
  },
  {
    id: "6",
    name: "Exhaust Full System",
    category: "mesin",
    price: 6200000,
    stock: 2,
    description:
      "Knalpot full system stainless steel. Suara deep dan tenaga meningkat.",
    image:
      "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=400&h=300&fit=crop",
  },
  {
    id: "7",
    name: "Steering Wheel Momo",
    category: "interior",
    price: 1500000,
    stock: 7,
    description:
      "Setir Momo original Italia. Bahan kulit premium dengan grip yang nyaman.",
    image:
      "https://images.unsplash.com/photo-1549317661-bd32c8ce0afe?w=400&h=300&fit=crop",
  },
  {
    id: "8",
    name: "Velg Racing 17 Inch",
    category: "kaki-kaki",
    price: 8500000,
    stock: 6,
    description:
      "Velg racing forged 17 inch. Ringan, kuat, dan tampilan sporty.",
    image:
      "https://images.unsplash.com/photo-1600712242805-5f78671b24da?w=400&h=300&fit=crop",
  },
  {
    id: "9",
    name: "Dashcam 4K Dual Camera",
    category: "aksesoris",
    price: 950000,
    stock: 20,
    description:
      "Dashcam 4K dengan kamera depan dan belakang. Rekaman jelas siang dan malam.",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&h=300&fit=crop",
  },
  {
    id: "10",
    name: "Body Kit Widebody",
    category: "eksterior",
    price: 12000000,
    stock: 2,
    description:
      "Body kit widebody full set. Material fiberglass berkualitas tinggi.",
    image:
      "https://images.unsplash.com/photo-1619405399517-d7fce0f13302?w=400&h=300&fit=crop",
  },
  {
    id: "11",
    name: "ECU Remap Stage 2",
    category: "mesin",
    price: 3500000,
    stock: 10,
    description:
      "Remap ECU Stage 2 untuk peningkatan power dan torsi yang signifikan.",
    image:
      "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400&h=300&fit=crop",
  },
  {
    id: "12",
    name: "Car Cover Premium",
    category: "aksesoris",
    price: 450000,
    stock: 30,
    description:
      "Selimut mobil premium anti air dan UV. Melindungi cat mobil dari sinar matahari.",
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400&h=300&fit=crop",
  },
];

// ==================== INITIALIZATION ====================
function initData() {
  if (!localStorage.getItem("kb_products")) {
    localStorage.setItem("kb_products", JSON.stringify(DEFAULT_PRODUCTS));
  }
  if (!localStorage.getItem("kb_users")) {
    localStorage.setItem("kb_users", JSON.stringify([]));
  }
  if (!localStorage.getItem("kb_orders")) {
    localStorage.setItem("kb_orders", JSON.stringify([]));
  }
  if (!localStorage.getItem("kb_cart")) {
    localStorage.setItem("kb_cart", JSON.stringify([]));
  }
}

// ==================== PAGE NAVIGATION ====================
function showPage(pageId) {
  document
    .querySelectorAll(".page")
    .forEach((p) => p.classList.remove("active"));
  document.getElementById(pageId).classList.add("active");

  if (pageId === "page-katalog") loadProducts();
  if (pageId === "page-cart") loadCart();
  if (pageId === "page-transaksi") loadTransactions();
  if (pageId === "page-pembayaran") updatePaymentTotal();

  updateCartBadge();
  window.scrollTo(0, 0);
}

// ==================== AUTH (No HP + Password) ====================
document
  .getElementById("form-register")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    const name = document.getElementById("reg-name").value;
    const phone = document.getElementById("reg-phone").value;
    const password = document.getElementById("reg-password").value;

    const users = JSON.parse(localStorage.getItem("kb_users") || "[]");

    if (users.find((u) => u.phone === phone)) {
      alert("❌ No. HP sudah terdaftar!");
      return;
    }

    users.push({
      name,
      phone,
      password,
      registerDate: new Date().toLocaleDateString("id-ID"),
    });

    localStorage.setItem("kb_users", JSON.stringify(users));
    alert("✅ Registrasi berhasil! Silakan login.");
    showPage("page-login");
  });

document.getElementById("form-login").addEventListener("submit", function (e) {
  e.preventDefault();
  const phone = document.getElementById("login-phone").value;
  const password = document.getElementById("login-password").value;

  const users = JSON.parse(localStorage.getItem("kb_users") || "[]");
  const user = users.find((u) => u.phone === phone && u.password === password);

  if (user) {
    localStorage.setItem("kb_currentUser", JSON.stringify(user));
    alert("✅ Login berhasil! Selamat datang, " + user.name);
    showPage("page-katalog");
  } else {
    alert("❌ No. HP atau password salah!");
  }
});

function logout() {
  localStorage.removeItem("kb_currentUser");
  localStorage.removeItem("kb_cart");
  localStorage.setItem("kb_cart", JSON.stringify([]));
  alert("👋 Logout berhasil!");
  showPage("page-login");
}

function getCurrentUser() {
  return JSON.parse(localStorage.getItem("kb_currentUser") || "null");
}

// ==================== PRODUCTS ====================
function loadProducts() {
  const products = JSON.parse(localStorage.getItem("kb_products") || "[]");
  const grid = document.getElementById("product-grid");
  const search =
    document.getElementById("search-product")?.value?.toLowerCase() || "";
  const category = document.getElementById("filter-category")?.value || "all";

  const filtered = products.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(search);
    const matchCategory = category === "all" || p.category === category;
    return matchSearch && matchCategory;
  });

  grid.innerHTML = filtered
    .map(
      (p) => `
        <div class="product-card" onclick="showProductDetail('${p.id}')">
            <img src="${p.image}" alt="${p.name}" onerror="this.src='https://via.placeholder.com/300x200/1a1a2e/e94560?text=Koplak+Garage'">
            <div class="product-card-body">
                <span class="category-tag">${getCategoryLabel(p.category)}</span>
                <h3>${p.name}</h3>
                <div class="price">Rp ${p.price.toLocaleString("id-ID")}</div>
                <div class="stock">Stok: ${p.stock} unit</div>
                <button class="btn-add-cart" onclick="event.stopPropagation(); addToCart('${p.id}')">
                    <i class="fas fa-cart-plus"></i> Tambah ke Keranjang
                </button>
            </div>
        </div>
    `,
    )
    .join("");

  if (filtered.length === 0) {
    grid.innerHTML =
      '<p style="text-align:center;color:#888;grid-column:1/-1;padding:40px;">Produk tidak ditemukan.</p>';
  }
}

function filterProducts() {
  loadProducts();
}

function showProductDetail(id) {
  const products = JSON.parse(localStorage.getItem("kb_products") || "[]");
  const product = products.find((p) => p.id === id);
  if (!product) return;

  detailQty = 1;

  const content = document.getElementById("detail-product-content");
  content.innerHTML = `
        <div class="detail-image">
            <img src="${product.image}" alt="${product.name}" onerror="this.src='https://via.placeholder.com/400x300/1a1a2e/e94560?text=Koplak+Garage'">
        </div>
        <div class="detail-info">
            <span class="detail-category">${getCategoryLabel(product.category)}</span>
            <h2>${product.name}</h2>
            <div class="detail-price">Rp ${product.price.toLocaleString("id-ID")}</div>
            <div class="detail-stock">Stok tersedia: <strong>${product.stock} unit</strong></div>
            <p class="detail-desc">${product.description}</p>
            <div class="detail-qty">
                <button onclick="changeDetailQty(-1)">−</button>
                <span id="detail-qty">1</span>
                <button onclick="changeDetailQty(1)">+</button>
            </div>
<button class="btn-primary" onclick="addToCartQty('${product.id}')">
                <i class="fas fa-cart-plus"></i> Tambah ke Keranjang
            </button>
            <a href="https://wa.me/6289601547124?text=Halo%20Admin%2C%20saya%20ingin%20bertanya%20tentang%20produk%3A%20${product.name}" 
               class="btn-wa-detail" target="_blank">
                <i class="fab fa-whatsapp"></i> Tanya via WhatsApp
            </a>
        </div>
    `;

  showPage("page-detail-produk");
}

let detailQty = 1;
function changeDetailQty(delta) {
  detailQty = Math.max(1, detailQty + delta);
  document.getElementById("detail-qty").textContent = detailQty;
}

function addToCartQty(productId) {
  const products = JSON.parse(localStorage.getItem("kb_products") || "[]");
  const product = products.find((p) => p.id === productId);

  for (let i = 0; i < detailQty; i++) {
    addToCart(productId, true);
  }
  alert(
    "✅ " +
      detailQty +
      ' item "' +
      product.name +
      '" ditambahkan ke keranjang!',
  );
  detailQty = 1;
  updateCartBadge();
}

function addToCart(productId, silent) {
  const products = JSON.parse(localStorage.getItem("kb_products") || "[]");
  const product = products.find((p) => p.id === productId);
  if (!product) return;

  let cart = JSON.parse(localStorage.getItem("kb_cart") || "[]");
  const existing = cart.find((c) => c.id === productId);

  if (existing) {
    if (existing.qty >= product.stock) {
      if (!silent) alert("❌ Stok tidak mencukupi!");
      return;
    }
    existing.qty++;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      qty: 1,
    });
  }

  localStorage.setItem("kb_cart", JSON.stringify(cart));
  if (!silent) {
    alert('✅ "' + product.name + '" ditambahkan ke keranjang!');
  }
  updateCartBadge();
}

function updateCartBadge() {
  const cart = JSON.parse(localStorage.getItem("kb_cart") || "[]");
  const total = cart.reduce((sum, item) => sum + item.qty, 0);
  document
    .querySelectorAll(".cart-badge")
    .forEach((b) => (b.textContent = total));
}

function getCategoryLabel(cat) {
  const labels = {
    mesin: "Mesin & Performa",
    eksterior: "Eksterior",
    interior: "Interior",
    "kaki-kaki": "Kaki-kaki",
    aksesoris: "Aksesoris",
  };
  return labels[cat] || cat;
}

// ==================== CART ====================
function loadCart() {
  const cart = JSON.parse(localStorage.getItem("kb_cart") || "[]");
  const container = document.getElementById("cart-items");

  if (cart.length === 0) {
    container.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <h3>Keranjang Kosong</h3>
                <p>Yuk mulai belanja!</p>
                <br>
                <button class="btn-primary" style="width:auto;padding:12px 30px;" onclick="showPage('page-katalog')">
                    <i class="fas fa-store"></i> Belanja Sekarang
                </button>
            </div>
        `;
    document.getElementById("btn-checkout").style.display = "none";
    updateCartSummary(0);
    return;
  }

  document.getElementById("btn-checkout").style.display = "block";

  container.innerHTML = cart
    .map(
      (item, index) => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}" onerror="this.src='https://via.placeholder.com/80x60/1a1a2e/e94560?text=KBG'">
            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <div class="cart-item-price">Rp ${item.price.toLocaleString("id-ID")}</div>
            </div>
            <div class="cart-item-qty">
                <button onclick="updateCartQty(${index}, -1)">−</button>
                <span>${item.qty}</span>
                <button onclick="updateCartQty(${index}, 1)">+</button>
            </div>
            <div style="font-weight:700;color:#e94560;min-width:120px;text-align:right;">
                Rp ${(item.price * item.qty).toLocaleString("id-ID")}
            </div>
            <i class="fas fa-trash cart-item-remove" onclick="removeFromCart(${index})"></i>
        </div>
    `,
    )
    .join("");

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  updateCartSummary(subtotal);
}

function updateCartQty(index, delta) {
  const cart = JSON.parse(localStorage.getItem("kb_cart") || "[]");
  const products = JSON.parse(localStorage.getItem("kb_products") || "[]");

  if (delta > 0) {
    const product = products.find((p) => p.id === cart[index].id);
    if (cart[index].qty >= product.stock) {
      alert("❌ Stok tidak mencukupi!");
      return;
    }
  }

  cart[index].qty += delta;
  if (cart[index].qty <= 0) {
    cart.splice(index, 1);
  }

  localStorage.setItem("kb_cart", JSON.stringify(cart));
  loadCart();
  updateCartBadge();
}

function removeFromCart(index) {
  const cart = JSON.parse(localStorage.getItem("kb_cart") || "[]");
  cart.splice(index, 1);
  localStorage.setItem("kb_cart", JSON.stringify(cart));
  loadCart();
  updateCartBadge();
}

function updateCartSummary(subtotal) {
  const shipping = subtotal > 0 ? 15000 : 0;
  const total = subtotal + shipping;
  document.getElementById("cart-subtotal").textContent =
    "Rp " + subtotal.toLocaleString("id-ID");
  document.getElementById("cart-shipping").textContent =
    "Rp " + shipping.toLocaleString("id-ID");
  document.getElementById("cart-total").textContent =
    "Rp " + total.toLocaleString("id-ID");
}

// ==================== PAYMENT ====================
let selectedPayment = "";

function selectPayment(method) {
  selectedPayment = method;
  document
    .querySelectorAll(".method-card")
    .forEach((c) => c.classList.remove("selected"));
  event.currentTarget.classList.add("selected");
}

function updatePaymentTotal() {
  const cart = JSON.parse(localStorage.getItem("kb_cart") || "[]");
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const total = subtotal + 15000;
  document.getElementById("payment-total").textContent =
    "Rp " + total.toLocaleString("id-ID");
}

function processPayment() {
  if (!selectedPayment) {
    alert("⚠️ Pilih metode pembayaran terlebih dahulu!");
    return;
  }

  const cart = JSON.parse(localStorage.getItem("kb_cart") || "[]");
  if (cart.length === 0) {
    alert("❌ Keranjang kosong!");
    return;
  }

  const user = getCurrentUser();
  if (!user) {
    alert("❌ Silakan login terlebih dahulu!");
    showPage("page-login");
    return;
  }

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const total = subtotal + 15000;

  // Simulate payment (90% success)
  const isSuccess = Math.random() > 0.1;

  const order = {
    id: "TRX-" + Date.now().toString().slice(-8),
    customerName: user.name,
    customerPhone: user.phone,
    items: [...cart],
    subtotal: subtotal,
    shipping: 15000,
    total: total,
    paymentMethod: selectedPayment,
    status: isSuccess ? "berhasil" : "gagal",
    date: new Date().toLocaleString("id-ID"),
  };

  const orders = JSON.parse(localStorage.getItem("kb_orders") || "[]");
  orders.push(order);
  localStorage.setItem("kb_orders", JSON.stringify(orders));

  // Update stock
  const products = JSON.parse(localStorage.getItem("kb_products") || "[]");
  cart.forEach((cartItem) => {
    const product = products.find((p) => p.id === cartItem.id);
    if (product) {
      product.stock = Math.max(0, product.stock - cartItem.qty);
    }
  });
  localStorage.setItem("kb_products", JSON.stringify(products));

  // Clear cart
  localStorage.setItem("kb_cart", JSON.stringify([]));
  updateCartBadge();

  if (isSuccess) {
    showModal("success", order);
  } else {
    showModal("failed", order);
  }
}

function showModal(type, order) {
  const overlay = document.getElementById("modal-overlay");
  const content = document.getElementById("modal-content");

  if (type === "success") {
    content.innerHTML = `
            <div class="modal-icon" style="color:#4caf50;">
                <i class="fas fa-check-circle"></i>
            </div>
            <h3>Pembayaran Berhasil! 🎉</h3>
            <p>
                Transaksi <strong>${order.id}</strong> telah berhasil diproses.<br>
                Total: <strong style="color:#e94560;">Rp ${order.total.toLocaleString("id-ID")}</strong><br>
                Metode: <strong>${order.paymentMethod.toUpperCase()}</strong>
            </p>
            <button class="btn-primary" onclick="closeModal(); showPage('page-transaksi');">
                <i class="fas fa-receipt"></i> Lihat Transaksi
            </button>
        `;
  } else {
    content.innerHTML = `
            <div class="modal-icon" style="color:#f44336;">
                <i class="fas fa-times-circle"></i>
            </div>
            <h3>Pembayaran Gagal! 😞</h3>
            <p>
                Transaksi <strong>${order.id}</strong> gagal diproses.<br>
                Silakan coba lagi dengan metode pembayaran lain.
            </p>
            <button class="btn-primary" onclick="closeModal(); showPage('page-pembayaran');">
                <i class="fas fa-redo"></i> Coba Lagi
            </button>
        `;
  }

  overlay.style.display = "flex";
}

function closeModal() {
  document.getElementById("modal-overlay").style.display = "none";
}

// ==================== TRANSACTIONS ====================
function loadTransactions() {
  const user = getCurrentUser();
  if (!user) {
    showPage("page-login");
    return;
  }

  const orders = JSON.parse(localStorage.getItem("kb_orders") || "[]");
  const userOrders = orders.filter((o) => o.customerPhone === user.phone);
  const container = document.getElementById("transaction-list");

  if (userOrders.length === 0) {
    container.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-receipt"></i>
                <h3>Belum Ada Transaksi</h3>
                <p>Mulai belanja untuk melihat riwayat transaksi.</p>
            </div>
        `;
    return;
  }

  container.innerHTML = userOrders
    .reverse()
    .map(
      (o) => `
        <div class="transaction-card">
            <div class="trans-header">
                <span class="trans-id"><i class="fas fa-receipt"></i> ${o.id}</span>
                <span class="badge badge-${o.status}">${o.status.toUpperCase()}</span>
                <span class="trans-date"><i class="fas fa-clock"></i> ${o.date}</span>
            </div>
            <div class="trans-items">
                ${o.items
                  .map(
                    (item) => `
                    <div class="trans-item">
                        <span>${item.name} x${item.qty}</span>
                        <span>Rp ${(item.price * item.qty).toLocaleString("id-ID")}</span>
                    </div>
                `,
                  )
                  .join("")}
                <div class="trans-item" style="color:#888;">
                    <span>Ongkos Kirim</span>
                    <span>Rp ${o.shipping.toLocaleString("id-ID")}</span>
                </div>
            </div>
            <div class="trans-footer">
                <span>Metode: <strong>${o.paymentMethod.toUpperCase()}</strong></span>
<span class="trans-total">Total: Rp ${o.total.toLocaleString("id-ID")}</span>
            </div>
            <div class="trans-actions">
                <a href="https://wa.me/6289601547124?text=Halo%20Admin%2C%20saya%20ingin%20melaporkan%2Fretur%20pesanan%20dengan%20ID%3A%20${o.id}" 
                   class="btn-wa-report" target="_blank">
                    <i class="fab fa-whatsapp"></i> Lapor / Retur Barang
                </a>
            </div>
        </div>
    `,
    )
    .join("");
}

// ==================== INIT ====================
document.addEventListener("DOMContentLoaded", function () {
  initData();

  const user = getCurrentUser();
  if (user) {
    showPage("page-katalog");
  } else {
    showPage("page-login");
  }

  updateCartBadge();
});
