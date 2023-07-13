<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light border-bottom">
    <div class="container py-2">
        <a class="icons" href="https://linkedin.com/in/lucas-cavalheri" target="_blank"
          ><i class="bi bi-linkedin"></i
        ></a>
        <a class="icons" href="https://github.com/LucasCavalheri" target="_blank"
          ><i class="bi bi-github"></i
        ></a>
        <a class="icons" href="https://lucascavalheri.com.br" target="_blank"><i class="bi bi-person"></i></a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <a href="/" class="nav-link">Tasks</a>
          </li>
          <li class="nav-item">
            <a href="/" class="nav-link">Summary</a>
          </li>
        </ul>
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <a href="/" class="btn btn-outline-secondary ms-2"
              >Login</a
            >
          </li>
          <li class="nav-item">
            <a href="/" class="btn btn-danger ms-2">Register</a>
          </li>
          <li class="nav-item">
            <a href="/" class="btn btn-outline-secondary ms-2">Logout</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup></script>

<style scoped>
.icons {
  font-size: 1.5rem;
  color: #000;
  margin-right: 1rem;
}

.icons:hover {
  color: #5a5757;
  transition: 0.5s;
}
</style>
