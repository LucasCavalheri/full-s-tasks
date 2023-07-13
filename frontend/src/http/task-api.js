import api from './api'

const resource = '/tasks'

export const createTask = (payload) => api.post(resource, payload)
export const allTasks = () => api.get(resource)
export const showTask = (id) => api.get(`${resource}/${id}`)
export const updateTask = (id, payload) => api.patch(`${resource}/${id}`, payload)
export const deleteTask = (id) => api.delete(`${resource}/${id}`)
