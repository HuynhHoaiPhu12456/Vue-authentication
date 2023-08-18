<script setup>
import { RouterLink, RouterView } from 'vue-router'
import TheNavigation from './components/TheNavigation.vue';
import TheLoader from './components/TheLoader.vue';
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const showLoading = computed(() => store.state.showLoading)
</script>

<template>
  <TheNavigation />
  <TheLoader v-if="showLoading"></TheLoader>
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <div>
          <RouterView />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
