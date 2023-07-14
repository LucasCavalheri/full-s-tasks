<template>
  <main style="min-height: 50vh; margin-top: 2rem">
    <div class="container">
      <div class="row">
        <div class="col-md-8 offset-md-2">
          <!-- Add new Task -->
          <NewTask />
          <!-- List of uncompleted tasks -->
          <Tasks :tasks="uncompletedTasks" />
          <!-- Show toggle button -->
          <div class="text-center my-3">
            <button
              @click="showCompletedTasks = !showCompletedTasks"
              v-if="completedTasks.length"
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
import { useTaskStore } from '@/stores/taskStore.js'
import { storeToRefs } from 'pinia'
import { onMounted, ref } from 'vue'

const taskStore = useTaskStore()
const { completedTasks, uncompletedTasks } = storeToRefs(taskStore)
const { handleIndexTask } = taskStore

const showCompletedTasks = ref(false || completedTasks.value)

onMounted(async () => {
  await handleIndexTask()
})
</script>
