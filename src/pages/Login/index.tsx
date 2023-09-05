import { loginForm } from './api'
import React from 'react'
import { Button, Form, Input } from 'antd'
import { useNavigate } from "react-router-dom"
import { LockOutlined, UserOutlined } from '@ant-design/icons';

import './index.scss'

const Login: React.FC = () => {
    // 点击登录处理函数
    const navigate = useNavigate();
    const onFinish = (values: any) => {
        console.log('Received values of form: ', values);
        const data = {
            username: values.username,
            password: values.password
        };
        loginForm(data).then(({ data }) => {
            if (data.status === 0) {
                console.log("登陆成功！");
                localStorage.setItem('token', data.token);
                navigate("/home");
            }
            else {
                console.log("用户名或密码错误！");
                localStorage.setItem('token', '');
            }
        }).catch(() => {
            console.log("未知错误，请稍后再试！");

        })
    };
    return (

        <Form
            name="normal_login"
            className="login-form"
            onFinish={onFinish}
        >

            <Form.Item
                name="username"
                rules={[{ required: true, message: 'Please input your Username!' }]}
                className='inputStyle'
            >
                <Input
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    placeholder="Username"
                />
            </Form.Item>

            <Form.Item
                name="password"
                rules={[{ required: true, message: 'Please input your Password!' }]}
                className='inputStyle'
            >
                <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Password"

                />
            </Form.Item>

            <Form.Item className="login-form-button">
                <Button type="primary" htmlType="submit" className='submit'>
                    Log in
                </Button>
            </Form.Item>

        </Form>
    );
};


const App: React.FC = () => {
    return (
        <div className='bodyClass'>
            <div id="app">
                <Login />
            </div>
        </div>
    )
}

export default App


