import axios from "axios";
import {AUTO_LOGIN_ACTION, LOGIN_ACTION, LOGOUT_ACTION, SET_USER_TOKEN_DATA_MUTATION, SIGNUP_ACTION } from "../storeconstants";
import SignupValidations from "../../services/SignupValidatons";

export default {

    [LOGOUT_ACTION](context) {
        context.commit(SET_USER_TOKEN_DATA_MUTATION, {
            email: null,
            token: null,
            expiresIn: null,
            refreshToken: null,
            userId: null,
        });
        localStorage.removeItem('userData');
    },

    async [LOGIN_ACTION](context, payload) {
        let postData = {
            email: payload.email,
            password: payload.password,
            returnSecureToken: true,
        };
        let response = ''

        try {
            response = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBeLvE1Pa3ruZtr6PqRpMuUMBVmEO2Ddsc`
                , postData);
        } catch (err) {
            let errorMessage = SignupValidations.getErrorMessageFromCode(
                err.response.data.error.errors[0].message
            )
            throw errorMessage;
        }

        if (response.status === 200) {
            let tokenData = {
                email: response.data.email,
                token: response.data.idToken,
                expiresIn: response.data.expiresIn,
                refreshToken: response.data.refreshToken,
                userId: response.data.localId
            }
            localStorage.setItem('userData', JSON.stringify(tokenData));
            context.commit(SET_USER_TOKEN_DATA_MUTATION, tokenData)
        }
    },



    async [SIGNUP_ACTION](context, payload) {
        let postData = {
            email: payload.email,
            password: payload.password,
            returnSecureToken: true,
        };
        let response = ''

        // context.commit(LOADING_SPINNER_SHOW_MUTATION, true)

        try {
            response = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBeLvE1Pa3ruZtr6PqRpMuUMBVmEO2Ddsc`
                , postData);
        } catch (err) {
            // context.commit(LOADING_SPINNER_SHOW_MUTATION, false)
            let errorMessage = SignupValidations.getErrorMessageFromCode(
                err.response.data.error.errors[0].message
            )
            throw errorMessage;
        }

        // context.commit(LOADING_SPINNER_SHOW_MUTATION, false)
        if (response.status === 200) {
            let tokenData = {
                email: response.data.email,
                token: response.data.idToken,
                expiresIn: response.data.expiresIn,
                refreshToken: response.data.refreshToken,
                userId: response.data.localId
            }
            localStorage.setItem('userData', JSON.stringify(tokenData));
            context.commit(SET_USER_TOKEN_DATA_MUTATION, tokenData)
        }
    },

    [AUTO_LOGIN_ACTION](context) {
        let userData = localStorage.getItem('userData');
        context.commit(SET_USER_TOKEN_DATA_MUTATION, userData);
    },

};