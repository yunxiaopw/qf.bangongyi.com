<!-- 数据填报移动端 -->
<template>
    <div class="container_main">
        <div class="card" >
            <div class="cardBtn" v-for="(item, index) in cardList" :key="index">
                <van-cell value="内容" is-link :label="item.label">
                <!-- 使用 title 插槽来自定义标题 -->
                <template #title>
                    <span class="custom-title">{{ item.title }}</span>
                    <!-- <van-tag color="#ffe1e1" text-color="#ad0000">标签</van-tag> -->
                    <van-tag color="#FFF3D0" text-color="#FF9C00" v-if="item.id == 1003">{{ item.value }}</van-tag>

                </template>
            </van-cell>
            <van-cell :title="item.title" :value="item.value"  />
            </div>
           
        </div>
    </div>
</template>
<script>
export default {
    name: 'addCollect',
    data() {
        return {
            cardList: [
                { id: 1001, title: '采集表1', value: '描述文字' ,label:'描述信息'},
                { id: 1002, title: '采集表1', value: '描述文字' ,label:'描述信息'},
                { id: 1003, title: '采集表1', value: '描述文字' ,label:'描述信息'},
                { id: 1004, title: '采集表1', value: '描述文字' ,label:'描述信息'},

            ]
        }
    }
}
</script>
<style>
.custom-title {
    margin-right: 4px;
    vertical-align: middle;
}

.search-icon {
    font-size: 16px;
    line-height: inherit;
}

.card {
    margin: 16dp 24dp;
    box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.09);
    border-radius: 4px;
}
.van-cell::after {
    border-bottom:0;
}
</style>