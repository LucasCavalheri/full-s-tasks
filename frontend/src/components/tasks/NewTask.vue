<template>
  <div class="relative">
    <input
      @keydown.enter="addNewTask"
      type="text"
      class="form-control form-control-lg padding-right-lg"
      placeholder="+ Add new task. Press enter to save."
    />
  </div>
</template>

<script setup>
import { reactive } from 'vue'

const newTask = reactive({
  name: '',
  is_completed: false,
})

const emit = defineEmits(['new-task'])

const addNewTask = (event) => {
  if (event.target.value.trim()) {
    newTask.name = event.target.value
    event.target.value = ''
    emit('new-task', newTask)
  }
}
</script>
