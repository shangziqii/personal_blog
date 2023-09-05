import axios from 'axios'

//获取用户个人信息接口
export const getInfoApi = () => {
    return axios.get("/api/my/userInfo", {
        headers: {
            Authorization: localStorage.getItem('token')
        }
    })
}

//更新用户头像按钮
export const updateAvatarApi = (avatar: string) => {
    return axios.post("/api/my/update/avatar", { avatar }, {
        headers: {
            Authorization: localStorage.getItem('token')
        }
    })
}