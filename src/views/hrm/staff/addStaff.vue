<template>
  <div class="main-box">
    <!-- 页头 -->
    <HeadLine goback>新增员工</HeadLine>

    <!-- 表单区域 -->
    <div class="main-content">
        <el-form ref="formData" :rules="formDataRules" :model="formData" size="small" label-width="200px">
            <el-row :gutter="20">
                <el-col :span="10">
                    <el-form-item label="姓名：" prop="we_name">
                        <el-input v-model="formData.we_name" autocomplete="off" clearable></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                    <el-form-item label="工号：" prop="workno">
                        <el-input v-model="formData.workno" autocomplete="off" clearable></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="10">
                    <el-form-item label="手机号：" prop="we_mobile">
                        <el-input v-model="formData.we_mobile" autocomplete="off" clearable></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                    <el-form-item label="邮箱：" prop="we_email">
                        <el-input v-model="formData.we_email" autocomplete="off" clearable></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="10">
                    <el-form-item label="微信：" prop="we_weixinid">
                        <el-input v-model="formData.we_weixinid" autocomplete="off" clearable></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                    <el-form-item label="部门：" prop="we_department">
                        <el-input style="width: 100%" v-model="queryListWidget.name" readonly placeholder="请选择部门" @focus="dialogListWidget(queryListWidget.name, false, 'move_department')">
                        </el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="10">
                <el-form-item label="主部门：" prop="master_we_department">
                  <MoreInput
                    :i_item="{
                      type: 'department_widget',
                      form_item_type: '部门',
                      form_item_radio: true,
                      v_model_type: 'String',
                      widget_ids:formData.master_we_department,
                    }"
                    :v-model.sync="formData.master_we_department"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="10">
                  <el-form-item label="岗位：" prop="position_id">
                      <MoreInput
                          :i_item="{type: 'position_widget'}"
                          v-model="formData.position_id"
                          @change="positionSelectChange"
                          placeholder="请选择岗位"
                          clearable
                      />
                  </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="10">
                    <el-form-item label="职级：" prop="rank_id">
                      <MoreInput
                          :i_item="{type: 'rankLevel_widget'}"
                          :disabled="!formData.position_id || formData.position_id===''"
                          :position_id="position_id"
                          v-model="formData.rank_id"
                          placeholder="请选择职级"
                          clearable
                      />
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                    <el-form-item label="入职时间：" prop="entry_time">
                        <el-date-picker
                        style="width: 100%"
                        v-model="formData.entry_time"
                        type="date"
                        placeholder="请选择入职时间"
                        value-format="yyyy-MM-dd">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="10">
                    <el-form-item label="转正时间：" prop="positive_time">
                        <el-date-picker
                        style="width: 100%"
                        v-model="formData.positive_time"
                        type="date"
                        placeholder="请选择转正时间"
                        value-format="yyyy-MM-dd">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                    <el-form-item label="用工类型：" prop="type">
                        <el-select style="width: 100%" v-model="formData.type" placeholder="请选择用工类型" clearable>
                            <el-option v-for="item in typeOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="10">
                    <el-form-item label="人事状态：" prop="status">
                        <el-select style="width: 100%" v-model="formData.status" placeholder="请选择人事状态" clearable>
                            <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                    <el-form-item label="员工账号：" prop="we_userid">
                        <el-input v-model="formData.we_userid" autocomplete="off" clearable></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="10">
                    <el-form-item label="编制：" prop="is_formal" v-if="authorized === 2 && formData.type === '3'">
                        <el-select style="width: 100%" v-model="formData.is_formal" placeholder="请选择编制" clearable>
                            <el-option v-for="item in is_formalOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>

        <div class="form-footer">
            <el-checkbox v-if="Isshowinvitation" v-model="we_invite">邀请加入企业微信</el-checkbox>
            <div class="btns"> 
                <el-button size="small" type="primary" @click="submit('formData')">保存</el-button>
                <el-button size="small" @click="$router.back()">取消</el-button>
            </div>
        </div>
    </div>

    <!-- 提示弹层 -->
    <el-dialog
      class="dialog"
      title="提示"
      width="480px"
      :visible.sync="hintDialog"
      destroy-on-close
    >
        <div class="content">
            <div class="title">{{ hintDialogText }}</div>
            <el-checkbox v-if="isSetInfor" v-model="formData.is_retain_data">保留取消入职前录入的个人信息和入职记录</el-checkbox>
        </div>

      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="hintDialog = false">取消</el-button>
        <el-button size="small" type="primary" @click="re_hire">重新录用</el-button>
        <el-button size="small" type="primary" @click="goRouter('/entryManagement', formData.we_mobile)">前往办理</el-button>
      </div>
    </el-dialog>

    <!-- 修改 主/子负责人弹层 -->
    <ListWidget :tabType="listWidgetTabType" :emitType="listWidgetEmitType" :selects="listWidgetSelects" :radio="listWidgetRadio" :visible="listWidgetShow" @ackSelect="ackSelect" @listWidgetHide="listWidgetHide" />

  </div>
</template>

<script>
import { authorizedSetting, staffCreate, isshowinvitation } from "@/api/hrm/staff/addStaff";

export default {
  name: "addStaff",
  data() {
    return {
      Isshowinvitation: false,
      // 查询入参
      formData: {
        we_name: '',
        we_userid: '',
        workno: '',
        we_mobile: '',
        we_email: '',
        we_weixinid: '',
        we_department: '',
        master_we_department: '',
        position_id: '',
        rank_id: '',
        entry_time: '',
        positive_time: '',
        type: '',
        is_formal: '',
        status: '',
        type: '',
        we_invite: 0,
      },
      we_invite: 0,
      formDataRules: {
          we_name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
          we_userid: [{ required: true, message: '请输入员工账号', trigger: 'blur' }],
          we_email: [{ type: 'email', message: '请输入正确的邮箱', trigger: 'blur' }],
          we_mobile: [
            { required: true, message: '请输入手机号码', trigger: 'blur' },
            { validator: this.$elRules.mobile, trigger: 'blur' },
          ],
          we_department: [{ required: true, message: '请选择部门', trigger: 'change' }],
          master_we_department: [{ required: true, message: '请选择主部门', trigger: 'change' }],
          position_id: [{ required: true, message: '请选择岗位', trigger: 'change' }],
          entry_time: [{ required: true, message: '请选择入职时间', trigger: 'blur' }],
          type: [{ required: true, message: '请选择用工类型', trigger: 'change' }],
          status: [{ required: true, message: '请选择人事状态', trigger: 'change' }],
          is_formal: [{ required: true, message: '请选择编制', trigger: 'change' }],
      },
      // 编制选项 是否显示
      authorized: 0,
      // 岗位 相关
      position_id: '',
      // 用工类型 可选项
      typeOptions: [
        {label: '全职', value: '1'},
        {label: '兼职', value: '2'},
        {label: '实习', value: '3'},
        {label: '劳务派遣', value: '4'},
        {label: '劳务外包', value: '5'},
        {label: '小时工', value: '6'},
        {label: '临时工', value: '7'},
      ],
      // 人事状态 可选项
      statusOptions: [
        {label: '转正', value: '0'},
        {label: '试用', value: '1'},
        {label: '兼职', value: '2'},
      ],
      // 编制 可选项
      is_formalOptions: [
        {label: '非正式编制', value: '0'},
        {label: '正式编制', value: '1'},
      ],
      // 获取部门 展示文本信息
      queryListWidget: {
        name: "",
      },
      // ListWidget 组件相关数据
      listWidgetShow: false,
      listWidgetRadio: false,
      listWidgetEmitType: "",
      listWidgetTabType: "",
      listWidgetSelects: [],

      //  提示弹层相关
      hintDialog: false,
      hintDialogText: '',
      isSetInfor: false,
    };
  },
  async created() { 
    await this.getIsshowinvitation();
    this.getAuthorizedSetting();
  },
  methods: {
    async getIsshowinvitation() {
      await isshowinvitation().then(res => {
        this.Isshowinvitation =  res.data.Isshowinvitation;
      })
    },
    // 新增时的 编制选项 是否显示
    getAuthorizedSetting() {
        authorizedSetting().then(res => {
            this.authorized = res.data.authorized;
        })
    },
    // 员工信息修改 岗位选框触发
    positionSelectChange(val) {
        this.position_id = val;
    },
    // 保存
    submit(formName) {
      this.formData.we_invite = this.we_invite ? 1 : 0;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          staffCreate(this.formData).then(res => {
            if(res.errno===0) {
              this.$message({
                showClose: true,
                message: res.errmsg,
                type: 'success'
              });
              setTimeout(() => {
                this.$router.push({path:'/staffInfo', query:{id:res.data.id}})
              }, 500);
            }else if(res.errno === 8531){
              this.isSetInfor = false;
              this.hintDialogText = res.errmsg;
              this.hintDialog = true;
            }else if(res.errno === 8118){
              this.isSetInfor = true;
              this.hintDialogText = res.errmsg;
              this.hintDialog = true;
            }else{ 
              this.$message({
                showClose: true,
                message: res.errmsg,
                type: 'error'
              });
            }
          }).catch((error) => {
            this.$message({
              showClose: true,
              message: error.errmsg,
              type: 'error'
            });
          })
        } else {
          return false;
        }
      });
    },
    // 重新录用
    re_hire() {
        this.formData.is_repeat_hire = true;
        staffCreate(this.formData).then(res => {
            if(res.errno === 0) {
                this.$message({
                    showClose: true,
                    message: res.errmsg,
                    type: 'success'
                });
                setTimeout(() => {
                    this.goBack();
                }, 500);
            }else{
                this.$message({
                    showClose: true,
                    message: res.errmsg,
                    type: 'error'
                });
            }
        }).catch((error) => {
            this.$message({
                showClose: true,
                message: error.errmsg,
                type: 'error'
            });
        })
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
      this.queryListWidget.name = selects.map(i => i.we_name).join(",");
    //   this.queryListWidget.query_master.id = selects.map(i => i.id).join(",");
    //   this.queryForm.master_id = this.queryListWidget.query_master.id;
      this.formData.we_department = selects.map(i => i.id).join(",");
    },
    // 部门弹层 隐藏
    listWidgetHide(visible){
      this.listWidgetShow = visible;
    },
    // 路由页面跳转
    goRouter(path, we_mobile) {
      this.$router.push({ path, query: { we_mobile } });
    },
  },
};
</script>

<style lang='less' scoped>
.main-content {
    width: 80%;
    margin: auto;
    padding: 24px 0;
    /deep/.el-form-item__label {
      display: block !important;
    }
    /deep/.el-form-item__content {
      display: block !important;
    }
    .form-footer {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding-top: 34px;
        .btns {
            margin-top: 16px;
            .el-button {
                display: inline-block;
            }
        }
    }
}

</style>