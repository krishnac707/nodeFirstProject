import axios from "axios"

const token = JSON.parse(localStorage.getItem("token"))
const api = axios.create({
    baseURL:'http://localhost:8000/api/v1',
    headers:{'Authorization':`Bearer ${token}`}
})

export default api;