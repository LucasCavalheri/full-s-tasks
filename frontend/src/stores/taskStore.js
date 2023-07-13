import {
  destroyTask,
  indexTask,
  storeTask,
  updateTask,
} from '@/http/taskApi.js'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

// const oldTaskStore = {
//   state: () => ({}),
//   actions: {},
//   getters: {},
// }

export const useTaskStore = defineStore('taskStore', () => {
  // State
  const tasks = ref([])

  // Actions
  const handleStoreTask = async (newTask) => {
    const { data: createdTask } = await storeTask(newTask)
    tasks.value.unshift(createdTask.data)
  }

  const handleIndexTask = async () => {
    const { data } = await indexTask()
    tasks.value = data.data
  }

  const handleUpdateTask = async (task) => {
    const { data: updatedTask } = await updateTask(task.id, task)
    const currentTask = tasks.value.find((t) => t.id === updatedTask.data.id)

    Object.assign(currentTask, updatedTask.data)
  }

  const handleCompleteTask = async (updatedTask) => {
    const { data: updatedTaskResponse } = await updateTask(
      updatedTask.id,
      updatedTask,
    )
    const index = tasks.value.findIndex((t) => t.id === updatedTask.id)

    tasks.value[index] = updatedTaskResponse.data
  }

  const handleDestroyTask = async (task) => {
    await destroyTask(task.id)
    const index = tasks.value.findIndex((t) => t.id === task.id)
    tasks.value.splice(index, 1)
  }

  // Getters
  const completedTasks = computed(() =>
    tasks.value.filter((task) => task.is_completed),
  )
  const uncompletedTasks = computed(() =>
    tasks.value.filter((task) => !task.is_completed),
  )

  return {
    tasks,
    completedTasks,
    uncompletedTasks,
    handleStoreTask,
    handleIndexTask,
    handleUpdateTask,
    handleCompleteTask,
    handleDestroyTask,
  }
})
