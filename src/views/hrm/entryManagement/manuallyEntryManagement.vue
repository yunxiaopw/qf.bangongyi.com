<template>
  <div class="main-box">
    <!-- 页头 -->
    <HeadLine goback>新增待入职员工</HeadLine>

    <!-- 表单区域 -->
    <div class="main-content">
        <el-form ref="formData" :rules="formDataRules" :model="formData" size="small" label-width="200px">
            <el-row :gutter="20">
                <el-col :span="10">
                    <el-form-item label="姓名：" prop="we_name">
                        <el-input v-model="formData.we_name" placeholder="请输入姓名"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                    <el-form-item label="微信：" prop="we_weixinid">
                        <el-input v-model="formData.we_weixinid" placeholder="请输入微信号"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="10">
                    <el-form-item label="手机号码：" prop="we_mobile">
                        <el-input v-model="formData.we_mobile" placeholder="请输入手机号码"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                    <el-form-item label="邮箱：" prop="we_email">
                        <el-input v-model="formData.we_email" placeholder="请输入邮箱号"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="10">
                    <el-form-item label="部门：" prop="we_department">
                        <MoreInput
                            :i_item="{
                              type: 'department_widget',
                              form_item_type: '部门',
                              form_item_radio: false,
                              v_model_type: 'String',
                            }"
                            :v-model.sync="formData.we_department" 
                        />
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                    <el-form-item label="主部门：" prop="master_we_department">
                        <MoreInput
                            :i_item="{
                              type: 'department_widget',
                              form_item_type: '部门',
                              form_item_radio: true,
                              v_model_type: 'String',
                            }"
                            :v-model.sync="formData.master_we_department"
                        />
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="10">
                    <el-form-item label="岗位：" prop="position_id">
                        <MoreInput
                            :i_item="{type: 'position_widget'}"
                            v-model="formData.position_id"
                            @change="positionSelectChange"
                        />
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                    <el-form-item label="职级：" prop="rank_id">
                        <MoreInput
                            :i_item="{type: 'rankLevel_widget'}"
                            :disabled="!formData.position_id || formData.position_id===''"
                            :position_id="position_id"
                            v-model="formData.rank_id"
                        />
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="10">
                    <el-form-item label="入职时间：" prop="entry_time">
                        <el-date-picker
                        style="width: 100%"
                        v-model="formData.entry_time"
                        type="date"
                        placeholder="请选计划入职时间"
                        value-format="yyyy-MM-dd">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                    <el-form-item label="用工类型：" prop="work_type">
                        <el-select style="width: 100%" v-model="formData.work_type" placeholder="请选择用工类型">
                            <el-option v-for="(item, key) in work_type_options" :key="key" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="10">
                    <el-form-item label="简历：">
                        <MoreInput
                            :i_item="{type: 'file'}"
                            v-model="formData.contract_file"
                        />
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>

        <div class="form-footer">
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
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { inductionRegister, inductionDetails } from "@/api/hrm/entryManagement";

export default {
  name: "manuallyEntryManagement",
  data() {
    return {
      id: null,
      formData: {
        we_name: '',
        we_mobile: '',
        we_weixinid: '',
        we_email: '',
        we_department: '',
        master_we_department: '',
        position_id: '',
        rank_id: '',
        entry_time: '',
        work_type: '',
        contract_file: '',
        is_repeat_hire: false,
        is_retain_data: false,
      },
      formDataRules: {
          we_name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
          we_email: [{ type: 'email', message: '请输入正确的邮箱', trigger: 'blur' }],
          we_mobile: [{ required: true, message: '请输入手机号', trigger: 'blur' }],
          entry_time: [{ required: true, message: '请选择入职时间', trigger: 'change' }],
      },
      work_type_options: [
        {label:'全职', value:'1'},
        {label:'兼职', value:'2'},
        {label:'实习生', value:'3'},
        {label:'劳务派遣', value:'4'},
      ],
      position_id: '',

      //  提示弹层相关
      hintDialog: false,
      hintDialogText: '',
      isSetInfor: false,

    };
  },
  async created() {
    this.id = this.$route.query.id ? this.$route.query.id : null;
    if(this.id) {
        await this.getInductionDetails(this.id);
    }
  },
  methods: {
    // 入职人员信息获取（手动、重复录用、办理入职）使用
    async getInductionDetails(id) {
      await inductionDetails({id}).then(res => {
          if(res.errno === 0) {
              this.formData = Object.assign(this.formData, res.data);
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
    // 员工信息修改 岗位选框触发
    positionSelectChange(val) {
        this.formData.rank_id = '';
        this.position_id = val;
    },
    // 保存
    submit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
            inductionRegister(this.formData).then(res => {
                if(res.errno === 0) {
                    this.$message({
                        showClose: true,
                        message: res.errmsg,
                        type: 'success'
                    });
                    this.hintDialog = false;
                    setTimeout(() => {
                        this.goBack();
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
        inductionRegister(this.formData).then(res => {
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
    // 返回
    goBack() {
      this.$router.back();
    },
  },
};
</script>

<style lang='less' scoped>
.main-content {
    width: 80%;
    margin: auto;
    padding: 24px 0;
    .form-footer {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding-top: 34px;
        .btns {
            margin-top: 16px;
        }
    }
    /deep/.el-form-item__content {
        display: inherit !important;
    }
    /deep/.el-form-item__label {
        display: inherit !important;
    }
    /deep/.btns {
        .el-button {
            display: inline-block !important;
        }
    }
}

// 弹层样式
.dialog {
  /deep/.el-dialog__header {
    height: 48px;
    padding: 12px 24px 12px;
    border-bottom: 1px solid #f0f0f0;
    .el-dialog__title {
      font-size: 16px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #000000;
    }
    .el-dialog__headerbtn {
      top: 12px;
    }
  }
  /deep/.el-dialog__body {
    padding: 24px;
  }
  /deep/.el-dialog__footer {
    height: 52px;
    border-top: 1px solid #f0f0f0;
    padding: 10px 24px;
  }
}

</style>