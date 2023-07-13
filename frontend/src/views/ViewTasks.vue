<template>
  <main style="min-height: 50vh; margin-top: 2rem">
    <div class="container">
      <div class="row">
        <div class="col-md-8 offset-md-2">
          <!-- Add new Task -->
          <NewTask @new-task="handleAddTask" />
          <!-- List of uncompleted tasks -->
          <Tasks
            :tasks="uncompletedTasks"
            @edit-task="handleUpdatedTask"
            @complete-task="handleCompleteTask"
            @remove-task="handleRemoveTask"
          />
          <!-- Show toggle button -->
          <div class="text-center my-3">
            <button
              @click="showCompletedTasks = !showCompletedTasks"
              v-if="completedTasks.length && uncompletedTasks.length"
              class="btn btn-sm btn-secondary"
            >
              <span v-if="!showCompletedTasks">Show completed</span>
              <span v-else>Hide completed</span>
            </button>
          </div>
          <!-- List of completed tasks -->
          <Tasks v-if="showCompletedTasks" :tasks="completedTasks" />
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import NewTask from '@/components/tasks/NewTask.vue'
import Tasks from '@/components/tasks/Tasks.vue'
import {
  allTasks,
  createTask,
  deleteTask,
  updateTask,
} from '@/http/task-api.js'
import { computed, onMounted, ref } from 'vue'

const tasks = ref([])

const showCompletedTasks = ref(false)

onMounted(async () => {
  const { data } = await allTasks()
  tasks.value = data.data
})

const uncompletedTasks = computed(() => {
  return tasks.value.filter((task) => !task.is_completed)
})

const completedTasks = computed(() => {
  return tasks.value.filter((task) => task.is_completed)
})

const handleAddTask = async (newTask) => {
  const { data: createdTask } = await createTask(newTask)
  tasks.value.unshift(createdTask.data)
}

const handleUpdatedTask = async (task) => {
  const { data: updatedTask } = await updateTask(task.id, task)
  const currentTask = tasks.value.find((t) => t.id === updatedTask.data.id)

  Object.assign(currentTask, updatedTask.data)
}

const handleCompleteTask = async (updatedTask) => {
  const { data: updatedTaskResponse } = await updateTask(updatedTask.id, updatedTask)
  const index = tasks.value.findIndex((t) => t.id === updatedTask.id)

  tasks.value[index] = updatedTaskResponse.data
}

const handleRemoveTask = async (task) => {
  await deleteTask(task.id)
  const index = tasks.value.findIndex((t) => t.id === task.id)
  tasks.value.splice(index, 1)
}
</script>
