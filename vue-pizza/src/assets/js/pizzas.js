class Products {
    constructor() {
        this.PIZZAS = [];
        this.DESSERTS = [];
        this.DRINKS = [];
    }

    async getInfo(url) {
        let promise = await fetch(url);
        return await promise.json();
    }

    printPizzas() {
        let content = '';
        this.PIZZAS.forEach((pizza) => {
            let ingredientsSelected = pizza.ingredients;
            content += `
            <div class="pizzas__item">
                        <div class="pizzas__item-img">
                            <img class="pizzas__item-image" src="${pizza.image}" alt="pizza">
                        </div>
                        <p class="pizzas__item-title">${pizza.name}</p>
                        <p class="pizzas__item-description">
                            ${pizza.description}
                        </p>
                        <div class="pizzas__item-dough-container">
                            <button class="pizzas__item-dough dough-selected">${pizza.dough} тесто</button>
                        </div>
                        <div class="pizzas__item-sizes">
                            <button class="pizzas__item-size size-selected">${pizza.size} см</button>
                        </div>
                        <a class="pizzas__detail-btnAdd" href="constructor/${pizza.id}">
                            <img src="static/img/icons/plus-icon.png" alt="plus icon">Изменить ингредиенты
                        </a>
                        <div class="pizzas__item-wrapper">
                            <button class="btn-tocart pizzas__item-tocart">В корзину</button>
                            <p class="pizzas__item-price">${pizza.cost + (ingredientsSelected.length * 7)} лей</p>
                        </div>
                    </div>
        `;
        });

        const pizzasBlock = document.getElementById('pizzas__items');
        pizzasBlock.innerHTML = content;
    }

    printDesserts() {
        let content = '';
        this.DESSERTS.forEach((dessert) => {
            content += `
                <div class="pizzas__item desserts__item">
                    <div class="pizzas__item-img desserts__item-img">
                        <img class="pizzas__item-image desserts__item-image" src="${dessert.image}" alt="dessert">
                    </div>
                    <p class="pizzas__item-title desserts__item-title">${dessert.name}</p>
                    <p class="pizzas__item-description desserts__item-description">
                        ${dessert.description}
                    </p>
                    <div class="desserts__item-wrapper pizzas__item-wrapper">
                        <button class="btn-tocart pizzas__item-tocart">В корзину</button>
                        <p class="desserts__item-price pizzas__item-price">${dessert.cost} лей</p>
                    </div>
                </div>
            `;
        });

        const dessertsBlock = document.getElementById('dessert__items');
        dessertsBlock.innerHTML = content;
    }

    printDrinks() {
        let content = '';
        this.DRINKS.forEach((drink) => {
            content += `
                <div class="pizzas__item drinks__item">
                    <div class="pizzas__item-img drinks__item-img">
                        <img class="pizzas__item-image drinks__item-image" src="${drink.image}"
                                alt="pizza">
                    </div>
                    <p class="pizzas__item-title drinks__item-title">${drink.name}</p>
                    <p class="pizzas__item-description drinks__item-description">
                        ${drink.description}
                    </p>
                    <div class="drinks__item-wrapper pizzas__item-wrapper">
                        <button class="btn-tocart drinks__item-tocart">В корзину</button>
                        <p class="drinks__item-price pizzas__item-price">${drink.cost} лей</p>
                    </div>
                </div>
            `;
        });

        const drinksBlock = document.getElementById('drink__items');
        drinksBlock.innerHTML = content;
    }
}

const main = () => {
    const products = new Products();

    products.getInfo('http://127.0.0.1:8000/api/pizzas/')
        .then(result => {
            products.PIZZAS = result;
            products.printPizzas();
        });

    products.getInfo('http://127.0.0.1:8000/api/desserts/')
        .then(result => {
            products.DESSERTS = result;
            products.printDesserts();
        });

    products.getInfo('http://127.0.0.1:8000/api/drinks/')
        .then(result => {
            products.DRINKS = result;
            products.printDrinks();
        });
}

main();

// Slider
const slider = () => {
    const dots = document.querySelectorAll('.slider__dots-item');
    const dotsAria = document.getElementById('slider__dots');
    const slides = document.querySelectorAll('.slider__item');
    const btnPrevious = document.getElementById('arrow-left');
    const btnNext = document.getElementById('arrow-right');

    const activeDotClass = 'slider__dots-item--active';
    let slideIndex = 1;

    const showSlides = (n) => {
        if (n < 1) {
            slideIndex = slides.length;
        } else if (n > slides.length) {
            slideIndex = 1;
        }

        for (let slide of slides) {
            slide.style.display = 'none';
        }

        for (let dot of dots) {
            dot.classList.remove(activeDotClass);
        }

        slides[slideIndex - 1].style.display = 'block';
        dots[slideIndex - 1].classList.add(activeDotClass);
    }

    showSlides();

    btnPrevious.addEventListener('click', () => {
        showSlides(slideIndex += (-1));
    });

    btnNext.addEventListener('click', () => {
        showSlides(slideIndex += 1);
    });

    setInterval(() => {
        showSlides(slideIndex += 1);
    }, 2000);
}

slider();

// Fixed header
const fixedHeader = () => {
    const header = document.getElementById('header');

    window.onscroll = () => {
        if (window.scrollY > 100) {
            header.classList.add('header--fixed');
        } else {
            header.classList.remove('header--fixed');
        }
    }
}

fixedHeader();