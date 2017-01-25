<template lang="html">
  <div class="">
      <div id="time"></div>
      <el-button type="primary" v-on:click="funInitial()">初始化</el-button>
    <el-button-group>
      <el-button type="primary" :disabled="item.isDisbled" v-for="item in menu" v-on:click="clickMenu(item.id)">{{item.status}}</el-button>
    </el-button-group>
  </div>
</template>
<script>
import {applicationLoad} from "../scripts/tel/japp.js";

export default {
  data () {
    return {
      menu : [
        {"status": "示闲", "id": "fn1","method":"SetIdle","isDisbled":false},
        {"status": "示忙", "id": "fn2","method":"SetBusy","isDisbled":true},
        {"status": "应答", "id": "fn3","method":"Answer","isDisbled":true},
        {"status": "挂断", "id": "fn4","method":"Disconnect","isDisbled":true},
        {"status": "呼出", "id": "fn5","method":"MakeCall","isDisbled":false},
        {"status": "保持", "id": "fn6","method":"Hold","isDisbled":true},
        {"status": "接回", "id": "fn7","method":"RetrieveHold","isDisbled":true},
        {"status": "咨询", "id": "fn8","method":"Consult","isDisbled":true},
        {"status": "转移", "id": "fn9","method":"Transfer","isDisbled":true},
        {"status": "会议", "id": "fn10","method":"Conference","isDisbled":true},
        {"status": "转出", "id": "fn11","method":"TransferOut","isDisbled":true},
        {"status": "再拨", "id": "fn12","method":"ReCall","isDisbled":true}
      ],
      //两种状态： 1：未接电话前的  2：接电话后的
      status:"1",
      time:""
    }
  },
  created () {
    applicationLoad(0,0,0,0,"","",callback)
  },
  methods: {
    //电话条按钮点击事件
    clickMenu: function(id){
      for(let i = 0; i < this.menu.length; i++){
        if(this.menu[i].id == id){
          let method = this.menu[i].method;
          switch (method) {
            case "MakeCall":
                this.MakeCall();
              break;
            default:
              application.oJVccBar[method]();
          }
        }
      }
    },
    //初始化电话条
    funInitial: function(){
      //服务器ip
	    var  serverIP = "192.168.86.57";
      //集团号
      var  vccID = "100000";
      //工号27
	    var  agentID  = "14";
      //端口号
	    var  sipPort = "5066";
      //密码
		  var  sipPassword = "00000000";
      application.oJVccBar.SetAttribute("MainIP",serverIP);  //MainIP
      application.oJVccBar.SetAttribute("MainPortID",14800);  //MainPort
      application.oJVccBar.SetAttribute("BackIP",serverIP);  //BackIP
      application.oJVccBar.SetAttribute("BackPortID",14800);  //BackPort
      application.oJVccBar.SetAttribute("MonitorIP",serverIP);  //MonitorIP
      application.oJVccBar.SetAttribute("MonitorPort",4502);  //MainPort
      application.oJVccBar.SetAttribute("SipServerIP",serverIP);
      application.oJVccBar.SetAttribute("SipServerPort",parseInt(sipPort));
      application.oJVccBar.SetAttribute("SipProtocol","UDP");
      application.oJVccBar.SetAttribute("PhonType",1);  //0:内置坐席卡；1：内置Sip；2：外置其他终端
      application.oJVccBar.SetAttribute("AgentType",1);
      application.oJVccBar.SetAttribute("SelfPrompt",1);
      application.oJVccBar.SetAttribute("MediaFlag",vccID);
      application.oJVccBar.SetAttribute("AppType",2);
      application.oJVccBar.SetAttribute("PassWord","111111");
      application.oJVccBar.SetAttribute("AgentID","000010"+vccID+agentID);
      application.oJVccBar.SetAttribute("Dn", "000002" + vccID + agentID);
      application.oJVccBar.SetAttribute("SipPassWord", sipPassword);
      application.oJVccBar.Initial();
  	},
    //呼出
    MakeCall:function(){
      this.$prompt('请输入手机号', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /^1[3|4|5|8][0-9]\d{4,8}$/,
          inputErrorMessage: '手机不正确'
        }).then(({ value }) => {
          application.oJVccBar.MakeCall(value);
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });
        });
      }
  }
}

function callback(){

  //3
   application.oJVccBar.OnCallRing = onOnCallRing;
   application.oJVccBar.AnswerCall = onOnAnswerCall;
   application.oJVccBar.OnCallEnd = onOnCallEnd;
   //18
   application.oJVccBar.OnPrompt = onOnPrompt;
   application.oJVccBar.OnReportBtnStatus = onReportBtnStatus;
   application.oJVccBar.OnInitalSuccess = onOnInitalSuccess;
   application.oJVccBar.OnInitalFailure = onOnInitalFailure;
   application.oJVccBar.OnEventPrompt = onOnEventPrompt;
   application.oJVccBar.OnAgentWorkReport = onOnAgentWorkReport;
   application.oJVccBar.OnCallDataChanged = onOnCallDataChanged;
   application.oJVccBar.OnBarExit = onOnBarExit;
     application.oJVccBar.OnCallQueueQuery = onOnCallQueueQuery;
   application.oJVccBar.OnQueryGroupAgentStatus = onOnQueryGroupAgentStatus;
   application.oJVccBar.OnSystemMessage  = onOnSystemMessage;
   application.oJVccBar.OnRecvWeiboMsg = onOnRecvWeiboMsg;
   application.oJVccBar.OnIMMessage = onOnIMMessage
   application.oJVccBar.OnRecvWeChatMessage = onOnRecvWeChatMessage;
   application.oJVccBar.OnSendWeChatMsgReport = onOnSendWeChatMsgReport;
   application.oJVccBar.OnUploadFileToMMSReport = onOnUploadFileToMMSReport;
   application.oJVccBar.OnDownloadFileToMMSReport = onOnDownloadFileToMMSReport;
   application.oJVccBar.OnWorkStaticInfoReport = onOnWorkStaticInfoReport;

   //14
   application.oJVccBar.OnAgentReport = onOnAgentReport;
   application.oJVccBar.OnTelReport = onOnTelReport;
   application.oJVccBar.OnServiceReport = onOnServiceReport;
   application.oJVccBar.OnIvrReport = onOnIvrReport;
   application.oJVccBar.OnTaskReport = onOnTaskReport;
   application.oJVccBar.OnOutboundReport = onOnOutboundReport;
   application.oJVccBar.OnCallReportInfo = onOnCallReportInfo;
   application.oJVccBar.OnQueueReport = onOnQueueReport;
   application.oJVccBar.OnQueryMonitorSumReport = onOnQueryMonitorSumReport;
   application.oJVccBar.OnWallServiceReport = onOnWallServiceReport;
   application.oJVccBar.OnWallQueueReport = onOnWallQueueReport;
   application.oJVccBar.OnServiceStaticReport = onOnServiceStaticReport;
   application.oJVccBar.OnAgentStaticReport = onOnAgentStaticReport;
   application.oJVccBar.OnMethodResponseEvent = onOnMethodResponseEvent;

  //     // application.oJVccBar.SetAttribute("AutoUpdateURL","http://192.168.2.136:8080/cin-dcp/BarUpdate");  //AutoUpdateURL
  //  showLog(application.oBrowserSys.expression+"\r\n\r\n");
   //
  //  //application.oVccBarAssist.oBarBtnControl.SetUpdateType(1);
   //
  //    application.oVccBarAssist.oBarBtnControl.AttachBtnByUIID("btnSetBusy",1);
  //    application.oVccBarAssist.oBarBtnControl.AttachBtnByUIID("btnSetIdle",2);
  //    application.oVccBarAssist.oBarBtnControl.AttachBtnByUIID("btnMakeCall",3);
  //    application.oVccBarAssist.oBarBtnControl.AttachBtnByUIID("btnCallIn",3);
  //    application.oVccBarAssist.oBarBtnControl.AttachBtnByUIID("btnHold",4);
  //    application.oVccBarAssist.oBarBtnControl.AttachBtnByUIID("btnRetrieveHold",5);
  //    application.oVccBarAssist.oBarBtnControl.AttachBtnByUIID("btnDisconnect",6);
  //    application.oVccBarAssist.oBarBtnControl.AttachBtnByUIID("btnTransfer",7);
  //    application.oVccBarAssist.oBarBtnControl.AttachBtnByUIID("btnConference",8);
  //    application.oVccBarAssist.oBarBtnControl.AttachBtnByUIID("btnAnswer",9);
  //    application.oVccBarAssist.oBarBtnControl.AttachBtnByUIID("btnTransferOut",10);
  //    application.oVccBarAssist.oBarBtnControl.AttachBtnByUIID("btnConsult",11);
  //    application.oVccBarAssist.oBarBtnControl.AttachBtnByUIID("btnSendDTMF",12);
  //    application.oVccBarAssist.oBarBtnControl.AttachBtnByUIID("btnBridge",13);
  //    application.oVccBarAssist.oBarBtnControl.AttachBtnByUIID("btnAlterNate",14);
  //    application.oVccBarAssist.oBarBtnControl.AttachBtnByUIID("btnConfigurate",15);
  //    application.oVccBarAssist.oBarBtnControl.AttachBtnByUIID("btnFroceReset",16);
  //    application.oVccBarAssist.oBarBtnControl.AttachBtnByUIID("btnBeginRecord",17);
  //    application.oVccBarAssist.oBarBtnControl.AttachBtnByUIID("btnStopRecord",18);
  //    application.oVccBarAssist.oBarBtnControl.AttachBtnByUIID("btnListen",19);
  //    application.oVccBarAssist.oBarBtnControl.AttachBtnByUIID("btnInsert",20);
  //    application.oVccBarAssist.oBarBtnControl.AttachBtnByUIID("btnIntercept",21);
  //    application.oVccBarAssist.oBarBtnControl.AttachBtnByUIID("btnForeReleaseCall",22);
  //    application.oVccBarAssist.oBarBtnControl.AttachBtnByUIID("btnBeginPlay",23);
  //    application.oVccBarAssist.oBarBtnControl.AttachBtnByUIID("btnStopPlay",24);
  //    application.oVccBarAssist.oBarBtnControl.AttachBtnByUIID("btnLock",25);
  //    application.oVccBarAssist.oBarBtnControl.AttachBtnByUIID("btnUnLock",26);
  //    application.oVccBarAssist.oBarBtnControl.AttachBtnByUIID("btnMute",27);
  //    application.oVccBarAssist.oBarBtnControl.AttachBtnByUIID("btnCallBack",28);
  //    application.oVccBarAssist.oBarBtnControl.AttachBtnByUIID("btnReCall",29);
  //    application.oVccBarAssist.oBarBtnControl.AttachBtnByUIID("btnHelp",30);
   //
   if(application.oVccBarAssist.oBarAgentStatus != null)
   {
       application.oVccBarAssist.oBarAgentStatus.OnAgentStatusTime = function(agentStatus,agentStatusText,timerCount){
                 document.getElementById("time").innerHTML  = "【"+agentStatusText+"】:【"+timerCount+"】";
       }
    }

  //  displayCtrl();

}
function onOnCallRing(CallingNo, CalledNo, OrgCalledNo, CallData, SerialID, ServiceDirect, CallID, UserParam, TaskID, AreaCode){
  //13000120001 00000210000014 110000 accountId= S201701251541073529710C8A659301104527 0 C201701251540580C8A659300132431  00000110000001101010 13000120001
  console.log(CallingNo+" "+CalledNo+" "+ OrgCalledNo+" "+CallData+" "+ SerialID+" "+ServiceDirect+" "+ CallID+" "+ UserParam+" "+TaskID+" "+ AreaCode)
}
</script>

<style lang="css">
</style>
