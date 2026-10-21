const menuData = [
    onId = { id: 1, name: "Kopi Susu Kekinian", category: "coffee", price: 18000, desc: "Espresso dengan fresh milk dan gula aren asli." },
    { id: 2, name: "Matcha Latte", category: "coffee", price: 22000, desc: "Bubuk matcha premium berpadu dengan susu lembut." },
    { id: 3, name: "Kentang Goreng Krispi", category: "snack", price: 15000, desc: "Kentang goreng renyah dengan taburan bumbu gurih." },
    { id: 4, name: "Roti Bakar Coklat Keju", category: "snack", price: 17000, desc: "Roti tebal dengan selai cokelat melimpah dan parutan keju." }
];

let cartTotal = 0;

const menuContainer = document.getElementById("menuContainer");
const searchInput = document.getElementById("searchInput");
const filterButtons = document.querySelectorAll(".filter-btn");
const cartTotalElement = document.getElementById("cartTotal");
const orderBtn = document.getElementById("orderBtn");

function displayMenu(items) {
    menuContainer.innerHTML = "";
    if (items.length === 0) {
        menuContainer.innerHTML = `<p style="text-align:center; grid-column: 1/-1; color:#777;">Menu tidak ditemukan.</p>`;
        return;
    }

    items.forEach(item => {
        const card = document.createElement("div");
        card.classList.add("menu-card");
        card.innerHTML = `
            <div class="menu-info">
                <h3>${item.name}</h3>
                <p>${item.desc}</p>
            </div>
            <div class="price-action">
                <span class="price">Rp ${item.price.toLocaleString('id-ID')}</span>
                <button class="add-btn" onclick="addToCart(${item.price})">+ Tambah</button>
            </div>
        `;
        menuContainer.appendChild(card);
    });
}

function addToCart(price) {
    cartTotal += price;
    cartTotalElement.innerText = `Rp ${cartTotal.toLocaleString('id-ID')}`;
}

searchInput.addEventListener("input", (e) => {
    const keyword = e.target.value.toLowerCase();
    const filtered = menuData.filter(item => item.name.toLowerCase().includes(keyword));
    displayMenu(filtered);
});

filterButtons.forEach(button => {
    button.addEventListener("click", (e) => {
        filterButtons.forEach(btn => btn.classList.remove("active"));
        e.target.classList.add("active");

        const category = e.target.getAttribute("data-category");
        if (category === "all") {
            displayMenu(menuData);
        } else {
            const filtered = menuData.filter(item => item.category === category);
            displayMenu(filtered);
        }
    });
});

orderBtn.addEventListener("click", () => {
    if (cartTotal === 0) {
        alert("Keranjang pesananmu masih kosong!");
    } else {
        alert(`Pesanan senilai Rp ${cartTotal.toLocaleString('id-ID')} berhasil dibuat! Silakan tunjukkan ke kasir.`);
        cartTotal = 0;
        cartTotalElement.innerText = "Rp 0";
    }
});

// Tampilkan menu awal saat halaman dimuat
displayMenu(menuData);
