import axios from 'axios'
export const artcate = () => {
    return axios.get('/api/blog/cates')
}
export const deleteArtClassApi = (id: number) => {
    return axios.get(`/api/blog/deleteCateById/${id}`)
}
export const updateCateApi = (data: object) => {
    return axios.post('/api/blog/updatecate', data, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

export const addArtClassApi = (data: object) => {
    return axios.post('/api/blog/addcates', data, {
        headers: {
            'Content-Type': 'application/json',
        }
    })
}