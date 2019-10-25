export const dev = process.env.NODE_ENV === 'development'
export const apiUrl = dev ? 'http://localhost:3100' : ''
