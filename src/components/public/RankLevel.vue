<template>
    <el-select :value="value" v-bind="$attrs" v-on="$listeners" size="small">
        <el-option-group v-for="(group, key) in data" :key="key" :label="group.title">
            <el-option v-for="item in group.position" :key="item.id" :label="item.rank_no+' '+item.title" :value="item.id"></el-option>
        </el-option-group>
    </el-select>
</template>

<script>

export default {
   name: 'RankLevel',
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
   },
   data() {
     return {
       
     }
   },
   computed: {
     
   },
   watch: {
     
   },
   methods: {
     
   }
};
</script>

<style lang='less' scoped>

</style>