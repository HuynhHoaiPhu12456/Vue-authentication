<template>
    <div>
        <div>Post Page</div>
    </div>
</template>

<script setup>
import { onMounted } from 'vue'
import axios from 'axios'

onMounted(() => {
    axios.get(`https://vue-authentication-24f3a-default-rtdb.firebaseio.com/posts.json`)
        .then((response) => {
            console.log(response)
        })
})
</script>

<style lang="scss" scoped></style>