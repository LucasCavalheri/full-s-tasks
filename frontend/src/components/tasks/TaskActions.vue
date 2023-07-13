<template>
  <div class="task-actions">
    <button @click="emit('edit-task')" class="btn btn-sm btn-circle btn-outline-secondary me-1">
      <PencilIcon />
    </button>
    <button @click="emit('remove-task')" class="btn btn-sm btn-circle btn-outline-danger">
      <TrashIcon />
    </button>
  </div>
</template>

<script setup>
import PencilIcon from '@/components/icons/PencilIcon.vue'
import TrashIcon from '@/components/icons/TrashIcon.vue'

const emit = defineEmits(['edit-task', 'remove-task'])
</script>
