<template>
    <div class="container_content">
        <el-dialog title="导入" :visible.sync="uploadVisible" custom-class="upload-modal">
            <div class="firstStep">
                <div class="title">
                    <div class="line"></div>
                    <div class="select_text">第一步：下载</div>
                </div>
                <span class="first-span">
                    下载包含被填报人数据的模板，并录入须填报的内容（不含需公式计算的字段)
                </span>
                <div class="downloadBtn" @click="handleAction('download_btn')">
                    <img src="../../../../../assets/images/download.png" alt="">
                    <el-button type="text">下载模板</el-button>
                </div>
            </div>
            <div class="twoStep">
                <div class="title">
                    <div class="line"></div>
                    <div class="select_text">第二步：导入设置</div>
                </div>
                <el-checkbox v-model="checked" @change="handleAction('check_data')">当数据重复时,覆盖原有信息</el-checkbox>
            </div>
            <div class="threeStep">
                <div class="title">
                    <div class="line"></div>
                    <div class="select_text">第三步：上传</div>
                </div>
                <span class="first-span">
                    上传文件（仅支持xls、xlsx格式文件，不超过100M）
                </span>

                <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/"
                    :on-preview="handlePreview" :on-remove="handleRemove" :before-remove="beforeRemove" multiple :limit="1"
                    :on-exceed="handleExceed" :file-list="fileList">
                    <div class="downloadBtn" @click="handleAction('upload_btn')">
                        <img src="../../../../../assets/images/download.png" alt="">
                        <el-button type="text">上传文件</el-button>
                    </div>
                </el-upload>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="handleAction('cancel')">取 消</el-button>
                <el-button type="primary" @click="handleAction('confirm')">确 定</el-button>
            </div>
        </el-dialog>
        
    </div>
</template>
    //TODO 根据校验信息，写提示信息
<script>
export default {
    name: 'uploadFile',
    // props:{
    //     uploadVisible:Boolean
    // },
    data() {
        return {
            uploadVisible: false,
            checked: false,
            fileList: []
        }
    },
    methods: {
        handleAction(action, data) {
            switch (action) {
                case 'open':
                    this.uploadVisible = true;
                    break;
                case 'cancel':
                    this.uploadVisible = false;
                    console.log('取消')
                    break;
                case 'confirm':
                    this.uploadVisible = false;
                    console.log('确认')
                    break;
                case 'download_btn':
                    console.log("下载模板")
                    break;
                case 'check_data':
                    console.log("导入设置")
                    break;
                case 'upload_btn':
                    console.log("上传文件")
                    break;
            }
        },
        // 下载
        download() {

        },
        // 文件上传
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePreview(file) {
            console.log(111)
            console.log(file);
        },
        handleExceed(files, fileList) {
        //  文件超过限制
       this.fileList=[]
        },
        beforeRemove(file, fileList) {
            return this.$confirm(`确定移除 ${file.name}？`);
        }

    }
}
</script>

<style lang="less" scoped>
.container_content {
    /deep/.upload-modal {
        width: 480px !important;

        .el-dialog__header {
            // height: 48px;
            border-bottom: 1px solid #F0F0F0;
        }

        .title {
            display: flex;
            align-items: center;
            margin-bottom: 12px;

            .line {
                width: 2px;
                height: 15px;
                background: #1aac88;
                border-radius: 1px 1px 0px 0px;
                margin-right: 6px;
            }
        }

        .select_text {
            height: 20px;
            font-size: 14px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: #262626;
            line-height: 20px;
        }

        .firstStep,
        .twoStep,
        .threeStep {
            border-radius: 2px;
            border: 1px solid #F0F0F0;
            padding: 16px 16px;
            margin-bottom: 12px;

            .first-span {
                margin-left: 8px;
            }

            .el-upload-list {
                margin-left: 12px;
                top: 3px;
                position: relative;
            }

            .downloadBtn {
                width: 110px;
                height: 32px;
                background: #FFFFFF;
                border: 1px solid #D9D9D9;
                margin-top: 12px;
                margin-left: 8px;

                .el-button {
                    top: -5px;
                    position: relative;
                }

                .el-button--text {
                    color: #434343;
                }

                img {
                    width: 17px;
                    margin-left: 16px;
                    top: -7px;
                    position: relative;
                }
            }

            .el-checkbox {
                margin-left: 8px;
            }
        }
    }
}</style>