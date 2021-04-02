// Burger menu
const burgerHandler = () => {
    const headerBurger = document.getElementById('header__burger');
    const navMenu = document.getElementById('nav');
    const headerLogo = document.getElementById('header__logo');
    const navMenuClose = document.getElementById('nav__close');
    const navLinks = document.querySelectorAll('.js-scroll');

    navLinks.forEach(link => {
        link.onclick = () => {
            if (navMenu.classList.contains('nav--fixed')) {
                navMenu.classList.remove('nav--fixed');
                headerLogo.classList.remove('header__logo--fixed');
            }
        }
    });

    headerBurger.addEventListener('click', () => {
        navMenu.classList.add('nav--fixed');
        headerLogo.classList.add('header__logo--fixed');
    });

    navMenuClose.addEventListener('click', () => {
        navMenu.classList.remove('nav--fixed');
        headerLogo.classList.remove('header__logo--fixed');
    });
}

burgerHandler();

// Smooth scroll
const smoothScroll = () => {
    const smoothScroll = function (targetEl, duration) {
        const headerHeight = document.getElementById('header').clientHeight;
        let target = document.querySelector(targetEl);
        let targetPosition = target.getBoundingClientRect().top - headerHeight;
        let startPosition = window.pageYOffset;
        let startTime = null;

        const ease = function (t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        };

        const animation = function (currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = ease(timeElapsed, startPosition, targetPosition, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        };
        requestAnimationFrame(animation);

    };

    const scrollTo = function () {
        const links = document.querySelectorAll('.js-scroll');
        links.forEach(each => {
            each.addEventListener('click', function () {
                const currentTarget = this.getAttribute('href');
                smoothScroll(currentTarget, 1000);
            });
        });
    };
    scrollTo();
}

smoothScroll();