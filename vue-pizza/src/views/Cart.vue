<template>
  <!-- Cart -->
  <div class="cart">
    <div class="constructor__container">
      <div class="cart__inner">
        <h2 class="cart__title">
          Корзина
        </h2>
        <p v-if="cartItems.length !== 0" class="discount-message">
           Внимание! При покупке на сумму выше 400 лей действует скидка 5% на помеченные товары!
        </p>
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
                  <span class="cart-info-ingredients--default" v-for="ingredient in item.ingredients"
                        :key="ingredient.id">
                    {{ ingredient.value }}
                  </span>
                </div>
                <div v-if="item.additionalIngredients.length !== 0" class="cart-info-ingredients">
                  Дополнительные:
                  <span class="cart-info-ingredients--selected"
                        v-for="additionalIngredient in item.additionalIngredients" :key="additionalIngredient.id">
                    {{ additionalIngredient.value }}
                  </span>
                </div>
              </div>
            </div>

            <div class="cart__item-price-wrapper">

              <input @change="changeCountItem(item.id, $event.target)" :value="item.count" class="cart-info__count"
                     type="number">

              <div class="cart__item-prices">
                <p :class="{crossedPrice: item.discount && totalPrice > 400}" class="cart__item-price">
                  {{ item.cost * item.count }} лей
                </p>

                <p v-if="item.discount && totalPrice > 400" class="cart__item-price">
                  {{ Math.floor((item.cost * item.count) * 0.95) }} лей
                </p>
              </div>

              <button @click="deleteItem(item.id)" type="button" id="cart__item-delete" class="cart__item-delete">
                &times;
              </button>
            </div>

          </li>
        </ul>

        <p v-if="cartItems.length !== 0" class="cart__price-total">
          <span class="price-total-text">Итого: </span>{{ this.totalPrice }} лей
        </p>

        <form v-if="cartItems.length !== 0" class="cart__form">
          <h2 class="form-title">Заполните данные заказа</h2>

          <label class="form-label" for="cart-name">
            Имя фамилия
            <span class="cart__form-required-field">*</span>
          </label>
          <input class="form-input"
                 id="cart-name"
                 type="text"
                 required
                 placeholder="Имя фамилия"
                 v-model="formData.name">
          <label class="form-label" for="cart-phone">
            Телефон
            <span class="cart__form-required-field">*</span>
          </label>
          <input class="form-input"
                 id="cart-phone"
                 type="text"
                 required
                 placeholder="Телефон"
                 v-model="formData.phone">
          <label class="form-label" for="cart-email">
            Емайл
            <span class="cart__form-required-field">*</span>
          </label>
          <input class="form-input"
                 id="cart-email"
                 type="email"
                 required
                 placeholder="Емайл"
                 v-model="formData.email">
          <label class="form-label" for="cart-address">
            Адрес
            <span class="cart__form-required-field">*</span>
          </label>
          <input class="form-input"
                 id="cart-address"
                 type="text"
                 required
                 placeholder="Адрес"
                 v-model="formData.address">
          <label class="form-label" for="cart-comment">Комментарий</label>
          <textarea class="form-input--comment"
                    id="cart-comment"
                    cols="30"
                    rows="5"
                    placeholder="Комментарий"
                    v-model="formData.commentary">
          </textarea>

          <button @click="sendOrder()" class="cart__form-submit btn-tocart" type="submit">Заказать</button>
        </form>
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
      formData: {
        name: '',
        phone: '',
        address: '',
        email: '',
        commentary: ''
      }
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
      let tempPrice = 0;
      this.totalPrice = 0;

      this.cartItems.forEach(item => {
          this.totalPrice += item.cost * item.count;
      });

      if(this.totalPrice > 400) {
        this.cartItems.forEach(item => {
          if(item.discount) {
            tempPrice += Math.floor(item.cost * item.count * 0.95);
          } else {
            tempPrice += item.cost * item.count;
          }
        });
        this.totalPrice = tempPrice;
      }
    },
    async deleteItem(id) {
      let data = {
        id: id
      };

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
        this.$store.dispatch('loadCartItems');
      });
    },
    async changeCountItem(id, input) {
      if (input.value > 0) {
        let data = {
          id: id,
          count: input.value
        };

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
    },
    async sendOrder() {
      let data = {
        clientData: this.formData,
        products: [],
        totalPrice: this.totalPrice
      };

      this.cartItems.forEach(item => {
        data.products.push(item.id);
      });

      if(data.products.length !== 0) {
        await fetch(`${this.$store.getters.getServerUrl}/orders/`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(data)
            }
        ).then(response => response.json());
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

.cart__form-required-field {
  color: red;
}

.cart__item-prices {
  display: block;
}

.crossedPrice {
  text-decoration: line-through;
  color: black;
}

.discount-message {
  margin-bottom: 20px;
  font-size: 15px;
  text-align: center;
  color: red;
}
</style>