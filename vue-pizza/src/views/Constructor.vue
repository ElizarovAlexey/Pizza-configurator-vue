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
                {{ ingredient.value }}
              </button>

            </div>
          </div>

          <div id="constructor__all-ingredients">
            <h2 class="constructor__title">Дополнительные игредиенты</h2>
            <div class="constructor__ingredients-items" id="constructor__allIngredients">

              <button v-for="ingredient in additionalIngredients"
                      :key="ingredient.id"
                      type="button"
                      class="constructor__ingredients-button"
                      @click="handleAdditionalIngredients($event.target, ingredient)">
                {{ ingredient.value }}
              </button>

            </div>
          </div>
        </div>

        <div class="constructor__pizza-info">
          <div id="pizza-info__details">

            <img class="pizza-info__image" :src="pizza.image" alt="pizza">
            <p class="pizza-info__name">{{ pizza.name }}</p>
            <div class="pizza-info__selected-dough">
              {{ pizza.dough.type }}
            </div>

            <div class="pizza-info__sizes">
              <button v-for="size in sizes"
                      :key="size.id"
                      class="pizzas__item-size"
                      :class="size.value === pizza.size.value ? 'size-selected' : ''"
                      @click="changeSize(size, $event.target)">
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
                {{ pizza.dough.type }}, {{ pizza.size.value }} см
              </p>

              <p class="pizza-info__selected-ingredient-price">
                {{ pizza.size.cost + pizza.size.cost }} лей
              </p>
            </li>

            <li v-for="defaultIngredient in defaultIngredients"
                :key="defaultIngredient.id"
                class="pizza-info__selected-ingredient">

              <p class="pizza-info__selected-ingredient-text">
                {{ defaultIngredient.value }}
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
            <button id="constructor-addToCart"
                    class="btn-tocart"
                    @click="sendChangesToCart()">
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
      sizes: [],
      defaultIngredients: [],
      additionalIngredients: [],
      selectedIngredients: [],
      allIngredients: [],
      totalPrice: 0,
      basePrice: 0,
      additionalPrice: 0,
    }
  },
  created() {
    this.loadPizza();
    this.loadSizes();
  },
  methods: {
    async loadPizza() {
      this.pizza = await fetch(
          `${this.$store.getters.getServerUrl}/intermediate/${this.id}`
      ).then(response => response.json());
      this.defaultIngredients = (this.pizza.ingredients).slice();
      this.additionalIngredients = (this.pizza.additionalIngredients).slice();
      this.totalPrice = this.basePrice = this.pizza.cost + this.pizza.dough.cost + this.pizza.size.cost;
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
    handleAdditionalIngredients(button, ingredient) {
      this.allIngredients = this.defaultIngredients.concat(this.selectedIngredients);

      if (button.classList.contains('constructor__ingredients-button--checked')) {
        button.classList.remove('constructor__ingredients-button--checked');
        this.selectedIngredients.splice(this.selectedIngredients.indexOf(ingredient.value), 1);
      } else if (this.allIngredients.length < 10) {
        button.classList.add('constructor__ingredients-button--checked');
        this.selectedIngredients.push(ingredient);
      }

      this.additionalPrice = 0;

      this.selectedIngredients.forEach(ingredient => {
        this.additionalPrice += ingredient.cost;
      });

      this.totalPrice = this.basePrice + this.additionalPrice;
    },
    changeSize(size, sizeBtn) {
      let sizesButtons = document.getElementsByClassName('pizzas__item-size');
      for (let btn of sizesButtons) {
        btn.classList.remove('size-selected');
      }
      sizeBtn.classList.add('size-selected');
      this.pizza.size = size;
      this.totalPrice = this.basePrice + this.additionalPrice + size.cost;
    },
    async sendChangesToCart() {
      this.allIngredients = this.defaultIngredients.concat(this.selectedIngredients);

      let data = {
        name: this.pizza.name,
        image: this.pizza.image,
        dough: this.pizza.dough,
        cost: this.totalPrice,
        size: this.pizza.size,
        ingredients: this.defaultIngredients,
        additionalIngredients: this.selectedIngredients,
      }

      await fetch(`${this.$store.getters.getServerUrl}/cart/${this.id}`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          }
      ).then(response => response.json());
      await this.saveToCart();
      await this.$router.push({name: 'Home'});
    },
    async saveToCart() {
      let data = {
        id: this.pizza.id
      }

      fetch(`${this.$store.getters.getServerUrl}/cart/${this.id}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          }
      ).then(response => response.json())
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