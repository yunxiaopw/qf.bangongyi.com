
<template>
  <div class="main-box">
    <!-- 页头 -->
    <HeadLine goback>办理异动</HeadLine>

    <!-- 表单区 -->
    <div class="form_box">
      <el-form :model="dataForm" :rules="dataRules" ref="dataForm" label-width="150px" size="small">
        <el-row>
          <el-col :span="8">
            <el-form-item label="异动员工：" prop="staff">
              <el-input v-model="queryListWidget.name" readonly :style="el_select_style" placeholder="请选择异动员工" @focus="dialogListWidget(queryListWidget)"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="异动类型：" prop="operation_type">
              <el-select v-model="dataForm.operation_type" placeholder="请选择异动类型" :style="el_select_style">
                <el-option v-for="item in tadjustType_options" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="异动生效时间：" prop="operation_time">
              <el-date-picker type="date" placeholder="请选择异动生效时间：" v-model="dataForm.operation_time" value-format="yyyy-MM-dd" :style="el_select_style" :picker-options="pickerOptions"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="异动原因：" prop="operation_reason">
          <el-input type="textarea" v-model="dataForm.operation_reason" maxlength="200" :autosize="{ minRows: 4, maxRows: 4}" placeholder="请输入" style="width: 621px;"></el-input>
        </el-form-item>
        <el-form-item label="备注：" prop="desc">
          <el-input type="textarea" v-model="dataForm.remark" maxlength="200" :autosize="{ minRows: 4, maxRows: 4}" placeholder="请输入" style="width: 621px;"></el-input>
        </el-form-item>

        <div class="main_content_head">人事信息变更</div>
        <el-form-item label="">
          <div class="approval_infor flex">
            <div class="old_dict" v-if="listWidgetRadio">
              <el-form-item v-for="item in old_dict" :key="item.key" :label="item.title+'：'">
                  <MoreInput v-if="vifMoreInputFuc(item.type)&&old_data[item.key]" :i_item="item" :v-model.sync="old_data[item.key].text" />
                  <MoreInput v-else-if="old_data[item.key]" :i_item="item" v-model="old_data[item.key].text" />
              </el-form-item>
            </div>
            <div class="new_dict">
              <el-form-item v-for="item in new_dict" :key="item.key" :label="item.title+'：'" :prop="item.key">
                  <MoreInput v-if="vifMoreInputFuc(item.type)" :i_item="item" :v-model.sync="dataForm[item.key]" />
                  <MoreInput v-else :i_item="item" v-model="dataForm[item.key]" />
              </el-form-item>
            </div>
          </div>
        </el-form-item>

        <el-form-item label="异动方式：" prop="effective_mode">
          <el-radio-group v-model="dataForm.effective_mode">
            <el-radio label="1">指定日期直接生效</el-radio>
            <el-radio label="2">发起异动审批</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="">
          <div class="approval_infor">
            <!-- <div class="item">
              <div class="label">审批表单：</div>
              <el-button type="text" @click="goRouter('/staffFormConfiguration', '5')">去配置<i class="el-icon-arrow-right el-icon--right"></i></el-button>
            </div> -->
            <div class="item">
              <div class="label">审批流程：</div>
              <div class="item_input">
                <el-select v-model="dataForm.flow_id" placeholder="请选择审批流程" :style="el_select_style">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </div>
            </div>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button @click="$router.back()">取消</el-button>
          <el-button type="primary" @click="submitForm('dataForm')">保存</el-button>
        </el-form-item>
      </el-form>
    </div>

    <!-- 选人/部门 弹层 -->
    <NewListWidget 
    :tabType="listWidgetTabType" 
    :selects="listWidgetSelects" 
    :radio.sync="listWidgetRadio" 
    :visible.sync="listWidgetShow" 
    @ackSelect="ackSelect" />
    
  </div>
</template>

<script>
import { adjustType, adjustOriginal, adjustApply } from "@/api/hrm/transactedMode";
import { setMoreInputI_item, vifMoreInput, setFormDataRules } from "@/utils/utils";

export default {
  name: "soleTransactedMode",
  data () {
    return {
      // 页面form项 宽度
      el_select_style: {
        width: '240px'
      },
      // 表单数据
      dataForm: {
        staff: '',
        operation_type: '',
        operation_time: '',
        operation_reason: '',
        remark: '',
      },
      dataRules: {
        staff: [{required: true, message: '请选择异动员工', trigger: 'change' }],
        operation_type: [{required: true, message: '请选择异动类型', trigger: 'blur' }],
        operation_time: [{required: true, message: '请选择异动生效时间', trigger: 'blur' }],
      },
      // 异动前相关数据
      old_data: {},
      // 异动类型 可选项
      tadjustType_options: [],
      // 异动生效时间 最大可选日
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7;
        },
      },
      // 选人/部门 展示文本信息
      queryListWidget: {
        name: "",
        id: "",
      },
      // 异动表单项
      old_dict: [],
      new_dict: [],
      // ListWidget 组件相关数据
      listWidgetShow: false,
      listWidgetRadio: false,
      listWidgetTabType: "",
      listWidgetSelects: [],
    }
  },
  created () {
    this.listWidgetRadio = this.$route.query.listWidgetRadio === 'true';
    this.getAdjustType();
  },
  methods: {
    // 选人/部门 弹层
    dialogListWidget(data) {
      let we_names = data.name.split(',').filter(i=> i && i.trim());
      this.listWidgetSelects = data.id.split(',').filter(i=> i && i.trim()).map((i, index) => (i = {id: i , we_name: we_names[index]}));
      this.listWidgetTabType = "成员";
      this.listWidgetShow = true;
    },
    // 选人/部门弹层 确定
    ackSelect(data) {
      let { selects } = data;
      this.queryListWidget.name = selects.map(i => i.we_name).join(",");
      this.queryListWidget.id = selects.map(i => i.id).join(",");
      this.dataForm.staff = selects.map(i => i.id).join(",");
      this.getAdjustOriginal(this.dataForm.staff);
    },
    // 获取异动表单项
    getAdjustOriginal(id) {
      adjustOriginal({id}).then(res => { 
        this.old_dict = setMoreInputI_item(res.data.old_dict);
        this.new_dict = setMoreInputI_item(res.data.new_dict);
        let fix_dict = setMoreInputI_item(res.data.fix_dict);

        // 添加对应表单校验项
        this.dataRules = {...this.dataRules, ...setFormDataRules(fix_dict), ...setFormDataRules(this.new_dict)};
        if(this.listWidgetRadio) {
          this.old_data = res.data.old_data;
        }
        setTimeout(()=> { this.$refs['dataForm'].clearValidate(); }, 10);
      })
    },
    // MoreInput组件部分组件区分
    vifMoreInputFuc(type) {
        return vifMoreInput(type)
    },

    // 获取异动类型
    getAdjustType() {
      adjustType().then(res => {
        this.tadjustType_options = res.data;
      })
    },
    // 保存
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let data = JSON.parse(JSON.stringify(this.dataForm));
          if(data.dept&&Array.isArray(data.dept)) data.dept = data.dept.map(i => i.id).join(",");
          if(data.lead_id&&Array.isArray(data.lead_id)) data.lead_id = data.lead_id.map(i => i.id).join(",");
          adjustApply(data).then(res => {
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
    goRouter(path, type = null) {
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
  height: calc(100%-56px);
  overflow-y: auto;
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
.form_box::-webkit-scrollbar {
  display: none;
}

.approval_infor {
  background: #F5F5F5;
  border-radius: 2px;
  padding: 16px 0;
  width: 800px;
  padding: 16px;
  .old_dict, .new_dict {
    width: 50%;
  }
  .old_dict {
    margin-right: 16px;
  }
  .item {
    display: flex;
  }
  .item+.item {
    margin-top: 16px;
  }
}
.flex {
  display: flex;
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
</style>
