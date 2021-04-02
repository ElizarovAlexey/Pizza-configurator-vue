<template>
  <div class="home">
    <!-- Slider -->
    <div class="slider">
      <div class="slider__container">
        <div class="slider__inner">

          <div class="slider__items">
            <img class="slider__item" src="../assets/img/slider/slide1.png" alt="Slide">
            <img class="slider__item" src="../assets/img/slider/slide2.png" alt="Slide">
            <img class="slider__item" src="../assets/img/slider/slide3.png" alt="Slide">
            <img class="slider__item" src="../assets/img/slider/slide1.png" alt="Slide">
            <img class="slider__item" src="../assets/img/slider/slide2.png" alt="Slide">
            <img class="slider__item" src="../assets/img/slider/slide3.png" alt="Slide">
          </div>

          <div class="slider__arrows">
            <img id="arrow-left" class="slider__arrow slider__arrow--left" src="../assets/img/icons/left-arrow.png"
                 alt="left arrow">

            <img id="arrow-right" class="slider__arrow slider__arrow--right"
                 src="../assets/img/icons/right-arrow.png"
                 alt="right arrow">
          </div>

          <div id="slider__dots" class="slider__dots">
            <div class="slider__dots-item slider__dots-item--active"></div>
            <div class="slider__dots-item"></div>
            <div class="slider__dots-item"></div>
            <div class="slider__dots-item"></div>
            <div class="slider__dots-item"></div>
            <div class="slider__dots-item"></div>
          </div>

        </div> <!-- ./slider__inner -->
      </div> <!-- ./container -->
    </div> <!-- ./slider -->


    <!-- Pizzas -->
    <section id="pizzas" class="pizzas">
      <div class="container">
        <div class="pizzas__inner">

          <h1 class="pizzas__title">Пиццы</h1>

          <!-- Pizza items -->
          <div id="pizzas__items" class="pizzas__items">

            <div class="pizzas__item">
              <div class="pizzas__item-img">
                <img class="pizzas__item-image" src="../assets/img/products/pizza1.jpg" alt="pizza">
              </div>
              <p class="pizzas__item-title">Крутая пицца</p>
              <p class="pizzas__item-description">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut, velit!
              </p>
              <div class="pizzas__item-dough-container">
                <button class="pizzas__item-dough dough-selected">Традиционное тесто</button>
              </div>
              <div class="pizzas__item-sizes">
                <button class="pizzas__item-size size-selected">30 см</button>
              </div>
              <a class="pizzas__detail-btnAdd" href="#">
                <img src="../assets/img/icons/plus-icon.png" alt="plus icon">Изменить ингредиенты
              </a>
              <div class="pizzas__item-wrapper">
                <button class="btn-tocart pizzas__item-tocart">В корзину</button>
                <p class="pizzas__item-price">89 лей</p>
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

            <div class="pizzas__item desserts__item">
              <div class="pizzas__item-img desserts__item-img">
                <img class="pizzas__item-image desserts__item-image" src="../assets/img/products/dessert1.webp"
                     alt="dessert">
              </div>
              <p class="pizzas__item-title desserts__item-title">Вкусный десерт</p>
              <p class="pizzas__item-description desserts__item-description">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur, incidunt!
              </p>
              <div class="desserts__item-wrapper pizzas__item-wrapper">
                <button class="btn-tocart pizzas__item-tocart">В корзину</button>
                <p class="desserts__item-price pizzas__item-price">30 лей</p>
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

            <div class="pizzas__item drinks__item">
              <div class="pizzas__item-img drinks__item-img">
                <img class="pizzas__item-image drinks__item-image" src="../assets/img/products/drink1.webp"
                     alt="pizza">
              </div>
              <p class="pizzas__item-title drinks__item-title">Вкусный напиток</p>
              <p class="pizzas__item-description drinks__item-description">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Earum, reprehenderit.
              </p>
              <div class="drinks__item-wrapper pizzas__item-wrapper">
                <button class="btn-tocart drinks__item-tocart">В корзину</button>
                <p class="drinks__item-price pizzas__item-price">22 лей</p>
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
  components: {}
}
</script>
