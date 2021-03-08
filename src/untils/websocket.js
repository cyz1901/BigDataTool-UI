// const ws = new WebSocket()

// websocketonopen() {
    
//     console.log("WebSocket连接成功");
//     let data = {
//         type: "user_init",
//         userid: 'xxx'
//     }
//     this.websocket.send(
//         // 发送数据
//         JSON.stringify(data)
//     );
// }
// websocketonerror(e) {
//     //错误
//     // this.initWebSocket()
//     console.log("WebSocket连接发生错误");
// }
// websocketonmessage(e) {
//     //数据接收  
//     var that = this;
//     var data = JSON.parse(e.data);
//     this.$store.commit('SET_ws', data)
//     console.log("接收数据");
//     //操作处理...
// }

// websocketsend(agentData) {
//     //数据发送
//     this.websocket.send(agentData);
// }

// websocketclose(e) {
//     //关闭
//     console.log(JSON.stringify(e));
// }
