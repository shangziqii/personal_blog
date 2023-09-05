import axios from 'axios'

export const addArtClassApi = (data: object) => {
    return axios.post('/api/blog/addcates', data, {
        headers: {
            'Content-Type': 'application/json',
        }
    })
}

export const deleteArtClassApi = (id: number) => {
    return axios.get(`/api/blog/deleteCateById/${id}`)
}

export const getArticleApi = (id: number) => {
    return axios.get(`/api/blog/cates/${id}`)
}

export const updateCateApi = (data: object) => {
    return axios.post('/api/blog/updatecate', data, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

//上传新文章接口
export const addArticleApi = (value: object) => {
    return axios.post('/api/blog/add', value, {
        headers: {
            'Content-Type': 'appliaction/json',
            Authorization: localStorage.getItem('token'),
        }
    })
}