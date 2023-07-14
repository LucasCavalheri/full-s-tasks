import {
  destroyTask,
  indexTask,
  indexUserTask,
  storeTask,
  updateTask,
} from '@/http/taskApi.js'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useToast } from 'vue-toastification'

const toast = useToast()

export const useTaskStore = defineStore('taskStore', () => {
  // State
  const errors = ref('')
  const tasks = ref([])

  const handleApiSucess = (message) => {
    toast.success(message, {
      timeout: 2000,
      draggable: true,
    })
  }

  const handleApiError = (error, message) => {
    if (error.response && error.response.status === 403) {
      errors.value = 'You do not have permission to update this task.'
      toast.error(message, {
        timeout: 1500,
        draggable: true,
      })
    } else {
      errors.value = 'An unknown error occurred.'
    }
  }

  // Actions
  const handleStoreTask = async (newTask) => {
    const { data: createdTask } = await storeTask(newTask)
    tasks.value.unshift(createdTask.data)
  }

  const handleIndexTask = async () => {
    const { data } = await indexTask()
    tasks.value = data.data
  }

  const handleIndexUserTask = async () => {
    const { data } = await indexUserTask()
    tasks.value = data.data
  }

  const handleUpdateTask = async (task) => {
    try {
      const { data: updatedTask } = await updateTask(task.id, task)
      const currentTask = tasks.value.find((t) => t.id === updatedTask.data.id)

      Object.assign(currentTask, updatedTask.data)
      errors.value = null
      handleApiSucess('Task updated successfully!')
    } catch (error) {
      handleApiError(error, 'You do not have permission to update this task.')
    }
  }

  const handleCompleteTask = async (updatedTask) => {
    try {
      const { data: updatedTaskResponse } = await updateTask(
        updatedTask.id,
        updatedTask,
      )
      const index = tasks.value.findIndex((t) => t.id === updatedTask.id)
      tasks.value[index] = updatedTaskResponse.data
      errors.value = null
      handleApiSucess('Task completed successfully!')
    } catch (error) {
      handleApiError(error, 'You do not have permission to complete this task.')
    }
  }

  const handleDestroyTask = async (task) => {
    try {
      await destroyTask(task.id)
      const index = tasks.value.findIndex((t) => t.id === task.id)
      tasks.value.splice(index, 1)
      errors.value = null
      handleApiSucess('Task deleted successfully!')
    } catch (error) {
      handleApiError(error, 'You do not have permission to delete this task.')
    }
  }

  // Getters
  const completedTasks = computed(() =>
    tasks.value.filter((task) => task.is_completed),
  )
  const uncompletedTasks = computed(() =>
    tasks.value.filter((task) => !task.is_completed),
  )

  return {
    errors,
    tasks,
    completedTasks,
    uncompletedTasks,
    handleStoreTask,
    handleIndexTask,
    handleIndexUserTask,
    handleUpdateTask,
    handleCompleteTask,
    handleDestroyTask,
  }
})
