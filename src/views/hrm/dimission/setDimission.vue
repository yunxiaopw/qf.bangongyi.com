<template>
  <div class="main-box">
    <!-- 页头 -->
    <HeadLine goback>办理离职</HeadLine>

    <!-- 表单区域 -->
    <div class="main_content">
      <el-form ref="formData" :rules="formDataRules" :model="formData" label-width="130px" size="small">
        <!-- 离职信息 -->
        <div class="main_content_item">
            <div class="main_content_head">离职信息</div>
            
            <div class="staffing">
                <el-form-item v-for="item in setDimissionForms" :key="item.key" :label="item.title+'：'" :prop="item.key" :class="item.type==='textarea'?'grid_column_all':''">
                    <MoreInput v-if="vifMoreInputFuc(item.type)" :i_item="item" :v-model.sync="formData[item.key]" />
                    <MoreInput v-else :i_item="item" v-model="formData[item.key]" />
                </el-form-item>
            </div>

            <el-form-item label="生效方式：">
              <el-radio-group v-model="formData.effective_mode">
                <el-radio label="1">立即转为待离职状态，到指定日期自动离职</el-radio>
                <el-radio label="2">发起离职审批，通过后转为待离职状态</el-radio>
              </el-radio-group>
            </el-form-item>
            <!-- <el-form-item label="审批表单：">
                <el-button type="text" @click="goRouter('/staffFormConfiguration', '6')">去配置<i class="el-icon-arrow-right el-icon--right"></i></el-button>
            </el-form-item> -->
            <el-row>
              <el-col :span="8">
                <el-form-item label="审批流程：">
                  <el-select v-model="formData.remindFormData" placeholder="请选择审批流程" style="width: 100%">
                    <el-option
                      v-for="item in [{label:'aa', value:'1'}]"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
        </div>

        <!-- 离职事项 -->
        <div class="main_content_item">
          <div class="main_content_head">离职事项</div>
          <div class="staffing">
            <el-form-item label="社保减员月：">
              <el-select v-model="formData.social_security_reduction_time" style="width: 100%" placeholder="请选择社保减员月">
                <el-option v-for="item in 12" :key="item" :label="item" :value="item"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="工资结算日：">
                <el-date-picker
                v-model="formData.payroll_settlement_time"
                type="date"
                placeholder="请选择工资结算日"
                value-format="yyyy-MM-dd"
                style="width: 100%">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="一次性补偿金：" prop="compensate_money">
                <el-input v-model="formData.compensate_money" placeholder="请输入一次性补偿金"></el-input>
            </el-form-item>
          </div>
          <el-form-item label="复聘建议：">
              <el-radio-group v-model="formData.multiplex_type">
                  <el-radio v-for="item in multiplex_type_options" :key="item.value" :label="item.value">{{item.label}}</el-radio>
              </el-radio-group>
          </el-form-item>
          <el-form-item label="">
            <el-input type="textarea" v-model="formData.multiplex_reason" :autosize="{ minRows: 5, maxRows: 5}" maxlength="200" placeholder="输入建议原因"></el-input>
          </el-form-item>
        </div>
      </el-form>
    </div>

    <!-- 底部按钮 -->
    <div class="bottom_btns">
        <el-button size="small" @click="$router.back()">取消</el-button>
        <el-button size="small" type="primary" @click="submit('formData')">保存</el-button>
    </div>

  </div>
</template>

<script>
import { dictFormData } from "@/api/hrm/staff/index";
import { quitApply } from "@/api/hrm/dimission/index";
import { setMoreInputI_item, vifMoreInput, setFormDataRules } from "@/utils/utils";

export default {
  name: "setDimission",
  data() {
    let validate_compensate_money = (rule, value, callback) => {
      if (value !== '' && (Number.isNaN(value*1) || !/(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/.test(value))) {
        callback(new Error('最多两位小数'));
      } else {
        callback();
      }
    };
    return {
      // 办理离职 提交数据
      formData: {
        remark: '',
        social_security_reduction_time: '',
        payroll_settlement_time: '',
        compensate_money: '',
        multiplex_type: '0',
        multiplex_reason: '',
        effective_mode: '1',
      },
      formDataRules: {
        compensate_money: [{validator:validate_compensate_money, trigger:'blur'}],
      },
      // 复聘类型 可选项
      multiplex_type_options: [
        {label:'无',value:'0'},
        {label:'推荐复聘',value:'1'},
        {label:'永不复聘',value:'2'},
      ],

      // 办理离职 表单字典项
      setDimissionForms: [],
    };
  },
  async created() {
    await this.getDictFormData();
  },
  methods: {
    // 获取字典列表
    async getDictFormData() {
      await dictFormData().then(res => {
        // 办理离职 表单字典项
        this.setDimissionForms = setMoreInputI_item(res.data.filter(i => i.type === '6')[0].dict);
        // 添加对应表单校验项
        this.formDataRules = {...this.formDataRules, ...setFormDataRules(this.setDimissionForms)};
      })
    },
    // MoreInput组件部分组件区分
    vifMoreInputFuc(type) {
        return vifMoreInput(type)
    },
    // 保存
    submit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let data = JSON.parse(JSON.stringify(this.formData));
          data.staff = data.staff.map(i => i.id).join(",");
          quitApply(data).then(res => {
            this.$message({
              showClose: true,
              message: res.errmsg,
              type: 'success'
            });
            setTimeout(() => {
              this.$router.back();
            }, 500);
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
  },
};
</script>

<style lang='less' scoped>
.bottom_btns {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 55px;
    background: #FFFFFF;
    box-shadow: 0px 0px 4px 0px rgba(0,0,0,0.14);
    display: flex;
    justify-content: center;
    align-items: center;
}
.main_content {
    width: 100%;
    height: calc(100%-56px);
    overflow-y: auto;
    padding: 24px 24px 65px;
    .main_content_top {
        border: 1px solid #F0F0F0;
        border-radius: 2px;
        padding: 0 16px;
        .setup {
            margin-left: 12px;
            cursor: pointer;
            font-size: 13px;
            font-weight: 400;
            color: #1AAC88;
        }
    }

    .rules {
        font-size: 12px;
        font-weight: 400;
        color: #8C8C8C;
        margin-left: 6px;
    }
    
    // 表格内标题头
    .main_content_head {
        height: 54px;
        display: flex;
        align-items: center;
        padding: 16px 0;
        font-size: 16px;
        font-weight: 500;
        color: #262626;
        padding-left: 8px;
        position: relative;
    }
    .main_content_head::before {
        content: "";
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        display: inline-block;
        width: 2px;
        height: 14px;
        background: #1AAC88;
        border-radius: 2px 2px 0px 0px;
    }

    .main_content_item {
        border: 1px solid #F0F0F0;
        border-radius: 2px;
        padding: 0 16px 16px;
        .staffing {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            grid-column-gap: 24px;
            .grid_column_all {
              grid-column-start: span 3;
            }
        }
    }
    .main_content_item+.main_content_item {
        margin-top: 16px;

    }
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
.main_content::-webkit-scrollbar {
  display: none;
}

</style>