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
import { useTaskStore } from '@/stores/taskStore.js'
import { reactive } from 'vue'

const taskStore = useTaskStore()
const { handleStoreTask } = taskStore

const newTask = reactive({
  name: '',
  is_completed: false,
})

const addNewTask = async (event) => {
  if (event.target.value.trim()) {
    newTask.name = event.target.value
    event.target.value = ''
    await handleStoreTask(newTask)
  }
}
</script>
