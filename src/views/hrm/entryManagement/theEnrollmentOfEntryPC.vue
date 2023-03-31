<template>
   <div class="main-box">
    <HeadLine :goback="is_goback">
        资料审核
      <template #r-content>
        <div class="t-r-btn" v-if="is_informationAudition">
          <el-button size="small" type="primary" @click="registerPassOrRefuse('不通过')">不通过</el-button>
          <el-button size="small" type="primary" @click="registerPassOrRefuse('审核通过')">审核通过</el-button>
        </div>
      </template>
    </HeadLine>
    <!-- 表单内容区 -->
    <div class="form_content" v-if="!isok">
        <div class="form_content_head">
            <img src="../../../assets/images/theEnrollmentOfEntryPCHeadLeft.png">
            <span>入职资料登记表</span>
            <img src="../../../assets/images/theEnrollmentOfEntryPCHeadRight.png">
        </div>

        <el-form ref="formData" :model="formData" size="small" :label-width="label_width">

            <!-- 个人资料 -->
            <div class="form_content_forms">
                <div class="form_content_forms_head">个人资料</div>
                <!-- 审批处理 -->
                <div class="staffing" v-if="is_informationAudition">
                    <el-form-item v-for="i_item in personalsDict" :key="i_item.key" :label="i_item.title+'：'" :prop="'personals.' + i_item.key" :rules="setRules(i_item)">
                        <MoreInput v-if="vifMoreInputFuc(i_item.type)" :i_item="i_item" :v-model.sync="formData.personals[i_item.key]" />
                        <MoreInput v-else :i_item="i_item" v-model="formData.personals[i_item.key]" />
                    </el-form-item>
                </div>
                <!-- 非审批处理 -->
                <div class="staffing" v-else>
                    <el-form-item v-for="i_item in personalsDict" :key="i_item.key" :label="i_item.title+'：'" :prop="'personals.' + i_item.key" :rules="setRules(i_item)">
                        <MoreInputTheEnrollmentOfEntryPC v-if="vifMoreInputFuc(i_item.type)" :i_item="i_item" :v-model.sync="formData.personals[i_item.key]" />
                        <MoreInputTheEnrollmentOfEntryPC v-else :i_item="i_item" v-model="formData.personals[i_item.key]" />
                    </el-form-item>
                </div>
            </div>

            <!-- 教育经历 -->
            <div class="form_content_forms" v-if="is_shows.educations">
                <div class="form_content_forms_head">教育经历<el-button class="form_content_forms_head_add_btn" size="small" icon="el-icon-plus" @click="add('educations')">添加</el-button></div>
                <div class="form_content_forms_item" v-for="(item, index) in formData.educations" :key="index">
                    <div class="form_content_forms_item_head">
                        <div class="form_content_forms_item_head_title pointer" @click="item.arrow_right = !item.arrow_right">{{ echoIndex(index) }}<el-icon :class="item.arrow_right ? 'el-icon-arrow-right':'el-icon-arrow-down'"></el-icon></div>
                        <span class="form_content_forms_item_head_delete" v-show="index>0" @click="itemsDelete(index, 'educations')"><el-icon class="el-icon-delete pointer"></el-icon></span>
                    </div>
                    <div v-if="!item.arrow_right">
                        <!-- 审批处理 -->
                        <div class="staffing" v-if="is_informationAudition">
                            <el-form-item v-for="i_item in educations" :key="i_item.key" :label="i_item.title+'：'" :prop="'educations.' + index + '.'+ i_item.key" :rules="setRules(i_item)">
                                <MoreInput v-if="vifMoreInputFuc(i_item.type)" :i_item="i_item" :v-model.sync="item[i_item.key]" />
                                <MoreInput v-else :i_item="i_item" v-model="item[i_item.key]" />
                            </el-form-item>
                        </div>
                        <!-- 非审批处理 -->
                        <div class="staffing" v-else>
                            <el-form-item v-for="i_item in educations" :key="i_item.key" :label="i_item.title+'：'" :prop="'educations.' + index + '.'+ i_item.key" :rules="setRules(i_item)">
                                <MoreInputTheEnrollmentOfEntryPC v-if="vifMoreInputFuc(i_item.type)" :i_item="i_item" :v-model.sync="item[i_item.key]" />
                                <MoreInputTheEnrollmentOfEntryPC v-else :i_item="i_item" v-model="item[i_item.key]" />
                            </el-form-item>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 工作经历 -->
            <div class="form_content_forms" v-if="is_shows.works">
                <div class="form_content_forms_head">工作经历<el-button class="form_content_forms_head_add_btn" size="small" icon="el-icon-plus" @click="add('works')">添加</el-button></div>
                <div class="form_content_forms_item" v-for="(item, index) in formData.works" :key="index">
                    <div class="form_content_forms_item_head">
                        <div class="form_content_forms_item_head_title pointer" @click="item.arrow_right = !item.arrow_right">{{ echoIndex(index) }}<el-icon :class="item.arrow_right ? 'el-icon-arrow-right':'el-icon-arrow-down'"></el-icon></div>
                        <span class="form_content_forms_item_head_delete" v-show="index>0" @click="itemsDelete(index, 'works')"><el-icon class="el-icon-delete pointer"></el-icon></span>
                    </div>
                    <div v-if="!item.arrow_right">
                        <!-- 审批处理 -->
                        <div class="staffing" v-if="is_informationAudition">
                            <el-form-item v-for="i_item in works" :key="i_item.key" :label="i_item.title+'：'" :prop="'works.' + index + '.'+ i_item.key" :rules="setRules(i_item)">
                                <MoreInput v-if="vifMoreInputFuc(i_item.type)" :i_item="i_item" :v-model.sync="item[i_item.key]" />
                                <MoreInput v-else :i_item="i_item" v-model="item[i_item.key]" />
                            </el-form-item>
                        </div>
                        <!-- 非审批处理 -->
                        <div class="staffing" v-else>
                            <el-form-item v-for="i_item in works" :key="i_item.key" :label="i_item.title+'：'" :prop="'works.' + index + '.'+ i_item.key" :rules="setRules(i_item)">
                                <MoreInputTheEnrollmentOfEntryPC v-if="vifMoreInputFuc(i_item.type)" :i_item="i_item" :v-model.sync="item[i_item.key]" />
                                <MoreInputTheEnrollmentOfEntryPC v-else :i_item="i_item" v-model="item[i_item.key]" />
                            </el-form-item>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 培训经历 -->
            <div class="form_content_forms" v-if="is_shows.training">
                <div class="form_content_forms_head">培训经历<el-button class="form_content_forms_head_add_btn" size="small" icon="el-icon-plus" @click="add('training')">添加</el-button></div>
                <div class="form_content_forms_item" v-for="(item, index) in formData.training" :key="index">
                    <div class="form_content_forms_item_head">
                        <div class="form_content_forms_item_head_title pointer" @click="item.arrow_right = !item.arrow_right">{{ echoIndex(index) }}<el-icon :class="item.arrow_right ? 'el-icon-arrow-right':'el-icon-arrow-down'"></el-icon></div>
                        <span class="form_content_forms_item_head_delete" v-show="index>0" @click="itemsDelete(index, 'training')"><el-icon class="el-icon-delete pointer"></el-icon></span>
                    </div>
                    <div v-if="!item.arrow_right">
                        <!-- 审批处理 -->
                        <div class="staffing" v-if="is_informationAudition">
                            <el-form-item v-for="i_item in training" :key="i_item.key" :label="i_item.title+'：'" :prop="'training.' + index + '.'+ i_item.key" :rules="setRules(i_item)">
                                <MoreInput v-if="vifMoreInputFuc(i_item.type)" :i_item="i_item" :v-model.sync="item[i_item.key]" />
                                <MoreInput v-else :i_item="i_item" v-model="item[i_item.key]" />
                            </el-form-item>
                        </div>
                        <!-- 非审批处理 -->
                        <div class="staffing" v-else>
                            <el-form-item v-for="i_item in training" :key="i_item.key" :label="i_item.title+'：'" :prop="'training.' + index + '.'+ i_item.key" :rules="setRules(i_item)">
                                <MoreInputTheEnrollmentOfEntryPC v-if="vifMoreInputFuc(i_item.type)" :i_item="i_item" :v-model.sync="item[i_item.key]" />
                                <MoreInputTheEnrollmentOfEntryPC v-else :i_item="i_item" v-model="item[i_item.key]" />
                            </el-form-item>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 紧急联系人 -->
            <div class="form_content_forms" v-if="is_shows.emergency">
                <div class="form_content_forms_head">紧急联系人<el-button class="form_content_forms_head_add_btn" size="small" icon="el-icon-plus" @click="add('emergency')">添加</el-button></div>
                <div class="form_content_forms_item" v-for="(item, index) in formData.emergency" :key="index">
                    <div class="form_content_forms_item_head">
                        <div class="form_content_forms_item_head_title pointer" @click="item.arrow_right = !item.arrow_right">{{ echoIndex(index) }}<el-icon :class="item.arrow_right ? 'el-icon-arrow-right':'el-icon-arrow-down'"></el-icon></div>
                        <span class="form_content_forms_item_head_delete" v-show="index>0" @click="itemsDelete(index, 'emergency')"><el-icon class="el-icon-delete pointer"></el-icon></span>
                    </div>
                    <div v-if="!item.arrow_right">
                        <!-- 审批处理 -->
                        <div class="staffing" v-if="is_informationAudition">
                            <el-form-item v-for="i_item in emergency" :key="i_item.key" :label="i_item.title+'：'" :prop="'emergency.' + index + '.'+ i_item.key" :rules="setRules(i_item)">
                                <MoreInput v-if="vifMoreInputFuc(i_item.type)" :i_item="i_item" :v-model.sync="item[i_item.key]" />
                                <MoreInput v-else :i_item="i_item" v-model="item[i_item.key]" />
                            </el-form-item>
                        </div>
                        <!-- 非审批处理 -->
                        <div class="staffing" v-else>
                            <el-form-item v-for="i_item in emergency" :key="i_item.key" :label="i_item.title+'：'" :prop="'emergency.' + index + '.'+ i_item.key" :rules="setRules(i_item)">
                                <MoreInputTheEnrollmentOfEntryPC v-if="vifMoreInputFuc(i_item.type)" :i_item="i_item" :v-model.sync="item[i_item.key]" />
                                <MoreInputTheEnrollmentOfEntryPC v-else :i_item="i_item" v-model="item[i_item.key]" />
                            </el-form-item>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 家庭成员 -->
            <div class="form_content_forms" v-if="is_shows.family">
                <div class="form_content_forms_head">家庭成员<el-button class="form_content_forms_head_add_btn" size="small" icon="el-icon-plus" @click="add('family')">添加</el-button></div>
                <div class="form_content_forms_item" v-for="(item, index) in formData.family" :key="index">
                    <div class="form_content_forms_item_head">
                        <div class="form_content_forms_item_head_title pointer" @click="item.arrow_right = !item.arrow_right">{{ echoIndex(index) }}<el-icon :class="item.arrow_right ? 'el-icon-arrow-right':'el-icon-arrow-down'"></el-icon></div>
                        <span class="form_content_forms_item_head_delete" v-show="index>0" @click="itemsDelete(index, 'family')"><el-icon class="el-icon-delete pointer"></el-icon></span>
                    </div>
                    <div v-if="!item.arrow_right">
                        <!-- 审批处理 -->
                        <div class="staffing" v-if="is_informationAudition">
                            <el-form-item v-for="i_item in family" :key="i_item.key" :label="i_item.title+'：'" :prop="'family.' + index + '.'+ i_item.key" :rules="setRules(i_item)">
                                <MoreInput v-if="vifMoreInputFuc(i_item.type)" :i_item="i_item" :v-model.sync="item[i_item.key]" />
                                <MoreInput v-else :i_item="i_item" v-model="item[i_item.key]" />
                            </el-form-item>
                        </div>
                        <!-- 非审批处理 -->
                        <div class="staffing" v-else>
                            <el-form-item v-for="i_item in family" :key="i_item.key" :label="i_item.title+'：'" :prop="'family.' + index + '.'+ i_item.key" :rules="setRules(i_item)">
                                <MoreInputTheEnrollmentOfEntryPC v-if="vifMoreInputFuc(i_item.type)" :i_item="i_item" :v-model.sync="item[i_item.key]" />
                                <MoreInputTheEnrollmentOfEntryPC v-else :i_item="i_item" v-model="item[i_item.key]" />
                            </el-form-item>
                        </div>
                    </div>
                </div>
            </div>
        </el-form>
        
        <!-- 审核 遮罩层 -->
        <div class="mask_layer" v-if="is_informationAudition"></div>
        
    </div>

    <!-- 是否已完成提交 -->
    <div v-if="isok">
        <el-result icon="success" title="您已完成入职资料登记"></el-result>
    </div>

     <!-- 固定定位页脚 -->
    <div class="footer" v-if="!is_informationAudition">
        <div class="footer_top"><a href="https://www.bangongyi.com/" target="__break">技术支持由 办公逸 提供</a></div>
        <div class="footer_btns" v-if="!isok"><el-button size="small" type="primary" @click="submint('formData')">提交</el-button></div>
    </div>
   </div>
</template>

<script>
import { inductionRegisterSubmit, inductionRegisterInfo, inductionRegisterRefuse, inductionRegisterPass, openapiInductionFromdict, inductionFromdict } from "@/api/hrm/entryManagement";
import { setMoreInputI_item, vifMoreInput, getUrl_t } from "@/utils/utils"
import MoreInputTheEnrollmentOfEntryPC from "@/components/hrm/entryManagement/MoreInputTheEnrollmentOfEntryPC"

export default {
   name: 'theEnrollmentOfEntryPC',
   components: { MoreInputTheEnrollmentOfEntryPC },
   data() {
     return {
        id: this.$route.query.id || '',
        is_informationAudition: false,
        isok: false,
        label_width: '150px',
        // 教育经历等板块是否需要填写
        is_shows: {
            educations: false,
            emergency: false,
            family: false,
            training: false,
            works: false,
        },
        // 表单数据
        formData: {
            personals: {},
            educations: [
                {
                    arrow_right: false,
                    start_date: '',
                    end_date: '',
                    school: '',
                    major: '',
                    education: '',
                    degree: '',
                    learn_ism: '',
                }
            ],
            works: [
                {
                    arrow_right: false,
                    start_date: '',
                    end_date: '',
                    company: '',
                    position: '',
                    quite_reason: '',
                    witness: '',
                    witness_tel: '',
                    witness_email: '',
                }
            ],
            training: [
                {
                    arrow_right: false,
                    start_date: '',
                    end_date: '',
                    title: '',
                    institutions: '',
                    achievement: '',
                    certificate_no: '',
                    certificate_name: '',
                }
            ],
            emergency: [
                {
                    arrow_right: false,
                    name: '',
                    relation: '',
                    contact_tel: '',
                    address: '',
                }
            ],
            family: [
                {
                    arrow_right: false,
                    name: '',
                    relation: '',
                    occupation: '',
                    company: '',
                    contact_tel: '',
                }
            ],
        },
        // 所有表单编辑项 每块的字典
        personalsDict: [],
        educations: [],
        works: [],
        training: [],
        emergency: [],
        family: [],
        // 是否可以返回
        is_goback: false,
     }
   },
   async created() {
        this.is_informationAudition = this.$route.query.type === 'informationAudition';

        // 是否是审批处理
        if(this.is_informationAudition) {
            this.is_goback = true;
            await this.getInductionFromdict();
            await this.getInductionRegisterInfo();
        }else{
            await this.getOpenapiInductionFromdict();
        }
   },
   methods: {
    // 资料审核 获取被审核人数据详情
    async getInductionRegisterInfo() {
        await inductionRegisterInfo({id:this.id}).then(res => {
            let {personals, educations, works, training, emergency, family} = res.data;
            this.formData.personals = personals;
            this.formData.educations = this.inductionRegisterInfoMap(educations);
            this.formData.works = this.inductionRegisterInfoMap(works);
            this.formData.training = this.inductionRegisterInfoMap(training);
            this.formData.emergency = this.inductionRegisterInfoMap(emergency);
            this.formData.family = this.inductionRegisterInfoMap(family);
        })
    },
    // 资料审核 获取被审核人数据详情 部分数据添加展开字段
    inductionRegisterInfoMap(arr) {
        let newArr = JSON.parse(JSON.stringify(arr)).map(i => {
            i.arrow_right = false;
            return i
        });
        return newArr
    },
    // 获取 字典列表 审批处理
    async getInductionFromdict() {
        await inductionFromdict({id:this.id}).then(res => {
            let {personals, educations, emergency, family, training, works} = res.data;
            this.is_shows = {
                educations: educations.status,
                emergency: emergency.status,
                family: family.status,
                training: training.status,
                works: works.status,
            };
            
            // 字典数据
            this.personalsDict = setMoreInputI_item(personals);
            this.educations = setMoreInputI_item(educations.dict);
            this.emergency = setMoreInputI_item(emergency.dict);
            this.family = setMoreInputI_item(family.dict);
            this.training = setMoreInputI_item(training.dict);
            this.works = setMoreInputI_item(works.dict);
        })
    },
    // 获取 字典列表 非审批处理
    async getOpenapiInductionFromdict() {
        // 人事 邀请补充资料 外部地址用的 token
        let t = getUrl_t('t=') === null ?  '' : getUrl_t('t=');
        await openapiInductionFromdict({t}).then(res => {
            let {personals, educations, emergency, family, training, works} = res.data;
            this.is_shows = {
                educations: educations.status,
                emergency: emergency.status,
                family: family.status,
                training: training.status,
                works: works.status,
            };
            // 字典数据
            this.personalsDict = setMoreInputI_item(personals);
            this.educations = setMoreInputI_item(educations.dict);
            this.emergency = setMoreInputI_item(emergency.dict);
            this.family = setMoreInputI_item(family.dict);
            this.training = setMoreInputI_item(training.dict);
            this.works = setMoreInputI_item(works.dict);
        })
    },
    // MoreInput组件部分组件区分
    vifMoreInputFuc(type) {
        return vifMoreInput(type)
    },
    // 排序补零
    echoIndex(index) {
        return (index+1)*1 < 10 ? `0${(index+1)*1}` : (index+1)*1;
    },
    // 教育经历/工作经历等数组套层表单项 设置校验
    setRules(item) {
        let rulesObj = {
            required: item.required,
            message: (item.type==='text'||item.type==='textarea')?`请输入${item.title}`:`请选择${item.title}`,
            trigger: (item.type==='text'||item.type==='textarea')?`blur`:`change`,
        }
        return rulesObj
    },
    // 教育经历/工作经历/培训经历/紧急联系人/家庭成员 添加
    add(formName) {
        let obj = {};
        if(formName === 'educations') {
            obj = {
                arrow_right: false,
                start_date: '',
                end_date: '',
                school: '',
                major: '',
                education: '',
                degree: '',
                learn_ism: '',
            }
        }else if(formName === 'works'){
            obj = {
                arrow_right: false,
                start_date: '',
                end_date: '',
                company: '',
                position: '',
                quite_reason: '',
                witness: '',
                witness_tel: '',
                witness_email: '',
            }
        }else if(formName === 'training'){
            obj = {
                arrow_right: false,
                start_date: '',
                end_date: '',
                title: '',
                institutions: '',
                achievement: '',
                certificate_no: '',
                certificate_name: '',
            }
        }else if(formName === 'emergency') {
            obj = {
                arrow_right: false,
                name: '',
                relation: '',
                contact_tel: '',
                address: '',
            }
        }else if(formName === 'family') {
            obj = {
                arrow_right: false,
                name: '',
                relation: '',
                occupation: '',
                company: '',
                contact_tel: '',
            }
        }
        this.formData[formName].push(obj);
    },
    // 教育经历/工作经历/培训经历/紧急联系人/家庭成员 删除
    itemsDelete(index, formName) {
        this.formData[formName].splice(index, 1);
    },
    // 提交
    submint(formName) {
        let data = this.eidtSubmitData();

        this.$refs[formName].validate((valid) => {
          if (valid) {
            inductionRegisterSubmit(data).then(res => {
                if(res.errno === 0) {
                    this.$message({
                        showClose: true,
                        message: res.errmsg,
                        type: 'success'
                    });
                    this.isok = true;
                }else{
                    this.$message({
                        showClose: true,
                        message: res.errmsg,
                        type: 'error'
                    });
                }
            }).catch((error) => {
                this.$message({
                    showClose: true,
                    message: error.errmsg,
                    type: 'error'
                });
            })
          } else {
            return false;
          }
        });
        
    },
    // 提交数据处理
    eidtSubmitData() {
        let obj = {
            id: this.id,
            ...this.formData
        };
        return obj
    },
    // 审核操作
    registerPassOrRefuse(type) {
        if(type === '不通过') {
            inductionRegisterRefuse({id:this.id}).then(res => {
                if(res.errno === 0) {
                    this.$message({
                        showClose: true,
                        message: res.errmsg,
                        type: 'success'
                    });
                    setTimeout(() => {
                        this.$router.replace({path:'/addEntryManagement', query:{id:this.id, type:'invitationForAdditionalInformation'}});
                    }, 500);
                }else{
                    this.$message({
                        showClose: true,
                        message: res.errmsg,
                        type: 'error'
                    });
                }
            }).catch((error) => {
                this.$message({
                    showClose: true,
                    message: error.errmsg,
                    type: 'error'
                });
            })
        }else if(type === '审核通过') {
            inductionRegisterPass({id:this.id}).then(res => {
                if(res.errno === 0) {
                    this.$message({
                        showClose: true,
                        message: res.errmsg,
                        type: 'success'
                    });
                    setTimeout(() => {
                        this.$router.back();
                    }, 500);
                }else{
                    this.$message({
                        showClose: true,
                        message: res.errmsg,
                        type: 'error'
                    });
                }
            }).catch((error) => {
                this.$message({
                    showClose: true,
                    message: error.errmsg,
                    type: 'error'
                });
            })
        }
    },
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
// 内容区
.form_content {
    height: calc(100%-56px);
    overflow-y: auto;
    padding-bottom: 120px;
    position: relative;
    .mask_layer {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background: #ffffff00;
    }
    &_head {
        height: 100px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 6px;
        img {
            width: 27px;
            height: 18px;
        }
        span {
            font-size: 24px;
            font-weight: 500;
            color: #141414;
            margin: 0 16px;
        }
    }
    &_forms {
        width: 1200px;
        margin: 0 auto;
        padding: 0 20px 16px;
        background: #FFFFFF;
        border-radius: 2px;
        border: 1px solid #F0F0F0;
        // 表格内标题头
        &_head {
            height: 50px;
            display: flex;
            align-items: center;
            padding: 16px 0;
            font-size: 16px;
            font-weight: 500;
            color: #262626;
            padding-left: 8px;
            position: relative;
            &_add_btn {
                margin-left: auto;
            }
        }
        &_head::before {
            content: "";
            position: absolute;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
            display: inline-block;
            width: 2px;
            height: 14px;
            background: #1AAC88;
            border-radius: 2px 2px 0px 0px;
        }
        &_item {
            width: 1156px;
            min-height: 44px;
            background: #FAFAFA;
            border-radius: 2px;
            padding: 0 12px;
            &_head {
                height: 44px;
                background: #FAFAFA;
                border-radius: 2px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                &_title {
                    font-size: 18px;
                    font-weight: 500;
                    color: #434343;
                    .el-icon-undefined {
                        margin-left: 6px;
                    }
                }
                &_delete:hover {
                    color: red;
                }
            }
        }
        &_item+&_item {
            margin-top: 12px;
        }
    }
    &_forms+&_forms {
        margin-top: 24px;
    }
    /deep/.el-form-item__label { 
        display: block !important;
    }
    /deep/.el-form-item__content {
        display: block !important;
    }
    /deep/.el-button {
        display: inline-block !important;
    }
}
.form_content::-webkit-scrollbar {
    display: none;
}

// 表单项栅格布局
.staffing {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-column-gap: 18px 24px;
}

// 页脚
.footer {
    width: 100%;
    position: fixed;
    left: 0;
    bottom: 0;
    &_top {
        height: 55px;
        background: #434343;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        a {
            font-size: 14px;
            font-weight: 400;
            color: #FFFFFF;
        }
    }
    &_btns {
        height: 55px;
        background: #FFFFFF;
        box-shadow: 0px 0px 4px 0px rgba(0,0,0,0.14);
        display: flex;
        justify-content: center;
        align-items: center;
    }
}
</style>