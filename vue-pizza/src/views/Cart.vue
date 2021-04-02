<template>
  <!-- Cart -->
  <div class="cart">
    <div class="constructor__container">
      <div class="cart__inner">
        <h2 class="cart__title">
          Корзина
        </h2>
        <hr class="cart__sep">
        <ul id="cart__items" class="cart__items">
          <li class="cart__item">
            <div class="cart__item-info-wrapper">
              <img class="cart__item-img" src="../assets/img/products/pizza1.jpg" alt="Product">
              <div class="cart__item-info">
                <p class="cart-info-title">
                  Вкусная пицца
                </p>
                <div class="cart-info-ingredients">
                  <span>Колбаса</span>
                </div>
              </div>
            </div>

            <div class="cart__item-price-wrapper">
              <p class="cart__item-price">
                98 лей
              </p>

              <button type="button" id="cart__item-delete" class="cart__item-delete">
                &times;
              </button>
            </div>

          </li>
        </ul>

        <p class="cart__price-total">
          <span class="price-total-text">Итого: </span>98 лей
        </p>
      </div> <!-- /.cart__inner -->
    </div> <!-- /.container -->
  </div> <!-- /.cart -->
</template>

<script>
export default {
  name: "Cart"
}
</script>

<style scoped>
  .cart {
    margin: 70px 0 200px 0;
  }
</style>