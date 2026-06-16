import axios from 'axios'

let baseUrl = process.env.REACT_APP_API_URL || 'https://hcl-backend-ulc4.onrender.com/api'
if (baseUrl && !baseUrl.endsWith('/api') && !baseUrl.endsWith('/api/')) {
    baseUrl = baseUrl.replace(/\/$/, '') + '/api'
}
const instance = axios.create({ baseURL: baseUrl })

export default instance
