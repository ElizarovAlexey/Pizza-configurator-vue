class Constructor {
    constructor() {
        this.PIZZA = {};
        this.INGREDIENTS_ALL = [];
        this.SIZES = [];
        this.INGREDIENTS_SELECTED = [];
        this.SELECTED_SIZE = 0;
        this.TOTAL_PRICE = 0;
    }

    async getInfo(url) {
        let promise = await fetch(url);
        return await promise.json();
    }

    ingredientsHandler(btn) {
        const selectedButtonClass = 'constructor__ingredients-button--checked';
        if (btn.classList.contains(selectedButtonClass)) {
            btn.classList.remove(selectedButtonClass);
            this.INGREDIENTS_SELECTED.splice(this.INGREDIENTS_SELECTED.indexOf(btn.innerText), 1);
            this.printTotalPrice();
            this.printSelectedIngredients();
        } else if (this.INGREDIENTS_SELECTED.length < 10) {
            btn.classList.add(selectedButtonClass);
            this.INGREDIENTS_SELECTED.push(btn.innerText);
            this.printTotalPrice();
            this.printSelectedIngredients();
        }
    }

    printInfo() {
        this.INGREDIENTS_SELECTED = this.PIZZA.ingredients;
        this.SELECTED_SIZE = this.PIZZA.size;
        let defaultIngredientsContent = '';

        this.INGREDIENTS_SELECTED.forEach((ingredient) => {
            defaultIngredientsContent += `
                <button type="button" class="constructor__ingredients-button constructor__ingredients-button--checked">
                    ${ingredient}
                </button>
            `;
        });

        const defaultIngredientsBlock = document.getElementById('constructor__defaultIngredients');
        defaultIngredientsBlock.innerHTML = defaultIngredientsContent;

        let allIngredientsContent = '';
        this.INGREDIENTS_ALL.forEach((ingredient) => {
            allIngredientsContent += `
                <button type="button" class="constructor__ingredients-button">
                    ${ingredient.value}
                </button>
            `;
        });

        const allIngredientsBlock = document.getElementById('constructor__allIngredients');
        allIngredientsBlock.innerHTML = allIngredientsContent;
        this.printDetails();

        const ingredientsButtons = document.querySelectorAll('.constructor__ingredients-button');
        ingredientsButtons.forEach((btn) => {
           btn.addEventListener('click', () => {
               this.ingredientsHandler(btn);
           })
        });
    }

    printDetails() {
        let sizes = '';
        this.SIZES.forEach((size) => {
            sizes += `
                <button class="pizzas__item-size">${size.value} см</button>
            `;
        });
        let detailInfoContent = `
            <img class="pizza-info__image" src="${this.PIZZA.image}" alt="pizza">
            <p class="pizza-info__name">${this.PIZZA.name}</p>
            <div class="pizza-info__selected-dough">
                ${this.PIZZA.dough}
            </div>

            <div class="pizza-info__sizes">
                ${sizes}
            </div>
                    
            <p class="pizza-info__help-text">
                Ваша пицца содержит:
            </p>
        `;

        const detailInfoBlock = document.getElementById('pizza-info__details');
        detailInfoBlock.innerHTML = detailInfoContent;

        const sizeBtns = document.querySelectorAll('.pizzas__item-size');
        let sizeSelectedClass = 'size-selected';
        for (let btn of sizeBtns) {
            if (parseInt(btn.innerText) === this.SELECTED_SIZE) {
                btn.classList.add(sizeSelectedClass);
            }
            btn.addEventListener('click', () => {
                if (!btn.classList.contains(sizeSelectedClass)) {
                    sizeBtns.forEach(btn => btn.classList.remove(sizeSelectedClass));
                    btn.classList.add(sizeSelectedClass);
                    this.SELECTED_SIZE = parseInt(btn.innerText);
                    this.printSelectedIngredients();
                    this.printTotalPrice();
                }
            });
        }

        this.printSelectedIngredients();
        this.printTotalPrice();
    }

    printTotalPrice() {
        let sizePriceCoef = 0;
        switch(this.SELECTED_SIZE) {
            case 25:
                sizePriceCoef = 0.8;
            break;
            case 30:
                sizePriceCoef = 1;
            break;
            case 35:
                sizePriceCoef = 1.2;
            break;
            case 40:
                sizePriceCoef = 1.4;
            break;
        }

        this.TOTAL_PRICE = (this.PIZZA.cost * sizePriceCoef) + (this.INGREDIENTS_SELECTED.length * 7);
        let priceInfoContent = `
            <p>Итого: </p>
            <p class="pizza-info__price">
                ${this.TOTAL_PRICE} лей
            </p>
        `;
        const priceInfoBlock = document.getElementById('pizza-info__price-wrapper');
        priceInfoBlock.innerHTML = priceInfoContent;
        return sizePriceCoef;
    }

    printSelectedIngredients() {
        let selectedIngredientsContent = '';
        this.INGREDIENTS_SELECTED.forEach((ingredient) => {
            selectedIngredientsContent += `
                <li class="pizza-info__selected-ingredient">
                    <p class="pizza-info__selected-ingredient-text">
                        ${ingredient}
                    </p>

                    <p class="pizza-info__selected-ingredient-price">
                        ${this.INGREDIENTS_ALL[0].cost} лей
                    </p>
                </li>
            `;
        });
        const selectedIngredientsListBlock = document.getElementById('pizza-info__selected-ingredients-list');
        selectedIngredientsListBlock.innerHTML = '';
        selectedIngredientsListBlock.innerHTML += `
            <li class="pizza-info__selected-ingredient">
                <p class="pizza-info__selected-ingredient-text">
                    ${this.PIZZA.dough}, ${this.SELECTED_SIZE} см
                </p>

                <p class="pizza-info__selected-ingredient-price">
                    ${this.PIZZA.cost * this.printTotalPrice()} лей
                </p>
            </li>
        `;
        selectedIngredientsListBlock.innerHTML += selectedIngredientsContent;
    }
}

const constructor = new Constructor();

async function constructorMain() {
    constructor.PIZZA = await constructor.getInfo(`http://127.0.0.1:8000/api/pizzas/3`);
    constructor.INGREDIENTS_ALL = await constructor.getInfo('http://127.0.0.1:8000/api/ingredients/');
    constructor.SIZES = await constructor.getInfo('http://127.0.0.1:8000/api/sizes/');
    constructor.printInfo();
}

constructorMain();
