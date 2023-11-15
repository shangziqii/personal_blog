import React, { useEffect, useRef, useState } from 'react';
import { Layout, Space, Input, Button, Avatar, Divider, List, Skeleton, Form } from "antd";
import './index.scss'
import InfiniteScroll from 'react-infinite-scroll-component';
import { useParams } from 'react-router-dom'
import { getTextApi, getTextClassApi, publishApi, getCommentApi } from './api'
import ReactMarkdown from 'react-markdown';
//判断用户身份
import { getTokentf } from './../../api/index'
// import MyEditor from './../../components/Editor'

const { Header, Footer, Sider, Content } = Layout;
const { TextArea } = Input;
interface MyProps {
    textTitle?: string,
    textClassName?: string,
    content?: string,
    indexContent?: string,
    pub_date?: string,
    textId?: number,
    role?: number
}
//Text顶部（title）
const Top: React.FC<MyProps> = ({ textTitle, textClassName, pub_date }) => {
    console.log(textTitle);

    return (
        <>
            <div className='titleStyle'>
                <div className='titleFontStyle'>{textTitle}</div>
                <div className="titleRightStyle">
                    <div className='textClassStyle'>分类：{textClassName}</div>
                    <div>发表时间：{pub_date?.substring(0, 10)}</div>
                </div>
            </div>
        </>
    )
}

//body（content）
const Body: React.FC<MyProps> = ({ content, indexContent }) => {
    console.log(indexContent);

    return (
        <>
            <div className='bodyContentStyle'>
                <div className='bodyIndexContent'>
                    <h4>Index Content:</h4>
                    <p>{indexContent ? indexContent : '暂无介绍！'}</p>
                </div>

                <ReactMarkdown>{content ? content : 'no...'}</ReactMarkdown>
            </div>
            {/* <MyEditor /> */}
        </>
    )
}
interface DataType {
    gender: string;
    /* name: {
        title: string;
        first: string;
        last: string;
    };
    email: string;
    picture: {
        large: string;
        medium: string;
        thumbnail: string;
    };
    nat: string; */
    name: string,
    pic: string,
    time: string,
    comment: string,
    role: number
}
const RightContent: React.FC<MyProps> = ({ indexContent, textId, role }) => {
    const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        // console.log('Change:', e.target.value);
        setInputValue(e.target.value)
    };
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<DataType[]>([]);
    // const inputRef = useRef<HTMLAreaElement>(null)
    const [inputValue, setInputValue] = useState('')

    const params = useParams();
    let id: string | undefined;
    id = params.id;
    const [getId, setGetId] = useState(Number(id))
    const [flag, setFlag] = useState(false)
    const loadMoreData = () => {
        if (loading) {
            return;
        }
        setLoading(true);
        /* fetch('https://randomuser.me/api/?results=10&inc=name,gender,email,nat,picture&noinfo')
            .then((res) => res.json())
            .then((body) => {
                setData([...data, ...body.results]);
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
            }); */

        getCommentApi(getId).then((data) => {
            // console.log(data.data.data);
            const results = data.data.data
            setData([...results])
            setLoading(false);
        }).catch(() => {
            setLoading(false)
        })
    };

    useEffect(() => {
        loadMoreData();
        setFlag(false)
    }, [flag]);

    const publishComment = () => {
        console.log(inputValue);
        const value = {
            inputValue: inputValue,
            Id: textId,
            role: role
        }
        publishApi(value).then(() => {
            setFlag(true)
            setInputValue('')

        }).catch(() => {
            console.log('未知错误，请稍后再试！');
        })
    }

    return (
        <>
            <h2>comment area</h2>
            <div className='commentAreaAtyle'>
                <div
                    id="scrollableDiv"
                    style={{
                        height: '70vh',
                        overflow: 'auto',
                        padding: '0 16px',
                        border: '1px solid rgba(140, 140, 140, 0.35)',
                    }}
                >
                    <InfiniteScroll
                        dataLength={data.length}
                        next={loadMoreData}
                        hasMore={data.length !== data.length}
                        loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
                        endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
                        scrollableTarget="scrollableDiv"
                    >
                        <List
                            className='itemStyle'
                            dataSource={data}
                            renderItem={(item) => (
                                <List.Item key={item.name}>
                                    <List.Item.Meta
                                        avatar={<Avatar src={`/api//blog/api/visitor_pic/${item.pic}`} />}
                                        title={<div className='itemTopStyle'><span className={item.role === 0 ? 'guanliyuan' : 'youke'}>{item.name}</span>
                                            {/*    <span>
                                                {
                                                    item.role === 0 ? '*' : ''
                                                }
                                            </span> */}
                                            <span>
                                                {item.time.slice(0, 16)}
                                            </span>
                                        </div>}
                                        // <a href="https://ant.design">{item.time}</a>
                                        description={<div className='commentStyle'>{item.comment}</div>}
                                    />
                                    {/* <div>{item.time.slice(0, 16)}</div> */}
                                </List.Item>
                            )}
                        />
                    </InfiniteScroll>
                </div>
            </div>

            <TextArea id="my-input" placeholder="请输入你的想法！" allowClear onChange={onChange} value={inputValue} />
            <Button onClick={publishComment}>send</Button>
        </>
    )
}

const App: React.FC = () => {
    const loadsql = "正在加载中..."
    const [textInfo, setTextInfo] = useState({ title: loadsql, cate_id: -1, content: loadsql, indexContent: loadsql, pub_date: loadsql })
    const [textClass, setTextClass] = useState('loading')
    const [role, setRole] = useState<number>(1)
    const params = useParams();
    const [textId, setTextId] = useState<number>()

    let id: string | undefined;
    id = params.id;

    useEffect(() => {
        getTextApi(id).then(({ data }) => {
            setTextInfo(data.data)
            console.log(textInfo.cate_id);
            setTextId(data.data.Id)
        }).catch(() => {
            console.log("获取错误，请稍后再试！");
        })

        getTokentf().then(({ data }) => {
            if (data.status === 0) {
                setRole(0)
            }
            else {
                setRole(1)
            }

        }).catch(() => {
            console.log('未知错误，请稍后再试！');
        })
        getTextClassApi(textInfo.cate_id).then(({ data }) => {
            setTextClass(data.data.className)
        }).catch(() => {
            console.log("获取错误，请稍后再试！");
        })
    }, [])
    useEffect(() => {
        getTextClassApi(textInfo.cate_id).then(({ data }) => {
            setTextClass(data.data.className)
        }).catch(() => {
            console.log("获取错误，请稍后再试！");
        })
    }, [textInfo])
    return (
        <>
            <Space direction="vertical" style={{ width: '100%' }} size={[0, 48]} className="appStyle">
                <Layout >
                    <Header className="headerStyle"><Top textTitle={textInfo.title} textClassName={textClass} pub_date={textInfo.pub_date} /></Header>
                    <Layout hasSider>
                        <Content className="contentStyle">
                            <Body content={textInfo.content} indexContent={textInfo.indexContent} />
                        </Content>
                        <Sider className="siderStyle" style={{ backgroundColor: '#fff' }} width={300}>
                            <RightContent indexContent={textInfo.indexContent} textId={textId} role={role} />
                        </Sider>
                    </Layout>
                </Layout>
            </Space>
        </>
    )
}

export default App