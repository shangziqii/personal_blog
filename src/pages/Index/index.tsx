import React, { Component, useEffect, useState } from 'react';
import { Layout, Space, Button, Input, Avatar, List, message, Skeleton, Divider } from 'antd';
// import VirtualList from 'rc-virtual-list'
import InfiniteScroll from 'react-infinite-scroll-component';
import { useNavigate } from 'react-router-dom';


import './index.css'
import { artcate } from './api';

const { Header, Footer, Sider, Content } = Layout;
const { Search } = Input;

export interface Myprops {

}

//首页顶部
function Top() {
    const navigate = useNavigate();
    function onSearch() {

    }
    function login() {
        navigate('/login');
    }
    return (
        <>
            <div className="right">
                <Search placeholder="input search text" onSearch={onSearch} style={{ width: 300 }} className='searchInput' />
                <Button type="dashed" className='loginBtnStyle' onClick={login}>个人中心</Button>
            </div>
        </>
    )
}

//首页左边框
function Left() {
    return (
        <>
            <div className='leftStyle'></div>
        </>
    )
}




//首页body部分，text部分
// 实现无限滚动加载的作用

interface DataType {
    href: string,
    title: string,
    content: string,
    pub_date: string,
    state: string,
    is_delete: number
}

const Text: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<DataType[]>([]);
    // 记录获取到数据的总条数
    const [total, setTotal] = useState(0);

    const loadMoreData = () => {
        if (loading) {
            return;
        }
        setLoading(true);
        // 每一次获取5条数据
        fetch(`http://127.0.0.1/api/getArticle?begin=${data.length}&limit=5`)
            .then((res) => res.json())
            .then((body) => {
                // 合并获取的数据
                setData([...data, ...body.data.articles]);
                setTotal(body.data.total);
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
            });
    };

    console.log(data);

    useEffect(() => {
        loadMoreData();
    }, []);

    return (
        <div className='textStyle'>
            <div
                id="scrollableDiv"
                style={{
                    height: "75vh",
                    overflow: 'auto',
                    padding: '0 16px',
                    border: '1px solid rgba(140, 140, 140, 0.35)',
                }}
            >
                {/* 使用该组件实现无限滚动加载更多数据 */}
                <InfiniteScroll
                    dataLength={data.length}
                    next={loadMoreData}
                    hasMore={data.length < total}
                    loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
                    endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
                    scrollableTarget="scrollableDiv"
                >
                    <List
                        itemLayout="vertical"
                        size="large"
                        dataSource={data}
                        renderItem={(item) => (
                            <List.Item
                                key={item.title}
                                extra={
                                    <img
                                        width={272}
                                        height={150}
                                        alt="logo"
                                        // src={item.href}
                                        src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                                    />
                                }
                            >
                                <List.Item.Meta
                                    avatar={<Avatar src='https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png' />}
                                    title={<a href={item.href}>{item.title}</a>}
                                    description={"发布时间：" + item.pub_date}
                                />
                                {item.content}
                            </List.Item>
                        )}
                    />
                </InfiniteScroll>
            </div>
        </div>
    )
};

//主页body部分
function Body() {
    return (
        <>
            {/* <div>我是筛选框</div> */}
            <Text />
        </>
    )
}

//App
const App: React.FC = () => (
    <>
        <Space direction="vertical" style={{ width: '100%' }} size={[0, 48]}>
            <Layout>
                <Header className='headerStyle'>
                    <Top />
                </Header>
                <Layout hasSider>
                    <Sider className='siderStyle' width={300}>
                        <Left />
                    </Sider>
                    <Content className='contentStyle'>
                        <Body />
                    </Content>
                </Layout>
                <Footer className='footerStyle'></Footer>
            </Layout>
        </Space>
    </>
);

function Index() {
    useEffect(() => {
        console.log("调用");
        artcate().then(({ data }) => {
            const articleClass = data;
            console.log(articleClass);
        })

    }, [])
    return (
        <>
            <App />
        </>
    )

}

export default Index;