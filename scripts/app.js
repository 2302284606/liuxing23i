class MenuApp {
    constructor() {
        this.selectedItems = new Map();
        this.allItems = menuData.items;
        this.filteredItems = [...this.allItems];
        this.currentCategory = null;
        this.loadFromLocalStorage();
        this.init();
    }

    init() {
        this.renderMenu();
        this.renderCategories();
        this.bindEvents();
        this.initSearch();
    }

    initSearch() {
        const searchHTML = `
            <div class="search-container">
                <input type="text" id="search-input" placeholder="搜索菜品...">
            </div>
        `;
        document.querySelector('.menu-section h2').insertAdjacentHTML('afterend', searchHTML);
        
        document.getElementById('search-input').addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            this.filteredItems = this.allItems.filter(item => 
                item.name.toLowerCase().includes(searchTerm)
            );
            this.renderMenu();
        });
    }

    renderMenu() {
        const menuContainer = document.querySelector('.menu-items');
        menuContainer.innerHTML = '';
        this.filteredItems.forEach(item => {
            const itemElement = this.createMenuItemElement(item);
            menuContainer.appendChild(itemElement);
        });
    }

    createMenuItemElement(item) {
        const div = document.createElement('div');
        div.className = 'menu-item';
        div.dataset.id = item.id;
        const imagePath = item.image || '';
        
        div.innerHTML = `
            ${imagePath ? `
                <img 
                    src="${imagePath}" 
                    alt="${item.name}"
                    onerror="console.error('Failed to load image for ${item.name}:', this.src)"
                >
            ` : ''}
            <div class="menu-item-info">
                <div class="menu-item-name">${item.name}</div>
            </div>
        `;
        
        if (item.image) {
            const img = div.querySelector('img');
            img.addEventListener('load', () => {
                console.log(`Image loaded successfully: ${item.image}`);
            });
            img.addEventListener('error', () => {
                console.log(`Failed to load image: ${item.image}`);
            });
        }
        
        return div;
    }

    bindEvents() {
        document.querySelector('.menu-items').addEventListener('click', (e) => {
            const menuItem = e.target.closest('.menu-item');
            if (menuItem) {
                this.toggleMenuItem(menuItem.dataset.id);
            }
        });

        document.getElementById('confirm-order').addEventListener('click', () => {
            this.confirmOrder();
        });
    }

    loadFromLocalStorage() {
        const savedItems = localStorage.getItem('selectedItems');
        if (savedItems) {
            const items = JSON.parse(savedItems);
            items.forEach(item => {
                this.selectedItems.set(item.id.toString(), item);
            });
        }
    }

    saveToLocalStorage() {
        const items = Array.from(this.selectedItems.values());
        localStorage.setItem('selectedItems', JSON.stringify(items));
    }

    toggleMenuItem(itemId) {
        const item = menuData.items.find(i => i.id === parseInt(itemId));
        if (this.selectedItems.has(itemId)) {
            this.selectedItems.delete(itemId);
        } else {
            this.selectedItems.set(itemId, item);
        }
        this.updateOrderSummary();
        this.saveToLocalStorage();
    }

    updateOrderSummary() {
        const selectedItemsContainer = document.querySelector('.selected-items');
        selectedItemsContainer.innerHTML = '';
        document.getElementById('total-amount').textContent = '0';

        this.selectedItems.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'selected-item';
            itemElement.innerHTML = `
                <span>${item.name}</span>
            `;
            selectedItemsContainer.appendChild(itemElement);
        });
    }

    confirmOrder() {
        if (this.selectedItems.size === 0) {
            alert('请先选择菜品');
            return;
        }
        
        alert('订单已确认！');
        this.saveConfirmedOrder();
        this.showConfirmedOrders();
        this.selectedItems.clear();
        this.updateOrderSummary();
    }

    saveConfirmedOrder() {
        const confirmedOrders = JSON.parse(localStorage.getItem('confirmedOrders') || '[]');
        const newOrder = {
            id: Date.now(),
            items: Array.from(this.selectedItems.values()),
            timestamp: new Date().toLocaleString()
        };
        confirmedOrders.push(newOrder);
        localStorage.setItem('confirmedOrders', JSON.stringify(confirmedOrders));
    }

    showConfirmedOrders() {
        const confirmedOrders = JSON.parse(localStorage.getItem('confirmedOrders') || '[]');
        const confirmedItemsContainer = document.querySelector('.confirmed-items');
        const confirmedOrdersSection = document.querySelector('.confirmed-orders');
        
        if (confirmedOrders.length > 0) {
            confirmedOrdersSection.style.display = 'block';
            confirmedItemsContainer.innerHTML = confirmedOrders.map(order => `
                <div class="confirmed-order">
                    <div class="order-time">${order.timestamp}</div>
                    <div class="order-items">
                        ${order.items.map(item => `
                            <div class="confirmed-item">
                                <span class="item-name">${item.name}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `).join('');
        }
    }

    renderCategories() {
        const categoriesContainer = document.querySelector('.menu-categories');
        const allCategoriesBtn = document.createElement('button');
        allCategoriesBtn.className = 'category-btn active';
        allCategoriesBtn.textContent = '全部';
        allCategoriesBtn.addEventListener('click', () => this.filterByCategory(null));
        categoriesContainer.appendChild(allCategoriesBtn);

        menuData.categories.forEach(category => {
            const btn = document.createElement('button');
            btn.className = 'category-btn';
            btn.textContent = category.name;
            btn.addEventListener('click', () => this.filterByCategory(category.id));
            categoriesContainer.appendChild(btn);
        });
    }

    filterByCategory(categoryId) {
        this.currentCategory = categoryId;
        this.filteredItems = categoryId
            ? this.allItems.filter(item => item.category === categoryId)
            : [...this.allItems];

        document.querySelectorAll('.category-btn').forEach(btn => {
            btn.classList.toggle('active', 
                (categoryId === null && btn.textContent === '全部') ||
                btn.textContent === menuData.categories.find(c => c.id === categoryId)?.name
            );
        });

        this.renderMenu();
    }
}

// 初始化应用
document.addEventListener('DOMContentLoaded', () => {
    new MenuApp();
}); 