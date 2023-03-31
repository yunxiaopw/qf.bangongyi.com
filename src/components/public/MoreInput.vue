<template>
    <div class="more_input">
        <!-- 文本/数字框 -->
        <div v-if="i_item.type === 'text' || i_item.type === 'number' || i_item.type === 'tel' || i_item.type === 'email'">
            <el-input :value="value" v-bind="$attrs" v-on="$listeners" :readonly="i_item.readonly" size="small" placeholder="请输入"></el-input>
        </div>
        <!-- 文本展示 -->
        <div v-if="!i_item.type || i_item.type === ''">
            <div>{{ value }}</div>
        </div>
        <!-- 文本域 -->
        <div v-if="i_item.type === 'textarea'">
            <el-input :value="value" v-bind="$attrs" v-on="$listeners" :readonly="i_item.readonly" size="small" :rows="2" placeholder="请输入" style="width: 100%"></el-input>
        </div>
        <!-- 下拉框 -->
        <div v-if="i_item.type === 'select'">
            <el-select :value="value" v-bind="$attrs" v-on="$listeners" :readonly="i_item.readonly" size="small" placeholder="请选择" style="width: 100%">
                <el-option v-for="(item, key) in i_item.value" :key="key" :label="item" :value="key"></el-option>
            </el-select>
        </div>
        <!-- 单选 :label="key*1" 是应为隐式的转换为了Sting类型所以*1保持number格式 -->
        <div v-if="i_item.type === 'radio'">
            <el-radio-group :value="value" v-bind="$attrs" v-on="$listeners" :readonly="i_item.readonly" size="small">
                <el-radio v-for="(item, key) in i_item.value" :key="key" :label="key*1">{{item}}</el-radio>
            </el-radio-group>
        </div>
        <!-- 多选 -->
        <div v-if="i_item.type === 'checkbox'">
            <el-checkbox-group :value="value" v-bind="$attrs" v-on="$listeners" :readonly="i_item.readonly" size="small">
                <el-checkbox v-for="(item, key) in i_item.value" :key="key" :label="key">{{item}}</el-checkbox>
            </el-checkbox-group>
        </div>
        <!-- 日期选择器 -->
        <div v-if="i_item.type === 'date'">
            <el-date-picker :value="value" v-bind="$attrs" v-on="$listeners" :readonly="i_item.readonly" size="small" placeholder="请选择" type="date" value-format="yyyy-MM-dd" style="width: 100%"></el-date-picker>
        </div>
        <!-- 日期选择器 -->
        <div v-if="i_item.type === 'time'">
            <el-date-picker :value="value" v-bind="$attrs" v-on="$listeners" :readonly="i_item.readonly" size="small" placeholder="请选择" type="datetime" style="width: 100%"></el-date-picker>
        </div>
        <!-- 选人/部门 弹窗插件 -->
        <div v-if="i_item.type === 'widget' || i_item.type === 'department_widget' || i_item.type === 'staff_widget'">
            <el-input :value="queryListWidget_names" v-bind="$attrs" v-on="$listeners" readonly :disabled="i_item.readonly" size="small" placeholder="请选择" @focus="dialogListWidget(widgetTabType(i_item.form_item_type), widgetRadio(i_item.form_item_radio))"></el-input>
            <!-- 选人/部门 弹层 -->
            <NewListWidget 
            :tabType="listWidgetTabType"
            :selects="listWidgetSelects" 
            :radio.sync="listWidgetRadio" 
            :visible.sync="listWidgetShow" 
            @ackSelect="ackSelect" />
        </div>
        <!-- 籍贯 插件 -->
        <div v-if="i_item.type === 'area_widget'">
          <el-cascader :value="value" v-bind="$attrs" v-on="$listeners" :readonly="i_item.readonly" size="small" placeholder="请选择" style="width: 100%" :props="cascaderProps"></el-cascader>
        </div>
        <!-- 岗位 插件 -->
        <div v-if="i_item.type === 'position_widget'">
          <PositionLevel :value="value" v-bind="$attrs" v-on="$listeners" :readonly="i_item.readonly" size="small" style="width: 100%" :data="positionData" />
        </div>
         <!-- 职级 插件 -->
        <div v-if="i_item.type === 'rankLevel_widget'">
          <RankLevel :value="value" v-bind="$attrs" v-on="$listeners" :readonly="i_item.readonly" size="small" placeholder="请选择" style="width: 100%" :data="rankLevelData" />
        </div>
        <!-- 上传文件 插件 -->
        <div v-if="i_item.type === 'file'">
            <div class="upload-file">
              <el-upload
                v-bind="$attrs"
                v-on="$listeners"
                multiple
                :action="uploadFileUrl"
                :before-upload="handleBeforeUpload"
                :file-list="fileList"
                :limit="limit"
                :on-error="handleUploadError"
                :on-exceed="handleExceed"
                :on-success="handleUploadSuccess"
                :show-file-list="false"
                :headers="headers"
                class="upload-file-uploader"
                ref="fileUpload"
              >
                <!-- 上传按钮 -->
                <el-button size="mini" type="primary">选取文件</el-button>
                <!-- 上传提示 -->
                <div class="el-upload__tip" slot="tip" v-if="showTip">
                  请上传
                  <template v-if="fileSize"> 大小不超过 <b style="color: #f56c6c">{{ fileSize }}MB</b> </template>
                  <template v-if="fileType"> 格式为 <b style="color: #f56c6c">{{ fileType.join("/") }}</b> </template>
                  的文件
                </div>
              </el-upload>

              <!-- 文件列表 -->
              <transition-group class="upload-file-list el-upload-list el-upload-list--text" name="el-fade-in-linear" tag="ul">
                <li :key="file.url" class="el-upload-list__item ele-upload-list__item-content" v-for="(file, index) in fileList">
                  <el-link :href="`${baseUrl}${file.url}`" :underline="false" target="_blank">
                    <!-- <span class="el-icon-document"> {{ getFileName(file.name) }} </span> -->
                    <span class="el-icon-document"> {{ file.name }} </span>
                  </el-link>
                  <div class="ele-upload-list__item-content-action">
                    <el-link :underline="false" @click="handleDelete(index)" type="danger">删除</el-link>
                  </div>
                </li>
              </transition-group>
            </div>
        </div>
    </div>
</template>

<script>
import { rankLevel } from "@/api/hrm/rank";
import { widgetPosition, rank_Level, widgetArea } from "@/api/hrm/staff";
import { mapState ,mapMutations } from "vuex"
import { getUrlParams } from '@/utils/utils'

let id = 0;

export default {
  name: "MoreInput",
  props: {
    // 组件配置信息
    i_item: {
      type: Object,
      default: () => {}
    },
    // v-model绑定
    value: {
      type: [String, Number, Object, Array, Boolean],
      default: ''
    },
    // 根据职级获取岗位 职级的rank_type
    position_id: {
      type: [String, Number],
      default: ''
    },
    /* 
      用于选人/部门组件的初次回显 只在部分情况下使用
      目前花名册页面 编辑员工信息弹层中更换部门使用   :v-model做了双方响应 但是父页面绑定的 widget_ids 非数组而且与v-model不一致
      导致即使更改了选项但是因为v-model数据更换了 但是父页面widget_ids绑定的回显的文字没有变 就会触发watch监听导致展示文本被重新赋值
      使用方式  父页面取消widget_ids的绑定 改为widget__init_text传递初次回显的文本
    */
    widget_init_text: {
      type: String,
      default: ''
    },
    // 以下为上传文件相关
    // 数量限制
    limit: {
      type: Number,
      default: 5,
    },
    // 大小限制(MB)
    fileSize: {
      type: Number,
      default: 5,
    },
    // 文件类型, 例如['png', 'jpg', 'jpeg']
    fileType: {
      type: Array,
      default: () => ["doc", "docx", "xls", "xlsx", "ppt", "txt", "pdf"],
    },
    // 是否显示提示
    isShowTip: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
        // 岗位类别可选项
        positionData: [],
        // 职级可选项
        rankLevelData: [],

        // 选人/部门 展示文本信息
        queryListWidget_names: this.widget_init_text || "",
        // queryListWidget_ids: "",
        // ListWidget 组件相关数据
        listWidgetShow: false,
        listWidgetRadio: false,
        listWidgetTabType: "",
        listWidgetSelects: [],
        
        // 文件上传相关
        number: 0,
        uploadList: [],
        baseUrl: process.env.NODE_ENV == 'development' ? '/hrm/api/widget/uploadfile' : process.env.API_HOST + '/hrm/api/widget/uploadfile',
        uploadFileUrl: process.env.NODE_ENV == 'development' ? '/hrm/api/widget/uploadfile' : process.env.API_HOST + '/hrm/api/widget/uploadfile', // 上传的服务器地址
        headers: {
          token: getUrlParams('token'),
          sid: getUrlParams('sid'),
        },
        fileList: [],

        // 籍贯组件懒加载
        cascaderProps: {
          lazy: true,
          emitPath: false,
          label: 'name',
          value: 'id',
          lazyLoad (node, resolve) {
            let obj = {};
            if(node.data && node.data.id) obj= {id: node.data.id}
            widgetArea(obj).then(res => {
              const nodes = res.data.map(i => {
                i.leaf = !i.leaf;
                return i
              })
              resolve(nodes);
            })
            
          }
        },
    };
  },
  computed: {
    ...mapState({
        // 职级可选项
        storeRankLevelData: (state) => state.MoreInput.rankLevelData,
        // 岗位可选项
        storePositionData: (state) => state.MoreInput.positionData,
    }),
    // 文件上传 是否显示提示
    showTip() {
      return this.isShowTip && (this.fileType || this.fileSize);
    },
  },
  watch: {
    i_item: {
        deep: true,
        immediate: true,
        handler(val) {
            // 部门/选人插件 回显数据处理
            if(val.widget_ids && val.widget_ids.length > 0 && Array.isArray(val.widget_ids)) {
              if(val.v_model_type && val.v_model_type === 'String') {
                this.queryListWidget_names = val.widget_ids.map(i=> {
                  if(typeof i ==='string') return i
                  if(i.we_name || i.name) return (i.we_name || i.name)
                }).join(",");
              }else{
                this.queryListWidget_names = val.widget_ids.map(i=> {
                  if(typeof i ==='string') return i
                  if(i.we_name || i.name) return (i.we_name || i.name)
                }).join(",");
                this.listWidgetSelects = val.widget_ids;
              }
            }
        }
    },
    // 根据职级获取岗位
    position_id(val) {
      if(val === '' || !val) {
        this.rankLevelData = this.storeRankLevelData;
      }else{
        let rank_type = '';
        for (let index = 0; index < this.storePositionData.length; index++) {
            if(this.storePositionData[index].position.filter(item => item.id === val) && this.storePositionData[index].position.filter(item => item.id === val).length>0) {
              rank_type = this.storePositionData[index].position.filter(item => item.id === val)[0].rank_type;
            }
          
        }
        this.get_rank_Level(rank_type);
      }
    }
  },
  async created() {
    if(this.i_item.type === 'position_widget') {
      await this.getPositionType();
    }
    if(this.i_item.type === 'rankLevel_widget') {
      await this.getRankLevel();
    }
  },
  methods: {
    // 上传前校检格式和大小
    handleBeforeUpload(file) {
      // 校检文件类型
      if (this.fileType) {
        let fileExtension = "";
        if (file.name.lastIndexOf(".") > -1) {
          fileExtension = file.name.slice(file.name.lastIndexOf(".") + 1);
        }
        const isTypeOk = this.fileType.some((type) => {
          if (file.type.indexOf(type) > -1) return true;
          if (fileExtension && fileExtension.indexOf(type) > -1) return true;
          return false;
        });
        if (!isTypeOk) {
          this.$message({
            showClose: true,
            message: `文件格式不正确, 请上传${this.fileType.join("/")}格式文件!`,
            type: 'error'
          });
          return false;
        }
      }
      // 校检文件大小
      if (this.fileSize) {
        const isLt = file.size / 1024 / 1024 < this.fileSize;
        if (!isLt) {
          this.$message({
            showClose: true,
            message: `上传文件大小不能超过 ${this.fileSize} MB!`,
            type: 'error'
          });
          return false;
        }
      }
      this.number++;
      return true;
    },
    // 文件个数超出
    handleExceed() {
      this.$message({
        showClose: true,
        message: `上传文件数量不能超过 ${this.limit} 个!`,
        type: 'error'
      });
    },
    // 上传失败
    handleUploadError(err) {
      this.$message({
        showClose: true,
        message: `上传图片失败，请重试`,
        type: 'error'
      });
    },
    // 上传成功回调
    handleUploadSuccess(res, file) {
      if (res.errno === 0) {
        this.uploadList.push({ name: res.data.name, url: res.data.url, path: res.data.path });
        this.uploadedSuccessfully();
      } else {
        this.number--;
        this.$message({
          showClose: true,
          message: res.errmsg,
          type: 'error'
        });
        this.$refs.fileUpload.handleRemove(file);
        this.uploadedSuccessfully();
      }
    },
    // 删除文件
    handleDelete(index) {
      this.fileList.splice(index, 1);
      this.$emit("input", this.listToString(this.fileList));
    },
    // 上传结束处理
    uploadedSuccessfully() {
      if (this.number > 0 && this.uploadList.length === this.number) {
        this.fileList = this.fileList.concat(this.uploadList);
        this.uploadList = [];
        this.number = 0;
        this.$emit("input", this.listToString(this.fileList));
      }
    },
    // 获取文件名称
    // getFileName(name) {
    //   if (name.lastIndexOf("/") > -1) {
    //     return name.slice(name.lastIndexOf("/") + 1);
    //   } else {
    //     return "";
    //   }
    // },
    // 对象转成指定字符串分隔
    listToString(list, separator) {
      let strs = "";
      separator = separator || ",";
      for (let i in list) {
        strs += list[i].path + separator;
      }
      return strs != '' ? strs.substr(0, strs.length - 1) : '';
    },


    ...mapMutations(['setStorePositionData', 'setStoreRankLevelData']),
    // 获取岗位可选项列表
    async getPositionType() {
      await widgetPosition().then(res => {
        this.positionData = res.data;
        // vuex 存储岗位可选项数据
        this.setStorePositionData(this.positionData);
      })
    },
    // 获取职级可选数据
    async getRankLevel() {
      await rankLevel().then(res => {
        this.rankLevelData = this.setRankLevelData(res.data);
        // vuex 存储职级可选项数据
        this.setStoreRankLevelData(this.rankLevelData);
      })
    },
    // 根据岗位获取对应职级
    async get_rank_Level(rank_type) {
      await rank_Level({rank_type}).then(res => {
        this.rankLevelData = [{title:res.data.rank_type_title, position:res.data.list}];
      })
    },
    // 生成 rankLevelData 数据
    setRankLevelData(data) {
      let newData = JSON.parse(JSON.stringify(data));
      newData = Object.values(newData.rank_type).map(i => {
        i.position = [];
        for (const key in newData.rank_level) {
          if (i.id === key) {
            i.position = [...Object.values(newData.rank_level[key])]
          }
        }
        if(i.position.length > 0) return i
      }).filter(i => i)
      return newData
    },
    // ListWidget 组件相关数据
    widgetTabType(type) {
        if(type) return type
        return '部门'
    },
    // ListWidget 组件相关数据
    widgetRadio(radio) {
      if(radio) return radio
      return false
    },
    // 选人/部门 弹层
    dialogListWidget(type, radio) {
    //   let we_names = data.name.split(',').filter(i=> i && i.trim());
    //   this.listWidgetSelects = data.id.split(',').filter(i=> i && i.trim()).map((i, index) => (i = {id: i , we_name: we_names[index]}));
      this.listWidgetTabType = type;
      this.listWidgetRadio = radio;
      this.listWidgetShow = true;
    },
    // 选人/部门弹层 确定
    ackSelect(data) {
      let { selects } = data;
      this.queryListWidget_names = selects.map(i => i.we_name).join(",");
      //   this.queryListWidget_ids = selects.map(i => i.id).join(",");

      // 返回的数据格式 1,2
      if(this.i_item.v_model_type === 'String') {
        this.$emit("update:v-model", selects.map(i => i.id).join(","));
      }else{
        // 返回的数据格式 [{id:'1', we_name:'研发部'}]
        this.$emit("update:v-model", selects.map(i => ({id:i.id, we_name:i.we_name})));
      }
    },
  }
};
</script>

<style lang="less" scoped>
.upload-file-uploader {
  margin-bottom: 5px;
}
.upload-file-list .el-upload-list__item {
  border: 1px solid #e4e7ed;
  line-height: 2;
  margin-bottom: 10px;
  position: relative;
}
.upload-file-list .ele-upload-list__item-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: inherit;
}
.ele-upload-list__item-content-action .el-link {
  margin-right: 10px;
}
</style>
