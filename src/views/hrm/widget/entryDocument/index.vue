<template>
   <div class="widget_main_box">
    <!-- 个人资料 -->
    <div class="card">
        <!-- <div class="card_head">
            <span class="card_head_title">个人资料</span>
            <van-icon name="edit" class="card_head_icon" @click="goRouter('editUserInfor')" />
        </div> -->
        <div class="user_infor_card">
            <div class="user_infor">
                <div class="user_infor_name">闫波岚</div>
                <div class="user_infors">女 · 26岁 · 吉林</div>
            </div>
            <van-icon name="edit" class="card_head_icon" @click="goRouter('editUserInfor')" />
        </div>
    </div>

    <!-- 教育经历 -->
    <div class="card">
        <div class="card_head">
            <span class="card_head_title">教育经历</span>
            <van-icon name="add-o" class="card_head_icon" @click="goRouter('editUserInfor')" />
        </div>
        <div class="card_infor_list">
            <div class="card_infor" v-for="(item, index) in 2" :key="index">
                <div class="card_infor_top">
                    <div class="card_infor_top_left">清华大学附属学校名字是这个名字啊啊</div>
                    <div class="card_infor_top_right">
                        <div class="card_infor_time">2015.09.13-2018.06.13</div>
                        <van-icon name="arrow" class="arrow_icon" />
                    </div>
                </div>
                <div class="card_infor_li">离职原因：离职原因是这个啊啊啊啊啊哈哈就咔咔的见到请…</div>
            </div>
        </div>
    </div>

    <!-- 工作经历 -->
    <div class="card">
        <div class="card_head">
            <span class="card_head_title">工作经历</span>
            <van-icon name="add-o" class="card_head_icon" @click="goRouter('editUserInfor')" />
        </div>
    </div>

    <!-- 培训经历 -->
    <div class="card">
        <div class="card_head">
            <span class="card_head_title">培训经历</span>
            <van-icon name="add-o" class="card_head_icon" @click="goRouter('editUserInfor')" />
        </div>
    </div>

    <!-- 紧急联系人 -->
    <div class="card">
        <div class="card_head">
            <span class="card_head_title">紧急联系人</span>
            <van-icon name="add-o" class="card_head_icon" @click="goRouter('editUserInfor')" />
        </div>
    </div>

    <!-- 家庭成员 -->
    <div class="card">
        <div class="card_head">
            <span class="card_head_title">家庭成员</span>
            <van-icon name="add-o" class="card_head_icon" @click="goRouter('editUserInfor')" />
        </div>
    </div>

    <!-- 底部按钮 -->
    <div class="bottom_btn">
        <van-button round size="large" color="#1AAC88">提交</van-button>
    </div>
   </div>
</template>

<script>
export default {
   name: 'entryDocument',
   data() {
     return {
       
     }
   },
   computed: {
     
   },
   watch: {
     
   },
   created() {
     
   },
   methods: {
    // 路由页面跳转
    goRouter(path, id = null) {
      if (id !== null) {
        this.$router.push({ path, query: { id } });
      }else{
        this.$router.push({ path });
      }
    },
   }
};
</script>

<style lang='less' scoped>
// 信息卡片
.card {
    background: #fff;
    .card_head, .user_infor_card {
        padding: .26rem .48rem .26rem .4rem;
        display: flex;
        justify-content: space-between;
        .card_head_title, .card_head_icon {
            font-size: .32rem;
            font-weight: 600;
            color: rgba(0,0,0,0.85);
        }
    }
    .card_head {
        height: 1rem;
        .card_head_title, .card_head_icon {
            font-size: .32rem;
            font-weight: 600;
            color: rgba(0,0,0,0.85);
        }
    }
    .user_infor_card {
        .user_infor {
            width: 5.86rem;
            .user_infor_name {
                font-size: .4rem;
                font-weight: 600;
                color: rgba(0,0,0,0.85);
            }
            .user_infors {
                margin-top: .08rem;
                font-size: .24rem;
                font-weight: 500;
                color: rgba(0,0,0,0.45);
            }
        }
    }
    .card_infor_list {
        padding: 0 .4rem;
        .card_infor {
            padding: .24rem 0;
            .card_infor_top {
                display: flex;
                justify-content: space-between;
                .card_infor_top_left {
                    width: 3.45rem;
                    font-size: .28rem;
                    font-weight: 500;
                    color: rgba(0,0,0,0.85);
                }
                .card_infor_top_right {
                    height: .36rem;
                    display: flex;
                    align-items: center;
                    .card_infor_time {
                        font-size: .24rem;
                        font-weight: 400;
                        color: rgba(0,0,0,0.45);
                    }
                    .arrow_icon {
                        font-size: .28rem;
                        font-weight: 500;
                        color: rgba(0,0,0,0.45);
                        margin-left: .04rem;
                    }
                }
            }
            .card_infor_li {
                font-size: .24rem;
                font-weight: 500;
                color: rgba(0,0,0,0.45);
                text-overflow: ellipsis;
                white-space: nowrap;
                overflow: hidden;
                margin-top: .08rem;
            }
        }
        .card_infor+.card_infor {
            border-top: 1px solid rgba(0,0,0,0.1);
        } 
    }
    
}
.card+.card::before {
    content: "";
    display: block;
    height: .16rem;
    background: #E7E9EB;
}

// 底部按钮
.bottom_btn {
    padding: .8rem .4rem .4rem;
}
</style>