<template>
  <el-select ref="select" :value="value" size="small" @visible-change="visibleChange" v-bind="$attrs" v-on="$listeners" @clear="clear">
    <el-option ref="option" class="option" :value="optionData.id" :label="optionData.name">
      <el-tree ref="tree" class="tree" :node-key="nodeKey" :data="data" :props="props" :default-expanded-keys='[value]' highlight-current :expand-on-click-node="false" @node-click="handleNodeClick"></el-tree>
    </el-option>
  </el-select>
</template>

<script>
export default { 
  name: 'TreeSelect',
  props: {
    // v-model绑定
    value: {
      type: [String, Number],
      default: ''
    },
    // 树形的数据
    data: {
      type: Array,
      default: function() {
        return []
      }
    },
    // 每个树节点用来作为唯一标识的属性
    nodeKey: {
      type: [String, Number],
      default: 'id'
    },
    // tree的props配置
    props: {
      type: Object,
      default: function() {
        return {
          label: 'label',
          children: 'children'
        }
      }
    }
  },
  data() {
    return {
      optionData: {
        id: '',
        name: ''
      }
    }
  },
  watch: {
    value: {
      handler(val) {
        if ((!!val || val === 0) && !this.isEmpty(this.data)) {
          this.init(val)
        }
      },
      immediate: true
    },
    data: function(val) {
      if (!this.isEmpty(val)) {
        this.init(this.value)
      }
    }
  },
  methods: {
    // 是否为空
    isEmpty(val) {
      for (let key in val) {
        return false
      }
      return true
    },
    handleNodeClick(data) {
      if(!data.disabled) {
        this.$emit('input', data[this.nodeKey])
        this.$refs.select.visible = false
      }else{
        this.$message({
          message: '此项禁止选择',
          type: 'warning'
        });
      }
    },
    init(val) {
      if ((val || val === 0)) {
        this.$nextTick(() => {
          this.$refs.tree.setCurrentKey(val)
          let node = this.$refs.tree.getNode(val)
          this.optionData.id = val
          this.optionData.name = node.label
        })
      } else {
        this.$refs.tree.setCurrentKey(null)
      }
    },
    visibleChange(e) {
      if (e) {
        let selectDom = this.$refs.tree.$el.querySelector('.is-current')
        setTimeout(() => {
          this.$refs.select.scrollToOption({ $el: selectDom })
        }, 0)
      }
    },
    clear() {
      this.$emit('input', '')
    }
  }
}
</script>

<style scoped>
.option {
  height: auto;
  line-height: 1;
  padding: 0;
  background-color: #fff;
}

.tree {
  padding: 4px 20px;
  font-weight: 400;
}
</style>