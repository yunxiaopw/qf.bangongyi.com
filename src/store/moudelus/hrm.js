const hrm = {
    state: {
        // 入职 自助登记/邀请补充资料 已输入的内容
        registerInvitation: {},
    },
    mutations: {
        // 存储 入职 自助登记/邀请补充资料 已输入的内容
        setRegisterInvitation(state, data) {
            state.registerInvitation = JSON.parse(JSON.stringify(data));
        },
        // 清空 入职 自助登记/邀请补充资料 已输入的内容
        delRegisterInvitation(state) {
            state.registerInvitation = {};
        },
    },
  };
  
  export default hrm
  