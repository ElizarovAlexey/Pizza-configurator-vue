<template>
  <div class="home">
    <!-- Pizzas -->
    <section id="pizzas" class="pizzas">
      <div class="container">
        <div class="pizzas__inner">

          <h1 class="pizzas__title">Пиццы</h1>

          <!-- Pizza items -->
          <div id="pizzas__items" class="pizzas__items">

            <div v-for="pizza in pizzasList" :key="pizza.id" class="pizzas__item">

              <div v-if="pizza.discount" class="product__item-discount">
                <div class="discount-image-container">
                  <img class="discount-image" src="../assets/img/icons/discount.png" alt="discount">
                  <div class="discount-text">
                    Данная пицца содержит скидку.
                  </div>
                </div>
              </div>

              <div class="pizzas__item-img">
                <img class="pizzas__item-image" :src="pizza.image" alt="pizza">
              </div>

              <p class="pizzas__item-title">
                {{ pizza.name }}
              </p>

              <p class="pizzas__item-description">
                {{ pizza.description }}
              </p>

              <div class="pizzas__item-dough-container">
                <button class="pizzas__item-dough dough-selected">
                  {{ pizza.dough.type }} тесто
                </button>
              </div>

              <div class="pizzas__item-sizes">
                <button class="pizzas__item-size size-selected">
                  {{ pizza.size.value }} см
                </button>
              </div>

              <a @click="sendPizzaId(pizza.id)" class="pizzas__detail-btnAdd" href="#">
                <img src="../assets/img/icons/plus-icon.png" alt="plus icon"> Изменить ингредиенты
              </a>

              <div class="pizzas__item-wrapper">

                <button @click="addToCart('pizza', pizza)" class="btn-tocart pizzas__item-tocart">
                  В корзину
                </button>

                <p class="pizzas__item-price">
                  {{ pizza.cost + pizza.dough.cost + pizza.size.cost }} лей
                </p>

              </div>
            </div>

          </div> <!-- pizzas__items -->

        </div> <!-- /.pizzas__inner -->
      </div> <!-- /.container -->
    </section> <!-- /.pizzas -->


    <!-- Desserts -->
    <section id="desserts" class="desserts">
      <div class="container">
        <div class="desserts__inner">

          <h1 class="desserts__title">Десерты</h1>

          <!-- Desserts items -->
          <div id="dessert__items" class="pizzas__items desserts__items">

            <div v-for="dessert in dessertsList" :key="dessert.id" class="pizzas__item desserts__item">
              <div class="pizzas__item-img desserts__item-img">
                <img class="pizzas__item-image desserts__item-image" :src="dessert.image"
                     alt="dessert">
              </div>
              <p class="pizzas__item-title desserts__item-title">{{ dessert.name }}</p>
              <p class="pizzas__item-description desserts__item-description">
                {{ dessert.description }}
              </p>
              <div class="desserts__item-wrapper pizzas__item-wrapper">
                <button @click="addToCart('dessert', dessert)" class="btn-tocart pizzas__item-tocart">В корзину</button>
                <p class="desserts__item-price pizzas__item-price">{{ dessert.cost }} лей</p>
              </div>
            </div>

          </div> <!-- ./desserts items -->
        </div> <!-- ./desserts__inner -->
      </div> <!-- ./container -->
    </section> <!-- ./desserts -->


    <!-- Drinks -->
    <section id="drinks" class="drinks">
      <div class="container">
        <div class="drinks__inner">

          <h1 class="drinks__title">Напитки</h1>

          <!-- Drinks items -->
          <div id="drink__items" class="pizzas__items drinks__items">

            <div v-for="drink in drinksList" :key="drink.id" class="pizzas__item drinks__item">
              <div class="pizzas__item-img drinks__item-img">
                <img class="pizzas__item-image drinks__item-image" :src="drink.image"
                     alt="pizza">
              </div>
              <p class="pizzas__item-title drinks__item-title">{{ drink.name }}</p>
              <p class="pizzas__item-description drinks__item-description">
                {{ drink.description }}
              </p>
              <div class="drinks__item-wrapper pizzas__item-wrapper">
                <button @click="addToCart('drink', drink)" class="btn-tocart drinks__item-tocart">В корзину</button>
                <p class="drinks__item-price pizzas__item-price">{{ drink.cost }} лей</p>
              </div>
            </div>

          </div> <!-- ./drinks__items -->

        </div> <!-- ./drinks__inner -->
      </div> <!-- ./container -->
    </section> <!-- ./drinks -->
  </div>
</template>

<script>

export default {
  name: 'Home',
  data() {
    return {
      pizzasList: [],
      dessertsList: [],
      drinksList: [],
      cartItems: [],
    }
  },
  components: {},
  created() {
    this.loadPizzaList();
    this.loadDessertList();
    this.loadDrinkList();
  },
  methods: {
    async loadPizzaList() {
      this.pizzasList = await fetch(
          `${this.$store.getters.getServerUrl}/pizzas/`
      ).then(response => response.json())
    },
    async loadDessertList() {
      this.dessertsList = await fetch(
          `${this.$store.getters.getServerUrl}/desserts/`
      ).then(response => response.json())
    },
    async loadDrinkList() {
      this.drinksList = await fetch(
          `${this.$store.getters.getServerUrl}/drinks/`
      ).then(response => response.json())
    },
    openConstructor(id) {
      this.$router.push({name: 'Constructor', params: {id: id}})
    },
    sendPizzaId(id) {
      let data = {
        id: id
      }

      fetch(`${this.$store.getters.getServerUrl}/pizzas/`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          }
      ).then(response => response.json())
          .then(data => this.openConstructor(data))
    },
    async addToCart(type, product) {

      const query = data => {
        fetch(`${this.$store.getters.getServerUrl}/cart/`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(data)
            }
        ).then(response => {
          response.json();
          this.$store.dispatch('loadCartItems');
        })
      }

      if (type === 'dessert') {
        let data = {
          id: product.id,
          type: 'dessert'
        };
        query(data);
      }

      if (type === 'drink') {
        let data = {
          id: product.id,
          type: 'drink'
        };
        query(data);
      }

      if (type === 'pizza') {
        let data = {
          id: product.id,
          type: 'pizza',
          cost: product.cost + product.size.cost + product.dough.cost
        };
        query(data);
      }
    }
  }
}
</script>
