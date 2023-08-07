import { FormEvent, useState } from "react"
import { loginForm } from './api'
import React from 'react'

interface LoginFormProps {
    username: string;
    password: string;
    onusernameOnChange: (value: string) => void;
    onpasswordOnChange: (value: string) => void;
}

function LoginForm({ username, password, onusernameOnChange, onpasswordOnChange }: LoginFormProps) {
    function submitForm(event: FormEvent) {
        event.preventDefault();
        const data = {
            username,
            password,
            role: 1
        };
        loginForm(data);
    }

    return (
        <>
            {/* <form action="http:127.0.0.1/api/login"> */}
            <form onSubmit={submitForm}>
                <span>账号：</span><input type="text" value={username} onChange={(e) => onusernameOnChange(e.target.value)} />
                {/* <span>账号：</span><input type="text" /> */}
                <br />
                <span>密码：</span><input type="password" value={password} onChange={(e) => onpasswordOnChange(e.target.value)} />
                {/* <span>密码：</span><input type="password" /> */}
                <br />
                {/* <input type="submit" /> */}
                <button type="submit">提交表单信息</button>
            </form>
        </>
    )
}

//类式组件

function Login() {
    const [username, setusername] = useState('');
    const [password, setpassword] = useState('');
    return (
        <>
            {/* <div>登录，因为是个人博客，所以只有我本人可以登录</div> */}
            {/* <div>登录成功后，将会显示一个按钮是个人空间（home）,在这里可以对自己博客文章的增删改查</div> */}
            <LoginForm
                username={username}
                password={password}
                onusernameOnChange={setusername}
                onpasswordOnChange={setpassword}
            />
        </>
    )
}

export default Login