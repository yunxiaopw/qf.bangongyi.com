<template>
  <div class="main-box">
    <HeadLine>
      审批流程
      <template #r-content>
        <div class="t-r-btn">
          <el-button size="small" @click="goRouter">新增审批流程</el-button>
        </div>
      </template>
    </HeadLine>

    <!-- 内容区 -->
    <div class="el-collapse_box">
      <el-collapse v-model="activeNames">
        <el-collapse-item title="人事" name="1">
          <div
            class="approval_item"
            v-for="item in approvalList"
            :key="item.id"
          >
            <div class="img_box">
              <img :src="require('@/assets/images/' + item.src)" />
            </div>
            <div class="infors">
              <div>
                <div>{{ item.title }}</div>
                <div>场景：{{ item.scene }}</div>
                <div>适用范围：{{ item.rangeOfApplication }}</div>
              </div>
              <div>{{ item.infor }}</div>
            </div>
            <div class="btns">
              <el-button type="text" icon="el-icon-edit-outline"></el-button>
              <el-button type="text" icon="el-icon-delete"></el-button>
            </div>
          </div>
        </el-collapse-item>
        <el-collapse-item title="薪酬" name="2">
          <div>薪酬吧</div>
        </el-collapse-item>
        <el-collapse-item title="考勤" name="3">
          <div>考勤吧</div>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script>
export default {
  name: "approval",
  data() {
    return {
      activeNames: ["1"],
      approvalList: [
        {
          id: "1",
          title: "转正审批",
          src: "approval/person_1.png",
          infor: "用于员工从试用期转正的申请",
          scene: "人事-转正",
          rangeOfApplication: "全员"
        },
        {
          id: "2",
          title: "异动审批",
          src: "approval/person_3.png",
          infor: "用于为员工办理异动时的审批",
          scene: "人事-异动",
          rangeOfApplication: "全员"
        },
        {
          id: "3",
          title: "离职审批",
          src: "approval/person_2.png",
          infor: "用于员工发起离职申请的审批",
          scene: "人事-离职",
          rangeOfApplication: "全员"
        }
      ]
    };
  },
  created() {},
  methods: {
    // 路由页面跳转
    goRouter(path, id = null) {
      if (id !== null) {
        this.$router.push({ path, query: { id } });
      } else {
        this.$router.push({ path });
      }
    }
  }
};
</script>

<style lang="less" scoped>
.el-collapse_box {
  padding: 24px;
  /deep/.el-collapse-item__header {
    font-size: 16px;
    font-weight: 500;
  }
  /deep/.el-collapse {
    border: none;
  }
  /deep/.el-collapse-item__header {
    border: none;
  }
  /deep/.el-collapse-item__wrap {
    border: none;
  }
  /deep/.el-collapse-item__arrow {
    margin: 0 8px 0 10px;
  }
}

.approval_item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  border: 1px solid #ebeef5;
  border-radius: 4px;
}
.approval_item + .approval_item {
  margin-top: 12px;
}
</style>
