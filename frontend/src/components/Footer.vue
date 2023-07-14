<template>
  <footer class="py-3 my-4">
    <ul class="nav justify-content-center border-bottom pb-3 mb-3">
      <li class="nav-item nav-link">
        <RouterLink :to="{ name: 'user.tasks' }" class="nav-link px-2 text-muted underline fs-5 fw-bold text-decoration-underline">See all your tasks</RouterLink>
      </li>
    </ul>
    <p class="text-center text-muted">
      &copy; {{ new Date().getFullYear() }}
      <a href="https://linkedin.com/in/lucas-cavalheri">Lucas Cavalheri</a>
    </p>
  </footer>
</template>

<script setup></script>

<style scoped>
.nav-link:hover {
  color: #494f53 !important;
}
</style>
