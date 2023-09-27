import { Avatar, List } from 'antd';
import { useNavigate } from 'react-router-dom';
import './../SearchList/index.scss'

interface MyProps {
    data: Array<any>
}
const App: React.FC<MyProps> = ({ data }) => {
    const navigate = useNavigate();
    return (
        <>
            <List
                itemLayout="horizontal"
                dataSource={data}
                renderItem={(item, index) => (
                    <List.Item className='itemClass'>
                        <List.Item.Meta
                            title={<a href={'/#/text/' + item.Id}>{item.title}</a>}
                            description={item.indexContent}
                        />
                    </List.Item>
                )}
            />
        </>
    )
};

export default App;