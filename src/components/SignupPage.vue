<template>
    <div class="row">
        <div class="col-md-6 offset-md-3">
            <div>
                <div>
                    <h3>Signup</h3>
                    <hr />
                </div>
                <div class="alert alert-danger" v-if="error">
                    {{ error }}
                </div>
                <form @submit.prevent="onSignup()">
                    <div class="form-group">
                        <label>Email</label>
                        <input type="text" class="form-control" v-model="email" />
                        <div class="error" v-if="errors.email">
                            {{ errors.email }}
                        </div>
                    </div>
                    <div class="form-group">
                        <label>Password</label>
                        <input type="password" class="form-control" v-model="password" />
                        <div class="error" v-if="errors.password">
                            {{ errors.password }}
                        </div>
                    </div>
                    <div class="my-3">
                        <button type="submit" class="btn btn-primary">Signup</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import SignupValidations from '../services/SignupValidatons'
import { useStore } from 'vuex'
import { LOADING_SPINNER_SHOW_MUTATION, SIGNUP_ACTION } from '../store/storeconstants'

const store = useStore()

let email = ref('')
let password = ref('')
let errors = ref([])
let error = ref('')

const signup = (userRegist) => store.dispatch(SIGNUP_ACTION, userRegist)
const showLoading = (payload) => store.commit(LOADING_SPINNER_SHOW_MUTATION, payload);

const onSignup = async () => {
    let validations = new SignupValidations(email.value, password.value);

    errors.value = validations.checkValidations();
    if ('email' in errors.value || 'password' in errors.value) {
        return false
    }
    // make spinner true
    showLoading(true)
    // signup registration
    await signup({ email: email.value, password: password.value }).catch((err) => {
        error.value = err
        showLoading(false)
    })
    // make spinner false
    showLoading(false)
}
</script>

<style scoped></style>