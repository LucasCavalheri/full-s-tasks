<template>
  <div class="card mt-2" v-if="tasks.length">
    <ul class="list-group list-group-flush">
      <Task
        v-for="task in tasks"
        :key="task.id"
        :task="task"
        @update-task="handleUpdateTask"
        @complete-task="handleCompleteTask"
        @remove-task="handleDestroyTask"
      />
    </ul>
  </div>
</template>

<script setup>
import Task from '@/components/tasks/Task.vue'
import { useTaskStore } from '@/stores/taskStore.js'

const store = useTaskStore()
const { handleUpdateTask, handleCompleteTask, handleDestroyTask } = store

defineProps({
  tasks: {
    type: Array,
  },
})
</script>
