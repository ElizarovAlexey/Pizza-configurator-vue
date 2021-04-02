class LocalStorage {
    constructor() {
        this.key = 'products';
    }

    getProducts() {
        return localStorage.getItem(this.key);
    }

    setProduct(item) {
        localStorage.setItem(this.key, item);
    }
}

const localStorageProducts = new LocalStorage();