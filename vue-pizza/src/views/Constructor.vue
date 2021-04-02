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

              <button type="button" class="constructor__ingredients-button constructor__ingredients-button--checked">
                Колбаса
              </button>

            </div>
          </div>

          <div id="constructor__all-ingredients">
            <h2 class="constructor__title">Дополнительные игредиенты</h2>
            <div class="constructor__ingredients-items" id="constructor__allIngredients">

              <button type="button" class="constructor__ingredients-button">
                Сосиска
              </button>

            </div>
          </div>
        </div>


        <div class="constructor__pizza-info">
          <div id="pizza-info__details">

            <img class="pizza-info__image" src="../assets/img/products/pizza1.jpg" alt="pizza">
            <p class="pizza-info__name">Крутая пицца</p>
            <div class="pizza-info__selected-dough">
              Традиционное
            </div>

            <div class="pizza-info__sizes">
              <button class="pizzas__item-size">25 см</button>
            </div>

            <p class="pizza-info__help-text">
              Ваша пицца содержит:
            </p>

          </div>

          <ul id="pizza-info__selected-ingredients-list" class="pizza-info__selected-ingredients-list">

            <li class="pizza-info__selected-ingredient">
              <p class="pizza-info__selected-ingredient-text">
                Традиционное, 30 см
              </p>

              <p class="pizza-info__selected-ingredient-price">
                55 лей
              </p>
            </li>

            <li class="pizza-info__selected-ingredient">
              <p class="pizza-info__selected-ingredient-text">
                Колбаса
              </p>

              <p class="pizza-info__selected-ingredient-price">
                10 лей
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
                666 лей
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
  name: "Constructor"
}
</script>

<style scoped>
  .constructor {
    margin-bottom: 150px;
  }
</style>