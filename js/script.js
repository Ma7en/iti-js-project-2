// Function to fetch categories
async function fetchCategories() {
    const categoriesUrl = "https://dummyjson.com/products/categories";

    try {
        const response = await fetch(categoriesUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const categories = await response.json();
        return categories;
    } catch (error) {
        console.error("Error fetching categories:", error);
        return []; // Return empty array on error
    }
}

// Function to fetch all products
async function fetchAllProducts() {
    const productsUrl = "https://dummyjson.com/products";

    try {
        const response = await fetch(productsUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const responseData = await response.json();
        return responseData.products;
    } catch (error) {
        console.error("Error fetching products:", error);
        return []; // Return empty array on error
    }
}

// Function to fetch products for a specific category
async function fetchProductsForCategory(category) {
    const productsUrl = "https://dummyjson.com/products";
    const limit = 30; // Number of products to fetch per request
    let skip = 0; // Initial skip value
    let categoryProducts = [];

    try {
        while (true) {
            const response = await fetch(
                `${productsUrl}?category=${category}&skip=${skip}&limit=${limit}`
            );
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const responseData = await response.json();

            // Filter products based on category
            const filteredProducts = responseData.products.filter(
                (product) => product.category === category
            );

            // Add filtered products to categoryProducts array
            categoryProducts = categoryProducts.concat(filteredProducts);

            // Break loop if no more products to fetch
            if (responseData.products.length === 0) {
                break;
            }

            // Increment skip for next page
            skip += limit;
        }

        return categoryProducts;
    } catch (error) {
        console.error(
            `Error fetching products for category "${category}":`,
            error
        );
        return []; // Return empty array on error
    }
}

// Function to display categories in sidebar
function displayCategories(categories) {
    const categorySidebar = document.getElementById("category-sidebar");
    if (!categorySidebar) {
        console.error("Category sidebar element not found.");
        return;
    }
    categorySidebar.innerHTML = "";

    const categoryList = document.createElement("ul");
    categoryList.id = "category-list";

    categories.forEach((category) => {
        const categoryLink = document.createElement("a");
        categoryLink.href = "#";
        categoryLink.textContent = category.name;
        categoryLink.dataset.category = category.slug; // Store category slug as data attribute
        categoryLink.addEventListener("click", async (event) => {
            event.preventDefault();
            const selectedCategory = event.target.dataset.category;
            await fetchAndDisplayProductsForCategory(selectedCategory);
        });

        const listItem = document.createElement("li");
        listItem.appendChild(categoryLink);
        categoryList.appendChild(listItem);
    });

    categorySidebar.appendChild(categoryList);
}

//function to display prodduct
function displayProducts(products) {
    const productListDiv = document.getElementById("product-list");
    if (!productListDiv) {
        console.error("Product list element not found.");
        return;
    }
    productListDiv.innerHTML = ""; // Clear previous products

    products.forEach((product) => {
        const productDiv = document.createElement("div");
        productDiv.classList.add("product");

        productDiv.innerHTML = `
            <img src="${product.images[0]}" alt="${product.title}">
            <h2>${product.title}</h2>
            <p>${product.description}</p>
            <p class="price">$${product.price}</p>
            <div>
                <button class="add-to-cart-btn" onclick="addToCart(${product.id})">Add To Cart</button>

                <a href="product.html?id=${product.id}" class="details-btn">
                    <i class="fa fa-eye" aria-hidden="true"></i>
                </a>
            </div>
      `;
        //   <a href="product.html?id=${product.id}" class="details-btn">Details</a>

        productListDiv.appendChild(productDiv); // Append productDiv to the container
    });

    setUpProductClickListeners(); // Ensure click listeners are set up after rendering products
}

// Main function to fetch all categories and set up event listeners
async function fetchCategoriesAndSetUp() {
    try {
        const categories = await fetchCategories();
        displayCategories(categories);
        setUpCategoryClickListeners();
    } catch (error) {
        console.error("Error fetching and setting up categories:", error);
    }
}

// Main function to fetch all products initially and display them
async function fetchAndDisplayAllProducts() {
    try {
        const products = await fetchAllProducts();
        displayProducts(products);
    } catch (error) {
        console.error("Error fetching and displaying products:", error);
    }
}

// Main function to fetch products for a category and display them
async function fetchAndDisplayProductsForCategory(category) {
    try {
        const products = await fetchProductsForCategory(category);
        displayProducts(products);
    } catch (error) {
        console.error("Error fetching and displaying products:", error);
    }
}

// Function to set up click listeners for product details buttons
function setUpProductClickListeners() {
    const detailButtons = document.querySelectorAll(".details-btn");
    detailButtons.forEach((button) => {
        button.addEventListener("click", (event) => {
            event.preventDefault();
            const productId = button.getAttribute("href").split("id=")[1];
            navigateToProductDetails(productId);
        });
    });
}

// Function to navigate to product details page
function navigateToProductDetails(productId) {
    window.location.href = `product.html?id=${productId}`;
}

// Function to set up click listeners for category links
function setUpCategoryClickListeners() {
    const categoryLinks = document.querySelectorAll("#category-list a");
    categoryLinks.forEach((link) => {
        link.addEventListener("click", async (event) => {
            event.preventDefault();
            const category = link.dataset.category;
            await fetchAndDisplayProductsForCategory(category);
        });
    });
}

// Initial setup on DOMContentLoaded
document.addEventListener("DOMContentLoaded", () => {
    fetchCategoriesAndSetUp();
    fetchAndDisplayAllProducts(); // Fetch and display all products initially
});

// ================================================
// ================================================
// -3 -> search products
// let searchDiv = document.querySelector("#searchDiv");
document.addEventListener("DOMContentLoaded", function () {
    let searchInput = document.querySelector(".prod #searchInput");

    searchInput.addEventListener("keyup", function () {
        const searchQuery = searchInput.value.toLowerCase();

        const products = document.querySelectorAll("#product-list .product");
        products.forEach((product) => {
            const title = product.querySelector("h2").textContent.toLowerCase();
            if (title.includes(searchQuery)) {
                product.style.display = "";
            } else {
                product.style.display = "none";
            }
        });
    });
});

// ================================================
// ================================================
// -1 -> shoping cart
const cartItems = [];
let cartMod = document.querySelector(".cart-mod");
let showCart = document.querySelector("header .show-cart");
showCart.addEventListener("click", function () {
    cartMod.classList.add("active");
});
let closeCart = document.querySelector(".cart-mod .model-close-btn");
closeCart.addEventListener("click", function () {
    cartMod.classList.remove("active");
});

function updateCartNumber() {
    let numberCart = document.querySelector("header .cart .btn-badge");
    numberCart.textContent = cartItems.length;
}

function addToCart(productId) {
    fetch(`https://dummyjson.com/products/${productId}`)
        .then((response) => response.json())
        .then((product) => {
            // Check if the product is already in the cart
            let cartItem = cartItems.find((item) => item.id === productId);
            if (cartItem) {
                // If the product is already in the cart, increase its quantity
                cartItem.quantity++;
                updateCart();
                updateCartNumber();
            } else {
                // If the product is not in the cart, add it with quantity 1
                product.quantity = 1;
                cartItems.push(product);
                updateCart();
                updateCartNumber();
            }
            // console.log("120-->>", cart);
            // displayCart();
        });
}

function updateCart() {
    // console.log(`0-<-->`, product);
    // cartItems.push(product);
    console.log(`33>-`, cartItems);

    const cartItemsContainer = document.getElementById("cart-items");
    const cartTotalElement = document.getElementById("cart-total");
    cartItemsContainer.innerHTML = "";
    let cartTotal = 0;

    cartItems.forEach((item) => {
        const itemTotal = item.price * item.quantity;
        cartTotal += itemTotal;

        const row = document.createElement("tr");
        row.innerHTML = `
                <td>${item.title}</td>
                <td>$${item.price.toFixed(2)}</td>
                <td>
                    <input type="number" value="${
                        item.quantity
                    }" min="1" data-id="${item.id}" class="quantity-input">
                </td>
                <td>$${itemTotal.toFixed(2)}</td>
                <td><button class="remove-btn" data-id="${
                    item.id
                }">Remove</button></td>
            `;
        cartItemsContainer.appendChild(row);
    });

    cartTotalElement.textContent = cartTotal.toFixed(2);

    document.querySelectorAll(".quantity-input").forEach((input) => {
        input.addEventListener("change", function () {
            const id = parseInt(this.getAttribute("data-id"));
            const newQuantity = parseInt(this.value);
            const item = cartItems.find((item) => item.id === id);
            if (item) {
                item.quantity = newQuantity;
                updateCart();
            }
        });
    });

    document.querySelectorAll(".remove-btn").forEach((button) => {
        button.addEventListener("click", function () {
            const id = parseInt(this.getAttribute("data-id"));
            const index = cartItems.findIndex((item) => item.id === id);
            if (index !== -1) {
                cartItems.splice(index, 1);
                updateCart();
            }
        });
    });
}
// document.addEventListener("DOMContentLoaded", function () {
// updateCart();
// });
