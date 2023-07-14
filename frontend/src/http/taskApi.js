import api from './api'

const resource = '/tasks'

export const storeTask = (payload) => api.post(resource, payload)
export const indexTask = () => api.get(resource)
export const indexUserTask = (id) => api.get(`${resource}/user`)
export const showTask = (id) => api.get(`${resource}/${id}`)
export const updateTask = (id, payload) => api.patch(`${resource}/${id}`, payload)
export const destroyTask = (id) => api.delete(`${resource}/${id}`)
