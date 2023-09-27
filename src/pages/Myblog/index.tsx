import React, { useEffect, useState } from 'react';
import { Layout, Space, Button, Input, Avatar, List, message, Skeleton, Divider, Tabs } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useNavigate } from 'react-router-dom';

import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import type { Dayjs } from 'dayjs';
import dayLocaleData from 'dayjs/plugin/localeData';
import { Calendar, Col, Radio, Row, Select, Typography, theme } from 'antd';
import type { CalendarMode } from 'antd/es/calendar/generateCalendar';

import './index.scss'
import { artcate, getRole, getTotal, getTextListApi } from './api';

//组件引入
import SearchList from './../../components/SearchList'

dayjs.extend(dayLocaleData);

const { Header, Footer, Sider, Content } = Layout;
const { Search } = Input;

interface MyProps {
    isLogin: Boolean
}

//首页顶部
function Top({ isLogin }: MyProps) {
    const navigate = useNavigate();
    const [showFlag, setShowFlag] = useState(false)
    const [searchInput, setSearchInput] = useState([])
    function onSearch() {

    }
    function login() {
        navigate('/login');
    }
    function personal() {
        navigate('/home');
    }
    function getTextList(event: any) {
        console.log('调用');

        setShowFlag(false)
        const value = event.target.value
        if (value) {
            getTextListApi(value).then(({ data }) => {
                if (data.results.length > 0) {
                    setShowFlag(true)
                    setSearchInput(data.results)
                }

            }).catch(() => {
                console.log('未知错误，请稍后再试！');
            })
        }
    }

    return (
        <>
            <div className="right">
                <Search placeholder="input search text" onSearch={onSearch} style={{ width: 300 }} className='searchInput' onChange={getTextList} allowClear />
                {
                    showFlag ?
                        <div className='searchListStyle'>
                            <SearchList data={searchInput} />
                        </div>
                        :
                        <></>
                }
                {
                    isLogin ?
                        <Button type="dashed" className='loginBtnStyle' onClick={personal}>个人中心</Button>
                        : <Button type="dashed" className='loginBtnStyle' onClick={login}>登录</Button>

                }
            </div>
        </>
    )
}

//首页左边框
const Left: React.FC = () => {
    const { token } = theme.useToken();

    const onPanelChange = (value: Dayjs, mode: CalendarMode) => {
        console.log(value.format('YYYY-MM-DD'), mode);
    };

    const wrapperStyle: React.CSSProperties = {
        width: "100%",
        border: `1px solid ${token.colorBorderSecondary}`,
        borderRadius: token.borderRadiusLG,
    };

    return (
        <div className="leftStyle">
            <div style={wrapperStyle}>
                <Calendar
                    fullscreen={false}
                    headerRender={({ value, type, onChange, onTypeChange }) => {
                        const start = 0;
                        const end = 12;
                        const monthOptions = [];

                        let current = value.clone();
                        const localeData = value.localeData();
                        const months = [];
                        for (let i = 0; i < 12; i++) {
                            current = current.month(i);
                            months.push(localeData.monthsShort(current));
                        }

                        for (let i = start; i < end; i++) {
                            monthOptions.push(
                                <Select.Option key={i} value={i} className="month-item">
                                    {months[i]}
                                </Select.Option>,
                            );
                        }

                        const year = value.year();
                        const month = value.month();
                        const options = [];
                        for (let i = year - 10; i < year + 10; i += 1) {
                            options.push(
                                <Select.Option key={i} value={i} className="year-item">
                                    {i}
                                </Select.Option>,
                            );
                        }
                        return (
                            <div style={{ padding: 8 }} >
                                <Typography.Title level={4}>Custom header</Typography.Title>
                                <Row gutter={8} >
                                    <Col>
                                        <Radio.Group
                                            size="small"
                                            onChange={(e) => onTypeChange(e.target.value)}
                                            value={type}
                                        >
                                            <Radio.Button value="month">Month</Radio.Button>
                                            <Radio.Button value="year">Year</Radio.Button>
                                        </Radio.Group>
                                    </Col>
                                    <Col>
                                        <Select
                                            size="small"
                                            dropdownMatchSelectWidth={false}
                                            className="my-year-select"
                                            value={year}
                                            onChange={(newYear) => {
                                                const now = value.clone().year(newYear);
                                                onChange(now);
                                            }}
                                        >
                                            {options}
                                        </Select>
                                    </Col>
                                    <Col>
                                        <Select
                                            size="small"
                                            dropdownMatchSelectWidth={false}
                                            value={month}
                                            onChange={(newMonth) => {
                                                const now = value.clone().month(newMonth);
                                                onChange(now);
                                            }}
                                        >
                                            {monthOptions}
                                        </Select>
                                    </Col>
                                </Row>
                            </div>
                        );
                    }}
                    onPanelChange={onPanelChange}
                />
            </div>
            <Button type="dashed" ghost className='pushBtn'>
                打卡！
            </Button>
        </div>
    );

};




//首页body部分，text部分
// 实现无限滚动加载的作用

interface DataType {
    // href: string,
    cover_img: string,
    title: string,
    content: string,
    pub_date: string,
    state: string,
    is_delete: number,
    indexContent: string,
    Id: number
}

interface TextProps {
    activeTabKey: string,
    clearData: boolean,
    total: number,
    setTotal: (value: number) => void,
    setClearData: (value: boolean) => void
}

// 子组件
const Text: React.FC<TextProps> = ({ activeTabKey, clearData, setClearData, total, setTotal }) => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<DataType[]>([]);

    const loadMoreData = () => {
        if (loading) {
            return;
        }
        setLoading(true);
        // 每一次获取5条数据
        fetch(`/api/blog/getArticle?begin=${data.length}&limit=5&className=${activeTabKey}`)
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


    useEffect(() => {
        if (clearData) {
            setData([]);
            setClearData(false)
        }
        else {
            loadMoreData();
        }
    }, [activeTabKey, clearData])

    // 测试单独获取total的接口
    /*     useEffect(() => {
            getTotal(activeTabKey).then(({ data }) => {
                setTotal(data.total.total)
            })
        }, [data]) */

    return (
        <div className='textStyle'>
            <div
                id="scrollableDiv"
                style={{
                    height: "75vh",
                    // overflow: 'auto',
                    overflow: 'hidden',
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
                    height={"75vh"}
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
                                        // src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                                        src={'/api/blog/api/uploads/' + item.cover_img}
                                    />
                                }
                            >
                                <List.Item.Meta
                                    avatar={<Avatar src='https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png' />}
                                    title={<a href={`/#/text/${item.Id}`}>{item.title}</a>}
                                    description={"发布时间：" + item.pub_date}
                                />
                                {item.indexContent}
                            </List.Item>
                        )}
                    />
                </InfiniteScroll>
            </div>
        </div>
    )
};

interface ClassDataType {
    // cate_id: string,
    className: string,
    Id: string
}


//主页body部分
function Body() {
    const [classData, setClassdData] = useState<ClassDataType[]>([]);
    const [activeTabKey, setActiveTabKey] = useState("all");

    const [clearData, setClearData] = useState(false);
    // 记录获取到数据的总条数
    const [total, setTotal] = useState(0);

    useEffect(() => {
        artcate().then(({ data }) => {
            setClassdData(data.data)
        }).catch(() => {
            console.log("出现错误，请稍后再试！");
        })
    }, [])
    return (
        <>
            <Tabs
                className='tabStyle'
                defaultActiveKey="1"
                tabPosition="left"
                style={{ height: 220, paddingLeft: 0 }}
                activeKey={activeTabKey}
                onChange={(key) => {
                    setActiveTabKey(key)
                    setClearData(true)
                }}
                items={
                    [

                        {
                            label: "All",
                            key: 'all',
                            children: <Text activeTabKey={activeTabKey} clearData={clearData} setClearData={setClearData} total={total} setTotal={setTotal} />
                        },
                        ...classData.map((item, i) => {
                            const id = String(i);
                            return {
                                // label: `Tab-${id}`,
                                label: item.className,
                                key: item.Id,
                                // key: id,
                                // key: item.className,
                                // key: item.className,
                                // disabled: i === 28,
                                children: <Text activeTabKey={activeTabKey} clearData={clearData} setClearData={setClearData} total={total} setTotal={setTotal} />
                            };
                        })
                    ]
                }
            />
        </>
    )
}

// 主页底部
function Bottom() {
    return (
        <>
            <div>2023.8.6</div>
        </>
    )
}

//App
const App: React.FC<MyProps> = ({ isLogin }) => (
    <>
        <Space direction="vertical" style={{ width: '100%' }} size={[0, 48]}>
            <Layout>
                <Header className='headerStyle'>
                    <Top isLogin={isLogin} />
                </Header>
                <Layout hasSider>
                    <Sider className='siderStyle' width={300} style={{ backgroundColor: '#888888' }}>
                        <Left />
                    </Sider>
                    <Content className='contentStyle'>
                        <Body />
                    </Content>
                </Layout>
                <Footer className='footerStyle'>
                    <Bottom />
                </Footer>
            </Layout>
        </Space>
    </>
);

function Index() {
    const [isLogin, setIsLogin] = useState(false)
    useEffect(() => {
        getRole().then(({ data }) => {

            if (data.status === 0) {
                setIsLogin(true)
            }
            else {
                setIsLogin(false)
            }

        }).catch(() => {
            setIsLogin(false)
        })
    }, [])

    return (
        <>
            <App isLogin={isLogin} />
        </>
    )

}

export default Index;