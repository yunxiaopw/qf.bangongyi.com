const staffCare = {
    state: {
        // 员工关怀 节日列表
        festivalList: [
            { id: "1", name: "元旦" },
            { id: "2", name: "春节" },
            { id: "3", name: "元宵节" },
            { id: "4", name: "端午节" },
            { id: "5", name: "中秋节" },
            { id: "6", name: "国庆节" },
        ],
        // 节日祝福接口参数
        storeRemindFormData: {
            id: "",
            content: [],
        },
        // 员工关怀日志
        staffCareLogQueryFormTypes: [
            { id: "1", name: "生日祝福" },
            { id: "2", name: "生日提醒" },
            { id: "3", name: "入职祝福" },
            { id: "4", name: "入职提醒" },
            { id: "5", name: "节日祝福" },
        ]
    },
    mutations: {
        // 节日祝福 未点击保存前的所有对节日的编辑
        setStoreRemindFormData(state, {type, data}) {
            let { id, content, inscription, send_day, send_time } = data;
            let isExist = state.storeRemindFormData.content.some(i => i.type === type);
            let assignIndex = state.storeRemindFormData.content.findIndex(i => i.type === type);
            if(!isExist) {
                state.storeRemindFormData.id = id;
                state.storeRemindFormData.content.push({
                    type,
                    content,
                    inscription,
                    send_day,
                    send_time,
                })
            }else if(assignIndex !== -1){
                Object.assign(state.storeRemindFormData.content[assignIndex], {
                    type,
                    content,
                    inscription,
                    send_day,
                    send_time,
                })
            }
        },
        // 重置 节日祝福 未点击保存前的所有对节日的编辑
        resetSetStoreRemindFormData(state) {
            state.storeRemindFormData = {
                id: "",
                content: [],
            }
        }
    },
    actions: {}
  };
  
  export default staffCare
  