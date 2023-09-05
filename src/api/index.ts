import axios from 'axios'

//判断token有效性的接口
export const getTokentf = () => {
    return axios.get("/api/my/token", {
        headers: {
            Authorization: localStorage.getItem('token')
        }
    })
}