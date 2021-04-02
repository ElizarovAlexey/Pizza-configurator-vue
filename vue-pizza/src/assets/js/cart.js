let CART_PRODUCTS = [];
class Cart {

    renderItems() {
        const cart = document.getElementById('cart__items');

        let ingredients = '';
        CART_PRODUCTS.ingredients.forEach((ingredient) => {
            ingredients += `
            <span>${ingredient}</span>
            `;
        });

        let content = '';
        CART_PRODUCTS.forEach((item) => {
            content += `
                <li class="cart__item">
                        <div class="cart__item-info-wrapper">
                            <img class="cart__item-img" src="https://placehold.it/300x300" alt="Product">
                            <div class="cart__item-info">
                                <p class="cart-info-title">
                                    ${item.name}
                                </p>
                                <div class="cart-info-ingredients">
                                    ${ingredients}
                                </div>
                            </div>
                        </div>

                        <div class="cart__item-price-wrapper">
                            <p class="cart__item-price">
                                ${item.price} лей
                            </p>

                            <button type="button" id="cart__item-delete" class="cart__item-delete">
                                &times;
                            </button>
                        </div>
                    </li>
                    <hr class="cart__sep">
            `;
        });

        const counter = document.getElementById('cart-counter');
        counter.innerHTML = CART_PRODUCTS.length.toString();
    }

}

const cart = new Cart();