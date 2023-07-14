import api from './api'

export const login = (credentials) => api.post('/auth/login', credentials)
export const register = (user) => api.post('/auth/register', user)
export const logout = () => api.post('/auth/logout')
export const getUser = () => api.get('/user')
