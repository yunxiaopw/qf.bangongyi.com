<template>
    <div class="main-box">
        <!-- 页头 -->
        <HeadLine goback>简历解析</HeadLine>

        <!-- 内容区 -->
        <div class="content_box">
            <div class="content_top">
                <div class="content_top_item">
                    <div class="content_top_item_label">姓名：</div>
                    <div class="content_top_item_value">小小</div>
                </div>
                <div class="content_top_item">
                    <div class="content_top_item_label">
                        简历：
                    </div>
                    <div class="content_top_item_value">
                        <el-radio v-model="radio" label="1">使用已有简历</el-radio>
                        <span class="color_green"><i class="iconfont icon-fujiantubiao"></i>这里是文件名字.pdf</span>
                        <i class="iconfont icon-eye"></i>
                    </div>
                </div>
                <div class="content_top_item">
                    <div class="content_top_item_label"></div>
                    <div class="content_top_item_value">
                        <el-radio v-model="radio" label="2">上传新文件</el-radio>
                    </div>
                </div>
                <div class="content_top_item">
                    <div class="content_top_item_label"></div>
                    <div class="content_top_item_value">
                        <el-upload
                        class="upload-demo"
                        action="https://jsonplaceholder.typicode.com/posts/"
                        :on-preview="handlePreview"
                        :on-remove="handleRemove"
                        :before-remove="beforeRemove"
                        multiple
                        :limit="3"
                        :on-exceed="handleExceed"
                        :file-list="fileList">
                            <el-button size="small" type="primary">点击上传</el-button>
                            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                        </el-upload>
                    </div>
                </div>
            </div>
            
            <div class="content_bottom">
                <div class="progress" v-if="!resultShow">
                    <!-- 解析进度 -->
                    <el-button type="primary" size="small" v-if="analyticProgress === '1'" @click="analytic">开始解析</el-button>
                    <div v-if="analyticProgress === '2'" class="progress_2">
                        <el-progress :stroke-width="8" :percentage="percentage" :status="progressStatus" :color="progressColor"></el-progress>
                        <el-button type="primary" size="small" @click="analytic('reset')">重新解析</el-button>
                    </div>
                </div>
                <div class="progress_finish" v-else>
                    <div class="progress_finish_head">
                        <div class="title">解析结果</div>
                        <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
                    </div>
                    <div class="progress_finish_content">
                        <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                            <el-checkbox v-for="city in cities" :label="city" :key="city">
                                {{city}}：
                                <el-input placeholder="请输入内容" v-model="analyticForm.input" size="small"></el-input>
                            </el-checkbox>
                        </el-checkbox-group>
                        <div class="progress_finish_btn">
                            <el-button type="primary" size="small" @click="setAnalytic">保存解析结果</el-button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: "resumeAnalysis",
    data () {
        return {
            radio: '1',
            // 文件
            fileList: [{name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}],
            // 进度条进度
            percentage: 0,
            // 进度条计时器
            timestamp: null,
            // 解析结果显示
            resultShow: true,
            // 解析中进度
            analyticProgress: '1',
            // 解析结果多选相关
            checkAll: false,
            cities: ['上海', '北京', '广州', '深圳'],
            checkedCities: ['上海', '北京'],
            isIndeterminate: true,
            // 解析项内容
            analyticForm: {}
        }
    },
    computed: {
        // 进度条颜色
        progressColor() {
            if(this.percentage < 100) return '#0F78FD';
            return ''
        },
        // 进度条状态
        progressStatus() {
            if(this.percentage < 100) return null;
            return 'success'
            // return 'exception'
        }
    },
    created () {
    },
    methods: {
        // 解析
        analytic(type) {
            this.analyticProgress = '2';
            this.setPercentage(type);
        },
        // 模拟进度条
        setPercentage(type) {
            this.percentage = 0;
            if(type === 'reset') clearInterval(this.timestamp);
            this.timestamp = setInterval(()=> {
                this.percentage += 5;
                if(this.percentage >= 100) {
                    clearInterval(this.timestamp);
                    setTimeout(()=> {
                        this.resultShow = true;
                    }, 1000)
                }
            },200);
        },
        // 全选
        handleCheckAllChange(val) {
            this.checkedCities = val ? this.cities : [];
            this.isIndeterminate = false;
        },
        handleCheckedCitiesChange(value) {
            let checkedCount = value.length;
            this.checkAll = checkedCount === this.cities.length;
            this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
        },
        // 保存解析结果
        setAnalytic() {

        },

        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePreview(file) {
            console.log(file);
        },
        handleExceed(files, fileList) {
            this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
        },
        beforeRemove(file, fileList) {
            return this.$confirm(`确定移除 ${ file.name }？`);
        }
    },
}
</script>

<style  lang="less" scoped>
.content_box {
    width: 100%;
    padding: 24px;
    .content_top {
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin-bottom: 16px;
        .content_top_item {
            width: 400px;
            display: flex;
            .content_top_item_label {
                min-width: 45px;
            }
        }
        .content_top_item+.content_top_item {
            margin-top: 8px;
        }
    }
    .content_bottom {
        margin-left: 45px;
        min-height: 80px;
        border-radius: 2px;
        border: 1px solid #F0F0F0;
        .progress {
            width: 340px;
            padding: 24px;
            position: relative;
            .progress_2 {
                width: 100%;
                .el-button {
                    position: absolute;
                    top: -8px;
                    right: -80px;
                }
            }
        }
        .progress_finish {
            .progress_finish_head {
                padding: 16px;
                display: flex;
                align-items: center;
                .title {
                    font-size: 16px;
                    font-weight: 500;
                    color: #262626;
                    position: relative;
                    margin-right: 16px;
                }
                .title::before {
                    content: "";
                    display: inline-block;
                    width: 2px;
                    height: 14px;
                    background: #1AAC88;
                    border-radius: 2px 2px 0px 0px;
                    position: absolute;
                    left: -6px;
                    top: 50%;
                    transform: translateY(-50%);
                }
            }
            .progress_finish_content {
                padding: 0 24px 24px;
                .el-checkbox-group {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    grid-gap: 16px;
                }
                .progress_finish_btn {
                    padding-top: 24px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
            }
        }
    }
}
</style>