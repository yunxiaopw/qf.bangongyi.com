
<template>
  <div class="main-box">
    <!-- 页头 -->
    <HeadLine goback>办理转正</HeadLine>

    <!-- 表单区 -->
    <div class="form_box">
      <el-form :model="dataForm" :rules="dataRules" ref="dataForm" label-width="150px" size="small">
        <div class="staffing">
            <el-form-item v-for="item in regularizationFormDict" :key="item.key" :label="item.title+'：'" :prop="item.key">
                <MoreInput v-if="vifMoreInputFuc(item.type)" :i_item="item" :v-model.sync="dataForm[item.key]" />
                <MoreInput v-else :i_item="item" v-model="dataForm[item.key]" />
            </el-form-item>
        </div>
            
        <el-form-item label="生效方式：" prop="effective_mode">
          <el-radio-group v-model="dataForm.effective_mode">
            <el-radio label="1">直接转正</el-radio>
            <el-radio label="2">发起转正审批</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="" v-if="dataForm.effective_mode === '2'">
          <div class="approval_infor">
            <!-- <div class="item">
              <div class="label">转正审批表单：</div>
              <el-button type="text" @click="goRouter('/staffFormConfiguration', '4')">去配置<i class="el-icon-arrow-right el-icon--right"></i></el-button>
            </div> -->
            <div class="item">
              <div class="label">转正审批流程：</div>
              <div class="item_input">
                <el-select v-model="dataForm.flow_id" placeholder="请选择转正审批流程" :style="el_select_style">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </div>
            </div>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button @click="goBack">取消</el-button>
          <el-button type="primary" @click="submitForm('dataForm')">保存</el-button>
        </el-form-item>
      </el-form>
    </div>
    
  </div>
</template>

<script>
import { dictFormData } from "@/api/hrm/staff/index";
import { correctsApply, correctsInfo } from "@/api/hrm/regularization";
import { setMoreInputI_item, vifMoreInput, setFormDataRules } from "@/utils/utils";

export default {
  name: "transactRegularization",
  data () {
    return {
      id: this.$route.query.id || '',
      // 页面下拉框宽度
      el_select_style: {
        width: '240px'
      },
      dataForm: {
        staff: '',
        staff_name: '',
        planned_time: '',
        effective_mode: '2',
      },
      dataRules: {},
      // 转正表单字典项
      regularizationFormDict: [],
    }
  },
  async created () {
    await this.getDictFormData();
    // await this.getCorrectsInfo();
    this.dataForm = {
      ...this.dataForm,
      ...JSON.parse(this.$route.query.infor),
    };
  },
  methods: {
    // 获取转正信息
    // async getCorrectsInfo() {
    //   await correctsInfo({id:this.id}).then(res => {
    //     this.dataForm = {
    //       ...this.dataForm,
    //       ...res.data.info,
    //     };
    //   })
    // },
    // 获取字典列表
    async getDictFormData() {
      await dictFormData().then(res => {
        // 转正表单字典项
        this.regularizationFormDict = setMoreInputI_item(res.data.filter(i => i.type === '4')[0].dict);
        
        // 添加对应表单校验项
        this.dataRules = setFormDataRules(this.regularizationFormDict);
      })
    },
    // MoreInput组件部分组件区分
    vifMoreInputFuc(type) {
        return vifMoreInput(type)
    },
    // 保存
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let data = JSON.parse(JSON.stringify(this.dataForm));
          data.staff = this.dataForm.id;
          delete data.id;
          correctsApply(data).then(res => {
            if(res.errno === 0) {
              this.$message({
                showClose: true,
                message: res.errmsg,
                type: 'success'
              });
              this.goBack();
            } else {
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
    // 路由页面跳转
    goRouter(path, type) {
      if (type !== null) {
        this.$router.push({ path, query: { type } });
      }else{
        this.$router.push({ path });
      }
    },
    // 返回
    goBack() {
      this.$router.back();
    },
  },
}
</script>

<style scoped lang="less">
.form_box {
  padding: 16px 24px;
  /deep/.el-form-item__label { 
      display: block !important;
  }
  /deep/.el-form-item__content {
      display: block !important;
  }
  /deep/.el-button {
    display: inline-block !important;
  }
}
.approval_infor {
  background: #F5F5F5;
  border-radius: 2px;
  padding: 16px 0;
  width: 621px;
  padding: 16px;
  .item {
    display: flex;
  }
  .item+.item {
    margin-top: 16px;
  }
}

.staffing {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 24px;
}
</style>
