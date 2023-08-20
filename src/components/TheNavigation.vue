<template>
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">Navbar</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <RouterLink class="nav-link" :to="{ name: 'home' }">Home</RouterLink>
                    </li>
                    <li class="nav-item" v-if="!isAuthenticated">
                        <RouterLink class="nav-link" :to="{ name: 'login' }">Login</RouterLink>
                    </li>
                    <li class="nav-item" v-if="!isAuthenticated">
                        <RouterLink class="nav-link" :to="{ name: 'signup' }">Signup</RouterLink>
                    </li>
                    <li class="nav-item" v-if="isAuthenticated">
                        <RouterLink class="nav-link" to="/posts">Posts</RouterLink>
                    </li>
                    <li class="nav-item" v-if="isAuthenticated">
                    <a
                        href="#"
                        class="nav-link"
                        @click.prevent="onLogout()"
                        >Logout</a
                    >
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import {LOGOUT_ACTION} from '../store/storeconstants'
import  router  from '../router'

const store = useStore()
let isAuthenticated = computed(() => {
    return store.getters.is_user_authenticated
})

const logout = () => {
    store.dispatch(LOGOUT_ACTION)
}

const onLogout = () => {
    logout();
    router.replace('/login')
}

</script>

<style scoped></style>