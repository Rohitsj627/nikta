// Main JavaScript file for AudioPhile website

class AudioPhileApp {
    constructor() {
        this.cart = JSON.parse(localStorage.getItem('cart')) || [];
        this.products = [];
        this.filteredProducts = [];
        this.currentFilter = 'all';
        this.productsPerPage = 12;
        this.currentPage = 1;
        
        this.init();
    }
    
    init() {
        this.loadProducts();
        this.setupEventListeners();
        this.updateCartUI();
        this.setupScrollAnimations();
        this.setupNavigation();
    }
    
    // Product data
    loadProducts() {
        this.products = [
            {
                id: 1,
                name: "Premium Wireless Headphones",
                brand: "AudioTech",
                category: "headphones",
                price: 299.99,
                originalPrice: 399.99,
                image: "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
                rating: 4.8,
                reviews: 124,
                badge: "Sale",
                description: "Experience crystal-clear audio with our premium wireless headphones featuring active noise cancellation."
            },
            {
                id: 2,
                name: "True Wireless Earbuds",
                brand: "SoundPro",
                category: "earbuds",
                price: 199.99,
                originalPrice: null,
                image: "https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
                rating: 4.6,
                reviews: 89,
                badge: null,
                description: "Compact and powerful true wireless earbuds with superior sound quality and long battery life."
            },
            {
                id: 3,
                name: "Portable Bluetooth Speaker",
                brand: "BassMax",
                category: "speakers",
                price: 149.99,
                originalPrice: 199.99,
                image: "https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
                rating: 4.7,
                reviews: 156,
                badge: "New",
                description: "Powerful portable speaker with 360-degree sound and waterproof design for any adventure."
            },
            {
                id: 4,
                name: "Studio Monitor Headphones",
                brand: "ProAudio",
                category: "headphones",
                price: 449.99,
                originalPrice: null,
                image: "https://images.pexels.com/photos/205926/pexels-photo-205926.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
                rating: 4.9,
                reviews: 67,
                badge: null,
                description: "Professional-grade studio monitor headphones for accurate sound reproduction."
            },
            {
                id: 5,
                name: "Gaming Headset",
                brand: "GameSound",
                category: "headphones",
                price: 179.99,
                originalPrice: 229.99,
                image: "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
                rating: 4.5,
                reviews: 203,
                badge: "Popular",
                description: "Immersive gaming headset with 7.1 surround sound and crystal-clear microphone."
            },
            {
                id: 6,
                name: "Noise-Cancelling Earbuds",
                brand: "QuietTech",
                category: "earbuds",
                price: 249.99,
                originalPrice: null,
                image: "https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
                rating: 4.7,
                reviews: 91,
                badge: null,
                description: "Advanced noise-cancelling earbuds for the ultimate listening experience."
            },
            {
                id: 7,
                name: "Smart Home Speaker",
                brand: "VoiceHub",
                category: "speakers",
                price: 99.99,
                originalPrice: 129.99,
                image: "https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
                rating: 4.4,
                reviews: 178,
                badge: "Sale",
                description: "Smart speaker with voice assistant and premium sound quality for your home."
            },
            {
                id: 8,
                name: "Premium Audio Cable",
                brand: "CablePro",
                category: "accessories",
                price: 49.99,
                originalPrice: null,
                image: "https://images.pexels.com/photos/205926/pexels-photo-205926.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
                rating: 4.3,
                reviews: 45,
                badge: null,
                description: "High-quality audio cable for professional and audiophile applications."
            }
        ];
        
        this.filteredProducts = [...this.products];
        this.renderProducts();
    }
    
    // Event Listeners
    setupEventListeners() {
        // Navigation
        document.getElementById('search-btn').addEventListener('click', () => this.toggleSearch());
        document.getElementById('cart-btn').addEventListener('click', () => this.toggleCart());
        document.getElementById('user-btn').addEventListener('click', () => this.showUserMenu());
        document.getElementById('mobile-menu-btn').addEventListener('click', () => this.toggleMobileMenu());
        
        // Search
        document.getElementById('search-close').addEventListener('click', () => this.toggleSearch());
        document.getElementById('search-input').addEventListener('input', (e) => this.handleSearch(e.target.value));
        
        // Cart
        document.getElementById('cart-close').addEventListener('click', () => this.toggleCart());
        
        // Product filters
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.filterProducts(e.target.dataset.filter));
        });
        
        // Load more products
        document.getElementById('load-more-btn').addEventListener('click', () => this.loadMoreProducts());
        
        // Category cards
        document.querySelectorAll('.category-card').forEach(card => {
            card.addEventListener('click', (e) => {
                const category = e.currentTarget.dataset.category;
                this.filterProducts(category);
                this.scrollToSection('products');
            });
        });
        
        // Forms
        document.getElementById('newsletter-form').addEventListener('submit', (e) => this.handleNewsletterSubmit(e));
        document.getElementById('contact-form').addEventListener('submit', (e) => this.handleContactSubmit(e));
        
        // Back to top
        document.getElementById('back-to-top').addEventListener('click', () => this.scrollToTop());
        
        // Close modals on outside click
        document.addEventListener('click', (e) => this.handleOutsideClick(e));
        
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => this.handleKeyboard(e));
        
        // Scroll events
        window.addEventListener('scroll', () => this.handleScroll());
        
        // Smooth scrolling for navigation links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = e.target.getAttribute('href').substring(1);
                this.scrollToSection(target);
                this.updateActiveNavLink(target);
            });
        });
    }
    
    // Navigation
    setupNavigation() {
        // Update active nav link on scroll
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    this.updateActiveNavLink(id);
                }
            });
        }, { threshold: 0.3 });
        
        sections.forEach(section => observer.observe(section));
    }
    
    updateActiveNavLink(activeId) {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${activeId}`) {
                link.classList.add('active');
            }
        });
    }
    
    scrollToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            const offsetTop = section.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    }
    
    scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
    
    // Search functionality
    toggleSearch() {
        const modal = document.getElementById('search-modal');
        const input = document.getElementById('search-input');
        
        modal.classList.toggle('active');
        
        if (modal.classList.contains('active')) {
            setTimeout(() => input.focus(), 300);
        } else {
            input.value = '';
            document.getElementById('search-results').innerHTML = '';
        }
    }
    
    handleSearch(query) {
        const results = document.getElementById('search-results');
        
        if (query.length < 2) {
            results.innerHTML = '';
            return;
        }
        
        const filteredProducts = this.products.filter(product =>
            product.name.toLowerCase().includes(query.toLowerCase()) ||
            product.brand.toLowerCase().includes(query.toLowerCase()) ||
            product.category.toLowerCase().includes(query.toLowerCase())
        );
        
        if (filteredProducts.length === 0) {
            results.innerHTML = '<p class="no-results">No products found</p>';
            return;
        }
        
        results.innerHTML = filteredProducts.map(product => `
            <div class="search-result-item" onclick="app.showProductModal(${product.id})">
                <img src="${product.image}" alt="${product.name}">
                <div class="search-result-info">
                    <h4>${product.name}</h4>
                    <p>${product.brand}</p>
                    <span class="price">$${product.price}</span>
                </div>
            </div>
        `).join('');
    }
    
    // Cart functionality
    toggleCart() {
        const sidebar = document.getElementById('cart-sidebar');
        sidebar.classList.toggle('active');
        
        if (sidebar.classList.contains('active')) {
            this.renderCartItems();
        }
    }
    
    addToCart(productId) {
        const product = this.products.find(p => p.id === productId);
        if (!product) return;
        
        const existingItem = this.cart.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.cart.push({ ...product, quantity: 1 });
        }
        
        this.saveCart();
        this.updateCartUI();
        this.showNotification('Product added to cart!', 'success');
    }
    
    removeFromCart(productId) {
        this.cart = this.cart.filter(item => item.id !== productId);
        this.saveCart();
        this.updateCartUI();
        this.renderCartItems();
    }
    
    updateCartQuantity(productId, quantity) {
        const item = this.cart.find(item => item.id === productId);
        if (item) {
            if (quantity <= 0) {
                this.removeFromCart(productId);
            } else {
                item.quantity = quantity;
                this.saveCart();
                this.updateCartUI();
                this.renderCartItems();
            }
        }
    }
    
    saveCart() {
        localStorage.setItem('cart', JSON.stringify(this.cart));
    }
    
    updateCartUI() {
        const cartCount = document.querySelector('.cart-count');
        const totalItems = this.cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
        cartCount.style.display = totalItems > 0 ? 'block' : 'none';
    }
    
    renderCartItems() {
        const cartItems = document.getElementById('cart-items');
        const cartTotal = document.getElementById('cart-total');
        
        if (this.cart.length === 0) {
            cartItems.innerHTML = `
                <div class="empty-cart">
                    <i class="fas fa-shopping-cart"></i>
                    <p>Your cart is empty</p>
                </div>
            `;
            cartTotal.textContent = '0.00';
            return;
        }
        
        const total = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        cartTotal.textContent = total.toFixed(2);
        
        cartItems.innerHTML = this.cart.map(item => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <p class="cart-item-price">$${item.price}</p>
                    <div class="quantity-controls">
                        <button onclick="app.updateCartQuantity(${item.id}, ${item.quantity - 1})">-</button>
                        <span>${item.quantity}</span>
                        <button onclick="app.updateCartQuantity(${item.id}, ${item.quantity + 1})">+</button>
                    </div>
                </div>
                <button class="remove-item" onclick="app.removeFromCart(${item.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `).join('');
    }
    
    // Product functionality
    filterProducts(category) {
        this.currentFilter = category;
        this.currentPage = 1;
        
        // Update filter buttons
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.filter === category) {
                btn.classList.add('active');
            }
        });
        
        // Filter products
        if (category === 'all') {
            this.filteredProducts = [...this.products];
        } else {
            this.filteredProducts = this.products.filter(product => product.category === category);
        }
        
        this.renderProducts();
    }
    
    renderProducts() {
        const grid = document.getElementById('products-grid');
        const productsToShow = this.filteredProducts.slice(0, this.currentPage * this.productsPerPage);
        
        grid.innerHTML = productsToShow.map(product => this.createProductCard(product)).join('');
        
        // Update load more button
        const loadMoreBtn = document.getElementById('load-more-btn');
        if (productsToShow.length >= this.filteredProducts.length) {
            loadMoreBtn.style.display = 'none';
        } else {
            loadMoreBtn.style.display = 'block';
        }
        
        // Add scroll animations to new products
        this.setupScrollAnimations();
    }
    
    createProductCard(product) {
        const stars = '★'.repeat(Math.floor(product.rating)) + '☆'.repeat(5 - Math.floor(product.rating));
        
        return `
            <div class="product-card fade-in" data-category="${product.category}">
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}">
                    ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
                    <div class="product-actions">
                        <button class="action-btn" onclick="app.addToWishlist(${product.id})" title="Add to Wishlist">
                            <i class="fas fa-heart"></i>
                        </button>
                        <button class="action-btn" onclick="app.showProductModal(${product.id})" title="Quick View">
                            <i class="fas fa-eye"></i>
                        </button>
                    </div>
                </div>
                <div class="product-info">
                    <div class="product-brand">${product.brand}</div>
                    <h3 class="product-title">${product.name}</h3>
                    <div class="product-rating">
                        <div class="stars">${stars}</div>
                        <span class="rating-text">${product.rating} (${product.reviews})</span>
                    </div>
                    <div class="product-price">
                        <span class="current-price">$${product.price}</span>
                        ${product.originalPrice ? `<span class="original-price">$${product.originalPrice}</span>` : ''}
                    </div>
                    <button class="add-to-cart" onclick="app.addToCart(${product.id})">
                        Add to Cart
                    </button>
                </div>
            </div>
        `;
    }
    
    loadMoreProducts() {
        this.currentPage++;
        this.renderProducts();
    }
    
    showProductModal(productId) {
        const product = this.products.find(p => p.id === productId);
        if (!product) return;
        
        const modal = document.getElementById('product-modal');
        const modalBody = document.getElementById('modal-body');
        
        const stars = '★'.repeat(Math.floor(product.rating)) + '☆'.repeat(5 - Math.floor(product.rating));
        
        modalBody.innerHTML = `
            <div class="product-modal-content">
                <div class="product-modal-image">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="product-modal-info">
                    <div class="product-brand">${product.brand}</div>
                    <h2>${product.name}</h2>
                    <div class="product-rating">
                        <div class="stars">${stars}</div>
                        <span class="rating-text">${product.rating} (${product.reviews} reviews)</span>
                    </div>
                    <div class="product-price">
                        <span class="current-price">$${product.price}</span>
                        ${product.originalPrice ? `<span class="original-price">$${product.originalPrice}</span>` : ''}
                    </div>
                    <p class="product-description">${product.description}</p>
                    <div class="product-actions">
                        <button class="btn btn-primary" onclick="app.addToCart(${product.id})">
                            <i class="fas fa-shopping-cart"></i>
                            Add to Cart
                        </button>
                        <button class="btn btn-secondary" onclick="app.addToWishlist(${product.id})">
                            <i class="fas fa-heart"></i>
                            Add to Wishlist
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        modal.classList.add('active');
    }
    
    addToWishlist(productId) {
        // Implement wishlist functionality
        this.showNotification('Added to wishlist!', 'success');
    }
    
    // Form handling
    handleNewsletterSubmit(e) {
        e.preventDefault();
        const email = e.target.querySelector('input[type="email"]').value;
        
        // Simulate API call
        this.showLoading();
        setTimeout(() => {
            this.hideLoading();
            this.showNotification('Successfully subscribed to newsletter!', 'success');
            e.target.reset();
        }, 1000);
    }
    
    handleContactSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        
        // Simulate API call
        this.showLoading();
        setTimeout(() => {
            this.hideLoading();
            this.showNotification('Message sent successfully!', 'success');
            e.target.reset();
        }, 1500);
    }
    
    // Utility functions
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
            <button onclick="this.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        setTimeout(() => {
            notification.remove();
        }, 5000);
    }
    
    showLoading() {
        document.getElementById('loading-spinner').classList.add('active');
    }
    
    hideLoading() {
        document.getElementById('loading-spinner').classList.remove('active');
    }
    
    toggleMobileMenu() {
        const navMenu = document.getElementById('nav-menu');
        navMenu.classList.toggle('active');
    }
    
    showUserMenu() {
        // Implement user menu functionality
        this.showNotification('User menu coming soon!', 'info');
    }
    
    // Event handlers
    handleOutsideClick(e) {
        // Close search modal
        const searchModal = document.getElementById('search-modal');
        if (searchModal.classList.contains('active') && !searchModal.querySelector('.search-content').contains(e.target)) {
            this.toggleSearch();
        }
        
        // Close product modal
        const productModal = document.getElementById('product-modal');
        if (productModal.classList.contains('active') && !productModal.querySelector('.modal-content').contains(e.target)) {
            productModal.classList.remove('active');
        }
        
        // Close cart sidebar
        const cartSidebar = document.getElementById('cart-sidebar');
        if (cartSidebar.classList.contains('active') && !cartSidebar.contains(e.target) && !e.target.closest('#cart-btn')) {
            this.toggleCart();
        }
    }
    
    handleKeyboard(e) {
        // ESC key closes modals
        if (e.key === 'Escape') {
            document.getElementById('search-modal').classList.remove('active');
            document.getElementById('product-modal').classList.remove('active');
            document.getElementById('cart-sidebar').classList.remove('active');
        }
        
        // Ctrl/Cmd + K opens search
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            this.toggleSearch();
        }
    }
    
    handleScroll() {
        const scrollTop = window.pageYOffset;
        
        // Show/hide back to top button
        const backToTop = document.getElementById('back-to-top');
        if (scrollTop > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
        
        // Navbar background on scroll
        const navbar = document.getElementById('navbar');
        if (scrollTop > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        }
    }
    
    // Scroll animations
    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);
        
        // Observe elements with animation classes
        document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in').forEach(el => {
            observer.observe(el);
        });
    }
}

// Initialize the app
const app = new AudioPhileApp();

// Global functions for inline event handlers
window.scrollToSection = (sectionId) => app.scrollToSection(sectionId);