import { Header } from 'antd/es/layout/layout'
import axios from 'axios'
export const getTextApi = (id: string | undefined) => {
    return axios.get(`/api/blog/getText?id=${id}`)
}
export const getTextClassApi = (id: number) => {
    return axios.get(`/api/blog/getCate?id=${id}`)
}

export const publishApi = (data: object) => {
    return axios.post('/api/blog/comment/publish', data)
}

export const getCommentApi = (textId: number | undefined) => {
    return axios.get(`/api/blog/comment/get?textId=${textId}`)
}