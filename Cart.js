class Product {
    constructor(id, name, price) {
        this.id = id;
        this.name = name;
        this.price = price;
    }
}

class ShoppingCartItem {
    constructor(product, quantity) {
        this.product = product;
        this.quantity = quantity;
    }

    getTotalPrice() {
        return this.product.price * this.quantity;
    }
}

class ShoppingCart {
    constructor() {
        this.items = [];
    }

    addItem(product, quantity) {
        const existingItem = this.items.find(item => item.product.id === product.id);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.items.push(new ShoppingCartItem(product, quantity));
        }
        this.displayCart();
    }

    removeItem(productId) {
        this.items = this.items.filter(item => item.product.id !== productId);
        this.displayCart();
    }

    getTotalItems() {
        return this.items.reduce((total, item) => total + item.quantity, 0);
    }

    displayCart() {
        const cartElement = document.getElementById("cart");
        cartElement.innerHTML = "";
        this.items.forEach(item => {
            const itemElement = document.createElement("li");
            itemElement.textContent = `${item.product.name} - ${item.quantity} x $${item.product.price} = $${item.getTotalPrice()}`;
            
            const removeButton = document.createElement("button");
            removeButton.textContent = "Remove";
            removeButton.onclick = () => this.removeItem(item.product.id);
            
            itemElement.appendChild(removeButton);
            cartElement.appendChild(itemElement);
        });
        
        const totalElement = document.getElementById("total");
        totalElement.textContent = `Total Items: ${this.getTotalItems()} | Total Price: $${this.getTotalPrice()}`;
    }

    getTotalPrice() {
        return this.items.reduce((total, item) => total + item.getTotalPrice(), 0);
    }
}

// Creating products
const product1 = new Product(1, "Laptop", 1000);
const product2 = new Product(2, "Phone", 500);
const product3 = new Product(3, "Headphones", 200);

// Creating the shopping cart
const cart = new ShoppingCart();

// Adding event listeners
function addToCart(product, quantity) {
    cart.addItem(product, quantity);
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("addLaptop").addEventListener("click", () => addToCart(product1, 1));
    document.getElementById("addPhone").addEventListener("click", () => addToCart(product2, 1));
    document.getElementById("addHeadphones").addEventListener("click", () => addToCart(product3, 1));
});
