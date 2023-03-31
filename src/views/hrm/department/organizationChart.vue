<template>
  <div class="mian-box">
    <HeadLine goback>
      组织架构图
      <template #r-content>
        <div class="t-r-btn">
          <el-popover
            placement="bottom"
            width="200"
            trigger="click">
              <el-checkbox style="margin-bottom: 10px" v-model="shows.master" label="隐藏负责人"></el-checkbox>
              <el-checkbox style="margin-bottom: 10px" v-model="shows.leads" label="隐藏次负责人"></el-checkbox>
              <el-checkbox v-model="shows.count" label="隐藏员工数量"></el-checkbox>
            <el-button size="small" slot="reference">显示设置</el-button>
          </el-popover>
        </div>
      </template>
    </HeadLine>
    <!-- 组织结构图 -->
    <div ref="myPage" class="graph-box" style="height:calc(100vh - 56px);" @click="isShowNodeMenuPanel = false">
      <SeeksRelationGraph
        ref="seeksRelationGraph"
        :options="graphOptions">
        <div slot="node" slot-scope="{node}">
          <div class="item">
            <div class="top">
              <el-tooltip class="item" effect="dark" :content="node.data.we_name" placement="top">
                <div class="title text-hidden">{{ node.data.we_name }}</div>
              </el-tooltip>
              <span @click.stop="showNodeMenus(node.data, $event)" @contextmenu.prevent.stop="showNodeMenus(node.data, $event)"><el-icon class="el-icon-more"></el-icon></span>
            </div>
            <div class="bottom" v-show="infoShow">
              <div v-show="!shows.master" class="li"><span class="label">负责人：</span><span class="content">{{ node.data.master }}</span>
                <i
                  class="el-icon-edit pointer hover-icon"
                  @click="dialogListWidget(node.data, true, 'basics_master')"
                ></i>
              </div>
              <div v-show="!shows.leads" class="li"><span class="label">次负责人：</span><span class="content">{{ node.data.leads }}</span>
                <i
                  class="el-icon-edit pointer hover-icon"
                  @click="dialogListWidget(node.data, false, 'basics_lead')"
                ></i>
              </div>
              <div v-show="!shows.count" class="li"><span class="label">员工数量：</span><span class="content-num">{{ node.data.count }}</span></div>
            </div>
          </div>
        </div>
      </SeeksRelationGraph>
    </div>
    <div v-show="isShowNodeMenuPanel" class="node-menu-panel" :style="{left: nodeMenuPanelPosition.x + 'px', top: nodeMenuPanelPosition.y + 'px' }">
      <div class="c-node-menu-item" @click.stop="doAction('add')">增加下级部门</div>
      <div class="c-node-menu-item" @click.stop="doAction('edit')">编辑</div>
    </div>

    <!-- 新增下级/修改本级 弹层 -->
    <el-dialog
      class="dialog"
      :title="addChildrenTitle"
      width="480px"
      :visible.sync="addChildrenDialog"
      destroy-on-close
    >
      <el-form
        :model="addForm"
        :rules="addRules"
        ref="addForm"
        label-width="100px"
        class="demo-addForm"
      >
        <el-form-item label="组织编码：" prop="dept_no">
          <el-input size="small" v-model="addForm.dept_no"></el-input>
        </el-form-item>
        <el-form-item label="组织名称：" prop="we_name">
          <el-input size="small" v-model="addForm.we_name"></el-input>
        </el-form-item>
        <el-form-item label="组织类型：" prop="type">
          <el-select
            size="small"
            v-model="addForm.type"
            placeholder="请选择组织类型"
          >
            <el-option v-for="(item, index) in addFormTypes" :key="index" :label="item.label" :value="item.label"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="组织描述：" prop="description">
          <el-input
            size="small"
            type="textarea"
            v-model="addForm.description"
          ></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="addChildrenDialog = false"
          >取消</el-button
        >
        <el-button size="small" type="primary" @click="submitForm('addForm')"
          >保存</el-button
        >
      </div>
    </el-dialog>

    <!-- 修改 主/子负责人弹层 -->
    <ListWidget :tabType="listWidgetTabType" :emitType="listWidgetEmitType" :selects="listWidgetSelects" :radio="listWidgetRadio" :visible="listWidgetShow" @ackSelect="ackSelect" @listWidgetHide="listWidgetHide" />
  </div>
</template>

<script>
import SeeksRelationGraph from 'relation-graph'
import { departmentChild, departmentInfo, createChild, departmentEdit } from "@/api/hrm/department"

export default {
  name: 'Demo',
  components: { SeeksRelationGraph },
  data() {
    return {
      we_id: null,
      // 这里可以参考"Graph 图谱"中的参数进行设置 http://relation-graph.com/#/docs/graph
      graphOptions: {
        allowSwitchLineShape: false,
        defaultJunctionPoint: 'border',
        defaultExpandHolderPosition: "bottom",
        backgrounImageNoRepeat: true,
        isMoveByParentNode: false,
        defaultNodeWidth: "200",
        defaultNodeShape: 1,
        defaultLineShape: 4,
        defaultJunctionPoint: "tb",
        defaultNodeColor: "#FFFFFF",
        defaultNodeFontColor: "#D9D9D9",
        defaultNodeBorderWidth: 0,
        layouts: [
          {
            label: "tree",
            layoutName: "tree",
            layoutClassName: "seeks-layout-center",
            defaultJunctionPoint: "border",
            defaultNodeShape: 0,
            defaultLineShape: 1,
            min_per_width: "250",
            max_per_width: "250",
            min_per_height: "220",
            max_per_height: "220",
          }
        ],
        defaultLineMarker: {
          markerWidth: 12,
          markerHeight: 12,
          refX: 6,
          refY: 6,
          data: "M2,2 L10,6 L2,10 L6,6 L2,2"
        },
      },
      // 结构图数据
      graphJsonData: {
        rootId: "",
        nodes: [],
        links: [],
      },
      // 显示设置 相关
      shows: {
        master: false,
        leads: false,
        count: false,
      },
      isShowNodeMenuPanel: false,
      nodeMenuPanelPosition: { x: 0, y: 0 },
      currentNode: {},
      
      // 弹层
      addChildrenDialog: false,
      addChildrenTitle: "",
      addForm: {
        dept_no: "",
        we_name: "",
        type: "",
        description: "",
      },
      addRules: {
        dept_no: [{ required: true, message: "请输入组织编号", trigger: "blur" }],
        we_name: [{ required: true, message: "请输入组织名称", trigger: "blur" }],
        type: [{ required: true, message: "请选择组织类型", trigger: "change" }],
      },
      addFormTypes: [
        { label: "部门", },
        { label: "中心", },
        { label: "组", },
        { label: "事业部", },
        { label: "事业群", },
        { label: "办公室", },
        { label: "区域", },
        { label: "项目组", },
        { label: "子公司", },
        { label: "门店", },
        { label: "网点", },
        { label: "分支机构", },
      ],
      // ListWidget 组件相关数据
      listWidgetShow: false,
      listWidgetRadio: false,
      listWidgetEmitType: "",
      listWidgetTabType: "",
      listWidgetSelects: [],
    }
  },
  computed: {
    // 详细信息整体显示情况
    infoShow(){
      return Object.values(this.shows).some(i => !i)
    }
  },
  async created() {
    this.we_id = this.$route.query.id;
    await this.showSeeksGraph();
  },
  methods: {
    // 初始化结构图
    async showSeeksGraph() {
      await this.getDepartmentInfo(this.we_id);
      await this.getDepartmentChild(this.graphJsonData.nodes);

      let { rootId, nodes, links } = this.graphJsonData;
      var __graph_json_data = {
          rootId,
          nodes,
          links
      }
      this.$refs.seeksRelationGraph.setJsonData(__graph_json_data)
    },
    // 获取一级 数据详情
    async getDepartmentInfo(we_id, isAddForm = false){
      await departmentInfo({we_id}).then(res => {
        // 是否赋值给 addForm
        if(!isAddForm){
          this.graphJsonData.rootId = res.data.we_id;
          this.graphJsonData.nodes = this.setId([res.data])
        }else{
          this.addForm = res.data
        }
      })
    },
    // 获取子级结构数据
    async getDepartmentChild(parentData) {
      this.graphJsonData.nodes[0].children = await this.setChildrens(parentData[0].id);
    },
    // 递归获取全部子级数据
    async setChildrens(we_id){
      let { data } = await departmentChild({we_id})
      if(data) {
        data = this.setId(data)
        if(data.length > 0){
            for (let index = 0; index < data.length; index++) {
              if(data[index].children){
                data[index].children = await this.setChildrens(data[index].id)
              }
            }
        }
        return data
      }
    },
    // 设置 nodes 的必须值 id 以及数据组件指定的自定义数据 data
    setId(data){
      return data.map(i => {
        i = {
          id: i.we_id,
          data: i,
          disableDrag: true,
          children: i.children
        }
        return i
      })
    },
    // 打开节点操作栏
    showNodeMenus(nodeObject, $event) {
      this.currentNode = nodeObject
      var _base_position = this.$refs.myPage.getBoundingClientRect()
      this.isShowNodeMenuPanel = true
      this.nodeMenuPanelPosition.x = $event.clientX - _base_position.x
      this.nodeMenuPanelPosition.y = $event.clientY - _base_position.y + 56
    },
    // 操作栏的某一项
    async doAction(type) {
      this.isShowNodeMenuPanel = false;
      if(type === 'add'){
        this.resetAddForm();
        this.addForm.we_parentid = this.currentNode.we_id;
        this.addChildrenTitle = "新增下级";
        this.addChildrenDialog = true;
      }else if(type === 'edit'){
        await this.getDepartmentInfo(this.currentNode.we_id, true);
        this.addChildrenTitle = "编辑本级";
        this.addChildrenDialog = true;
      }
    },
    // 重置新增/修改弹层表单数据
    resetAddForm() {
      this.addForm = {
        dept_no: "",
        we_name: "",
        type: "",
        description: "",
      }
    },
    // 新增下级/修改本级 保存
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if(this.addChildrenTitle === "新增下级"){
            createChild(this.addForm).then(async (res) => {
              this.$message({
                showClose: true,
                message: res.errmsg,
                type: 'success'
              });
              this.resetAddForm();
              this.addChildrenDialog = false;
              await this.showSeeksGraph();
            }).catch((error) => {
              this.$message({
                showClose: true,
                message: error.errmsg,
                type: 'error'
              });
            })
          }else if(this.addChildrenTitle === "编辑本级"){
            departmentEdit(this.addForm).then(async (res) => {
              this.$message({
                showClose: true,
                message: res.errmsg,
                type: 'success'
              });
              this.resetAddForm();
              this.addChildrenDialog = false;
              await this.showSeeksGraph();
            }).catch((error) => {
              this.$message({
                showClose: true,
                message: error.errmsg,
                type: 'error'
              });
            })
          }
        } else {
          return false;
        }
      });
    },
    // 修改主/子负责人弹层 隐藏
    listWidgetHide(visible){
      this.listWidgetShow = visible;
    },
    // 修改 主/子负责人弹层
    async dialogListWidget(data, radio = false, emitType) {
      if(emitType === "basics_master") {
        // 主负责人
        await this.getDepartmentInfo(data.we_id, true);
        let we_names = data.master.split(',').filter(i=> i && i.trim());
        if(data.master_id > 0) { 
          this.listWidgetSelects = data.master_id.split(',').filter(i=> i && i.trim()).map((i, index) => (i = {id: i , we_name: we_names[index]}));
        }else{
          this.listWidgetSelects = [];
        }
        this.listWidgetTabType = "成员";
      }else if(emitType === "basics_lead"){
        // 子负责人
        await this.getDepartmentInfo(data.we_id, true);
        let we_names = data.leads.split(',').filter(i=> i && i.trim());
        this.listWidgetSelects = data.lead_ids.split(',').filter(i=> i && i.trim()).map((i, index) => (i = {id: i , we_name: we_names[index]}));
        this.listWidgetTabType = "成员";
      }
      this.listWidgetShow = true;
      this.listWidgetRadio = radio;
      this.listWidgetEmitType = emitType;
    },
    // 查询/修改 主/子负责人弹层 确定
    ackSelect(data) {
      let { emitType, visible, selects } = data;
      this.listWidgetShow = visible;
      this.listWidgetSelects = selects;
      if(emitType === "basics_master") {
        // 主负责人
        this.addForm.master_id = selects.map(i => i.id).join(",");
        departmentEdit(this.addForm).then(async (res) => {
          this.$message({
            showClose: true,
            message: res.errmsg,
            type: 'success'
          });
          this.resetAddForm();
          this.addChildrenDialog = false;
          await this.showSeeksGraph();
        }).catch((error) => {
          this.$message({
            showClose: true,
            message: error.errmsg,
            type: 'error'
          });
        })
      }else if(emitType === "basics_lead") {
        // 子负责人
        this.addForm.lead_ids = selects.map(i => i.id).join(",");
        departmentEdit(this.addForm).then(async (res) => {
          this.$message({
            showClose: true,
            message: res.errmsg,
            type: 'success'
          });
          this.resetAddForm();
          this.addChildrenDialog = false;
          await this.showSeeksGraph();
        }).catch((error) => {
          this.$message({
            showClose: true,
            message: error.errmsg,
            type: 'error'
          });
        })
      }
    },
  }
}
</script>

<style lang="less" scoped>
.mian-box{
  background-color: #f5f5f5;
  .graph-box{
    // 块内容区样式
    .item{
      font-size: 10px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #8C8C8C;
      .top{
        height: 36px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .title{
          font-weight: 600;
          color: #1F1F1F; 
          font-size: 14px;
          width: 143px;
          text-align: left;
        }
      }
      .bottom{
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        border-top: 1px solid #F0F0F0;
        .li{
          margin-bottom: 4px;
          display: flex;
          justify-content: space-between;
          .label{
            text-align: left;
            width: 60px;
          }
          .content{
            width: calc(100% - 72px);
            text-align: left;
            // word-break: break-all;
          }
          .content-num{
            width: calc(100% - 60px);
            text-align: left;
          }
          i{
            line-height: 22px;
            opacity: 0;
          }
        }
        .li:nth-child(1){
          padding-top: 4px;
        }
      }
      .bottom:hover{
        i{
          opacity: 1;
        }
      }
    }

    // 内置样式穿透修改
    /deep/.rel-map{
      background-color: #f5f5f5;
    }
    /deep/svg{
      background-color: #f5f5f5;
    }
    // 层级高遮住了内容块 导致所有点击事件无法生效
    /deep/.c-btn-open-close{
      z-index: -1;
    }
    /deep/.c-expanded,/deep/.c-collapsed{
      background-color: #ccc !important;
    }
    /deep/.rel-node-peel{
      cursor: pointer;
    }
    /deep/.rel-node{
      border-left: 4px solid #059274 !important;
    }
  }
}

// 节点操作栏样式
.node-menu-panel{
  z-index: 999;
  background-color: #ffffff;
  border:#eeeeee solid 1px;
  position: absolute;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #1AAC88;
  .c-node-menu-item{
    line-height: 35px;
    padding: 0 12px;
    cursor: pointer;
  }
  .c-node-menu-item:hover{
    background-color: rgba(26,172,136,0.09);
    color: #434343;
  }
}

</style>