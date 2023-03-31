
<template>
  <div class="main-box">
    <!-- 页头 -->
    <HeadLine goback>离职详情</HeadLine>

    <!-- 内容区 -->
    <div style="padding: 24px 48px">
      <div class="staff_care_title">离职状态</div>
      <el-row>
        <el-col :span="8">
          <div class="item">
            <div class="item_label">离职状态：</div>
            <div class="item_text">{{ $vj(quitInfoData.status_data, 'status_desc') }}</div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="item">
            <div class="item_label">撤销原因：</div>
            <div class="item_text">{{ $vj(quitInfoData.status_data, 'revoke_reason') }}</div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="item">
            <div class="item_label">发起人：</div>
            <div class="item_text">{{ $vj(quitInfoData.status_data, 'creator_name') }}</div>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <div class="item">
            <div class="item_label">发起时间：</div>
            <div class="item_text">{{ $vj(quitInfoData.status_data, 'initiation_time_desc') }}</div>
          </div>
        </el-col>
      </el-row>

      <div class="staff_care_title">离职信息</div>
      <div class="staffing">
        <div class="item" v-for="item in dimissionInforFormDict" :key="item.key">
          <div class="item_label">{{ item.title }}：</div>
          <div class="item_text">{{ $vj(quitInfoData.info_date, `${item.key}.text`) }}</div>
        </div>
      </div>

      <div class="staff_care_title">离职事项 <el-button type="text" icon="el-icon-edit" v-if="!discharge_matters_edit" @click="formData_edit">编辑</el-button></div>
      <el-row v-if="!discharge_matters_edit">
        <el-col :span="8">
          <div class="item">
            <div class="item_label">社保减员月：</div>
            <div class="item_text">{{ $vj(quitInfoData.matter_date, 'social_security_reduction_time_desc') }}</div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="item">
            <div class="item_label">工资结算日：</div>
            <div class="item_text">{{ $vj(quitInfoData.matter_date, 'payroll_settlement_time_desc') }}</div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="item">
            <div class="item_label">一次性补偿金：</div>
            <div class="item_text">{{ $vj(quitInfoData.matter_date, 'compensate_money') }}</div>
          </div>
        </el-col>
      </el-row>
      <el-row v-if="!discharge_matters_edit">
        <el-col :span="8">
          <div class="item">
            <div class="item_label">复聘建议：</div>
            <div class="item_text">{{ $vj(quitInfoData.matter_date, 'multiplex_type') }}</div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="item">
            <div class="item_label">复聘建议原因：</div>
            <div class="item_text">{{ $vj(quitInfoData.matter_date, 'multiplex_reason') }}</div>
          </div>
        </el-col>
      </el-row>

      <div class="discharge_matters" v-if="discharge_matters_edit">
        <el-form ref="formData" :rules="formDataRules" :model="formData" label-width="130px" size="small">
          <div class="staffing">
            <el-form-item label="社保减员月：">
              <el-select v-model="formData.social_security_reduction_time" :style="input_style" placeholder="请选择社保减员月">
                <el-option v-for="item in 12" :key="item" :label="item" :value="item"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="工资结算日：">
                <el-date-picker
                v-model="formData.payroll_settlement_time"
                type="date"
                placeholder="请选择工资结算日"
                value-format="yyyy-MM-dd"
                :style="input_style">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="一次性补偿金：" prop="compensate_money">
                <el-input v-model="formData.compensate_money" placeholder="请输入一次性补偿金" :style="input_style"></el-input>
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
          <el-form-item label="">
            <div class="btns">
              <el-button size="small" @click="discharge_matters_edit = false">取消</el-button>
              <el-button size="small" type="primary" @click="formData_submit('formData')">保存</el-button>
            </div>
          </el-form-item>
        </el-form>
      </div>
      

      <div class="staff_care_title">离职审批</div>
      <el-row>
        <el-col :span="5">
          <div class="item">
            <div class="item_label">离职审批单：</div>
            <div class="item_text odd">{{ $vj(quitInfoData.flow_data, 'flow_id') }}</div>
          </div>
        </el-col>
        <el-col :span="6">
        </el-col>
      </el-row>

      <!-- <div class="staff_care_title">离职交接</div>
      <el-row>
        <el-col :span="8">
          <div class="item">
            <div class="item_label">交接人：</div>
            <div class="item_text">{{ $vj(quitInfoData.flow_data, 'flow_id') }}</div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="item">
            <div class="item_label">交接日期：</div>
            <div class="item_text">{{ $vj(quitInfoData.flow_data, 'flow_id') }}</div>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <div class="item">
            <div class="item_label">交接文件：</div>
            <div class="item_text">
              <div>这里是文件名称.pdf</div>
            </div>
          </div>
        </el-col>
      </el-row> -->
    </div>
  </div>
</template>

<script>
import { dictFormData } from "@/api/hrm/staff/index";
import { quitInfo, quitEdit } from "@/api/hrm/dimission/index";
import { setMoreInputI_item } from "@/utils/utils"

export default {
  name: "dimissionInfor",
  props: {},
  data () {
    let validate_compensate_money = (rule, value, callback) => {
      if (value !== '' && (Number.isNaN(value*1) || !/(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/.test(value))) {
        callback(new Error('最多两位小数'));
      } else {
        callback();
      }
    };
    return {
      id: this.$route.query.id,
      // 详情信息
      dimissionInforFormDict: [],
      quitInfoData: {},

      // 离职事项 提交数据
      discharge_matters_edit: false,
      input_style: {width: '200px'},
      formData: {
        social_security_reduction_time: '',
        payroll_settlement_time: '',
        compensate_money: '',
        multiplex_type: '0',
        multiplex_reason: '',
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
    }
  },
  async created () {
    await this.getDictFormData();
    await this.getQuitInfo();
  },
  methods: {
    // 获取字典列表
    async getDictFormData() {
      await dictFormData().then(res => {
        // 转正表单字典项
        this.dimissionInforFormDict = setMoreInputI_item(res.data.filter(i => i.type === '6')[0].dict);
      })
    },
    // 获取离职详情
    async getQuitInfo() {
      await quitInfo({id: this.id}).then(res => {
        this.quitInfoData = res.data;
      })
    },
    // 离职事项 编辑
    formData_edit() {
      this.discharge_matters_edit = true;
    },
    // 离职事项 保存
    formData_submit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let data = {id:this.id, ...this.formData};
          quitEdit(data).then(res => {
            this.$message({
              showClose: true,
              message: res.errmsg,
              type: 'success'
            });
            this.discharge_matters_edit = false;
            this.getQuitInfo();
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
  },
}
</script>

<style scoped lang="less">
.staff_care_title {
  font-size: 16px;
  font-weight: 500;
  color: #262626;
  padding-left: 16px;
  margin: 16px 0;
  position: relative;
}
.staff_care_title:nth-child(1){
  margin-top: 0;
}
.staff_care_title::before {
    content: '';
    display: inline-block;
    width: 2px;
    height: 14px;
    background: #1AAC88;
    border-radius: 2px 2px 0px 0px;
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
}
.item {
  min-height: 32px;
  margin-bottom: 8px;
  display: flex;
  .item_label {
    width: 120px;
    text-align: right;
    font-size: 14px;
    font-weight: 400;
    color: #8C8C8C;
  }
  .item_text {
    font-size: 14px;
    font-weight: 400;
    color: #1F1F1F;
  }
  .odd, .download{
    color: #1AAC88;
  }
  .download {
    cursor: pointer;
  }
}

.staffing {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 24px;
}
.item {
  margin-bottom: 8px;
  display: flex;
  .item_label {
    min-width: 120px;
    text-align: right;
    font-size: 14px;
    font-weight: 400;
    color: #8C8C8C;
  }
  .item_text {
    font-size: 14px;
    font-weight: 400;
    color: #1F1F1F;
  }
  .odd, .download{
    color: #1AAC88;
  }
  .download {
    cursor: pointer;
  }
}

.discharge_matters {
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
</style>
