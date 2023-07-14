<template>
  <li class="list-group-item py-3">
    <div class="d-flex justify-content-start align-items-center">
      <input
        class="form-check-input mt-0"
        type="checkbox"
        @change="markTaskAsCompleted"
        :class="completedClass"
        :checked="task.is_completed"
      />
      <div
        class="ms-2 flex-grow-1"
        title="Double click the text to edit or remove"
        :class="completedClass"
        @dblclick="enableEdit"
      >
        <div v-if="isEdit" class="relative">
          <input
            @keyup.esc="undo"
            @keyup.enter="updateTask"
            v-model="editingTask"
            ref="editInput"
            class="editable-task"
            type="text"
          />
        </div>
        <span v-else>{{ task.name }}</span>
      </div>
      <!-- <div class="task-date">24 Feb 12:00</div> -->
    </div>
    <TaskActions
      @update-task="enableEdit"
      @remove-task="removeTask"
      v-if="!isEdit"
    />
  </li>
</template>

<script setup>
import { computed, nextTick, ref } from 'vue'
import { useToast } from 'vue-toastification'
import TaskActions from './TaskActions.vue'

const props = defineProps({
  task: {
    type: Object,
  },
})

const emit = defineEmits(['update-task', 'complete-task', 'remove-task'])

const toast = useToast()
const isEdit = ref(false)
const editingTask = ref(props.task.name)
const editInput = ref(null)

const undo = () => {
  isEdit.value = false
  editingTask.value = props.task.name
}

const enableEdit = () => {
  isEdit.value = true
  nextTick(() => {
    editInput.value.focus()
  })
}

const updateTask = (e) => {
  const updatedTask = {
    ...props.task,
    name: e.target.value,
  }
  isEdit.value = false
  toast.success('Task updated successfully!', {
    timeout: 2000,
    draggable: true,
  })
  emit('update-task', updatedTask)
}

const markTaskAsCompleted = () => {
  const updatedTask = {
    ...props.task,
    is_completed: Boolean(!props.task.is_completed),
  }
  toast.success('Task updated successfully!', {
    timeout: 2000,
    draggable: true,
  })
  emit('complete-task', updatedTask)
}

const removeTask = () => {
  if (confirm('Are you sure you want to delete this task?')) {
    toast.success('Task deleted successfully!', {
      timeout: 2000,
      draggable: true,
    })
    emit('remove-task', props.task)
  }
}

const completedClass = computed(() => {
  return props.task.is_completed ? 'completed' : ''
})
</script>
