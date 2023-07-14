<template>
  <div class="container py-5">
    <h1>404</h1>
    <p>
      Sorry, the page <code>{{ route.params.notFound }}</code> you're looking
      for is not found.
    </p>
    <RouterLink :to="{ name: 'tasks' }">Back to tasks</RouterLink>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
</script>
