import axios from 'axios'
import qs from 'qs'

export const loginForm = (params: object) => {
    return axios.post('http://127.0.0.1/api/login', qs.stringify(params), {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'
        }
    });
}