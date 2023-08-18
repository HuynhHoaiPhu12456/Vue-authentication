import { createStore } from "vuex";
import mutations from "./modules/mutations";
import getters from "./modules/getters";
import actions from "./modules/actions";

const store = createStore({
    namespaced: true,
    state: () => ({
        idToken: '',
        email: '',
        userId: '',
        refreshToken: '',
        expiresIn: '',

        showLoading: false
    }),
    mutations,
    getters,
    actions
})

export default store;