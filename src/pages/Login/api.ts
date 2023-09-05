import axios from 'axios'
import qs from 'qs'

export const loginForm = (params: object) => {
    return axios.post('/api/blog/login', qs.stringify(params), {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'
        }
    });
}