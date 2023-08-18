<template>
    <div class="row">
        <div class="col-md-6 offset-md-3">
            <div>
                <div>
                    <h3>Login {{ firstName }}</h3>
                    <hr />
                </div>
                <div class="alert alert-danger" v-if="error">
                    {{ error }}
                </div>
                <form @submit.prevent="onLogin()">
                    <div class="form-group">
                        <label>Email</label>
                        <input type="text" class="form-control" v-model.trim="email" />
                        <div class="error" v-if="errors.email">
                            {{ errors.email }}
                        </div>
                    </div>
                    <div class="form-group">
                        <label>Password</label>
                        <input type="password" class="form-control" v-model.trim="password" />
                        <div class="error" v-if="errors.password">
                            {{ errors.password }}
                        </div>
                    </div>
                    <div class="my-3">
                        <button type="submit" class="btn btn-primary">Login</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useStore } from 'vuex'
import SignupValidations from '../services/SignupValidatons'
import { LOGIN_ACTION } from '../store/storeconstants';
import router from '../router'

const store = useStore()
const firstName = computed(() => store.state.name)

let email = ref('')
let password = ref('')
let errors = ref([])
let error = ref('')

const login = (userLogin) => store.dispatch(LOGIN_ACTION, userLogin)

const onLogin = async () => {
    let validations = new SignupValidations(email.value, password.value);

    errors.value = validations.checkValidations();
    if (errors.value.length) {
        return false
    }

    // Login check

    await login({ email: email.value, password: password.value }).catch((e) => {
        error.value = e
    })

    router.push({ name: 'posts' })
}
</script>

<style scoped></style>