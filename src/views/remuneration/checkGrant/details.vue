<template>
  <div class="main-box">

    <!--页头-->
    <HeadLine goback>
      薪酬审批及发薪的历史记录
      <template #r-content>
        <div class="t-r-btn">
          <el-button size="small">导出</el-button>
          <!-- 确定存档 需修改 -->
          <el-button @click="openSave" size="small">确定存档</el-button>
          <el-button @click="openRefuse" size="small">不通过</el-button>
          <el-button @click="approved" size="small" type="primary">确定通过</el-button>
        </div>
      </template>
    </HeadLine>

    <!--审批步骤-->
    <div class="step-top">
      <div class="step-top-list" v-for="(item, index) in stepList" :key="index"
        :class="{ 'step-top-list-last': index === stepList.length - 1 }">
        <div class="step-list-item step-list-item-status">
          <div v-if="item.status === 'scuess'" class="step-list-item-scuess step-list-item-status">
            <img src="@/assets/images/payDetail/step_sueecss.png" alt="">
            <span>
              已通过
            </span>
          </div>
          <div v-else-if="item.status === 'error'" class="step-list-item-error step-list-item-status">
            <img src="@/assets/images/payDetail/step_error.png" alt="">
            <span>
              不通过
            </span>
          </div>
          <div v-else-if="item.status === 'pending'" class="step-list-item-pending step-list-item-status">
            <div class="step-list-item-status-radius-none">{{ index }}</div>
            <span>
              等待处理
            </span>
          </div>
          <div v-else class="step-list-item-defalut step-list-item-status">
            <div class="step-list-item-status-radius">{{ index }}</div>
            <span>
              正在处理
            </span>
          </div>

          <div class="step-line" v-if="index !== stepList.length - 1"></div>

        </div>

        <div class="step-list-text">
          <div class="step-list-text-name">审核人：{{ item.name }}</div>
          <div class="step-list-text-time">{{ item.time }}</div>
        </div>

      </div>
    </div>

    <!--查询表单 -->
    <div class="query-form">
      <el-form :inline="true" :model="queryForm" class="demo-form-inline">

        <el-form-item label="" class="form-input">
          <el-input size="small" v-model="queryForm.name" placeholder="员工姓名"></el-input>
        </el-form-item>
        <el-form-item label="" class="form-input">
          <el-input size="small" readonly v-model="queryForm.name" placeholder="所属部门"
            @focus="dialogListWidget(queryForm.name, true, 'move_department')"></el-input>
        </el-form-item>
        <el-form-item label="" class="form-input">
          <el-select size="small" v-model="queryForm.sex" placeholder="员工性别">
            <el-option label="男" value="1"></el-option>
            <el-option label="女" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="" class="form-input">
          <el-select size="small" v-model="queryForm.name" placeholder="最高学历">
            <el-option value="专科" label="专科"></el-option>
            <el-option value="本科" label="本科"></el-option>
            <el-option value="硕士" label="硕士"></el-option>
            <el-option value="博士" label="博士"></el-option>
          </el-select>
        </el-form-item>
        <div class="form-select-merge">
          <el-form-item label="" style="margin: 0;">
            <el-select size="small" v-model="queryForm.value" placeholder="入职时段">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="">
            <el-date-picker v-model="queryForm.date" size="small" type="monthrange" range-separator="至"
              start-placeholder="入职日期" end-placeholder="离职日期">
            </el-date-picker>
          </el-form-item>
        </div>
        <div class="form-select-merge">
          <el-form-item label="" style="margin: 0;">
            <el-select size="small" v-model="queryForm.value" placeholder="薪酬所属时段">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="">
            <el-date-picker v-model="queryForm.date" size="small" type="monthrange" range-separator="至"
              start-placeholder="数额" end-placeholder="数额">
            </el-date-picker>
          </el-form-item>
        </div>
        <div class="form-select-merge">
          <el-form-item label="" style="margin: 0;">
            <el-select size="small" v-model="queryForm.value" placeholder="实发工资">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="">
            <el-date-picker v-model="queryForm.date" size="small" type="monthrange" range-separator="至"
              start-placeholder="选择月份" end-placeholder="选择月份">

            </el-date-picker>
          </el-form-item>
        </div>

      </el-form>
    </div>

    <!--表格数据汇总title-->
    <div class="table-title">
      <div class="table-title-item">
        <span>合计总数：</span>1000人
      </div>
      <div class="table-title-item">
        <span>税前公司总额：</span>1000人
      </div>
      <div class="table-title-item">
        <span>实发工资总额：</span>1000人
      </div>
    </div>

    <!--表格-->
    <template>
      <el-table ref="multipleTable" border v-loading="tableLoading" max-height="480" size="small" :data="tableData"
        row-key="id" style="width: 95%;margin-left: 40px;" show-summary >
        <el-table-column prop="date" fixed="left" label="序号">
        </el-table-column>
        <el-table-column prop="date" fixed label="员工姓名">
        </el-table-column>
        <el-table-column prop="date" label="性别">
        </el-table-column>
        <el-table-column prop="date" sortable label="出生年月">
        </el-table-column>
        <el-table-column prop="date" sortable label="年龄">
        </el-table-column>
        <el-table-column prop="date" label="最高学历">
        </el-table-column>
        <el-table-column prop="date" label="身份证号">
        </el-table-column>
        <el-table-column prop="date" label="手机号">
        </el-table-column>
        <el-table-column prop="date" label="邮箱">
        </el-table-column>
        <el-table-column prop="date" label="员工类型">
        </el-table-column>
        <el-table-column prop="date" label="所属公司">
        </el-table-column>
        <el-table-column prop="date" label="所属部门">
        </el-table-column>
        <el-table-column prop="date" label="岗位名称">
        </el-table-column>
        <el-table-column prop="date" label="开户行">
        </el-table-column>
        <el-table-column prop="date" label="银行卡账户">
        </el-table-column>
        <el-table-column prop="date" sortable label="入职时间">
        </el-table-column>
        <el-table-column prop="date" sortable label="转正时间">
        </el-table-column>
        <el-table-column prop="date" sortable label="离职时间">
        </el-table-column>
        <el-table-column prop="date" sortable label="在职年限">
        </el-table-column>
        <el-table-column prop="date" sortable label="工龄">
        </el-table-column>
        <el-table-column prop="date" sortable label="税前定资">
        </el-table-column>
        <el-table-column prop="date" label="固定工资" header-align="center">
          <el-table-column prop="date" sortable label="基本工资">
          </el-table-column>
          <el-table-column prop="date" sortable label="岗位工资">
          </el-table-column>
        </el-table-column>
        <el-table-column prop="date" label="浮动工资" header-align="center">
          <el-table-column prop="date" sortable label="绩效工资">
          </el-table-column>
        </el-table-column>
        <!--补贴-->
        <el-table-column prop="date" label="津补贴" header-align="center">
          <el-table-column prop="date" sortable label="电脑补助">
          </el-table-column>
          <el-table-column prop="date" sortable label="交通补助">
          </el-table-column>
          <el-table-column prop="date" sortable label="饭补">
          </el-table-column>
          <el-table-column prop="date" sortable label="其他补贴">
          </el-table-column>
        </el-table-column>
        <!--考勤-->
        <el-table-column prop="date" label="考勤补扣款" header-align="center">
          <el-table-column prop="date" sortable label="迟到扣款">
          </el-table-column>
          <el-table-column prop="date" sortable label="早退扣款">
          </el-table-column>
          <el-table-column prop="date" sortable label="事假扣款">
          </el-table-column>
          <el-table-column prop="date" sortable label="病假扣款">
          </el-table-column>
          <el-table-column prop="date" sortable label="病假薪资">
          </el-table-column>
          <el-table-column prop="date" sortable label="加班费">
          </el-table-column>
        </el-table-column>
        <!--五险-->
        <el-table-column prop="date" label="五险一金"  header-align="center">
          <el-table-column prop="date" sortable label="养老">
          </el-table-column>
          <el-table-column prop="date" sortable label="医疗">
          </el-table-column>
          <el-table-column prop="date" sortable label="大病/补充/大额医疗">
          </el-table-column>
          <el-table-column prop="date" sortable label="生育">
          </el-table-column>
          <el-table-column prop="date" sortable label="失业">
          </el-table-column>
          <el-table-column prop="date" sortable label="工伤">
          </el-table-column>
        </el-table-column>
        <!--税费-->
        <el-table-column prop="date" label="税费" header-align="center">
          <el-table-column prop="date" sortable label="个税">
          </el-table-column>
          <el-table-column prop="date" sortable label="专项附加扣除">
          </el-table-column>
        </el-table-column>
        <el-table-column prop="date" sortable label="实发工资" header-align="center">
        </el-table-column>
        <el-table-column prop="date" fixed="right" sortable label="薪酬所属时段">
        </el-table-column>
        <el-table-column prop="date" fixed="right" sortable label="实发工资日期">
        </el-table-column>
      </el-table>
    </template>

    <!--不通过提交信息-->
    <el-dialog title="确定不通过" :visible.sync="dialogFormVisible">
      <el-form :model="form" label-width="100px">
        <el-form-item label="不通过原因">
          <el-input type="textarea" :rows="3" placeholder="请输入内容" v-model="form.textarea">
          </el-input>
        </el-form-item>
        <el-form-item label="上传截图">
          <el-upload action="#" list-type="picture-card" class="upload" :auto-upload="false">
            <div class="upload-content">
              <i slot="default" class="el-icon-plus"></i>
              <span>
                上传照片
              </span>
            </div>
            <div slot="file" slot-scope="{file}">
              <img class="el-upload-list__item-thumbnail" :src="file.url" alt="">
            </div>
          </el-upload>
          <div class="upload-tip">
            支持jpg，png，jpge格式，最多只能上传8张。
          </div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogFormVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 修改 主/子负责人弹层 -->
    <ListWidget :tabType="listWidgetTabType" :emitType="listWidgetEmitType" :selects="listWidgetSelects"
      :radio="listWidgetRadio" :visible="listWidgetShow" @ackSelect="ackSelect" @listWidgetHide="listWidgetHide" />

  </div>
</template>

<script>
export default {
  name: "Details",
  data() {
    return {
      // 步骤条
      stepList: [
        {
          status: 'scuess',
          name: '测试',
          time: '2011-33-2 12.3'
        },
        {
          status: 'pending',
          name: '测试',
          time: '2011-33-2 12.3'
        },
        {
          status: 'error',
          name: '测试',
          time: '2011-33-2 12.3'
        },
        {
          status: '',
          name: '测试',
          time: '2011-33-2 12.3'
        },
      ],
      options: [{
        value: '选项1',
        label: '提交时段'
      }, {
        value: '选项2',
        label: '薪酬所属字段'
      }, {
        value: '选项3',
        label: '审批时段'
      }],
      // 查询表单
      queryForm: {
        name: '',
        sex: '',
        position_type: "",
        date: ''
      },
      // 表格数据 
      tableData: [],
      tableLoading: false,
      moveTreeData: [],
      moveTreeProps: {
        label: 'label',
        children: 'children'
      },
      // 审核不通过信息
      form: {
        textarea: '',
        img: ''
      },
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,
      // 弹出审核不通过弹层
      dialogFormVisible: false,
      // ListWidget 组件相关数据
      listWidgetShow: false,
      listWidgetRadio: false,
      listWidgetEmitType: "",
      listWidgetTabType: "",
      listWidgetSelects: [],
    }
  },
  methods: {
    // 审核通过
    approved() {
      this.$confirm(`<strong>您确定通过吗?</strong><br /><span style="color: red;">提示：一旦确认通过就不可再修改，请谨慎操作！</span>`, '确定通过', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        dangerouslyUseHTMLString: true,
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '通过成功!'
        });
        this.$router.push({
          path: 'payAdminCheckGrant',
          query: { activeName: 'second' }
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '通过失败!'
        });
      });
    },
    openSave() {
      // dialog
    },
    // 审核不通过
    openRefuse() {
      this.dialogFormVisible = true;
    },
    // 不通过上传
    handleRemove(file) {
      console.log(file);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleDownload(file) {
      console.log(file);
    },
    // 部门 弹层
    dialogListWidget(data, radio = false, emitType) {
      // 移动部门
      this.listWidgetSelects = [];
      //   this.moveForm.we_id = data.we_id;
      this.listWidgetTabType = "部门";

      this.listWidgetShow = true;
      this.listWidgetRadio = radio;
      this.listWidgetEmitType = emitType;
    },
    // 部门弹层 确定
    ackSelect(data) {
      let { emitType, visible, selects } = data;
      this.listWidgetShow = visible;
      this.listWidgetSelects = selects;
      // 切换部门
      //   this.queryListWidget.query_master.name = selects.map(i => i.we_name).join(",");
      //   this.queryListWidget.query_master.id = selects.map(i => i.id).join(",");
      //   this.queryForm.master_id = this.queryListWidget.query_master.id;
      this.queryForm.to_we_id = selects.map(i => i.id).join(",");
      this.search();
    },
    // 部门弹层 隐藏
    listWidgetHide(visible) {
      this.listWidgetShow = visible;
    },
  }
}
</script>

<style lang="less" scoped>
.main-box {
  .step-top {
    margin: 24px;
    padding: 16px 54px;
    background: #FAFAFA;
    display: flex;

    .step-top-list-last {
      flex: none !important;
      flex-basis: 140px !important;
    }

    .step-top-list {
      flex: 1;
      position: relative;

      .step-line {
        flex: 1;
        margin: 0 10px;
        height: 1px;
        background: #D9D9D9;
      }

      .step-list-item {
        display: flex;
        align-items: center;

        .step-list-item-status {
          font-size: 16px;
          font-weight: 500;
          display: flex;

          span {
            display: flex;
            align-items: center;
            justify-content: center;
            margin-left: 10px;
          }
        }

        .step-list-item-scuess {
          font-weight: 400;
          color: #434343;
          font-family: PingFangSC-Regular, PingFang SC;
        }

        .step-list-item-pending {
          font-weight: 400;
          color: #595959;
          font-family: PingFangSC-Medium, PingFang SC;
        }

        .step-list-item-defalut {
          color: #262626;
          font-family: PingFangSC-Regular, PingFang SC;
        }

        .step-list-item-error {
          color: #FF4D4F;
          font-family: PingFangSC-Medium, PingFang SC;
        }

        img {
          width: 32px;
          height: 32px;
        }

        .step-list-item-status-radius-none {
          border: 1px solid #D9D9D9;
          width: 32px;
          height: 32px;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 50%;
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #BFBFBF;
        }

        .step-list-item-status-radius {
          width: 32px;
          height: 32px;
          background: #1AAC88;
          color: white;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 50%;
        }
      }

      .step-list-text {
        padding-left: 42px;

        .step-list-text-name {
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #8C8C8C;
          margin: 4px 0;
        }

        .step-list-text-time {
          font-size: 12px;
          font-family: HelveticaNeue;
          color: #8C8C8C;
        }
      }
    }
  }

  .query-form {
    padding: 0 24px;

    .demo-form-inline {
      display: flex;
      flex-wrap: wrap;

      .form-input {
        width: 15%;

        /deep/.el-form-item__content {
          width: 100%;
        }
      }
    }

    .form-select-merge {
      display: flex;
      width: calc(31% + 5px);

      /deep/.el-form--inline .el-form-item {
        margin-right: 0 !important;
      }

      /deep/.el-date-editor .el-range-separator {
        width: 8% !important;
      }

      /deep/.el-select .el-input__inner {
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
        border-right: none;
      }

      /deep/ .el-input__inner:nth-last-child(1) {
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
      }
    }

  }

  .table-title {
    display: flex;
    padding: 12px 16px;

    .table-title-item {
      padding: 4px 8px;
      font-size: 12px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #1F1F1F;
      border-radius: 3px;
      margin-right: 10px;

      span {
        color: #8C8C8C;
      }
    }

    .table-title-item:hover {
      background: #F0F0F0;
      cursor: pointer;
    }
  }

  .upload {
    .upload-content {
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .upload-tip {
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #8C8C8C;
    }

    /deep/ .el-upload--picture-card {
      width: 104px;
      height: 104px;
    }

    /deep/ .el-upload-list__item {
      width: 104px;
      height: 104px;

      div {
        height: 100%;
      }
    }
  }
}
</style>
