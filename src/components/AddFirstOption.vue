<template>
  <div>
    <el-dialog :close-on-click-modal='false' :title="batchAddTitle" :visible.sync="isBatchAdd" width="40%"
      :before-close="clonseBatchAdd">
      <div class="content-box">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm">

          <el-form-item label="选项值" :prop="'name' + index" v-for="(item,index) in ruleData" :key="index">
            <div class="item">
              <el-input style="width:80%" size="small" v-model="ruleForm['name'+index]"></el-input>
              <div class="btn" style="width:20%">
                <el-button v-if="ruleData.length > 1" @click="deleteItem('name' + index,index)" type="danger"
                  size="small"> <i class="el-icon-delete"></i> 删除
                </el-button>
              </div>
            </div>
          </el-form-item>
          <el-button @click="add" type="primary" size="small"> <i class="el-icon-circle-plus-outline"></i>
            添加</el-button>
        </el-form>
      </div>
      <span style="display:flex;justify-content: space-between;" slot="footer" class="dialog-footer">
        <div></div>
        <div style="display:flex">
          <el-button size="small" @click="clonseBatchAdd">取 消</el-button>
          <el-button size="small" type="primary" @click="sumbitBatchAdd">确 定</el-button>
        </div>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    props: ['isBatchAdd', 'batchAddTitle', 'batchData'],
    data() {
      return {
        dialogVisible: false,
        ruleData: [],
        ruleForm: {},
        rules: {
          name1: [{
              required: true,
              message: '请输入活动名称',
              trigger: 'blur'
            },

          ],

        }
      }
    },
    created() {
      this.ruleData = Array.from(this.batchData)
      // this.ruleForm.name = '1111'
      this.ruleData.forEach(item => {
        this.$set(this.ruleForm, 'name' + item.sort, item.name)
        this.$set(this.rules, 'name' + item.sort, [{
            required: true,
            message: '请输入选项值',
            trigger: 'blur'
          },

        ])
      });

    },
    methods: {
      clonseBatchAdd() {
        this.$emit('close')
      },
      sumbitBatchAdd() {
        this.$refs['ruleForm'].validate((valid) => {
          if (valid) {
            let arr = []
            for (let k in this.ruleForm) {
              arr.push(this.ruleForm[k])
            }
            arr.forEach((item, index) => {
              this.ruleData[index].name = item
              this.ruleData[index].sort = index
            })
            this.$emit('sumbitBatchAdd', this.ruleData)
          } else {

            return false;
          }
        });
      },
      deleteItem(name, idx) {
        this.ruleData = this.ruleData.filter((item, index) => {
          return index != idx ? item : ''
        })
        // console.log( this.ruleData)
        delete this.ruleForm[name]
        // console.log(this.ruleData)
        let arr = []
        for (let k in this.ruleForm) {
          arr.push(this.ruleForm[k])
        }
        arr.forEach((item, index) => {
          this.ruleData[index].name = item
          this.ruleData[index].sort = index
        })
        this.ruleForm = {}
        this.rules = {}
        this.ruleData.forEach(item => {
          this.$set(this.ruleForm, 'name' + item.sort, item.name)
          this.$set(this.rules, 'name' + item.sort, [{
            required: true,
            message: '请输入选项值',
            trigger: 'blur'
          }, ])
        });
      },
      add(index) {
        let num = this.ruleData.length + 1
        this.ruleData.push({
          sort: this.ruleData.length,
          name: '子选项',
        })
        let arr = []
        for (let k in this.ruleForm) {
          arr.push(this.ruleForm[k])
        }

        arr.forEach((item, index) => {
          this.ruleData[index].name = item
        })
        this.ruleForm = {}
        this.rules = {}
        this.ruleData.forEach(item => {
          this.$set(this.ruleForm, 'name' + item.sort, item.name)
          this.$set(this.rules, 'name' + item.sort, [{
            required: true,
            message: '请输入选项值',
            trigger: 'blur'
          }, ])
        });

      },

    }
  }

</script>

<style scoped>
  /* .el-dialog__header {
    background: #91e090;
  } */

  .el-dialog__body {
    padding: 10px;
  }

  .content-box {
    width: 100%;
    height: 300px;
    border: 1px solid #b9b0b0;
    padding: 10px;
    overflow: auto;
    /* box-sizing: border-box;   */
  }

  .item {
    width: 100%;
    display: flex;
    align-items: center;
  }

  .btn {
    margin-left: 10px;
  }

</style>
