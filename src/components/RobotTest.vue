<template>
    <div id="test">
        <header>
            <h2>小姐姐</h2>
        </header>
         <section ref="messageBox">
             <ul class="chart-news">
                 <li v-for="(item,index) in messageList" :key="index" :class="item.type === 0?'self':'robot'">
                     <img
                     :src="item.type === 0?userIcon:robotIcon"
                     :class="item.type === 0?'user-icon':'robot-icon'">
                     <p class="message">{{item.msg}}</p>
                </li>
             </ul>
         </section>
        <footer>
            <textarea class="meaasge-box" v-model="myChart" @keydown.13.prevent="sendMessage($event)"></textarea>
            <div class="send-wrapper">
                <button id="send" @click="sendMessage">发送</button>
            </div>
        </footer>
    </div>
</template>
<script>
import axios from 'axios';
export default {
    data(){
        return{
            myChart:'',
            messageList:[],
            userIcon:require(`@/assets/image/user.png`),
            robotIcon:require(`@/assets/image/robot.svg`)
        }
    },
    methods: {
        //通过该方法可以访问到API，如果有返回内容，就显示在界面上
        getAnswer:function(){
                this.answer = '思考中....';
                let self = this;
                axios.post('http://robottest.uneedzf.com/api/talk2Robot',{
                    token:'8dd70cd70d41d08733cecd336e4d5604',
                    message:self.myChart
                }).then(function(res){
                    if(res.data.code === 0){
                        self.messageList.push({
                            msg:res.data.data,
                            type:1
                        })
                        let scrollElement = self.$refs.messageBox;
                        self.$nextTick(function(){
                            scrollElement.scrollTop =  scrollElement.scrollHeight - scrollElement.clientHeight
                        })
                    }else{
                        self.messageList.push({
                            msg:res.data.data,
                            type:1
                        })
                    }
                }).catch(function(err){
                    console.log(err)
                })
        },
        sendMessage(event){
            if(this.myChart !== ''){
                this.messageList.push({
                    msg:this.myChart,
                    type:0
                })
                this.getAnswer();
                this.$nextTick(function(){
                    this.myChart = '';
                })
            }
        }
    }

}
</script>
<style lang="">
#test{
    position: fixed;
    top: 0;
    z-index: 10;
    width: 100%;
    height: 100%;
    background: #ddd;
    display: flex;
    flex-direction: column;
}
header{
    height: 10vh;
    background-color: aqua;
    line-height: 10vh;
    color: #fff;
    top: 0;
    text-align: center;
}
header,footer{
    position: fixed;
    width: 100%;
    box-sizing: border-box;
}
section{
    flex: 1;
    box-sizing: border-box;
    padding: 10vh 0 30vh;
    overflow: auto;
    -webkit-overflow-scrolling: touch;

}
footer{
    height:30vh;
    bottom: 0;
    background: #fff;
    display: flex;
    flex-direction: column;
}
.meaasge-box{
    width: 100%;
    height: calc(100% - 40px);
    box-sizing: border-box;
    resize: none;
    outline: 0;
    padding: 1vw;
}
.send-wrapper{
    border-top: 1px solid #aaa;
    text-align: right;
    box-sizing: border-box;
    padding: 0 10vw;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 40px;
}
.robot{
    text-align: right;
}
#send{
    border: 0;
    background: #fff;
    padding: 8px;
    outline: 0;
}
.user-icon,.robot-icon{
    width: 40px;
    height: 40px;
}
.user-icon{
    float: left;
}
.robot-icon{
    float: right;
}
.chart-news>li{
    overflow: hidden;
    padding: 6px;
    box-sizing: border-box;
}
.message{
    max-width: 40vw;
    background: #fff;
    border-radius: 6px;
    padding: 6px 8px;
    display: inline-block;
    margin: 0 5px;
}
.robot .message{
    text-align: left;
}
</style>
