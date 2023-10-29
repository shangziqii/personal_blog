import { useEffect, useState, useRef } from "react";
import './index.scss'
const App: React.FC = () => {
    const [messages, setMessages] = useState<string[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [webSocket, setWebSocket] = useState<WebSocket | null>(null)
    const [flag, setFlag] = useState(false)
    const [id, setId] = useState<string>('')
    const scrollRef = useRef<HTMLDivElement>(null);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    }
    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        // 将输入框的内容前后的空格去掉并返回
        if (event.key === 'Enter') {
            if (webSocket) {
                if (inputValue.trim() !== '') {
                    const messageObject = {
                        content: inputValue,
                        timeStamp: id
                    }
                    webSocket.send(JSON.stringify(messageObject))
                    setInputValue('');
                }
            }
        }
    };
    const handleSendMessgae = () => {
        // 将输入框的内容前后的空格去掉并返回
        if (webSocket) {
            if (inputValue.trim() !== '') {
                const messageObject = {
                    content: inputValue,
                    timeStamp: id
                }
                webSocket.send(JSON.stringify(messageObject))
                setInputValue('');
            }
        }

    };

    useEffect(() => {
        async function asyncFunction() {
            const newWebSocket = new WebSocket('ws://localhost:8080')
            const newId = Date.now().toString()
            setId(newId)
            return {
                newWebSocket,
                newId
            }
        }
        if (flag) {
            asyncFunction().then(result => {
                setWebSocket(result.newWebSocket)
                sessionStorage.setItem('sendId', result.newId)
                if (result) {
                    result.newWebSocket.onmessage = (event) => {
                        const message = event.data;
                        setMessages((prevMessages) => [...prevMessages, message])
                    };
                }
            })
        }
        setFlag(true)
        //组件销毁时，清除副作用，可以实现componentWillUnmount
        return () => {
            if (webSocket) {
                webSocket.close();
                setFlag(false)
            }
        }
    }, [flag]);
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages])


    return (
        <>
            <div>
                <div className="chatBox" ref={scrollRef}>
                    {messages.map((message, index) => {
                        const data = JSON.parse(message)
                        const id: string | null = sessionStorage.getItem('sendId')
                        const color: string | null = id && data.timeStamp === id ? '#95ec69' : '#ebebeb'
                        return (
                            <>
                                <div className="box">
                                    <div>用户：{data.timeStamp}</div>
                                    <span className="sanjiao" style={{ borderRightColor: color }}></span><span key={index} style={{ backgroundColor: color }} className="showChatDiv">{data.content}</span>
                                </div>
                            </>
                        )
                    }
                    )}
                </div>
                <div className="inputSend">
                    <input type="text" value={inputValue} onChange={handleInputChange} onKeyDown={handleKeyDown} />
                    <button onClick={handleSendMessgae}>Send</button>
                </div>
            </div>

        </>
    )
}
export default App