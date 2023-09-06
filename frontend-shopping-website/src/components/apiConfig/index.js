import axios from "axios"

const token = JSON.parse(localStorage.getItem("token"))
if(token){
const api = axios.create({
    baseURL:'https://awdiz-latest-backend.onrender.com/api/v1',
    headers:{'Authorization':`Bearer ${token}`}
})
}
else {
    var api = axios.create({
        baseURL: 'https://awdiz-latest-backend.onrender.com/api/v1'
    })
}

export default api;