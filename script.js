// Cart functionality
let cart = [];
let cartCount = 0;

function addToCart(name, price, image) {
  const existingItem = cart.find((item) => item.name === name);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      name: name,
      price: price,
      image: image,
      quantity: 1,
    });
  }

  updateCartCount();
  showSuccessMessage(`${name} added to cart!`);
}

function removeFromCart(name) {
  cart = cart.filter((item) => item.name !== name);
  updateCartCount();
  updateCartDisplay();
}

function updateQuantity(name, change) {
  const item = cart.find((item) => item.name === name);
  if (item) {
    item.quantity += change;
    if (item.quantity <= 0) {
      removeFromCart(name);
    } else {
      updateCartDisplay();
    }
  }
  updateCartCount();
}

function updateCartCount() {
  cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  document.getElementById("cartCount").textContent = cartCount;
}

function updateCartDisplay() {
  const cartItemsElement = document.getElementById("cartItems");
  const cartTotalElement = document.getElementById("cartTotal");

  if (cart.length === 0) {
    cartItemsElement.innerHTML = `
        <div class="empty-cart">
          <i class="fas fa-shopping-cart"></i>
          <p>Your cart is empty</p>
        </div>
      `;
    cartTotalElement.style.display = "none";
  } else {
    cartItemsElement.innerHTML = cart
      .map(
        (item) => `
          <div class="cart-item">
            <img src="${item.image}" alt="${item.name}" onerror="this.style.display='none'">
            <div class="cart-item-info">
              <h4>${item.name}</h4>
              <div class="cart-item-price">$${item.price.toFixed(2)}</div>
            </div>
            <div class="cart-item-controls">
              <button class="quantity-btn" onclick="updateQuantity('${
                item.name
              }', -1)">-</button>
              <span class="quantity-display">${item.quantity}</span>
              <button class="quantity-btn" onclick="updateQuantity('${
                item.name
              }', 1)">+</button>
              <button class="remove-item" onclick="removeFromCart('${
                item.name
              }')">Remove</button>
            </div>
          </div>
        `
      )
      .join("");

    const total = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    document.getElementById("totalPrice").textContent = total.toFixed(2);
    cartTotalElement.style.display = "block";
  }
}

function toggleCart() {
  const cartModal = document.getElementById("cartModal");
  if (cartModal.style.display === "block") {
    cartModal.style.display = "none";
  } else {
    cartModal.style.display = "block";
    updateCartDisplay();
  }
}

function checkout() {
  alert(
    `Thank you for your purchase! Total: $${cart
      .reduce((sum, item) => sum + item.price * item.quantity, 0)
      .toFixed(2)}`
  );
  cart = [];
  updateCartCount();
  updateCartDisplay();
}

function showSuccessMessage(message) {
  const successElement = document.getElementById("successMessage");
  successElement.textContent = message;
  successElement.style.display = "block";
  setTimeout(() => {
    successElement.style.display = "none";
  }, 3000);
}

// Close cart when clicking outside
window.onclick = function (event) {
  const cartModal = document.getElementById("cartModal");
  if (event.target === cartModal) {
    cartModal.style.display = "none";
  }
};

// Original navbar functionality
const body = document.querySelector("body");
const navbar = document.querySelector(".navbar");
const menuBtn = document.querySelector(".menu-btn");
const cancelBtn = document.querySelector(".cancel-btn");

menuBtn.onclick = () => {
  navbar.classList.add("show");
  menuBtn.classList.add("hide");
  body.classList.add("disabled");
};

cancelBtn.onclick = () => {
  body.classList.remove("disabled");
  navbar.classList.remove("show");
  menuBtn.classList.remove("hide");
};

window.onscroll = () => {
  this.scrollY > 20
    ? navbar.classList.add("sticky")
    : navbar.classList.remove("sticky");
};

// Improved typewriter effect
const textArray = [
  "Welcome to GAMEZ",
  "Every Game is an Adventure",
  "Enter the Realm of Legends",
  "Experience Gaming Heaven",
];

const mobileTextArray = [
  "Welcome to GAMEZ",
  "Gaming Adventures",
  "Realm of Legends",
  "Gaming Heaven",
];

const typingSpeed = 90;
const delayBetweenTexts = 1000;
let textIndex = 0;
let charIndex = 0;

const typewriterElement = document.getElementById("typewriter");

function isMobile() {
  return window.innerWidth <= 768;
}

function getCurrentTextArray() {
  return isMobile() ? mobileTextArray : textArray;
}

function typeText() {
  const currentArray = getCurrentTextArray();

  if (charIndex < currentArray[textIndex].length) {
    typewriterElement.textContent += currentArray[textIndex].charAt(charIndex);
    charIndex++;
    setTimeout(typeText, typingSpeed);
  } else {
    setTimeout(deleteText, delayBetweenTexts);
  }
}

function deleteText() {
  const currentArray = getCurrentTextArray();

  if (charIndex > 0) {
    typewriterElement.textContent = currentArray[textIndex].substring(
      0,
      charIndex - 1
    );
    charIndex--;
    setTimeout(deleteText, typingSpeed / 2);
  } else {
    textIndex = (textIndex + 1) % currentArray.length;
    setTimeout(typeText, typingSpeed);
  }
}

let resizeTimeout;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    typewriterElement.textContent = "";
    charIndex = 0;
    textIndex = 0;
    typeText();
  }, 250);
});

document.addEventListener("DOMContentLoaded", typeText);

//tournment
   
        function openModal() {
            document.getElementById('modalOverlay').classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        function closeModal() {
            document.getElementById('modalOverlay').classList.remove('active');
            document.body.style.overflow = 'auto';
            
            // Reset form after closing
            setTimeout(() => {
                document.getElementById('formContent').style.display = 'block';
                document.getElementById('thankYouContent').style.display = 'none';
                document.getElementById('signupForm').reset();
            }, 300);
        }

        // Handle form submission
        document.getElementById('signupForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            
            if (name && email) {
                // Hide form and show thank you message
                document.getElementById('formContent').style.display = 'none';
                document.getElementById('thankYouContent').style.display = 'block';
                
                // Auto close after 3 seconds
                setTimeout(() => {
                    closeModal();
                }, 3000);
            }
        });

        // Close modal when clicking outside
        document.getElementById('modalOverlay').addEventListener('click', function(e) {
            if (e.target === this) {
                closeModal();
            }
        });

        // Close modal with Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && document.getElementById('modalOverlay').classList.contains('active')) {
                closeModal();
            }
        });
    