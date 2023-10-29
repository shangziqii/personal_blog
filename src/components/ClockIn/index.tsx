import React from "react"
import { useState } from 'react';
import { Button, message } from "antd";
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import { Dayjs } from 'dayjs';
// import dayLocaleData from 'dayjs/plugin/localeData';
import { Calendar, Col, Radio, Row, Select, Typography, theme } from 'antd';
import type { CalendarMode } from 'antd/es/calendar/generateCalendar';

import './../ClockIn/index.scss'
const { clockInApi } = require('./api')

//签到模块
const App: React.FC = () => {
    const { token } = theme.useToken();
    const [punchDates, setPunchDates] = useState<string[]>(['2023-09-27']);

    const onPanelChange = (value: Dayjs, mode: CalendarMode) => {
        console.log(value.format('YYYY-MM-DD'), mode);
    };

    const wrapperStyle: React.CSSProperties = {
        width: "100%",
        border: `1px solid ${token.colorBorderSecondary}`,
        borderRadius: token.borderRadiusLG,
    };
    const clockIn = () => {
        console.log("签到");
        const today = dayjs().format('YYYY-MM-DD');
        setPunchDates([...punchDates, today]);
        console.log(today);
        const data = {
            clockInData: today.toString()
        }

        //发送给后台
        clockInApi(data).then(() => {
            // console.log(data);

        }).catch(() => {
            // console.log(err);

        })
        message.success(`打卡成功！打卡日期:${today}`)
    }

    return (
        <>
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
                                            popupMatchSelectWidth={false}
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
                                            popupMatchSelectWidth={false}
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
                    cellRender={(date: Dayjs) => {
                        const dateString = date.format('YYYY-MM-DD');
                        if (punchDates.includes(dateString)) {
                            // return <div className="signed-date">{date.format('D')}</div>;
                            return <div className="target">🍕</div>
                        }
                        return null;
                    }}
                />


            </div>

            {/* 打卡展示部分 */}
            <Button type="dashed" ghost className='pushBtn' onClick={clockIn}>
                打卡！
            </Button>
        </>
    )
}

export default App