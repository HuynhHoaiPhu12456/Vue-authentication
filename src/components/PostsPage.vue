<template>
        <div>
        <h2>Posts Details</h2>
        <table class="table">
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Title</th>
                    <th>Description</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="post in postsData" :key="post.id">
                    <td>{{ post.id }}</td>
                    <td>{{ post.title }}</td>
                    <td>{{ post.body }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>
import { computed, onMounted, reactive } from 'vue'
import axios from 'axios'
// import axiosInstance from '../services/AxiosTokenInstance';
import { useStore } from 'vuex';

const store = useStore();

let token = computed(() => {
    return store.getters.auth_user_token
})

let postsData = reactive([])

onMounted(() => {
    axios.get(`https://vue-authentication-24f3a-default-rtdb.firebaseio.com/posts.json?auth=${token.value}`)
        .then((response) => {
            formatPosts(response.data)
        })
})

const formatPosts = (posts) => {
    for(let key in posts) {
        postsData.push({...posts[key], id: key})
    }
}

</script>

<style lang="scss" scoped></style>