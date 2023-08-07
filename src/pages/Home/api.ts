import axios from 'axios'

export const addArtClassApi = (data: object) => {
    return axios.post('http://127.0.0.1/api/addcates', data, {
        headers: {
            // 'token': localStorage.getItem('token'),
            'Content-Type': 'application/json',
        }
    })
}

export const deleteArtClassApi = (id: number) => {
    return axios.get(`http://127.0.0.1/api/deleteCateById/${id}`)
}

export const getArticleApi = (id: number) => {
    return axios.get(`http://127.0.0.1/api/cates/${id}`)
}

export const updateCateApi = (data: object) => {
    return axios.post('http://127.0.0.1/api/updatecate', data, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

//上传新文章接口
export const addArticleApi = () => {
    return axios.post('http://127.0.0.1/api/add', {}, {
        headers: {
            'Content-Type': 'appliaction/json'
        }
    })
}