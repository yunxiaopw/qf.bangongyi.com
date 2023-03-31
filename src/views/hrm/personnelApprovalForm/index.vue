<template>
  <div class="main-box">
    <!-- 页头 -->
    <HeadLine>人事审批单</HeadLine>

    <!-- 表格查询项 -->
    <div class="query-form">
      <el-form :inline="true" :model="queryForm" class="demo-form-inline" size="small">
        <el-form-item label="">
          <el-input v-model="queryForm.dept_no" placeholder="审批单号"></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-input v-model="queryForm.we_name" placeholder="姓名/工号/手机号"></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-select v-model="queryForm.we_name" placeholder="审批事项">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="">
          <el-select v-model="queryForm.we_name" placeholder="审批状态">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="">
          <el-date-picker v-model="queryForm.dateTime" type="date" placeholder="审批发起时间" format="yyyy-MM-dd" value-format="yyyy-MM-dd"></el-date-picker>
        </el-form-item>
      </el-form>
      <div class="query-r-btn">
        <el-button size="small" @click="reset">重置</el-button>
        <el-button size="small" type="primary" @click="search">查询</el-button>
      </div>
    </div>

    <!-- 表格 -->
    <el-table
    :data="tableData"
    style="width: 100%"
    min-height="548"
    :header-cell-style="{
        height: '34px',
        padding: '0',
        background: '#FAFAFA',
        color: '#8C8C8C',
        fontSize: '12px',
        fontFamily: 'PingFangSC-Medium, PingFang SC',
        fontWeight: '500',
    }"
    row-key="id"
    >
        <el-table-column prop="we_name" header-align="center" label="审批单号"></el-table-column>
        <el-table-column prop="all_we_parentids" align="center" label="员工"></el-table-column>
        <el-table-column prop="type" align="center" label="审批事项"></el-table-column>
        <el-table-column prop="master" align="center" label="审批状态"></el-table-column>
        <el-table-column prop="leads" align="center" label="审批发起时间"></el-table-column>
        <el-table-column prop="count" align="center" label="发起人"></el-table-column>
        <el-table-column prop="count" align="center" label="审批结束时间"></el-table-column>
        <el-table-column prop="count" align="center" label="操作">
          <template slot-scope="scope">
            <div>
              <el-button type="text" size="small" @click="goRouter('/personnelApprovalFormInfor')">详情</el-button>
            </div>
          </template>
        </el-table-column>
    </el-table>

    <!-- 分页组件 -->
    <pagination
    v-show="tableDataTotal>0"
    :total="tableDataTotal"
    :page.sync="queryForm.page"
    :limit.sync="queryForm.size"
    @pagination="getTabelList"
    />

    <!-- 右侧抽屉 -->
    <el-drawer title="审批信息" :before-close="handleClose" :visible.sync="drawer" class="demo-drawer">
      <div class="demo-drawer__content">
          <!-- 内容区 -->
          <div style="padding: 0 24px 60px">
              <div class="staff_care_title">审批信息</div>
              <div class="staff_care_item">
                <div class="staff_care_item_label">审批单号：</div>
                <div class="staff_care_item_value">133456</div>
              </div>
              <div class="staff_care_item">
                <div class="staff_care_item_label">审批事项：</div>
                <div class="staff_care_item_value">133456</div>
              </div>
              <div class="staff_care_item">
                <div class="staff_care_item_label">审批状态：</div>
                <div class="staff_care_item_value">133456</div>
              </div>
              <div class="staff_care_item">
                <div class="staff_care_item_label">审批发起：</div>
                <div class="staff_care_item_value">133456</div>
              </div>

              <div class="staff_care_title">申请内容</div>
              <div class="staff_care_item">
                <div class="staff_care_item_label">审批单号：</div>
                <div class="staff_care_item_value">133456</div>
              </div>
              <div class="staff_care_item">
                <div class="staff_care_item_label">审批事项：</div>
                <div class="staff_care_item_value">133456</div>
              </div>

              <div class="staff_care_title">申请内容</div>
              <el-timeline>
                <el-timeline-item
                  v-for="(activity, index) in activities"
                  :key="index"
                  :icon="activity.icon"
                  :type="activity.type"
                  :color="activity.color"
                  :size="activity.size"
                  :timestamp="activity.timestamp"
                  placement="top">
                      <div>
                          <div>部门：北京分公司/产研部/产品二组</div>
                          <div>岗位：产品经理</div>
                          <div>职级：<span class="tag">S12</span></div>
                      </div>
                  </el-timeline-item>
              </el-timeline>
          </div>
          
          <div class="demo-drawer__footer">
              <el-button size="small" type="primary" @click="drawer = false" >同意</el-button>
              <el-button size="small" @click="drawer = false">撤销</el-button>
          </div>
      </div>
    </el-drawer>

  </div>
</template>

<script>
import { disableList } from "@/api/hrm/department";

export default {
  name: "personnelApprovalForm",
  components: {},
  data() {
    return {
      // 查询入参
      queryForm: {
        page: 1,
        size: 15,
      },
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      
      // 表格数据
      tableData: [],
      tableDataTotal: 40,
      //   抽屉相关
      drawer: true,
      // 审批详情
      accraditationInfor: [],
      //   时间线相关
      activities: [{
        content: '支持使用图标',
        timestamp: '2018-04-12 20:46',
        type: 'primary',
        }, {
            content: '支持自定义颜色',
            timestamp: '2018-04-03 20:46',
            type: 'primary',
        }, {
            content: '支持自定义尺寸',
            timestamp: '2018-04-03 20:46',
            type: 'primary',
        }, {
            content: '默认样式的节点',
            timestamp: '2018-04-03 20:46',
            type: 'primary',
      }],
    };
  },
  computed: {},
  watch: {},
  created() {
    // this.getDisableList()
  },
  mounted() {},
  methods: {
    // 获取表格数据
    getDisableList(){
      disableList().then(res=> {
        this.tableData = res.data ? res.data : []
      })
    },
    // 分页
    getTabelList(){
      this.search();
    },
    // 重置
    reset() {
      this.resetQueryForm();
      this.search();
    },
    // 重置 查询条件数据
    resetQueryForm() {
      for (const key in this.queryForm) {
        this.queryForm[key] = "";
      }
    },
    // 查询
    search() {
      this.getDisableList()
    },
    // 抽屉 关闭前的回调
    handleClose(done) {
      done();
    },
    // 路由页面跳转
    goRouter(path, id = null) {
      if (id !== null) {
        this.$router.push({ path, query: { id } });
      }else{
        this.$router.push({ path });
      }
    },
  },
};
</script>

<style lang='less' scoped>
// 表格查询项
.query-form {
  height: 67px;
  padding: 12px 24px;
  display: flex;
  justify-content: space-between;
  .query-r-btn {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

// 抽屉
.demo-drawer {
    /deep/.el-drawer__header{
        padding: 8px 24px;
        font-size: 16px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #1F1F1F;
        margin-bottom: 0px;
    }
    /deep/.demo-drawer__footer {
        width: 100% !important;
        position: absolute;
        bottom: 0;
        left: 0;
        width: 360px;
        height: 56px;
        background: #FFFFFF;
        border-top: 1px solid #F0F0F0;
        padding: 12px 24px;
    }
    // 标题
    .staff_care_title {
      height: 38px;
      font-size: 14px;
      font-weight: 500;
      color: #141414;
      line-height: 38px;
      margin: 24px 0;
    }
    .staff_care_title:nth-child(1) {
      margin-top: 0;
    }
    .staff_care_item {
      display: flex;
      align-items: center;
      font-size: 14px;
      font-weight: 400;
      &_lavel {
        color: #8C8C8C;
      }
      &_value {
          color: #1F1F1F;
      }
    }
    .staff_care_item+.staff_care_item {
      margin-top: 8px;
    }
}
</style>