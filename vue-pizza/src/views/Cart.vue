<template>
  <!-- Cart -->
  <div class="cart">
    <div class="constructor__container">
      <div class="cart__inner">
        <h2 class="cart__title">
          Корзина
        </h2>
        <hr class="cart__sep">

        <div v-if="this.cartItems.length === 0" class="empty_cart">
          Корзина пуста!
          <img src="../assets/img/empty_cart.png" alt="Empty cart">
        </div>

        <ul id="cart__items" class="cart__items">
          <li class="cart__item" v-for="item in cartItems" :key="item.id">
            <div class="cart__item-info-wrapper">
              <img class="cart__item-img" :src="item.image" alt="Product">
              <div class="cart__item-info">
                <p class="cart-info-title">
                  {{ item.name }}
                </p>
                <div v-if="item.ingredients.length !== 0" class="cart-info-ingredients">
                  <p class="cart-info__dough">{{ item.dough.type }} тесто, {{ item.size.value }} см</p>

                  Игредиенты:
                  <span class="cart-info-ingredients--default" v-for="ingredient in item.ingredients" :key="ingredient.id">
                    {{ ingredient.value }}
                  </span>
                </div>
                <div v-if="item.additionalIngredients.length !== 0" class="cart-info-ingredients">
                  Дополнительные:
                  <span class="cart-info-ingredients--selected" v-for="additionalIngredient in item.additionalIngredients" :key="additionalIngredient.id">
                    {{ additionalIngredient.value }}
                  </span>
                </div>
              </div>
            </div>

            <div class="cart__item-price-wrapper">

                <input @change="changeCountItem(item.id, $event.target)" :value="item.count" class="cart-info__count" type="number">

              <p class="cart__item-price">
                {{ item.cost * item.count }} лей
              </p>

              <button @click="deleteItem(item.id)" type="button" id="cart__item-delete" class="cart__item-delete">
                &times;
              </button>
            </div>

          </li>
        </ul>

        <p class="cart__price-total">
          <span class="price-total-text">Итого: </span>{{ this.totalPrice }} лей
        </p>
      </div> <!-- /.cart__inner -->
    </div> <!-- /.container -->
  </div> <!-- /.cart -->
</template>

<script>
export default {
  name: "Cart",
  data() {
    return {
      cartItems: [],
      totalPrice: null,
    }
  },
  created() {
    this.loadCartItemsList();
  },
  methods: {
    async loadCartItemsList() {
      this.cartItems = await fetch(
          `${this.$store.getters.getServerUrl}/cart/`
      ).then(response => response.json())
      this.calculateTotalPrice();
    },
    calculateTotalPrice() {
      this.totalPrice = 0;

      this.cartItems.forEach(item => {
        this.totalPrice += item.cost * item.count;
      });
    },
    async deleteItem(id) {
      let data = {
        id: id
      }

      await fetch(`${this.$store.getters.getServerUrl}/cart/`,
          {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          }
      ).then(response => {
        response.json();
        this.loadCartItemsList();
      });
    },
    async changeCountItem(id, input) {
      if(input.value > 0) {
        let data = {
          id: id,
          count: input.value
        }

        await fetch(`${this.$store.getters.getServerUrl}/cart/`,
            {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(data)
            }
        ).then(response => {
          response.json();
          this.loadCartItemsList();
        });
      }
    }
  }
}
</script>

<style scoped>
  .cart {
    margin: 70px 0 200px 0;
  }
  .cart-info__dough {
    color: black;
    margin-bottom: 10px;
  }
  .cart-info__count {
    width: 40px;
    margin-right: 20px;
    text-align: center;
  }
</style>