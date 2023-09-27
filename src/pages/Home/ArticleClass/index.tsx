import React, { useEffect, useState } from 'react';
import { Button, Table, Modal, Input } from 'antd';
import type { ColumnsType } from 'antd/es/table';

import { artcate, deleteArtClassApi, updateCateApi, addArtClassApi } from './api'
import './index.scss'

interface DataType {
    key: React.Key;
    className: string;
    description: string;
    Id: number
}


/* const data: DataType[] = [
    {
        key: 1,
        className: 'John Brown',
        description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
    }
];
 */
const App: React.FC = () => {
    function changeFunc(record: DataType) {
        // const id = columns[0].key;
        setId(record.Id)
        setClassName(record.className)
        setVisible(true);

    }
    function deleteFunc(record: DataType) {
        deleteArtClassApi(record.Id).then(({ data }) => {
            if (data.status === 0) {
                console.log("删除成功！");
                setFlag(true)
            }
            else {
                console.log("删除错误！");
            }
        }).catch(() => {
            console.log("未知错误，请稍后再试！");
        })
    }
    const columns: ColumnsType<DataType> = [
        { title: 'className', dataIndex: 'className' },
        {
            title: 'Action',
            dataIndex: '',
            key: 'x',
            render: (record) => <>
                <Button onClick={() => changeFunc(record)}>Change</Button>
                <Button onClick={() => deleteFunc(record)} v-show={false}>Delete</Button>
            </>,
        },
    ];

    const [classData, setClassData] = useState([]);
    const [flag, setFlag] = useState(false)

    // 显示修改className弹窗的标志
    const [visible, setVisible] = useState(false);
    const [visible1, setVisible1] = useState(false);
    // 记录修改后的className
    const [className, setClassName] = useState('');
    const [className1, setClassName1] = useState('');
    const [Id, setId] = useState(0);
    useEffect(() => {
        artcate().then(({ data }) => {
            /*        const formattedData = data.data.map((item: { Id: number }) => ({
                       ...item,
                       key: item.Id
                   })); */
            setClassData(data.data)
            setFlag(false)
            setClassName1('')

        }).catch(() => {
            console.log("未知错误，请稍后再试！");
        })
    }, [flag])

    // 关闭修改className弹窗函数
    function handleCancel() {
        setVisible(false);
    }
    function handleCancel1() {
        setVisible1(false);
        setClassName1('')
    }
    // 确认修改className弹窗
    function handleOk() {

        const data = {
            className,
            Id
        }
        updateCateApi(data).then(({ data }) => {
            if (data.status === 0) {
                console.log("修改成功！");
                setFlag(true)
            }
            else {
                console.log("修改错误！");
            }
        }).catch(() => {
            console.log("未知错误，请稍后再试！");
        })
        setVisible(false);
    }

    function handleOk1() {
        const data = {
            className: className1
        }
        addArtClassApi(data).then(({ data }) => {
            if (data.status === 0) {
                console.log("添加成功！");
                setFlag(true)
            }
            else {
                console.log("添加错误！");
            }
        }).catch(() => {
            console.log("未知错误，请稍后再试！");
        })
        setVisible1(false);
    }

    function addFunc() {
        setVisible1(true)
    }
    return (
        <>
            <Modal
                title="添加className"
                open={visible1}
                onOk={handleOk1}
                onCancel={handleCancel1}
            >
                <Input value={className1} onChange={(e) => setClassName1(e.target.value)} />
            </Modal>
            <Modal
                title="修改className"
                open={visible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Input value={className} onChange={(e) => setClassName(e.target.value)} />
            </Modal>

            <div className='tableTop'>
                <Button type="dashed" block className='addBtnClass' onClick={addFunc}>
                    添加类别
                </Button>
            </div>
            <Table
                rowKey={(record) => { return record.Id }}
                columns={columns}
                expandable={{
                    expandedRowRender: (record) => <p style={{ margin: 0 }}>{record.description}</p>,
                    rowExpandable: (record) => record.className !== 'Not Expandable',
                }}
                dataSource={classData}
                className='tableStyle'
            />
        </>
    )
};

export default App;
