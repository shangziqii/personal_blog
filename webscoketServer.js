const WebScoket = require('ws');

function start() {
    //创建WebScoket服务器实例，并监听8080端口
    const wss = new WebScoket.Server({ port: 8080 })

    //监听连接事件
    // 当建立连接，触发connection事件
    wss.on('connection', (ws) => {
        console.log('新连接已建立');
        //监听事件
        ws.on('message', (message) => {
            console.log('收到消息', message);
            //广播消息给所有连接的客户端
            // 循环遍历所有连接的客户端
            wss.clients.forEach((client) => {
                if (client.readyState === WebScoket.OPEN) {
                    client.send(message.toString());
                }
            })
        })
        //监听断开连接事件
        ws.on('close', () => {
            console.log('连接已断开');
        })
    });
    console.log('WebScoket服务器已启动');
}


module.exports = {
    start
}