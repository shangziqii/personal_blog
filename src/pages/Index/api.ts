import axios from 'axios'
export const artcate = () => {
    return axios.get('http://127.0.0.1/api/cates')
}