import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        backendUrl: 'http://127.0.0.1:8000/api/v1',
        cartItems: []
    },
    mutations: {
        updateCartItems(state, cartItems) {
            state.cartItems = cartItems;
        }
    },
    actions: {
        async loadCartItems(context) {
            let cartItems = await fetch(
                `${this.getters.getServerUrl}/cart/`
            ).then(response => response.json());

            await context.commit('updateCartItems', cartItems);
        }
    },
    modules: {},
    getters: {
        getServerUrl: state => {
            return state.backendUrl;
        },
        cartItemsCount: state => {
            return state.cartItems.length
        }
    },
})

export default store