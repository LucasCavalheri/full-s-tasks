<template>
  <div class="card mt-2" v-if="tasks.length">
    <ul class="list-group list-group-flush">
      <Task
        v-for="task in tasks"
        :key="task.id"
        :task="task"
        @edit-task="$emit('edit-task', $event)"
        @complete-task="$emit('complete-task', $event)"
        @remove-task="$emit('remove-task', $event)"
      />
    </ul>
  </div>
</template>

<script setup>
import Task from '@/components/tasks/Task.vue'

defineProps({
  tasks: {
    type: Array,
  },
})
</script>
