import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router';

import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined
} from '@ant-design/icons';

import { Layout, Menu, Button, theme } from 'antd';

const { Header, Sider, Content } = Layout;

const App: React.FC = () => {
    const navigator = useNavigate();
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const onClick = (e: any) => {
        navigator(e.key)
    }
    return (
        <Layout style={{ height: '100vh' }}>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="demo-logo-vertical">
                    <h1 style={{ color: 'whitesmoke' }}>sss's blog</h1>
                </div>
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    onClick={onClick}
                    items={[
                        {
                            key: '/home/publishArticle',
                            icon: <UserOutlined />,
                            label: '文章管理',
                            children: [
                                {
                                    key: '/home/publishArticle',
                                    label: '已发布',
                                },
                                {
                                    key: '1.2',
                                    label: '草稿'
                                },
                                {
                                    key: '/home/addArticle',
                                    label: '新增文章'
                                }
                            ]
                        },
                        {
                            key: '/home/articleClass',
                            icon: <VideoCameraOutlined />,
                            label: 'class管理',
                        },
                        {
                            key: '3',
                            icon: <UploadOutlined />,
                            label: '个人信息',
                        },
                    ]}
                />
            </Sider>
            <Layout>
                <Header style={{ padding: 0, background: colorBgContainer }}>
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                        }}
                    />
                </Header>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                    }}
                >
                    <Outlet></Outlet>
                </Content>
            </Layout>
        </Layout>
    );
};

export default App;