import axios from "axios";
import { LOGIN_ACTION, SET_USER_TOKEN_DATA_MUTATION, SIGNUP_ACTION } from "../storeconstants";
import SignupValidations from "../../services/SignupValidatons";

export default {

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
            context.commit(SET_USER_TOKEN_DATA_MUTATION, {
                email: response.data.email,
                token: response.data.idToken,
                expiresIn: response.data.expiresIn,
                refreshToken: response.data.refreshToken,
                userId: response.data.localId
            })
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
            context.commit(SET_USER_TOKEN_DATA_MUTATION, {
                email: response.data.email,
                token: response.data.idToken,
                expiresIn: response.data.expiresIn,
                refreshToken: response.data.refreshToken,
                userId: response.data.localId
            })
        }
    }
};