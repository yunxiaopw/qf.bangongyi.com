const MoreInput = {
    state: {
        // 岗位选框 可选项数据
        positionData: [],
        // 职级选框 可选项数据
        rankLevelData: [],
    },
    mutations: {
        // 存储 岗位选框 可选项数据
        setStorePositionData(state, arr) {
            state.positionData = JSON.parse(JSON.stringify(arr));
        },
        // 存储 职级选框 可选项数据
        setStoreRankLevelData(state, arr) {
            state.rankLevelData = JSON.parse(JSON.stringify(arr));
        },
    },
  };
  
  export default MoreInput
  