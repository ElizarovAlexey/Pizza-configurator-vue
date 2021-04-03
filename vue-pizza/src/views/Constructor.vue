<template>
  <!-- Constructor -->
  <div class="constructor">
    <div class="constructor__container">
      <div class="constructor__inner">

        <div class="constructor__ingredients">
          <h2 class="constructor__title">Собери свою пиццу</h2>
          <p class="constructor__info">У пиццы может быть не больше 10 ингредиентов.</p>

          <div id="constructor__default-ingredients">
            <h2 class="constructor__title">Игредиенты</h2>
            <div class="constructor__ingredients-items" id="constructor__defaultIngredients">

              <button v-for="ingredient in pizza.ingredients"
                      :key="ingredient.id"
                      type="button"
                      class="constructor__ingredients-button constructor__ingredients-button--checked"
                      @click="handleDefaultIngredients($event.target, ingredient)">
                {{ ingredient }}
              </button>

            </div>
          </div>

          <div id="constructor__all-ingredients">
            <h2 class="constructor__title">Дополнительные игредиенты</h2>
            <div class="constructor__ingredients-items" id="constructor__allIngredients">

              <button v-for="ingredient in ingredients"
                      :key="ingredient.id"
                      type="button"
                      class="constructor__ingredients-button"
                      @click="handleAdditionalIngredients($event.target, ingredient.value, ingredient.cost)">
                {{ ingredient.value }}
              </button>

            </div>
          </div>
        </div>


        <div class="constructor__pizza-info">
          <div id="pizza-info__details">

            <img class="pizza-info__image" src="../assets/img/products/pizza1.jpg" alt="pizza">
            <p class="pizza-info__name">{{ pizza.name }}</p>
            <div class="pizza-info__selected-dough">
              {{ pizza.dough }}
            </div>

            <div class="pizza-info__sizes">
              <button v-for="size in sizes"
                      :key="size.id"
                      class="pizzas__item-size"
                      :class="size.value === pizza.size ? 'size-selected' : ''"
                      @click="changeSize(size.value, $event.target)">
                {{ size.value }} см
              </button>
            </div>

            <p class="pizza-info__help-text">
              Ваша пицца содержит:
            </p>

          </div>

          <ul id="pizza-info__selected-ingredients-list" class="pizza-info__selected-ingredients-list">

            <li class="pizza-info__selected-ingredient">
              <p class="pizza-info__selected-ingredient-text">
                {{ pizza.dough }}, {{ pizza.size }} см
              </p>

              <p class="pizza-info__selected-ingredient-price">
                {{ pizzaCost }} лей
              </p>
            </li>

            <li v-for="defaultIngredient in defaultIngredients"
                :key="defaultIngredient.id"
                class="pizza-info__selected-ingredient">

              <p class="pizza-info__selected-ingredient-text">
                {{ defaultIngredient }}
              </p>

            </li>

            <li class="pizza-info__selected-ingredient pizza-info__ingredients-text">
              Дополнительные ингредиенты:
            </li>

            <li v-for="ingredient in selectedIngredients"
                :key="ingredient.id"
                class="pizza-info__selected-ingredient">
              <p class="pizza-info__selected-ingredient-text">
                {{ ingredient.value }}
              </p>

              <p class="pizza-info__selected-ingredient-price">
                {{ ingredient.cost }} лей
              </p>
            </li>

          </ul>


          <div class="pizza-info__wrapper">
            <button id="constructor-addToCart" class="btn-tocart">
              В корзину
            </button>

            <div id="pizza-info__price-wrapper" class="pizza-info__price-wrapper">

              <p>Итого: </p>
              <p class="pizza-info__price">
                {{ this.totalPrice }} лей
              </p>

            </div>
          </div>

        </div>
      </div> <!-- ./constructor__inner -->
    </div> <!-- ./container -->
  </div> <!-- ./constructor -->
</template>

<script>
export default {
  name: "Constructor",
  props: ['id'],
  data() {
    return {
      pizza: {},
      ingredients: {},
      sizes: {},
      defaultIngredients: [],
      selectedIngredients: [],
      allIngredients: [],
      totalPrice: 0,
      additionalPrice: 0,
      pizzaCost: 0,
    }
  },
  created() {
    this.loadPizza();
    this.loadIngredients();
    this.loadSizes();
  },
  methods: {
    async loadPizza() {
      this.pizza = await fetch(
          `${this.$store.getters.getServerUrl}/pizzas/${this.id}`
      ).then(response => response.json());
      this.defaultIngredients = (this.pizza.ingredients).slice();
      this.totalPrice = this.pizzaCost = this.pizza.cost;
    },
    async loadIngredients() {
      this.ingredients = await fetch(
          `${this.$store.getters.getServerUrl}/ingredients/`
      ).then(response => response.json())
    },
    async loadSizes() {
      this.sizes = await fetch(
          `${this.$store.getters.getServerUrl}/sizes/`
      ).then(response => response.json())
    },
    handleDefaultIngredients(button, ingredient) {
      this.allIngredients = this.defaultIngredients.concat(this.selectedIngredients);

      if (button.classList.contains('constructor__ingredients-button--checked')) {
        button.classList.remove('constructor__ingredients-button--checked');
        this.defaultIngredients.splice(this.defaultIngredients.indexOf(ingredient), 1);
      } else if (this.allIngredients.length < 10) {
        button.classList.add('constructor__ingredients-button--checked');
        this.defaultIngredients.push(ingredient);
      }
    },
    handleAdditionalIngredients(button, value, cost) {
      this.allIngredients = this.defaultIngredients.concat(this.selectedIngredients);

      if (button.classList.contains('constructor__ingredients-button--checked')) {
        button.classList.remove('constructor__ingredients-button--checked');
        this.selectedIngredients.splice(this.selectedIngredients.indexOf(value), 1);
      } else if (this.allIngredients.length < 10) {
        button.classList.add('constructor__ingredients-button--checked');
        this.selectedIngredients.push({value, cost});
      }

      this.additionalPrice = 0;

      this.selectedIngredients.forEach(ingredient => {
        this.additionalPrice += ingredient.cost;
      });

      this.totalPrice = this.pizzaCost + this.additionalPrice;
    },
    changeSize(size, sizeBtn) {
      let sizesButtons = document.getElementsByClassName('pizzas__item-size');
      for (let btn of sizesButtons) {
        btn.classList.remove('size-selected');
      }
      sizeBtn.classList.add('size-selected');

      let coefficient = 0;
      switch (size) {
        case 25:
          coefficient = 0.8;
          break;
        case 30:
          coefficient = 1;
          break;
        case 35:
          coefficient = 1.2;
          break;
        case 40:
          coefficient = 1.4;
          break;
      }
      this.pizzaCost = Math.ceil(this.pizza.cost * coefficient);
      this.totalPrice = Math.ceil((this.pizzaCost + this.additionalPrice) * coefficient);
    }
  }
}
</script>

<style scoped>
.constructor {
  margin-bottom: 150px;
}

.pizza-info__ingredients-text {
  font-weight: bold;
  font-size: 15px;
}
</style>