// Fetch product details based on ID from query parameter
async function fetchProductDetails(productId) {
    const productsUrl = "https://dummyjson.com/products"; // Replace with your actual API endpoint
    try {
        const response = await fetch(`${productsUrl}/${productId}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const product = await response.json();
        displayProductDetails(product);
    } catch (error) {
        console.error("Error fetching product details:", error);
    }
}

function displayProductDetails(product) {
    const productDetailsDiv = document.getElementById("product-details");
    if (!productDetailsDiv) {
        console.error("Product details element not found.");
        return;
    }
    let productDetails = `
        <img src="${product.images[0]}" alt="${product.title}">
        <h2>${product.title}</h2>
        <p>${product.description}</p>
        <p class="price">price:<span> ${product.price}$</span></p>
    
        <p class="stock">stock: ${product.stock}</p>
    

    `;
    productDetails.innerHTML += `
                <h3>Customer Reviews</h3>
            <div class="reviews">

    `;

    // Add reviews section
    if (product.reviews && product.reviews.length > 0) {
        productDetails += `
            <h3>Customer Reviews</h3>
            <table class="reviews-table">
                <thead>
                    <tr>
                        <th>Reviewer Name</th>
                        <th>Rating</th>
                        <th>Comment</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
        `;
        // Loop through reviews and append each review row to the table
        product.reviews.forEach((review) => {
            productDetails += `
                <tr>
                    <td>${review.reviewerName}</td>
                    <td>${review.rating}/5</td>
                    <td>${review.comment}</td>
                    <td>${new Date(review.date).toLocaleDateString()}</td>
                </tr>
            `;
        });
        productDetails += `</tbody></table>`; // Close table
    } else {
        productDetails += `<p>No reviews yet.</p>`;
    }

    productDetailsDiv.innerHTML = productDetails;
}

// Extract product ID from query parameter
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("id");

// Fetch and display product details
fetchProductDetails(productId);
