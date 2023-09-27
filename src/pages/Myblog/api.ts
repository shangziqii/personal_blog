import axios from 'axios'
export const artcate = () => {
    return axios.get('/api/blog/cates')
}
export const getRole = () => {
    return axios.get('/api/my/token', {
        headers: {
            Authorization: localStorage.getItem('token')
        }
    })
}

export const getTotal = (className: string) => {
    return axios.get(`/api/blog/getArticleTotal?className=${className}`)
}

export const getTextListApi = (value: string) => {
    return axios.post('/api/blog/getTextList', {
        value
    })
}