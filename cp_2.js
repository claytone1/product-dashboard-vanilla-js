const productContainer = document.getElementById('product-container');

// Promise-based fetch
function fetchProductsThen() {
  fetch('https://www.course-api.com/javascript-store-products')
    .then(response => response.json())
    .then(data => {
      data.forEach(product => {
        console.log(product.fields.name);
      });
    })
    .catch(error => {
      console.error('Fetch error with .then():', error);
    });
}

// Async/Await fetch
async function fetchProductsAsync() {
  try {
    const response = await fetch('https://www.course-api.com/javascript-store-products');
    const data = await response.json();
    displayProducts(data);
  } catch (error) {
    handleError(error);
  }
}

function displayProducts(products) {
  const firstFive = products.slice(0, 5);
  productContainer.innerHTML = '';

  firstFive.forEach(product => {
    const { name, image, price } = product.fields;

    const card = document.createElement('div');
    card.className = 'product-card';

    const img = document.createElement('img');
    img.src = image[0].url;
    img.alt = name;
    img.className = 'product-image';

    const title = document.createElement('div');
    title.className = 'product-name';
    title.textContent = name;

    const priceTag = document.createElement('div');
    priceTag.className = 'product-price';
    priceTag.textContent = `$${(price / 100).toFixed(2)}`;

    card.appendChild(img);
    card.appendChild(title);
    card.appendChild(priceTag);
    productContainer.appendChild(card);
  });
}

function handleError(error) {
  console.error('An error occurred:', error.message);
}

// Call both fetch functions
fetchProductsThen();
fetchProductsAsync();
