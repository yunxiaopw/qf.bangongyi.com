<template>
  <el-dialog
    class="modal-content"
    title="选择范围"
    width="600px"
    :visible.sync="visible"
    destroy-on-close
    :before-close="listWidgetHide"
  >
    <div class="mod-tree-people__input">
      <ul class="token-input-list">
        <li class="mod-lozenges__item" v-for="item in selectList" :key="item.id">
          <span class="mod-lozenges__icon">
            <i>
              <img
                v-if="item.we_avatar && item.we_avatar !== ''"
                class="mod-tree-people__people-avatar"
                :src="item.we_avatar"
                alt=""
              />
              <img
                v-else
                class="mod-tree-people__people-avatar"
                src="../../assets/images/picm.jpg"
                alt=""
              />
            </i>
          </span>
          <span class="mod-lozenges__text" v-html="item.we_name"></span>
          <span class="mod-lozenges__close-icon" @click="deleteSelectListItem(item.id)">
            <el-icon class="el-icon-close"></el-icon>
          </span>
        </li>
        <li class="token-input-input-token">
          <input
            type="text"
            class="input_group_add"
            placeholder="输入搜索条件"
            v-model="searchText"
            @compositionstart="searchFlag = false" 
            @compositionend="searchFlag = true"
            @input="widgetSearch"
          />
        </li>
      </ul>
      <ul :class="searchList.length > 0 ? 'search-box' : 'search-box hide'">
        <li v-for="item in searchList" :key="item.id" @click="setSelectList(item)">
          <img
            v-if="item.we_avatar && item.we_avatar !== ''"
            class="mod-tree-people__people-avatar"
            :src="item.we_avatar"
            alt=""
          />
          <img
            v-else
            class="mod-tree-people__people-avatar"
            src="../../assets/images/picm.jpg"
            alt=""
          />
          <span>{{ item.we_name }}</span>
        </li>
      </ul>
    </div>

    <div class="modal-body">
      <div class="js_head">
        <span class="user-manage-href"
          >前往<a href="javascript:;">通讯录管理</a>查询人员信息</span
        >
        <ul class="tab_filetype_items">
          <li class="js_phead" v-for="(item, index) in tabList" :key="index" @click="tabSelect(item.title)">
            <span :class="tabSelectActive === item.title ? 'pointer active' : 'pointer' ">{{ item.title }}</span>
          </li>
        </ul>
      </div>
      <!-- tab 为部门 内容展示 -->
      <div class="dialog_choose_items_org" v-if="tabSelectActive === '部门'">
        <!-- 饿了么 树形懒加载 在弹层中使用会有BUG 因为它的执行是在DOM渲染时执行 所以可以用 v-if 来控制 -->
        <el-tree v-if="visible" ref="departmentTree" lazy :load="loadNode" node-key="we_id" :props="defaultProps" :expand-on-click-node="false" @node-click="departmentSelect">
          <span slot-scope="{ node }" style="width: 100%; padding-right: 15px;">
              <img v-show="node.expanded" src="../../assets/images/folder-open.png" alt="" class="jstree-icon">
              <img v-show="!node.expanded" src="../../assets/images/folder-close.png" alt="" class="jstree-icon">
              <span>{{ node.label }}</span>
              <!-- <i class="s-checker" style="float: right;">
                <img
                  v-if="node.checked"
                  src="../../assets/images/check.png"
                  alt=""
                />
                <img
                  v-else
                  src="../../assets/images/uncheck.png"
                  alt=""
                />
              </i> -->
          </span>
        </el-tree>
      </div>
      <!-- tab 为标签 内容展示 -->
      <div class="dialog_choose_items_org" v-if="tabSelectActive === '标签'">
        <!-- 饿了么 树形懒加载 在弹层中使用会有BUG 因为它的执行是在DOM渲染时执行 所以可以用 v-if 来控制 -->
        <el-tree v-if="visible" lazy :load="loadNode" :props="defaultProps" node-key="we_id" :expand-on-click-node="false" @node-click="departmentSelect">
          <span slot-scope="{ node }" style="width: 100%; padding-right: 15px;">
              <img v-show="node.expanded" src="../../assets/images/folder-open.png" alt="" class="jstree-icon">
              <img v-show="!node.expanded" src="../../assets/images/folder-close.png" alt="" class="jstree-icon">
              <span>{{ node.label }}</span>
              <!-- <i class="s-checker" style="float: right;">
                <img
                  v-if="node.checker"
                  src="../../assets/images/check.png"
                  alt=""
                />
                <img
                  v-else
                  src="../../assets/images/uncheck.png"
                  alt=""
                />
              </i> -->
          </span>
        </el-tree>
      </div>
      <!-- tab 为成员 内容展示 -->
      <div class="mod-tree-people__box" v-if="tabSelectActive === '成员'" style="position: relative;">
        <!-- 左侧树形结构 -->
        <div
          class="mod-tree-people__org-list"
          style="width: 260px; height: 399px; overflow-y: auto"
        >
          <!-- 饿了么 树形懒加载 在弹层中使用会有BUG 因为它的执行是在DOM渲染时执行 所以可以用 v-if 来控制 -->
          <el-tree v-if="visible" lazy :load="loadNode" :props="defaultProps" :expand-on-click-node="false" @node-click="getList">
            <span slot-scope="{ node }">
                <img v-show="node.expanded" src="../../assets/images/folder-open.png" alt="" class="jstree-icon">
                <img v-show="!node.expanded" src="../../assets/images/folder-close.png" alt="" class="jstree-icon">
                <span>{{ node.label }}</span>
            </span>
          </el-tree>
        </div>
        <!-- 右侧列表 -->
        <div
          class="js_mbodyr"
          style="
            height: 399px;
            top: 0px;
            position: absolute;
            right: 0px;
            width: 338px;
            overflow-y: auto;
          "
        >
          <div
            class="mod-tree-people__people-list listview-list"
            style="overflow: auto; background: #ffffff"
          >
            <div
              class="mod-tree-people__people-item listview-item"
              v-for="item in staffsList"
              :key="item.id"
              @click="staffsListSelect(item)"
            >
              <img
                v-if="(item.we_avatar && item.we_avatar !== '')"
                :src="item.we_avatar"
                alt=""
                class="mod-tree-people__people-avatar"
              />
              <img
                v-else
                src="../../assets/images/picm.jpg"
                alt=""
                class="mod-tree-people__people-avatar"
              />
              <span class="mod-tree-people__people-name" v-html="item.we_name"></span>
              <div class="s-checker">
                <img
                  v-if="item.checker"
                  src="../../assets/images/check.png"
                  alt=""
                />
                <img
                  v-else
                  src="../../assets/images/uncheck.png"
                  alt=""
                />
              </div>
            </div>
            <div class="s-pages">
              <span>当前页：</span>
              <span>{{ queryForm.page }}</span>
              <span class="s-next" v-show="queryForm.page > 1" @click="pageTurning('up')">上一页</span>
              <span class="s-next" v-show="queryForm.page < staffsTotal" @click="pageTurning('down')">下一页</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div slot="footer" class="dialog-footer">
      <span>已选：{{ this.selectList.length }}</span>
      <div>
        <button class="btnClearAll" @click="deleteSelectListItem('all')">清空已选</button>
        <button class="greenBtn" type="primary" @click="ackSelect">
          确定
        </button>
      </div>
    </div>
  </el-dialog>
</template>
<script>
import { dept, staffs, search } from "@/api/public/ListWidget";

export default {
  name: "ListWidget",
  props: {
    visible: {    // 是否显示
      type: Boolean,
      default: false,
    },
    radio: {    // 是否单选
      type: Boolean,
      default: false,
    },
    tabType: {   // tab栏选择  (all 全部  department 部门  label 标签  member 成员)
      tye: String,
      default: "department"
    },
    emitType: {   // 不同的操作最终结果 派发给父组件时在父级页面根据此状态 做不同处理
      type: String,
      default: ""
    },
    selects: {  // 选中项列表
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      // 搜索框
      searchText: "",
      searchFlag: true,
      searchList: [],
      // 已选中的列表
      selectList: [],
      // tab 选项表
      tabList: [],
      tabSelectActive: "",
      // 左侧树形
      treeData: [],
      expends: [],
      defaultProps: {
        children: "children",
        label: "we_name",
        isLeaf: "leaf",
      },
      // 右侧列表 入参
      queryForm: {
        page: "1",
        we_id: "",
      },
      staffsTotal: 10,
      // 右侧人员列表
      staffsList: [],
    };
  },
  computed: {},
  watch: {
    visible(val) {
      if(val){
        if(this.tabType === '成员' || this.tabType === 'all') {
          this.getStaffs();
        }
      }
    },
    selects(val) {
      this.selectList = val;
    },
    tabType(val) {
      if(val && val !== 'all') {
        this.tabList = [{title: val}];
        this.tabSelectActive = val;
      }else{
        this.tabSelectActive = "部门";
        this.tabList = [{title: "部门"}, {title: "标签"}, {title: "成员"}];
      }
    },
  },
  methods: {
    // 设置 选中项的
    setSelectListChecker() {
      this.staffsList = this.staffsList.map(item => {
        let isExist = this.selectList.some(i => i.id === item.id);
        if(!isExist) {
          item.checker = false;
        }else{
          item.checker = true;
        }
        return item
      });
    },
    // 获取选人插件获取部门
    getStaffs(data = null) {
      if(data) Object.assign(this.queryForm, data);
      staffs(this.queryForm).then(res => {
        this.staffsList = res.data.list;
        this.setSelectListChecker();
        this.staffsTotal = res.data.total;
        this.queryForm.page = res.data.page;
      })
    },
    // 树形 懒加载
    loadNode(node, resolve) {
      if(this.visible) {
        let we_id = ""
        if (node.level > 0) {
          we_id = node.data.we_id
        }
        dept({we_id}).then(res => {
          let resolveData = res.data.map(i => {
            if(!i.children){ i.leaf = true }
            return i
          })
          resolve(resolveData)
        })
      } else {
        return resolve([]);
      }
    },
    // 弹框隐藏
    listWidgetHide() {
      this.$emit("listWidgetHide", false);
    },
    // tab 切换
    tabSelect(title) {
      this.tabSelectActive = title;
    },
    // tab 为部门 部门选择
    departmentSelect(data, node) {
      let node_keys = node.checked ? [] : [data.we_id];
      this.$refs.departmentTree.setCheckedKeys(node_keys);
      this.departmentListSelect({id: data.we_id, we_name: data.we_name});
    },
    // tab 为部门 选中/取消选中 数据处理
    departmentListSelect(row) {
      let isExist = this.selectList.some(i => i.id === row.id);
      if(!isExist) {
        this.selectList.push(row);
      }else{
        this.selectList = this.selectList.filter(i => i.id !== row.id);
      }
    },
    // 确认选择
    ackSelect(){
      if(this.radio && this.selectList.length > 1) {
        this.$message({
          showClose: true,
          message: "当前内容不可以多选",
          type: 'warning'
        });
      }else{
        this.$emit("ackSelect", { emitType: this.emitType, visible: false, selects: this.selectList, tabType: this.tabSelectActive });
      }
    },
    // 树形点击获取右侧列表
    getList(data){
      this.queryForm.we_id = data.we_id;
      this.getStaffs();
    },
    // 分页获取上/下 一页
    pageTurning(type) {
      let data = {};
      if(type === 'down') {
        data.page = Number(this.queryForm.page + 1);
      }else{
        data.page = Number(this.queryForm.page - 1);
      }
      this.getStaffs(data);
    },
    // 头部搜索
    widgetSearch() {
      if(this.searchFlag){
        search({ keyword: this.searchText }).then(res => {
          this.searchList = res.data.staff;
        })
      }
    },
    // 选中搜索项
    setSelectList(row) {
      let isExist = this.selectList.some(i => i.id === row.id);
      if(!isExist){
        this.selectList.push(row);
        this.searchText = "";
        this.searchList = [];
      }
      this.setSelectListChecker();
    },
    // 删除当前选中项
    deleteSelectListItem(id) {
      if(id === 'all') {
        this.selectList = [];
      } else {
        this.selectList = this.selectList.filter(i => i.id !== id);
      }
      this.setSelectListChecker();
    },
    // 右侧列表选中/取消选中
    staffsListSelect(row) {
      let isExist = this.selectList.some(i => i.id === row.id);
      if(!isExist) {
        this.staffsList = this.staffsList.map(i => {
          if(i.id === row.id) {
            i.checker = true;
          }
          return i
        })
        this.selectList.push(row);
      }else{
        this.staffsList = this.staffsList.map(i => {
          if(i.id === row.id) {
            i.checker = false;
          }
          return i
        })
        this.selectList = this.selectList.filter(i => i.id !== row.id);
      }
    },
  },
};
</script>
<style lang='less' scoped>
.modal-content {
  font-size: 14px;
  /deep/.el-dialog {
    border-radius: 10px;
  }
  /deep/.el-dialog__header {
    height: 45px;
    padding: 10px 24px;
    border-bottom: 1px solid #ccc;
    background-color: #f3f3f3;
    text-align: center;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
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
    padding: 0;
    .mod-tree-people__input {
      position: relative;
      max-height: 84px;
      min-height: 35px;
      margin-right: 100px;
      margin: 20px;
      width: calc(100% - 40px);
      border: 1px solid #eaeaea;
      height: auto;
      .token-input-list {
        margin-bottom: 0;
        overflow-x: hidden;
        overflow-y: auto;
        max-height: 84px;
        padding: 3px 5px 0;
        line-height: normal;
        .mod-lozenges__item {
          background: #eee;
          height: 24px;
          display: inline-block;
          color: #222;
          vertical-align: top;
          margin-right: 5px;
          margin-bottom: 3px;
          position: relative;
          font-size: 0;
          border-radius: 2px;
          background-clip: padding-box;
          .mod-lozenges__icon {
            display: inline-block;
            height: 24px;
            width: 24px;
            i {
              display: block;
              height: 24px;
              width: 24px;
              img {
                height: 24px;
                width: 24px;
              }
            }
          }
          .mod-lozenges__text {
            display: inline-block;
            height: 24px;
            line-height: 24px;
            vertical-align: top;
            margin: 0 7px;
            font-size: 14px;
          }
          .mod-lozenges__close-icon {
            display: inline-block;
            vertical-align: bottom;
            width: 20px;
            height: 20px;
            margin-top: 2px;
            cursor: pointer;
            font-size: 10px;
          }
        }
        .token-input-input-token {
          display: inline-block;
          margin-bottom: 5px;
          .input_group_add {
            vertical-align: middle;
            padding: 2px;
            height: 20px;
            border: none;
            line-height: 20px;
            color: #777;
            outline: 0;
            cursor: pointer;
            min-height: 25px;
            width: 114px;
          }
        }
      }
      .search-box {
        width: 518px;
        margin-top: -1px;
        padding: 0;
        position: absolute;
        list-style: none;
        background: #fff;
        border-top: 1px solid #d2d2d2;
        border-left: 1px solid #d2d2d2;
        border-right: 1px solid #d2d2d2;
        z-index: 11;
        li {
          padding: 8px;
          border-bottom: 1px solid #d2d2d2;
          color: #0b0b0b;
          cursor: pointer;
          .mod-tree-people__people-avatar {
            width: 28px;
            height: 28px;
            display: inline-block;
            border-radius: 2px;
            background-clip: padding-box;
            border: 1px solid #e5e5e5;
            vertical-align: middle;
            margin-right: 5px;
          }
        }
      }
    }
    .modal-body {
      border-bottom-right-radius: 6px;
      overflow: hidden;
      padding: 0 20px 20px;
      position: relative;
      .js_head {
        position: relative;
        height: 30px;
        line-height: 30px;
        color: #d8d8d8;
        margin-bottom: 12px;
        .user-manage-href {
          color: #999;
          position: absolute;
          right: 10px;
          top: 0;
          font-size: 12px;
          a {
            color: #f1b22b;
            text-decoration: underline;
          }
        }
        .tab_filetype_items {
          overflow: hidden;
          padding: 0;
          margin: 0;
          li {
            float: left;
            list-style: none;
            margin-right: 30px;
            span {
              font-size: 14px;
              border-bottom: 3px solid #fff;
              float: left;
              color: #999999;
              height: 30px;
              line-height: 30px;
              text-align: center;
              box-sizing: border-box;
            }
            .active {
              font-size: 16px;
              font-weight: bold;
              color: #333333;
              border-bottom: 3px solid #1aac88;
            }
          }
        }
      }
      // tab 为部门 内容展示
      .dialog_choose_items_org {
        height: 399px;
        padding-top: 8px;
        overflow-y: auto;
      }
      .mod-tree-people__people-list {
        height: 100%;
        border-left: 1px solid #e5e5e5;
        .mod-tree-people__people-item {
          height: 40px;
          position: relative;
          padding: 5px 15px;
          border-bottom: 1px solid #e5e5e5;
          cursor: pointer;
          .mod-tree-people__people-avatar {
            width: 28px;
            height: 28px;
            display: inline-block;
            border-radius: 2px;
            background-clip: padding-box;
            border: 1px solid #e5e5e5;
            vertical-align: middle;
            margin-right: 5px;
          }
          .mod-tree-people__people-name {
            height: 30px;
            line-height: 30px;
            vertical-align: middle;
          }
          .s-checker {
            display: inline-block;
            height: 19px;
            width: 19px;
            position: absolute !important;
            right: 15px;
            top: 12px;
            img {
              height: 19px;
              width: 19px;
            }
          }
        }
        .s-pages {
          display: flex;
          justify-content: center;
          align-items: center;
          text-align: center;
          padding: 10px;
          font-size: 12px;
          .s-next {
            background: #fff4dc;
            color: #f1b22b;
            margin-right: 5px;
            width: 48px;
            height: 22px;
            border-radius: 2px;
            text-align: center;
            line-height: 22px;
            margin-left: 5px;
            cursor: pointer;
          }
        }
      }
      .jstree-icon{
        width: 12px;
        height: 11px;
        margin-right: 6px;
        background-repeat: no-repeat;
        background-color: transparent;
      }
    }
  }
  /deep/.el-dialog__footer {
    height: 66px;
    padding: 0 20px 30px;
    .dialog-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .btnClearAll {
        color: #cccccc;
        border: 1px solid #ccc;
        background: #fff;
        width: 110px;
        border-radius: 3px;
        height: 36px;
        padding: 0 !important;
        margin-right: 18px;
      }
      .greenBtn {
        color: white;
        background-color: #2cbb97;
        border: 1px solid transparent;
        width: 110px;
        border-radius: 3px;
        height: 36px;
        padding: 0 !important;
      }
    }
  }
}
.hide {
  display: none;
}
</style>