<template>
  <div class="main-box">
    <!-- 页头 -->
    <HeadLine goback>
        员工信息
    </HeadLine>

    <!-- 员工信息 -->
    <div class="staff-infos">
        <!-- 顶部简介信息 -->
        <div class="top-card">
            <img v-if="staff_texts.we_avatar&& staff_texts.we_avatar.length > 0" :src="staff_texts.we_avatar">
            <img v-else src="../../../assets/images/staff_user.png">
            <div class="info">
                <div class="top">
                    <div class="name">
                        {{staff_texts.we_name}}
                        <i v-if="staff_values.we_gender == '1'" class="iconfont icon-man"></i>
                        <i v-if="staff_values.we_gender == '2'" class="iconfont icon-woman"></i>
                    </div>
                    <div v-if="staff_texts.tags">
                        <div v-for="(item, index) in staff_texts.tags" :key="index">
                            <span v-if="index > 0">|</span>
                            <i class="iconfont icon-tags" style="color: #595959"></i>
                            {{item}}
                        </div>
                    </div>
                </div>
                <div class="center" v-if="staff_texts.we_department || staff_texts.rank_id">
                    <div>{{ staff_texts.we_department }}</div>
                    <div  v-if="staff_texts.rank_id.length>0">
                        <span v-if="staff_texts.position_id"><span>|</span>{{ staff_texts.position_id }}</span>
                        <span v-if="staff_texts.rank_id">
                            <span>|</span>
                            <span class="rank tag">{{ staff_texts.rank_no }}</span>
                            {{ staff_texts.rank_id }}
                        </span>
                    </div>
                </div>
                <div class="bottom">
                    <div><i class="iconfont icon-phone"></i>{{ staff_texts.we_mobile }}</div>
                    <div v-if="staff_texts.we_email"><span>|</span><i class="iconfont icon-mail"></i>{{ staff_texts.we_email }}</div>
                    <div v-if="staff_texts.we_weixinid"><span>|</span><i class="iconfont icon-weixin" style="color: #09BB07"></i>{{ staff_texts.we_weixinid }}</div>
                    <div v-if="staff_texts.we_userid"><span>|</span><i class="iconfont icon-qiyeweixin" style="color: #0082EF"></i>{{ staff_texts.we_userid }}</div>
                </div>
            </div>
            <div>
                <el-button size="small" @click="staffInfoDataEditDialogShow">编辑</el-button>
            </div>
        </div>

        <!-- 底部详细信息 -->
        <div class="bottom-infos">
            <!-- 左侧所有tab项 -->
            <div class="left-tab">
                  <el-tabs v-model="activeName" @tab-click="handleClick" :before-leave="beforeLeave">
                    <el-tab-pane label="人事信息" name="staffing">
                        <!-- 人事信息 展示板 -->
                        <div class="staffing" v-show="!staffingEdit">
                            <div v-for="item in staffingFormDict" :key="item.key" class="item">
                                <span class="label">{{ item.title }}：</span>
                                <span>{{ staff_texts[item.key] }}</span>
                            </div>
                        </div>

                        <!-- 人事信息 编辑板 -->
                        <div v-show="staffingEdit">
                            <el-form ref="staffingFormData" :rules="staffingFormDataRules" :model="staff_values" size="small" label-width="150px">
                                <div class="staffing">
                                    <el-form-item v-for="item in staffingFormDict" :key="item.key" :label="item.title+'：'" :prop="item.key">
                                        <MoreInput v-if="vifMoreInputFuc(item.type)" :i_item="item" :v-model.sync="staff_values[item.key]" />
                                        <MoreInput v-else :i_item="item" v-model="staff_values[item.key]" />
                                    </el-form-item>
                                </div>
                                <el-row type="flex" class="row-bg" justify="center">
                                    <div class="btns p_b_12">
                                        <el-button size="small" @click="staffingEdit = false">取消</el-button>
                                        <el-button size="small" type="primary" @click="submitRules('staffingFormData')">保存</el-button>
                                    </div>
                                </el-row>
                            </el-form>
                        </div>
                    </el-tab-pane>

                    <el-tab-pane label="个人资料" name="person">
                        <!-- 个人资料 展示板 -->
                        <div class="person" v-show="!personEdit">
                            <div v-for="item in personFormDict" :key="item.key" class="item">
                                <span class="label">{{ item.title }}：</span>
                                <span>{{ staff_texts[item.key] }}</span>
                            </div>
                        </div>

                        <!-- 个人资料 编辑板 -->
                        <div v-show="personEdit">
                            <el-form ref="personFormData" :rules="personFormDataRules" :model="staff_values" size="small" label-width="150px">
                                <div class="staffing">
                                    <el-form-item v-for="item in personFormDict" :key="item.key" :label="item.title+'：'" :prop="item.key">
                                        <MoreInput v-if="vifMoreInputFuc(item.type)" :i_item="item" :v-model.sync="staff_values[item.key]" />
                                        <MoreInput v-else :i_item="item" v-model="staff_values[item.key]" />
                                    </el-form-item>
                                </div>
                                <el-row type="flex" class="row-bg" justify="center">
                                    <div class="btns p_b_12">
                                        <el-button size="small" @click="personEdit = false">取消</el-button>
                                        <el-button size="small" type="primary" @click="submitRules('personFormData')">保存</el-button>
                                    </div>
                                </el-row>
                            </el-form>
                        </div>
                    </el-tab-pane>

                    <el-tab-pane label="档案信息" name="file">
                        <div class="file">
                            <el-form ref="fileFormData" :model="fileFormData" size="small" label-width="150px">
                                <!-- 教育经历 -->
                                <div class="subItemCard">
                                    <div class="title"><span>教育经历</span><el-button type="text" size="small" icon="el-icon-plus" @click="fileFormDataAdd('educations')">添加</el-button></div>
                                    <!-- 内容项 -->
                                    <div class="cards" v-for="(item, key) in fileFormData.educations" :key="key">
                                        <!-- 展示板 -->
                                        <div class="card cardItem" v-if="!item.edit">
                                            <div class="top item">
                                                <div>
                                                    <span>{{item.school}}</span>
                                                    <span>{{item.major}}</span>
                                                    <span v-if="item.is_highest>0" class="tag">最高学历</span>
                                                </div>
                                                <div>
                                                    <div class="unHover">{{item.start_date}}~{{item.end_date}}</div>
                                                    <div class="hover">
                                                        <el-button type="text" size="small" icon="el-icon-edit" @click="item.edit = true">编辑</el-button>
                                                        <el-button type="text" size="small" icon="el-icon-delete" @click="fileFormDataDelete('educations', key)">删除</el-button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="info item">
                                                <div>{{ echoEducation(item.education) }}</div>
                                                <div>{{ echoDegree(item.degree) }}</div>
                                                <div>{{ echoLearn_ism(item.learn_ism) }}</div>
                                                <div>{{item.remarks}}</div>
                                            </div>
                                        </div>

                                        <!-- 编辑板 -->
                                        <div class="editCard cardItem" v-if="item.edit">
                                            <div class="staffing no_padding" v-if="fileFormData.copy_educations && fileFormData.copy_educations.length>0">
                                                <el-form-item label="院校名称：" :prop="'copy_educations.' + key + '.school'" :rules="{required: true, message: '请输入院校名称', trigger: 'blur'}">
                                                    <el-input v-model="fileFormData.copy_educations[key].school" autocomplete="off" placeholder="请输入院校名称"></el-input>
                                                </el-form-item>
                                                <el-form-item label="专业：" prop="major">
                                                    <el-input v-model="fileFormData.copy_educations[key].major" autocomplete="off" placeholder="请输入专业"></el-input>
                                                </el-form-item>
                                                <el-form-item label="时间：">
                                                    <el-date-picker
                                                    style="width: 100%"
                                                    v-model="fileFormData.copy_educations[key].start_end_date"
                                                    type="daterange"
                                                    range-separator="至"
                                                    start-placeholder="入学时间"
                                                    end-placeholder="毕业时间"
                                                    value-format="yyyy-MM-dd">
                                                    </el-date-picker>
                                                </el-form-item>
                                                <el-form-item label="学历：" prop="education">
                                                    <el-select style="width: 100%" v-model="fileFormData.copy_educations[key].education" placeholder="请选择学历">
                                                        <el-option v-for="(item, key) in widget_options.highest_education" :key="key" :label="item" :value="key"></el-option>
                                                    </el-select>
                                                </el-form-item>
                                                <el-form-item label="学位：" prop="degree">
                                                    <el-select style="width: 100%" v-model="fileFormData.copy_educations[key].degree" placeholder="请选择学位">
                                                        <el-option v-for="(item, key) in widget_options.highest_degree" :key="key" :label="item" :value="key"></el-option>
                                                    </el-select>
                                                </el-form-item>
                                                <el-form-item label="学习形式：" prop="learn_ism">
                                                    <el-select style="width: 100%" v-model="fileFormData.copy_educations[key].learn_ism" placeholder="请选择学习形式">
                                                        <el-option v-for="(item, key) in learn_ism_options" :key="key" :label="item" :value="key"></el-option>
                                                    </el-select>
                                                </el-form-item>
                                                <el-form-item label="备注：" prop="remarks">
                                                    <el-input v-model="fileFormData.copy_educations[key].remarks" autocomplete="off" placeholder="请输入备注"></el-input>
                                                </el-form-item>
                                                <el-form-item label="最高学历：" prop="is_highest">
                                                    <el-radio-group v-model="fileFormData.copy_educations[key].is_highest">
                                                        <el-radio :label="1">是</el-radio>
                                                        <el-radio :label="0">否</el-radio>
                                                    </el-radio-group>
                                                </el-form-item>
                                            </div>
                                            <el-row type="flex" class="row-bg" justify="center">
                                                <div class="btns">
                                                    <el-button size="small" @click="item.edit = false">取消</el-button>
                                                    <el-button size="small" type="primary" @click="fileFormData_submit('educations', key, 'fileFormData')">保存</el-button>
                                                </div>
                                            </el-row>
                                        </div>
                                    </div>
                                </div>

                                <!-- 工作经历 -->
                                <div class="subItemCard">
                                    <div class="title"><span>工作经历</span><el-button type="text" size="small" icon="el-icon-plus" @click="fileFormDataAdd('works')">添加</el-button></div>
                                    <!-- 内容项 -->
                                    <div class="cards" v-for="(item, key) in fileFormData.works" :key="key">
                                        <!-- 展示板 -->
                                        <div class="card cardItem" v-if="!item.edit">
                                            <div class="top item">
                                                <div>
                                                    <span>{{item.company}}</span>
                                                    <span>{{item.position}}</span>
                                                </div>
                                                <div>
                                                    <div class="unHover">{{item.start_date}}~{{item.end_date}}</div>
                                                    <div class="hover">
                                                        <el-button type="text" size="small" icon="el-icon-edit" @click="item.edit = true">编辑</el-button>
                                                        <el-button type="text" size="small" icon="el-icon-delete" @click="fileFormDataDelete('works', key)">删除</el-button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="info item">
                                                <div>证明人：{{item.witness}}</div>
                                                <div>{{item.witness_tel}}</div>
                                                <div>{{item.witness_email}}</div>
                                            </div>
                                            <div class="info item">
                                                <div>离职原因：{{item.quite_reason}}</div>
                                                <div>{{item.remarks}}</div>
                                            </div>
                                        </div>

                                        <!-- 编辑板 -->
                                        <div class="editCard cardItem" v-if="item.edit">
                                            <div class="staffing no_padding" v-if="fileFormData.copy_works && fileFormData.copy_works.length>0">
                                                <el-form-item label="公司名称：" :prop="'copy_works.' + key + '.company'" :rules="{required: true, message: '请输入公司名称', trigger: 'blur'}">
                                                    <el-input v-model="fileFormData.copy_works[key].company" autocomplete="off" placeholder="请输入公司名称"></el-input>
                                                </el-form-item>
                                                <el-form-item label="从事职位：" :prop="'copy_works.' + key + '.position'" :rules="{required: true, message: '请输入从事职位', trigger: 'blur'}">
                                                    <el-input v-model="fileFormData.copy_works[key].position" autocomplete="off" placeholder="请输入从事职位"></el-input>
                                                </el-form-item>
                                                <el-form-item label="入/离职日期：" :prop="'copy_works.' + key + '.start_end_date'" :rules="{required: true, message: '请选择入职/离职日期', trigger: 'change'}">
                                                    <el-date-picker
                                                    style="width: 100%"
                                                    v-model="fileFormData.copy_works[key].start_end_date"
                                                    type="daterange"
                                                    range-separator="至"
                                                    start-placeholder="入职日期"
                                                    end-placeholder="离职日期"
                                                    value-format="yyyy-MM-dd">
                                                    </el-date-picker>
                                                </el-form-item>
                                                <el-form-item label="证明人：" prop="witness">
                                                    <el-input v-model="fileFormData.copy_works[key].witness" autocomplete="off" placeholder="请输入证明人"></el-input>
                                                </el-form-item>
                                                <el-form-item label="证明人手机号：" prop="witness_tel">
                                                    <el-input v-model="fileFormData.copy_works[key].witness_tel" autocomplete="off" placeholder="请输入证明人手机号"></el-input>
                                                </el-form-item>
                                                <el-form-item label="证明人邮箱号：" prop="witness_email">
                                                    <el-input v-model="fileFormData.copy_works[key].witness_email" autocomplete="off" placeholder="请输入证明人邮箱号"></el-input>
                                                </el-form-item>
                                                <el-form-item label="离职原因：" prop="quite_reason">
                                                    <el-input v-model="fileFormData.copy_works[key].quite_reason" autocomplete="off" maxlength="100" placeholder="请输入离职原因"></el-input>
                                                </el-form-item>
                                                <el-form-item label="备注：" prop="remarks">
                                                    <el-input v-model="fileFormData.copy_works[key].remarks" autocomplete="off" maxlength="100" placeholder="请输入备注"></el-input>
                                                </el-form-item>
                                            </div>
                                            <el-row type="flex" class="row-bg" justify="center">
                                                <div class="btns">
                                                    <el-button size="small" @click="item.edit = false">取消</el-button>
                                                    <el-button size="small" type="primary" @click="fileFormData_submit('works', key, 'fileFormData')">保存</el-button>
                                                </div>
                                            </el-row>
                                        </div>
                                    </div>
                                </div>

                                <!-- 培训经历 -->
                                <div class="subItemCard">
                                    <div class="title"><span>培训经历</span><el-button type="text" size="small" icon="el-icon-plus" @click="fileFormDataAdd('training')">添加</el-button></div>
                                    <!-- 内容项 -->
                                    <div class="cards" v-for="(item, key) in fileFormData.training" :key="key">
                                        <!-- 展示板 -->
                                        <div class="card cardItem" v-if="!item.edit">
                                            <div class="top item">
                                                <div>
                                                    <span>{{item.institutions}}</span>
                                                    <span>{{item.title}}</span>
                                                </div>
                                                <div>
                                                    <div class="unHover">{{item.start_date}}~{{item.end_date}}</div>
                                                    <div class="hover">
                                                        <el-button type="text" size="small" icon="el-icon-edit" @click="item.edit = true">编辑</el-button>
                                                        <el-button type="text" size="small" icon="el-icon-delete" @click="fileFormDataDelete('training', key)">删除</el-button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="info item">
                                                <div>成绩：{{item.achievement}}</div>
                                                <div>证书：{{item.certificate_no}}/{{item.certificate_name}}</div>
                                            </div>
                                            <div class="info item">
                                                <div>{{item.remarks}}</div>
                                            </div>
                                        </div>

                                        <!-- 编辑板 -->
                                        <div class="editCard cardItem" v-if="item.edit">
                                            <div class="staffing no_padding" v-if="fileFormData.copy_training && fileFormData.copy_training.length>0">
                                                <el-form-item label="培训公司名称：" :prop="'copy_training.' + key + '.institutions'" :rules="{required: true, message: '请输入培训公司名称', trigger: 'blur'}">
                                                    <el-input v-model="fileFormData.copy_training[key].institutions" autocomplete="off" placeholder="请输入培训公司名称"></el-input>
                                                </el-form-item>
                                                <el-form-item label="课程名称：" prop="title">
                                                    <el-input v-model="fileFormData.copy_training[key].title" autocomplete="off" placeholder="请输入培训课程名称"></el-input>
                                                </el-form-item>
                                                <el-form-item label="时间：">
                                                    <el-date-picker
                                                    style="width: 100%"
                                                    v-model="fileFormData.copy_training[key].start_end_date"
                                                    type="daterange"
                                                    range-separator="至"
                                                    start-placeholder="开始日期"
                                                    end-placeholder="结束日期"
                                                    value-format="yyyy-MM-dd">
                                                    </el-date-picker>
                                                </el-form-item>
                                                <el-form-item label="成绩：" prop="achievement">
                                                    <el-input v-model="fileFormData.copy_training[key].achievement" autocomplete="off" maxlength="50" placeholder="请输入成绩"></el-input>
                                                </el-form-item>
                                                <el-form-item label="证书名称：" prop="certificate_name">
                                                    <el-input v-model="fileFormData.copy_training[key].certificate_name" autocomplete="off" placeholder="请输入证书名称"></el-input>
                                                </el-form-item>
                                                <el-form-item label="证书编号：" prop="name13">
                                                    <el-input v-model="fileFormData.copy_training[key].certificate_no" autocomplete="off" maxlength="20" placeholder="请输入证书编号"></el-input>
                                                </el-form-item>
                                                <el-form-item label="备注：" prop="name2">
                                                    <el-input v-model="fileFormData.copy_training[key].remarks" autocomplete="off" maxlength="100" placeholder="请输入备注"></el-input>
                                                </el-form-item>
                                            </div>
                                            <el-row type="flex" class="row-bg" justify="center">
                                                <div class="btns">
                                                    <el-button size="small" @click="item.edit = false">取消</el-button>
                                                    <el-button size="small" type="primary" @click="fileFormData_submit('training', key, 'fileFormData')">保存</el-button>
                                                </div>
                                            </el-row>
                                        </div>
                                    </div>
                                </div>
                            </el-form>
                        </div>
                    </el-tab-pane>

                    <el-tab-pane label="社会关系" name="society">
                        <div class="file">
                            <el-form ref="societyFormData" :model="societyFormData" size="small" label-width="150px">
                                <!-- 紧急联系人 -->
                                <div class="subItemCard">
                                    <div class="title"><span>紧急联系人</span><el-button type="text" size="small" icon="el-icon-plus" @click="societyFormDataAdd('emergency')">添加</el-button></div>
                                    <!-- 内容项 -->
                                    <div class="cards" v-for="(item, key) in societyFormData.emergency" :key="key">
                                        <!-- 展示板 -->
                                        <div class="card cardItem" v-if="!item.edit">
                                            <div class="top item">
                                                <div>
                                                    <span>{{item.name}}</span>
                                                    <span>{{item.relation}}</span>
                                                </div>
                                                <div>
                                                    <div class="unHover"></div>
                                                    <div class="hover">
                                                        <el-button type="text" size="small" icon="el-icon-edit" @click="item.edit = true">编辑</el-button>
                                                        <el-button type="text" size="small" icon="el-icon-delete" @click="societyFormDataDelete('emergency', key)">删除</el-button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="info item">
                                                <div>{{item.tel}}</div>
                                                <div>{{item.address}}</div>
                                            </div>
                                        </div>
                                        <!-- 编辑板 -->
                                        <div class="editCard cardItem" v-if="item.edit">
                                            <div class="staffing no_padding" v-if="societyFormData.copy_emergency && societyFormData.copy_emergency.length>0">
                                                <el-form-item label="名字：" :prop="'copy_emergency.' + key + '.name'" :rules="{required: true, message: '请输入名字', trigger: 'blur'}">
                                                    <el-input v-model="societyFormData.copy_emergency[key].name" autocomplete="off" placeholder="请输入名字"></el-input>
                                                </el-form-item>
                                                <el-form-item label="关系：" :prop="'copy_emergency.' + key + '.relation'" :rules="{required: true, message: '请输入关系', trigger: 'blur'}">
                                                    <el-input v-model="societyFormData.copy_emergency[key].relation" autocomplete="off" placeholder="请输入关系"></el-input>
                                                </el-form-item>
                                                <el-form-item label="电话号码：" :prop="'copy_emergency.' + key + '.tel'" :rules="{required: true, validator: $elRules.mobile, message: '请输入电话号码', trigger: 'blur'}">
                                                    <el-input v-model="societyFormData.copy_emergency[key].tel" autocomplete="off" placeholder="请输入电话号码"></el-input>
                                                </el-form-item>
                                                <el-form-item label="联系地址：" prop="address">
                                                    <el-input v-model="societyFormData.copy_emergency[key].address" autocomplete="off" maxlength="50" placeholder="请输入联系地址"></el-input>
                                                </el-form-item>
                                            </div>
                                            <el-row type="flex" class="row-bg" justify="center">
                                                <div class="btns">
                                                    <el-button size="small" @click="item.edit = false">取消</el-button>
                                                    <el-button size="small" type="primary" @click="societyFormData_submit('emergency', key, 'societyFormData')">保存</el-button>
                                                </div>
                                            </el-row>
                                        </div>
                                    </div>
                                </div>

                                <!-- 家庭成员 -->
                                <div class="subItemCard">
                                    <div class="title"><span>家庭成员</span><el-button type="text" size="small" icon="el-icon-plus" @click="societyFormDataAdd('family')">添加</el-button></div>
                                    <!-- 内容项 -->
                                    <div class="cards" v-for="(item, key) in societyFormData.family" :key="key">
                                        <!-- 展示板 -->
                                        <div class="card cardItem" v-if="!item.edit">
                                            <div class="top item">
                                                <div>
                                                    <span>{{item.name}}</span>
                                                    <span>{{item.relation}}</span>
                                                </div>
                                                <div>
                                                    <div class="unHover"></div>
                                                    <div class="hover">
                                                        <el-button type="text" size="small" icon="el-icon-edit" @click="item.edit = true">编辑</el-button>
                                                        <el-button type="text" size="small" icon="el-icon-delete" @click="societyFormDataDelete('family', key)">删除</el-button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="info item">
                                                <div>{{item.tel}}</div>
                                                <div>职业：{{item.occupation}}</div>
                                                <div>工作单位：{{item.work}}</div>
                                            </div>
                                            <div class="info item">
                                                <div>{{item.remarks}}</div>
                                            </div>
                                        </div>

                                        <!-- 编辑板 -->
                                        <div class="editCard cardItem" v-if="item.edit">
                                            <div class="staffing no_padding" v-if="societyFormData.copy_family && societyFormData.copy_family.length>0">
                                                <el-form-item label="名字：" :prop="'copy_family.' + key + '.name'" :rules="{required: true, message: '请输入名字', trigger: 'blur'}">
                                                    <el-input v-model="societyFormData.copy_family[key].name" autocomplete="off" placeholder="请输入名字"></el-input>
                                                </el-form-item>
                                                <el-form-item label="关系：" :prop="'copy_family.' + key + '.relation'" :rules="{required: true, message: '请输入关系', trigger: 'blur'}">
                                                    <el-input v-model="societyFormData.copy_family[key].relation" autocomplete="off" placeholder="请输入关系"></el-input>
                                                </el-form-item>
                                                <el-form-item label="手机号：" prop="tel">
                                                    <el-input v-model="societyFormData.copy_family[key].tel" autocomplete="off" placeholder="请输入手机号"></el-input>
                                                </el-form-item>
                                                <el-form-item label="职业：" prop="occupation">
                                                    <el-input v-model="societyFormData.copy_family[key].occupation" autocomplete="off" placeholder="请输入职业"></el-input>
                                                </el-form-item>
                                                <el-form-item label="工作单位：" prop="work">
                                                    <el-input v-model="societyFormData.copy_family[key].work" autocomplete="off" maxlength="30" placeholder="请输入工作单位"></el-input>
                                                </el-form-item>
                                                <el-form-item label="备注：" prop="remarks">
                                                    <el-input v-model="societyFormData.copy_family[key].remarks" autocomplete="off" maxlength="100" placeholder="请输入备注"></el-input>
                                                </el-form-item>
                                            </div>
                                            <el-row type="flex" class="row-bg" justify="center">
                                                <div class="btns">
                                                    <el-button size="small" @click="item.edit = false">取消</el-button>
                                                    <el-button size="small" type="primary" @click="societyFormData_submit('family', key, 'societyFormData')">保存</el-button>
                                                </div>
                                            </el-row>
                                        </div>
                                    </div>
                                </div>
                            </el-form>
                        </div>
                    </el-tab-pane>

                    <el-tab-pane name="CustoBtn" class="CustoBtn">
                        <span slot="label">
                            <el-button v-show="(activeName === 'staffing' || activeName === 'person')" size="small" @click="tabsEdit(activeName)">编辑</el-button>
                        </span>
                    </el-tab-pane>
                </el-tabs>
            </div>
            
            <!-- 右侧时间线 -->
            <div class="right-timeline">
                <el-timeline>
                    <el-timeline-item v-for="(item, key) in activities" :key="key" color="#1AAC88">
                        <div class="infor">
                            <div class="top">
                                <span class="title">{{item.title}}</span>
                                <span class="time">{{item.date}}</span>
                            </div>
                            <div v-for="(i, k) in item.operation_data" :key="k" class="item">
                                <span v-if="i.title && i.title!==''">{{i.title+'：'}}</span>
                                <span v-html="activitiesRank(i.value)"></span>
                            </div>
                        </div>
                    </el-timeline-item>
                </el-timeline>
            </div>
        </div>
    </div>

    <!-- 修改员工信息 弹层 -->
    <el-dialog
      class="dialog"
      title="修改员工信息"
      width="720px"
      :visible.sync="staffInfoDialog"
      destroy-on-close
    >
      <el-form ref="copy_staffInfoData" :rules="copy_staffInfoDataRules" :model="copy_staffInfoData" size="small" label-width="85px">
        <el-row :gutter="20">
            <el-col :span="10">
                <el-form-item label="姓名：" prop="we_name">
                    <el-input v-model="copy_staffInfoData.we_name" autocomplete="off" placeholder="请输入姓名"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="10" :offset="4">
                <el-form-item label="主部门：" prop="we_department">
                    <MoreInput
                        :i_item="{
                            type: 'department_widget',
                            form_item_type: '部门',
                            v_model_type: 'String',
                            form_item_radio: true,
                        }"
                        :widget_init_text="staff_texts['we_department']"
                        :v-model.sync="copy_staffInfoData.we_department"
                    />
                </el-form-item>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="10">
                <el-form-item label="岗位：" prop="position_id">
                    <MoreInput
                        :i_item="{type: 'position_widget'}"
                        v-model="copy_staffInfoData.position_id"
                        @change="positionSelectChange"
                    />
                </el-form-item>
            </el-col>
            <el-col :span="10" :offset="4">
                <el-form-item label="职级：" prop="rank_id">
                    <MoreInput
                        :i_item="{type: 'rankLevel_widget'}"
                        :disabled="!copy_staffInfoData.position_id || copy_staffInfoData.position_id===''"
                        :position_id="position_id"
                        v-model="copy_staffInfoData.rank_id"
                    />
                </el-form-item>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="10">
                <el-form-item label="手机号：" prop="we_mobile">
                    <el-input v-model="copy_staffInfoData.we_mobile" autocomplete="off" placeholder="请输入手机号"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="10" :offset="4">
                <el-form-item label="邮箱：" prop="we_email">
                    <el-input v-model="copy_staffInfoData.we_email" autocomplete="off" placeholder="请输入邮箱"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="10">
                <el-form-item label="微信：" prop="we_weixinid">
                    <el-input v-model="copy_staffInfoData.we_weixinid" autocomplete="off" placeholder="请输入微信"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="10" :offset="4">
                <el-form-item label="账号：" prop="we_userid">
                    <el-input v-model="copy_staffInfoData.we_userid" autocomplete="off" placeholder="请输入账号"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="10">
                <el-form-item label="标签：" prop="label">
                    <el-input v-model="copy_staffInfoData.label" autocomplete="off" placeholder="请输入标签"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="10" :offset="4">
            </el-col>
        </el-row>
    </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="staffInfoDialog = false">取消</el-button>
        <el-button size="small" type="primary" @click="staffInfoSubmit('copy_staffInfoData')">保存</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { widgetOptions } from "@/api/hrm/staff/staffInfo";
import { inductionStaffdict, inductionSave, inductionInfo } from "@/api/hrm/entryManagement";
import { setMoreInputI_item, vifMoreInput, textEchoMoreInput, setFormDataRules } from "@/utils/utils";

export default {
  name: "entryManagementInfo",
  components: {},
  data() {
    return {
      id: this.$route.query.id || '',
      // 头部 员工信息
      staffInfoData: {},
      copy_staffInfoData: {},
      copy_staffInfoDataRules: {
        we_name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        we_email: [{ type: 'email', message: '请输入正确的邮箱', trigger: 'blur' }],
        department: [{ required: true, message: '请选择部门', trigger: 'change' }],
        we_position: [{ required: true, message: '请选择岗位', trigger: 'change' }],
        we_mobile: [{ required: true, message: '请输入手机号', trigger: 'blur' }],
      },
      position_id: '',
      staffInfoDialog: false,
      //   tab页 相关
      activeName: 'staffing',
      //   tab页 人事信息
      staffingEdit: false,
      staffingFormDict: [],
      staffingFormData: {},
      staffingFormDataRules: {},
      //   tab页 个人资料
      personEdit: false,
      personFormDict: [],
      personFormData: {},
      personFormDataRules: {},
      //   tab页 档案信息
      fileFormData: {},
      fileFormDataRules: {},
      //   tab页 社会关系
      societyFormData: {},
      societyFormDataRules: {
        // name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
      },

      // 员工详情 所有可选项数据
      widget_options: {},
      learn_ism_options: ['全日制', '成人教育', '远程教育', '自学考试', '其他非全日制'],

      //   时间线相关
      activities: [],
      //   个人资料/人事信息
      staffs: {},
      staff_texts: {},
      staff_values: {},
    };
  },
  async created() {
    await this.getInductionStaffdict();
    await this.getWidgetOptions();
    this.getStaffInfo();
  },
  methods: {
    // 入职页 获取字典列表
    async getInductionStaffdict() {
      await inductionStaffdict({id:this.id}).then(res => {
        // 人事信息字典字段
        this.staffingFormDict = setMoreInputI_item(res.data.personnel);
        // 个人资料字典字段
        this.personFormDict = setMoreInputI_item(res.data.individual);

        // 人事信息 校验项
        this.staffingFormDataRules = setFormDataRules(res.data.personnel);
        // 个人资料 校验项
        this.personFormDataRules = setFormDataRules(res.data.individual);
      })
    },
    // 员工详情 所有可选项数据
    async getWidgetOptions() {
        await widgetOptions().then(res => {
            this.widget_options = res.data;
        })
    },
    // 获取员工详情
    getStaffInfo() {
        inductionInfo({id: this.id}).then(res => {
            let { staff, archives_info, dynamic } = res.data;

            this.activities = dynamic;
            this.staffs = staff;
            this.staff_texts = this.getStaffkey(staff, 'text');
            this.staff_values = this.getStaffkey(staff, 'value');
            this.fileFormData = this.fileFormDataOrSocietyFormData(archives_info, '档案信息');
            this.societyFormData = this.fileFormDataOrSocietyFormData(archives_info, '社会关系');
        })
    },
    // 档案信息/社会关系数据 添加编辑控制开关 以及copy数据
    fileFormDataOrSocietyFormData(obj, tab_name) {
        let newObj = {};
        for (let key in obj) {
            if(tab_name === '档案信息'){
                if(key==='educations' || key==='works' || key==='training') {
                    newObj[key] = obj[key].map( i=> {
                        i.edit = false
                        return i
                    })
                    newObj[`copy_${key}`] = JSON.parse(JSON.stringify(obj[key]));
                }
            }else if(tab_name === '社会关系') {
                if(key==='emergency' || key==='family') {
                    newObj[key] = obj[key].map( i=> {
                        i.edit = false
                        return i
                    })
                    newObj[`copy_${key}`] = JSON.parse(JSON.stringify(obj[key]));
                }
            }
        }
        return newObj
    },
    // staff taxt/value 拆分
    getStaffkey(obj, type) {
        let newObj = {};
        for (let key in obj) {
            newObj[key] = obj[key][type];
        }
        return newObj
    },
    // MoreInput组件部分组件区分
    vifMoreInputFuc(type) {
        return vifMoreInput(type)
    },
    // 展示板 文本回显
    textEchoMoreInputFuc(value) {
        return textEchoMoreInput(value)
    },
    // 档案信息/教育经历/学历文本回显
    echoEducation(index) {
        return this.widget_options.highest_education[index*1] || ''
    },
    // 档案信息/教育经历/学位文本回显
    echoDegree(index) {
        return this.widget_options.highest_degree[index*1] || ''
    },
    // 档案信息/教育经历/学历文本回显
    echoLearn_ism(index) {
        return this.learn_ism_options[index*1] || ''
    },
    // 切换tab页
    handleClick(tab) {
        // console.log(tab);
    },
    // tab页自定义修改按钮后  阻止触发tab页面切换
    beforeLeave(visitName) { if(visitName === "CustoBtn") return false; },
    // 所有tab页 编辑按钮
    tabsEdit(activeName) {
        this[`${activeName}Edit`] = !this[`${activeName}Edit`];
    },
    // 档案信息tab内相关内容 添加
    fileFormDataAdd(key) {
        let initObj = {};
        if(key === 'educations') {
            initObj = {
                is_highest: 0,
                degree: '',
                education: '',
                end_date: '',
                learn_ism: '',
                major: '',
                remarks: '',
                school: '',
                start_date: '',
                edit: false,
            };
        }else if(key === 'works') {
            initObj = {
                start_date: '',
                end_date: '',
                company: '',
                position: '',
                quite_reason: '',
                witness: '',
                witness_tel: '',
                witness_email: '',
                remarks: '',
                edit: false,
            };
        }else if(key === 'training') {
            initObj = {
                start_date: '',
                end_date: '',
                title: '',
                institutions: '',
                achievement: '',
                certificate_no: '',
                certificate_name: '',
                remarks: '',
                edit: false,
            };
        }
        this.fileFormData[key].push(initObj);
        this.fileFormData[`copy_${key}`].push(initObj);
    },
    // 档案信息tab内相关内容 编辑后 保存
    fileFormData_submit(key, item_key, formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if(this.fileFormData[`copy_${key}`][item_key].start_end_date && this.fileFormData[`copy_${key}`][item_key].start_end_date.length > 0) {
                this.fileFormData[`copy_${key}`][item_key].start_date = this.fileFormData[`copy_${key}`][item_key].start_end_date[0];
                this.fileFormData[`copy_${key}`][item_key].end_date = this.fileFormData[`copy_${key}`][item_key].start_end_date[1];
            }
            this.fileFormData[key][item_key] = this.fileFormData[`copy_${key}`][item_key];
            this.fileFormData[key][item_key].edit = false;
            this.submit('fileFormData', key);
          } else {
            return false;
          }
        });
    },
    // 档案信息tab内相关内容 删除
    fileFormDataDelete(key, item_key) {
        this.fileFormData[key].splice(item_key, 1);
        this.fileFormData[`copy_${key}`].splice(item_key, 1);
        this.submit('fileFormData');
    },
    // 社会关系tab内相关内容 添加
    societyFormDataAdd(key) {
        let initObj = {};
        if(key === 'emergency') {
            initObj = {
                name: '',
                relation: '',
                tel: '',
                address: '',
                edit: false,
            };
        }else if(key === 'family') {
            initObj = {
                name: '',
                relation: '',
                tel: '',
                occupation: '',
                work: '',
                remarks: '',
                edit: false,
            };
        }
        this.societyFormData[key].push(initObj);
        this.societyFormData[`copy_${key}`].push(initObj);
    },
    // 社会关系tab内相关内容 编辑后 保存
    societyFormData_submit(key, item_key, formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if(this.societyFormData[`copy_${key}`][item_key].start_end_date && this.societyFormData[`copy_${key}`][item_key].start_end_date.length > 0) {
                this.societyFormData[`copy_${key}`][item_key].start_date = this.societyFormData[`copy_${key}`][item_key].start_end_date[0];
                this.societyFormData[`copy_${key}`][item_key].end_date = this.societyFormData[`copy_${key}`][item_key].start_end_date[1];
            }
            this.societyFormData[key][item_key] = this.societyFormData[`copy_${key}`][item_key];
            this.societyFormData[key][item_key].edit = false;
            this.submit('societyFormData', key);
          } else {
            return false;
          }
        });
    },
    // 社会关系tab内相关内容 删除
    societyFormDataDelete(key, item_key) {
        this.societyFormData[key].splice(item_key, 1);
        this.societyFormData[`copy_${key}`].splice(item_key, 1);
        this.submit('societyFormData', key);
    },
    // 人事信息/个人资料 校验
    submitRules(formName) {
        this.$refs[formName].validate((valid) => {
            if (valid) {
                this.submit(formName);
            } else {
                return false;
            }
        });
    },
    //  所有表单 保存
    submit(editType, key) {
        let data = this.submitNewData(editType, key);
        inductionSave(data).then(res => {
            if(res.errno === 0) {
                this.$message({
                    showClose: true,
                    message: res.errmsg,
                    type: 'success'
                });
                this.getStaffInfo();
                this.staffInfoDialog = false;
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
    },
    // 所有表单 保存时 处理数据
    submitNewData(editType, key) {
        let data = {
            id: this.id,
        };

        if(editType === 'staffingFormData') {
            // 人事信息
            data.type = 'personnels';
            data.data = {...JSON.parse(JSON.stringify(this.staff_values))};
        }else if(editType === 'personFormData'){
            // 个人资料
            data.type = 'personals';
            data.data = {...JSON.parse(JSON.stringify(this.staff_values))};
        }else if(editType === 'staffInfoData') {
            // 员工信息弹层
            data.type = 'personnels';
            data.data = {...JSON.parse(JSON.stringify(this.staff_values)), ...JSON.parse(JSON.stringify(this.copy_staffInfoData))};
        }else if(editType === 'fileFormData') {
            // 档案信息
            let obj = {...JSON.parse(JSON.stringify(this.fileFormData))};
            for (let k in obj) { if (k.indexOf('copy') !== -1) delete obj[k] }
            data.data = obj[key];
            data.type = key;
        }else if(editType === 'societyFormData') {
            // 社会关系
            let obj = {...JSON.parse(JSON.stringify(this.societyFormData))};
            for (let k in obj) { if (k.indexOf('copy') !== -1) delete obj[k] }
            data.data = obj[key];
            data.type = key;
        }else if(editType === '') {
            // 编辑个人资料
            data.type = 'regular';
            data.data = {...JSON.parse(JSON.stringify(this.copy_staffInfoData))};
        }
        
        return data
    },
    // 员工信息修改 弹层
    staffInfoDataEditDialogShow() {
        let obj = {
            we_name: '',
            we_department: '',
            position_id: '',
            rank_id: '',
            we_mobile: '',
            we_email: '',
            we_weixinid: '',
            we_userid: '',
            label: '',
        }
        this.copy_staffInfoData = Object.assign(obj, JSON.parse(JSON.stringify(this.staff_values)));
        this.staffInfoDialog = true;
    },
    // 员工信息修改 岗位选框触发
    positionSelectChange(val) {
        this.position_id = val;
    },
    // 保存 员工信息弹层
    staffInfoSubmit(formName) {
        this.$refs[formName].validate((valid) => {
            if (valid) {
                this.submit('regular');
            } else {
                return false;
            }
        });
    },
    // 右侧员工生命周期表 职级数据特殊处理
    activitiesRank(value) {
        let newValue = ``;
        if(typeof(value) === 'object' && Object.keys(value).length>0) {
            if(Object.keys(value).length === 1 && value[Object.keys(value)[0]]!=='') {
                let text = value[Object.keys(value)[0]]!==''?value[Object.keys(value)[0]]:"未选择";
                newValue = `<span class="val_tag">${text}</span>`
            }else if(Object.keys(value).length > 1){
                let old_text = value['old']!==''?value['old']:"未选择";
                let new_text = value['new']!==''?value['new']:"未选择";
                newValue += `
                    <span class="ovl_tag">${old_text}</span>
                    <i class="el-icon-right"></i>
                    <span class="val_tag">${new_text}</span>
                `;
            }
            return newValue
        }else{
            return value
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
  },
};
</script>

<style lang='less' scoped>
.staff-infos {
    width: 100%;
    height: calc(100% - 56px);
    padding: 16px 24px;
    // 顶部简介信息
    .top-card {
        width: 100%;
        height: 116px;
        background: #FFFFFF;
        box-shadow: 0px 2px 4px 0px #FAFAFA;
        border-radius: 4px;
        border: 1px solid #F0F0F0;
        padding: 16px 24px;
        display: flex;
        margin-bottom: 16px;
        img {
            width: 58px;
            height: 58px;
            border-radius: 50%;
        }
        .info {
            flex-grow: 1;
            height: 100%;
            padding: 0 12px;
            font-size: 12px;
            font-weight: 400;
            color: #595959;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            .top {
                font-size: 12px;
                font-weight: 400;
                color: #262626;
                .name {
                    font-size: 20px;
                    font-weight: 500;
                    color: #141414;
                    i {
                        margin:0 0 0 4px;
                    }
                    .icon-woman {
                        color: #FFCCD7;
                        background: #F7414F;
                    }
                    .icon-man {
                        color: #C9E0FF;
                        background: #4B7FFF;
                    }
                }
                div {
                    max-width: 144px;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                }
            }
            .top, .center, .bottom {
                display: flex;
                align-items: center;
                div+div {
                    margin-left: 12px;
                }
                span{
                    margin-right: 7px;
                }
            }
            i {
                margin-right: 4px;
            }
        }
    }

    // 顶部简介信息
    .bottom-infos {
        width: 100%;
        height: calc(100% - 132px);
        display: flex;
        justify-content: space-between;
        // 左侧所有tab项
        .left-tab {
            flex-grow: 1;
            margin-right: 16px;
            /deep/.el-tabs {
                height: 100%;
            }
            /deep/.el-tabs__nav-wrap {
                height: 46px;
                padding: 0 24px;
            }
            /deep/.el-tabs__nav {
                width: 100%;
                height: 46px;
                #tab-CustoBtn {
                    position: absolute;
                    right: 0px;
                    top: 3px;
                }
            }
            /deep/.el-tabs__content {
                overflow-y: auto;
                max-height: calc(100% - 61px);
            }
            /deep/.el-tabs__content::-webkit-scrollbar {
                display: none;
            }
            // 人事信息/个人资料
            .staffing, .person{
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                grid-column-gap: 24px;
                .item {
                    min-height: 32px;
                    margin-bottom: 18px;
                    font-size: 14px;
                    font-weight: 400;
                    color: #1F1F1F;
                    .label {
                        display: inline-block;
                        width: 150px;
                        text-align: right;
                        color: #8C8C8C;
                    }
                    .tag {
                        display: inline-block;
                        padding: 1px 4px;
                        margin-right: 8px;
                        background: rgba(26,172,136,0.08);
                        border-radius: 2px;
                        font-size: 12px;
                        font-weight: 500;
                        color: #434343;
                    }
                }
                
            }
            // 档案信息
            .file {
                width: 100%;
                .subItemCard {
                    width: 100%;
                    .title {
                        width: 100%;
                        height: 14px;
                        padding-left: 6px;
                        border-left: 2px solid #1AAC88;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        margin-bottom: 12px;
                        span {
                            font-size: 14px;
                            font-weight: 500;
                            color: #262626;
                        }
                    }
                    .cards {
                        .card {
                            width: 100%;
                            padding: 12px;
                            .top {
                                height: 20px;
                                display: flex;
                                justify-content: space-between;
                                align-items: center;
                                div:nth-child(1)  {
                                    span:nth-child(1) {
                                        font-size: 14px;
                                        font-weight: 500;
                                        color: #434343;
                                    }
                                    span+span {
                                        margin-left: 8px;
                                    }
                                    .tag {
                                        display: inline-block;
                                        background: #FFF5EC;
                                        border-radius: 2px;
                                        font-size: 12px;
                                        font-weight: 500;
                                        color: #EE8E07;
                                        padding: 1px 8px;
                                    }
                                }
                                
                                .hover {
                                    display: none;
                                }
                            }
                            .info {
                                font-size: 12px;
                                font-weight: 400;
                                color: #595959;
                                display: flex;
                                align-items: center;
                                div+div { margin-left: 8px; }
                                div+div::before {
                                    content: "";
                                    width: 1px;
                                    height: 12px;
                                    border: 1px solid #D9D9D9;
                                    margin-right: 8px;
                                }
                            }
                            .item+.item {
                                margin-top: 9px;
                            }
                        }
                        .card:hover {
                            box-shadow: 0px 0px 6px 0px #F0F0F0;
                            border-radius: 2px;
                            .hover {
                                display: block;
                                .el-button {
                                    display: inline-block;
                                }
                            }
                            .unHover {
                                display: none;
                            }
                        }
                        .editCard {
                            box-shadow: 0px 0px 6px 0px #F0F0F0;
                            border-radius: 2px;
                            padding: 24px 24px 12px;
                        }
                        .cardItem+.cardItem {
                            margin-top: 12px;
                        }
                    }
                    
                }
                .subItemCard+.subItemCard {
                    margin-top: 20px;
                }
            }
            .staffing, .person, .file, .society {
                padding: 24px;
                .btns {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
            }
            .p_b_12 {
                padding-bottom: 12px;
            }
            .no_padding {
                padding: 0px;
            }
        }
        // 右侧时间线
        .right-timeline {
            width: 280px;
            padding: 16px;
            box-shadow: 0px 0px 4px 0px #FAFAFA;
            overflow-y: auto;
            /deep/.el-timeline {
                padding-left: 0;
                .top {
                    margin-bottom: 8px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    .title {
                        font-size: 14px;
                        font-family: PingFangSC-Medium, PingFang SC;
                        font-weight: 500;
                        color: #262626;
                    }
                    .time {
                        font-size: 12px;
                        font-family: PingFangSC-Regular, PingFang SC;
                        font-weight: 400;
                        color: #595959;
                    }
                }
                .item {
                    font-size: 12px;
                    font-family: PingFangSC-Regular, PingFang SC;
                    font-weight: 400;
                    color: #8C8C8C;
                }
                .item+.item {
                    margin-top: 4px;
                }
                .ovl_tag {
                    background: #F0F0F0;
                }
                .val_tag {
                    background: rgba(26,172,136,0.08);
                }
                .el-icon-right {
                    width: 12px;
                    height: 12px;
                    color: #000000;
                    margin: 0 8px;
                }
                .val_tag, .ovl_tag {
                    font-size: 12px;
                    font-family: PingFangSC-Medium, PingFang SC;
                    font-weight: 500;
                    color: #434343;
                    padding: 0 4px;
                    border-radius: 2px;
                }
            }
            
        }
        .right-timeline::-webkit-scrollbar {
            display: none;
        }
        .left-tab, .right-timeline {
            border-radius: 2px;
            border: 1px solid #F0F0F0;
        }
    }

    /deep/.el-form-item__label { 
        display: block !important;
    }
    /deep/.el-form-item__content {
        display: block !important;
    }
    
}

.btns {
    .el-button {
        display: inline-block !important;
    }
}


// 弹层样式
.dialog {
  /deep/.el-dialog__header {
    height: 48px;
    padding: 12px 24px 12px;
    border-bottom: 1px solid #f0f0f0;
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
    padding: 24px;
  }
  /deep/.el-dialog__footer {
    height: 52px;
    border-top: 1px solid #f0f0f0;
    padding: 10px 24px;
  }
}
</style>

<style>
/* 编辑信息弹层里的部门选择弹层 半透明黑色背景冲突 */
.v-modal {
    z-index: 2000 !important;
}
</style>