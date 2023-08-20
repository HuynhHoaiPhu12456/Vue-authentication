
export default {
    // [GET_USER_TOKEN_GETTER]: state => {
    //     return state.token
    // }

    auth_user_token: state => {
        return state.token
    },

    is_user_authenticated(state) {
        return !!state.token;
    },
};