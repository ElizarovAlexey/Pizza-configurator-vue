<template>
  <div>
    <!-- Header -->
    <header id="header" class="header">
      <div class="container header__container">
        <div class="header__inner">
          <div id="header__logo" class="header__logo">
            <a href="/">
              <img class="header__logo-image" src="../assets/img/icons/logo.jpg" alt="Logotype">
            </a>
          </div>

          <ul id="nav" class="nav nav__items">
            <li class="nav__item">
              <a href="/#pizzas" class="nav__item-link">
                <img src="../assets/img/icons/pizza-icon.png" alt="Pizza icon"> Пиццы
              </a>
            </li>
            <li class="nav__item">
              <a href="/#desserts" class="nav__item-link">
                <img src="../assets/img/icons/dessert-icon.png" alt="Drink icon"> Десерты
              </a>
            </li>
            <li class="nav__item">
              <a href="/#drinks" class="nav__item-link">
                <img src="../assets/img/icons/drink-icon.png" alt="Drink icon"> Напитки
              </a>
            </li>
            <li id="nav__close" class="nav__close">
              <img class="nav__close-image" src="../assets/img/icons/close-icon.png" alt="Close icon">
            </li>
          </ul>

            <div class="header__cart">
              <a @click="goToCart()" href="#" class="header__cart-link">
                <img src="../assets/img/icons/cart.png" alt="Cart" class="header__cart-image">
                <div id="cart-counter" class="header__cart-counter">{{ cartItemsCount }}</div>
              </a>
            </div>

          <div id="header__burger" class="header__burger">
            <img class="header__burger-image" src="../assets/img/icons/burger-icon.png" alt="Burger icon">
          </div>
        </div> <!-- ./header__inner -->
      </div> <!-- ./container -->
    </header> <!-- ./header -->
  </div>
</template>

<script>
import {mapGetters} from 'vuex';
export default {
  name: "Nav",
  computed: mapGetters(['cartItemsCount']),
  methods: {
    goToCart() {
      this.$router.push({name: 'Cart'});
    },
  },
  async mounted() {
    await this.$store.dispatch('loadCartItems');
  },
}
</script>

<style scoped>

</style>