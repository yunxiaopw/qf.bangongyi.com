<template>
   <div class="main-box">
     <HeadLine>
      职级管理
      <template #r-content>
        <div class="t-r-btn">
          <el-button size="small" @click="goRouter('/manageTheRankChannel')">管理职级通道</el-button>
          <el-button size="small" @click="dialogAll('level')">管理职等</el-button>
          <el-button size="small" @click="dialogAll('gradingRules')">定级计算规则</el-button>
        </div>
      </template>
    </HeadLine>

    <div class="tabel-top-box">
      <div class="left">
        <div>在职：<span>{{ rankCountData.total }}人</span></div>
        <div>已定级：<span>{{ `${rankCountData.has_rank || 0}人（${rankCountData.has_rank_percent || 0}%）` }}</span></div>
        <div>未定级：<span>{{ `${rankCountData.un_rank || 0}人（${rankCountData.un_rank_percent || 0}%）` }}</span></div>
      </div>
      <el-popover
        placement="bottom"
        width="200"
        trigger="click">
          <el-checkbox style="margin-bottom: 10px" v-model="showNum" label="显示定级人数"></el-checkbox>
          <el-checkbox v-model="showExplain" label="显示职级说明"></el-checkbox>
        <el-button size="small" slot="reference">显示设置</el-button>
      </el-popover>
    </div>

    <el-table
      :max-height="$el_table_max_height(56,56)"
      class="tabel-box"
      :data="tableData.rank_List"
      style="width: 100%"
      v-loading="tableLoading"
      :header-cell-style="{
        height: '44px',
        padding: '0',
        background: '#FAFAFA',
        color: '#8C8C8C',
        fontSize: '12px',
        fontFamily: 'PingFangSC-Medium, PingFang SC',
        fontWeight: '500',
      }"
      row-key="level"
    >
      <el-table-column prop="level" label="职等" fixed="left" width="100" align="center"></el-table-column>
      <el-table-column v-for="item in tableData.rank_type" :key="item.id" :prop="item.id" min-width="315">
        <template slot="header">
            <span>{{ item.title }}</span>
            <span v-show="showNum">{{ `${item.staff_count || 0}人（${item.percent || 0}%）` }}</span>
        </template>
        <template slot-scope="scope">
          <div class="td-box" v-if="tableData.rank_level[item.id] && tableData.rank_level[item.id][scope.row.level]">
            <div class="top">
              <div class="top_infor">
                <span>{{ $vj(tableData.rank_level, `.${[item.id]}.${[scope.row.level]}.rank_no`) }}</span>
                <span class="top_title">{{ $vj(tableData.rank_level, `.${[item.id]}.${[scope.row.level]}.title`) }}</span>
              </div>
              <div class="hover">
                <span @click="dialogAll('redact', tableData.rank_level[item.id][scope.row.level], true)">
                  <el-icon class="el-icon-edit"></el-icon>
                </span>
                <span @click="dialogAll('delete', tableData.rank_level[item.id][scope.row.level])">
                  <el-icon style="margin-left: 11px" class="el-icon-delete"></el-icon>
                </span>
              </div>
            </div>
            <div class="bottom" v-show="showNum || showExplain">
              <span v-show="showNum">{{ `人数：${$vj(tableData.rank_level, `.${[item.id]}.${[scope.row.level]}.staff_count`) || 0}人（${$vj(tableData.rank_level, `.${[item.id]}.${[scope.row.level]}.percent`) || 0}%）` }}</span>
              <el-tooltip class="item" effect="dark" placement="bottom">
                <template slot="content">
                    <div style="max-width:255px;font-size: 14px;font-family: PingFangSC-Regular, PingFang SC;font-weight: 400;">{{ $vj(tableData.rank_level, `.${[item.id]}.${[scope.row.level]}.rank_dec`) }}</div>
                </template>
                <div v-show="showExplain">{{ $vj(tableData.rank_level, `.${[item.id]}.${[scope.row.level]}.rank_dec`) }}</div> 
              </el-tooltip>
            </div>
          </div>
          <div v-else class="td-add">
            <span @click="dialogAll('redact', Object.assign(scope.row, {id: item.id}))">
              <el-icon class="el-icon-circle-plus-outline"></el-icon>
            </span>
          </div>
        </template>
      </el-table-column>
    </el-table>

     <!-- 管理职等弹层 -->
    <el-dialog
      class="dialog"
      title="管理职等"
      width="480px"
      :visible.sync="levelDialog"
      destroy-on-close
    >
      <el-form
        :model="levelForm"
        :rules="levelRules"
        ref="levelForm"
        label-width="100px"
      >
        <el-form-item label="职等范围：" prop="td">
          <el-row :gutter="17">
            <el-col :span="8"><el-input type="age" size="small" v-model.number="levelForm.min"></el-input></el-col>
            <el-col :span="1" style="text-align: center; padding: 0;">~</el-col>
            <el-col :span="8"><el-input type="age" size="small" v-model.number="levelForm.max"></el-input></el-col>
          </el-row>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="levelDialog = false"
          >取消</el-button
        >
        <el-button size="small" type="primary" @click="submitForm('level')"
          >保存</el-button
        >
      </div>
    </el-dialog>

    <!-- 定级计算规则弹层 -->
    <el-dialog
      class="dialog"
      title="定级人数占比"
      width="720px"
      :visible.sync="gradingRulesDialog"
      destroy-on-close
    >
      <el-form
        :model="gradingRulesForm"
        :rules="gradingRulesRules"
        ref="gradingRulesForm"
        label-width="10px"
      >
        <div class="title"><span></span>计算规则</div>
        <el-form-item label="" prop="type">
          <el-checkbox-group v-model="gradingRulesForm.type">
            <el-checkbox v-for="item in rankSettingList" :key="item.value" :label="item.value" name="type">{{ item.title }}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <div class="title"><span></span>计算逻辑</div>
        <div class="describe">
          <div>已定级占比 = 已定级人数 / 在职人数</div>
          <div>未定级人数 = 未定级人数 / 在职人数</div>
          <div>各职类通道人数 = 已定级到该职类通道的在职员工数量</div>
          <div>各职类通道人数占比 = 各职类通道人数 / 已定级总人数</div>
          <div>各职级人数占比 = 已定级该职级人数 / 同一职类通道已定级总人数</div>
        </div>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="gradingRulesDialog = false"
          >取消</el-button
        >
        <el-button size="small" type="primary" @click="submitForm('gradingRules')"
          >确定并重新计算</el-button
        >
      </div>
    </el-dialog>

    <!-- 新增/修改职级弹层 -->
    <el-dialog
      class="dialog"
      :title="redactTitle"
      width="480px"
      :visible.sync="redactDialog"
      destroy-on-close
    >
      <el-form
        :model="redactForm"
        :rules="redactRules"
        ref="redactForm"
        label-width="100px"
      >
        <el-form-item label="职级通道：" prop="rank_type">
          <el-select
            size="small"
            v-model="redactForm.rank_type"
            placeholder="请选择职级通道"
            :disabled="redactTitle === '修改职级'"
          >
            <el-option v-for="item in tableData.rank_type" :key="item.id" :label="item.title" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="职级编号：" prop="rank_no">
          <el-input size="small" maxlength="6" v-model="redactForm.rank_no"></el-input>
        </el-form-item>
        <el-form-item label="职级名称：" prop="title">
          <el-input maxlength="10" size="small" v-model="redactForm.title"></el-input>
        </el-form-item>
        <el-form-item label="对应职等：" prop="level" v-if="redactTitle === '修改职级'">
          <el-select
            size="small"
            filterable
            v-model="redactForm.level"
            placeholder="请选择对应职等"
          >
            <el-option v-for="item in tableData.rank_List" :key="item.level" :label="item.level" :value="item.level"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="职级说明：" prop="rank_dec" v-if="redactTitle === '新增职级'">
          <el-input
            maxlength="100"
            size="small"
            type="textarea"
            v-model="redactForm.rank_dec"
          ></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="redactDialog = false"
          >取消</el-button
        >
        <el-button size="small" type="primary" @click="submitForm('redact')"
          >保存</el-button
        >
      </div>
    </el-dialog>

    <!-- 删除职级弹层 -->
    <el-dialog
      class="dialog"
      title="删除职级"
      width="480px"
      :visible.sync="deleteDialog"
      destroy-on-close
    >
      <div style="margin-bottom: 22px;">
        <el-radio v-model="rankDeleteType" label="1">删除并将本职级员工恢复为未定级</el-radio>
      </div>
      <div style="margin-bottom: 22px;">
        <el-radio v-model="rankDeleteType" label="2">删除并为本职级员工统一修改职级</el-radio>
      </div>

      <el-form
        v-if="rankDeleteType === '2'"
        :model="deleteForm"
        :rules="deleteRules"
        ref="deleteForm"
        label-width="0px"
      >
        <el-form-item label="" prop="rank_id">
          <el-select size="small" v-model="deleteForm.rank_id" placeholder="请选择职级">
            <el-option-group
              v-for="group in deleteOptions"
              :key="group.id"
              :label="group.label">
              <el-option
                v-for="item in group.options"
                :key="item.id"
                :label="item.rank_no+' '+item.title"
                :value="item.id"
                :disabled="item.id === redactForm.id"
                >
              </el-option>
            </el-option-group>
          </el-select> 
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="deleteDialog = false"
          >取消</el-button
        >
        <el-button size="small" type="primary" @click="submitForm('delete')"
          >保存</el-button
        >
      </div>
    </el-dialog>

   </div>
</template>
<script>
import { rankCount, rankLevel, setRankLevel, deleteRankLevel, rankSetting, setRankSetting } from "@/api/hrm/rank";

export default {
   name: 'rank',
   data() {
      let levelvalidator = (rule, value, callback) => {
        if (this.levelForm.min === "" || this.levelForm.max === "") {
          callback(new Error('请输入职等范围'));
        } else if (this.levelForm.min < 0 || this.levelForm.max < 0){
          callback(new Error('职等范围不可为负数'));
        } else if (this.levelForm.min > this.levelForm.max){
          callback(new Error('请输入正确的职等范围'));
        } else if (this.levelVerify(this.levelForm.min, this.levelForm.max)){
          callback(new Error('只能删减没有对应职级的职等'));
        } else {
          callback();
        }
      };
     return {
       // 定级统计
       rankCountData: {},
       showNum: false,
       showExplain: false,
       tableLoading: false,
       tableData: [],
      // 弹层相关
      levelDialog: false,
      gradingRulesDialog: false,
      redactDialog: false,
      deleteDialog: false,
      redactTitle: "",
      levelForm: {
        min: 0,
        max: 0
      },
      current_max_min: {
        min: 0,
        max: 0
      },
      levelRules: {
        td: [{ required: true, validator: levelvalidator, trigger: "blur" }],
      },
      // 定级规则数据
      gradingRulesForm: {
        type: []
      },
      gradingRulesRules: {
        type: [{ type: 'array', required: true, message: '请至少选择一项', trigger: 'change' }],
      },
      rankSettingList: [],
      // 新增/修改 数据
      redactForm: {
        id: "",
        rank_type: "",
        rank_no: "",
        title: "",
        rank_dec: "",
        level: "",
      },
      redactRules: {
        title: [{ required: true, message: "请输入职级名称", trigger: "blur" }],
        rank_type: [{ required: true, message: "请选择职级通道", trigger: "change" }],
      },
      rankDeleteType: '1',
      deleteForm: {
        rank_id: ''
      },
      deleteRules: {
        rank_id: [{ required: true, message: "请选择职级", trigger: "change" }],
      },
      deleteOptions: [],
     }
   },
   created() {
    this.getRankCount();
    this.getRankLevel();
    this.getRankSetting();
   },
   methods: {
    // 获取定级统计
    getRankCount() {
      rankCount().then(res => {
        this.rankCountData = res.data;
      })
    },
    // 职级表数据
    getRankLevel() { 
      this.tableLoading = true;
      rankLevel().then(res => { 
        this.tableData =  res.data;
        this.tableData.rank_type = Object.values(res.data.rank_type);
        this.tableData.rank_List = this.setRankList(res.data.rank_min, res.data.rank_max);
        this.levelForm = {
          min: res.data.rank_min,
          max: res.data.rank_max,
        };
        this.current_max_min = {
          min: res.data.current_min,
          max: res.data.current_max,
        }
        this.deleteOptions = this.setDeleteOptions(res.data);
        this.tableLoading = false;
      }).catch(error => {
        this.tableLoading = false;
      })
    },
    // 定级计算规则列表
    getRankSetting() {
      rankSetting().then(res => {
        this.gradingRulesForm.type = res.data.reduce((a, b) => {
          if(b.checked) return [...a, b.value]
          return a
        }, [])
        this.rankSettingList = res.data;
      })
    },
    // 生成职级列表等级范围列表
    setRankList(min, max) {
      let arr = [];
      for (let index = 0; index <= max; index++) {
        if(index >= min) {
          arr.unshift({level: index})
        }
      }
      return arr
    },
    // 生成 deleteOptions 数据
    setDeleteOptions(data) {
      let newData = JSON.parse(JSON.stringify(data));
      newData = newData.rank_type.map(i => {
        i.label = i.title;
        i.options = [];
        for (const key in newData.rank_level) {
          if (i.id === key) {
            i.options = [...Object.values(newData.rank_level[key])]
          }
        }
        if(i.options.length > 0) return i
      }).filter(i => i)
      return newData
    },
    // 弹层
    dialogAll(dialog, row, isUpdate = false) {
      if (isUpdate) {
        this[dialog + "Title"] = "修改职级";
        rankLevel({id: row.id}).then(res => { 
          this.redactForm =  res.data;
          this[dialog + "Dialog"] = true;
        }).catch(error => {
          this.$message({
            showClose: true,
            message: error.errmsg,
            type: 'error'
          });
        })
      } else if(dialog === 'redact') {
        this.reset();
        this.redactForm.level = row.level;
        this.redactForm.rank_type = row.id;
        this[dialog + "Title"] = "新增职级";
        this[dialog + "Dialog"] = true;
      }else if(dialog === 'delete') {
        this[dialog + "Dialog"] = true;
        this.redactForm =  row;
      } else {
        this[dialog + "Dialog"] = true;
      }
    },
    // 重置 redactForm 数据
    reset(){
      this.redactForm = {
        id: "",
        rank_type: "",
        rank_no: "",
        title: "",
        rank_dec: "",
        level: "",
      }
    },
    // 保存
    submitForm(name) {
      // 删除操作处理跟其他有一点点区别
      if(name === 'delete' && this.rankDeleteType === '1'){
        let data = { id: this.redactForm.id };
        deleteRankLevel(data).then(res => {
          if(res.errno===0) {
            this.$message({
              showClose: true,
              message: res.errmsg,
              type: 'success'
            });
            this[name+'Dialog'] = false;
            this.getRankLevel();
          }else{
            this.$message({
              showClose: true,
              message: res.errmsg,
              type: 'error'
            });
          }
        }).catch(error => {
          this.$message({
            showClose: true,
            message: error.errmsg,
            type: 'error'
          });
        })
      }else if(name === 'delete' && this.rankDeleteType === '2'){
        this.$refs[name+'Form'].validate((valid) => {
          if (valid) {
            let data = { id: this.redactForm.id, rank_id: this.deleteForm.rank_id };
            deleteRankLevel(data).then(res => {
              if(res.errno===0) {
                this.$message({
                  showClose: true,
                  message: res.errmsg,
                  type: 'success'
                });
                this[name+'Dialog'] = false;
                this.getRankLevel();
              }else{
                this.$message({
                  showClose: true,
                  message: res.errmsg,
                  type: 'error'
                });
              }
            }).catch(error => {
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
      }else if(name === 'level'){
        // 管理职等范围
        this.$refs[name+'Form'].validate((valid) => {
          if (valid) {
            let data = {rank_min: this.levelForm.min, rank_max: this.levelForm.max};
            setRankSetting(data).then(res => {
              this.$message({
                showClose: true,
                message: res.errmsg,
                type: 'success'
              });
              this[name+'Dialog'] = false;
              this.getRankLevel();
            }).catch(error => {
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
      }else if(name === 'redact') {
        // 新增/修改
        this.$refs[name+'Form'].validate((valid) => {
          if (valid) {
            setRankLevel(this.redactForm).then(res => {
              if(res.errno===0) {
                this.$message({
                  showClose: true,
                  message: res.errmsg,
                  type: 'success'
                });
                this[name+'Dialog'] = false;
                this.getRankLevel();
              }else{
                this.$message({
                  showClose: true,
                  message: res.errmsg,
                  type: 'error'
                });
              }
            }).catch(error => {
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
      }else if(name === 'gradingRules') {
        // 定级规则
        this.$refs[name+'Form'].validate((valid) => {
          if (valid) {
            setRankSetting({calc_range: this.gradingRulesForm.type}).then(res => {
              this.$message({
                showClose: true,
                message: res.errmsg,
                type: 'success'
              });
              this[name+'Dialog'] = false;
              this.getRankLevel();
              this.getRankSetting();
            }).catch(error => {
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
      }
    },
    // 路由页面跳转
    goRouter(path, id = null) {
      if (id !== null) {
        this.$router.push({ path, query: { id } });
      }else{
        this.$router.push({ path });
      }
    },
    // 职等范围校验 插入方法
    levelVerify(min, max) {
      return (this.current_max_min.min < min || this.current_max_min.max > max)
    },
   }
};
</script>
<style lang='less' scoped>
.tabel-top-box{
  height: 56px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px;
  .left{
    display: flex;
    font-size: 13px;
    font-family: PingFang-SC-Medium, PingFang-SC;
    font-weight: 500;
    color: #8C8C8C;
    div{
      margin-right: 16px;
      span{
        font-weight: 400;
        color: #1F1F1F;
      }
    }
  }
}

// 表格可编辑区域
.tabel-box{
  .td-box{
    width: 230px;
    font-size: 12px;
    font-weight: 500;
    font-family: PingFangSC-Medium, PingFang SC;
    .top{
      min-height: 28px;
      display: flex;
      justify-content: space-between;
      .top_infor {
        display: flex;
      }
      .top_title {
        max-width: 80px;
      }
      div span:nth-child(1){
        color: #434343;
        display: inline-block;
        min-width: 28px;
        height: 20px;
        text-align: center;
        line-height: 20px;
        background: rgba(26,172,136,0.08);
        border-radius: 2px;
      }
      div span:nth-child(2){
        font-size: 14px;
        color: #1F1F1F;
        margin-left: 8px;
      }
      .hover{
        opacity: 0;
        cursor: pointer;
        span:nth-child(1){
          color: #1AAC88;
          background: none;
        }
        span:nth-child(2){
          color: #FF4D4F;;
        }
      }
    }
    .top:hover{
      .hover{
        opacity: 1;
      }
    }
    .bottom{
      padding: 8px;
      background: #F5F5F5;
      border: 1px solid #F0F0F0;
      color: #8C8C8C;
      div{
        margin-top: 4px;
      }
    }
  }
  .td-add{
    opacity: 0;
    cursor: pointer;
  }
  .td-add:hover{
    opacity: 1;
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
  // 定级计算规则内部样式 
  .title{
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    font-size: 14px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #262626;
    span{
      display: inline-block;
      width: 2px;
      height: 14px;
      background: #1AAC88;
      margin-right: 6px;
    }
  }
  & .title:nth-child(1){
    margin-bottom: 10px;
  }
  .describe{
    display: grid;
    grid-template-columns: repeat(1, 100%);
    grid-gap: 16px 0px;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #595959;
    div{
      padding-left: 10px;
    }
  }
}
</style>