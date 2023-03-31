<template>
  <div>
    <el-dialog :close-on-click-modal='false' title="编辑二级下拉组件数据" :visible.sync="isAddSecondaryOption" width="40%"
      :before-close="clonseAddSecondaryOption">
      <div class="content-box">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm">

          <el-form-item label="选项值" :prop="'name' + index" v-for="(item,index) in firstData" :key="index">
            <div class="item">
              <el-input style="width:50%" size="small" v-model="ruleForm['name' + index]"></el-input>
              <div class="btn" style="width:50%">
                <el-button size="small" @click="editChild(item)" type="warning"> <i class="el-icon-setting"></i> 编辑子项
                </el-button>
                <el-button size="small" v-if="firstData.length > 1" @click="deleteItem('name' + index,index,item)"
                  type="danger"> <i class="el-icon-delete"></i> 删除
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
          <el-button size="small" @click="clonseAddSecondaryOption">取 消</el-button>
          <el-button size="small" type="primary" @click="sumbitAddSecondaryOption">确 定</el-button>
        </div>
      </span>
    </el-dialog>
    <!-- 批量添加弹窗    -->
    <AddFirstOption v-if="isAddFirstOption" :isBatchAdd='isAddFirstOption' @close='close' :batchAddTitle='title'
      :batchData='editSecondData' @sumbitBatchAdd='sumbit' />
  </div>
</template>

<script>
  import AddFirstOption from "./AddFirstOption"
  export default {
    props: ['isAddSecondaryOption', 'batchAddTitle', 'batchData'],
    components: {
      AddFirstOption
    },
    data() {
      return {
        firstData: [],
        rules: {},
        ruleForm: {},
        secondData: {},
        isAddFirstOption: false,
        title: '',
        editSecondData: [],
        editfromData: [],
        initData: []
      }
    },
    created() {
      this.initData = JSON.parse(JSON.stringify(this.batchData))
      this.firstData = JSON.parse(JSON.stringify(Array.from(this.batchData.firstValueData)))
      this.secondData = JSON.parse(JSON.stringify(this.batchData.secondValueData))
      this.firstData.forEach(item => {
        // console.log(item)
        this.$set(this.ruleForm, 'name' + item.sort, item.name)
        this.$set(this.rules, 'name' + item.sort, [{
            required: true,
            message: '请输入活动名称',
            trigger: 'blur'
          },

        ])
      });

    },
    methods: {

      clonseAddSecondaryOption() {
        this.$emit('clonseAddSecondaryOption')
      },
      deleteItem(name, idx, item) {
        let arr = []
        arr = this.firstData.filter((item, index) => {
          return index != idx ? item : ''
        })
        delete this.ruleForm['name' + idx]
        let data = []
        let num = 0
        for (let k in this.ruleForm) {
          data.push({
            name: this.ruleForm[k],
            sort: num++
          })
        }
        delete this.secondData[idx]
        let arr1 = []
        for (let i in this.secondData) {
          arr1.push(this.secondData[i])
        }
        this.firstData = data
        this.ruleForm = {}
        this.rules = {}
        this.secondData = {}
        this.firstData.forEach((item, index) => {
          this.$set(this.ruleForm, 'name' + index, item.name)
          this.$set(this.secondData, index, arr1[index])
          this.$set(this.rules, 'name' + index, [{
              required: true,
              message: '请输入活动名称',
              trigger: 'blur'
            },

          ])
        })


      },
      add(index) {
        let num = this.firstData.length + 1
        this.$set(this.secondData, this.firstData.length, [{
            sort: 0,
            name: '子选项',
          },
          {
            sort: 1,
            name: '子选项',
          }
        ])
        this.firstData.push({
          sort: this.firstData.length,
          name: '选项',
        })
        let arr = []
        for (let k in this.ruleForm) {
          arr.push(this.ruleForm[k])
        }
        this.rules = {}
        this.firstData.forEach(item => {

          this.$set(this.rules, 'name' + item.sort, [{
              required: true,
              message: '请输入选项值',
              trigger: 'blur'
            },

          ])
        });
        this.$set(this.ruleForm, 'name' + (this.firstData.length - 1), '选项')
      },
      //编辑子项
      editChild(item) {
        this.title = '编辑子选项'
        this.editfromData = item
        this.isAddFirstOption = true
        this.editSecondData = this.secondData[item.sort]
      },
      close() {
        this.isAddFirstOption = false
      },
      sumbit(data) {
        this.isAddFirstOption = false
        this.$set(this.secondData, this.editfromData.sort, data)
      },
      sumbitAddSecondaryOption() {
        this.$refs['ruleForm'].validate((valid) => {
          if (valid) {
            let arr = []
            let num = 0
            for (let k in this.ruleForm) {

              arr.push({
                name: this.ruleForm[k],
                sort: num++
              })
            }

            this.initData.firstValueData = arr;
            this.initData.secondValueData = this.secondData
            this.$emit('sumbitAddSecondaryOption', this.initData)
          } else {

            return false;
          }
        });
      },
    }

  }

</script>

<style scoped>
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
  }

  .btn {
    margin-left: 10px;
    display: flex;
    align-items: center;
  }

</style>
