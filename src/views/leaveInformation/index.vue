<template>
    <div class="main-box">
        <div class="leaveInformation_bg">
            <img src="../../assets/images/leaveInformation_bg.png">

            <div class="login_box">
                <div class="dead">立即体验</div>
                <div class="form_box">
                    <div class="title">请填写您的信息</div>
                    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px">
                        <el-form-item label="" prop="contact">
                            <el-input v-model="ruleForm.contact" placeholder="请输入姓名"></el-input>
                        </el-form-item>
                        <el-form-item label="" prop="mobile">
                            <el-input v-model="ruleForm.mobile" placeholder="请输入手机号"></el-input>
                        </el-form-item>
                    </el-form>
                    <div class="form_btns">
                        <div class="form_btn" @click="submitForm('ruleForm')">立即体验</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { custom } from "../../api/leaveInformation/index"

export default {
    name: "leaveInformation",
    data () {
        return {
            ruleForm: {
                contact: '',
                mobile: '',
                type: '160'
            },
            rules: {
                contact: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
                mobile: [
                    { required: true, message: '请输入手机号', trigger: 'blur' },
                    { pattern:/^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/, message: "请输入手机号", trigger: "blur" },
                ],
            },
        }
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    custom(this.ruleForm).then(res => {
                        this.$message({
                            showClose: true,
                            message: res.errmsg,
                            type: 'success'
                        });
                    }).catch(err => {
                        this.$message({
                            showClose: true,
                            message: err.errmsg,
                            type: 'error'
                        });
                    })
                } else {
                    return false;
                }
            });
        },
    },
}
</script>

<style scoped lang="less">
// 移动设备宽度
@media only screen and(min-width: 320px) and (max-width: 1080px) { 
    .leaveInformation_bg {
        width: 100%;
        height: 100%;
        overflow: hidden;
        position: fixed;
        left: 0;
        top: 0;
        img {
            width: 100%;
            display: none;
        }
        .dead {
            display: none;
        }
        .login_box { 
            width: 100%;
            padding: .8rem .4rem .22rem;
            background: url(../../assets/images/leaveInformation_mobile_bg.png);
            background-repeat: no-repeat;
            background-size: 100%;
            .form_box {
                .title {
                    font-size: .44rem;
                    font-weight: 600;
                    color: rgba(0,0,0,0.85);
                    margin-bottom: .4rem;
                }
                /deep/.el-input__inner:focus{
                    border:1px solid red;
                }
                .el-input /deep/ input {
                    height: 50px;
                }
                .form_btns {
                    width: 100%;
                    padding-top: .36rem;
                    .form_btn {
                        width: 100%;
                        height: 1rem;
                        background: linear-gradient(327deg, #FA7A38 0%, #F43122 100%);
                        border-radius: 50px;
                        font-size: .36rem;
                        font-weight: 600;
                        color: #FFFFFF;
                        text-align: center;
                        line-height: 1rem;
                        cursor: pointer;
                    }
                }
            }
        }
    }
}
// PC 设备宽度
@media only screen and(min-width: 1080px) and (max-width: 1920px) { 
    .leaveInformation_bg {
        width: 100%;
        height: 100%;
        overflow: hidden;
        img {
            width: 100%;
        }
        .login_box { 
            width: 460px;
            height: 480px;
            background: #FFFFFF;
            box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.12);
            border-radius: 8px;
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            .dead {
                height: 116px;
                font-size: 22px;
                font-weight: 500;
                color: rgba(0,0,0,0.85);
                line-height: 116px;
                text-align: center;
            }
            .form_box {
                padding: 0 78px;
                .title {
                    font-size: 18px;
                    font-weight: 500;
                    color: rgba(0,0,0,0.85);
                    margin-bottom: 24px;
                }
                /deep/.el-input__inner:focus{
                    border:1px solid red;
                }
                .form_btns {
                    width: 100%;
                    padding-top: 18px;
                    .form_btn {
                        width: 100%;
                        height: 40px;
                        background: linear-gradient(327deg, #FA7A38 0%, #F43122 100%);
                        border-radius: 2px;
                        font-size: 16px;
                        font-weight: 500;
                        color: #FFFFFF;
                        text-align: center;
                        line-height: 40px;
                        cursor: pointer;
                    }
                }
            }
        }
    }
}


</style>

