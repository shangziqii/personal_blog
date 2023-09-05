import { useEffect, useState } from "react"
import { getInfoApi, updateAvatarApi } from './api'

function Personal() {
    const [userName, setUserName] = useState('loading...');
    const [role, setRole] = useState('loading...')
    const [imgSrc, setImgSrc] = useState('')
    useEffect(() => {
        getInfoApi().then(({ data }) => {
            setUserName(data.data.username);
            setImgSrc(data.data.user_pic)
            console.log("输出", imgSrc);

            if (data.data.role === 0) {
                setRole("管理员")
            }
            else {
                setRole("用户")
            }
        }).catch(() => {
            console.log("连接错误，请稍后再试！");
        })
    }, []);
    function updateAvatar() {
        console.log("更新了");
        updateAvatarApi('https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png')
        //更新以后重载问题 （未解决）
    }
    return (
        <>
            <h1>{userName}</h1>
            <h2>{role}</h2>
            <img src={imgSrc} alt="" style={{ width: 100, height: 100 }} />
            <button onClick={updateAvatar}>更新用户头像</button>
        </>
    )
}

export default Personal
