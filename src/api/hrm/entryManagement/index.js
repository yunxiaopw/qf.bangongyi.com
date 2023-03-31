import request from "@/utils/request";

// 获取待入职员工详情 初始数据
export function inductionInfo(params) {
    return request({
        url: "/hrm/api/induction/info",
        method: "GET",
        params
    });
}
// 获取待入职员工详情页 流程日志
export function inductionProcess(params) {
    return request({
        url: "/hrm/api/induction/process",
        method: "GET",
        params
    });
}
// 调整入职时间
export function inductionAdjustTimee(data) {
    return request({
        url: "/hrm/api/induction/adjust-time",
        method: "POST",
        data
    });
}
// 取消入职
export function inductionCancel(data) {
    return request({
        url: "/hrm/api/induction/cancel",
        method: "POST",
        data
    });
}

// 入职资料登记表 获取字典列表 个人资料 非审批处理
export function openapiInductionStaffdict(params) {
    return request({
        url: "/hrm/openapi/induction/staffdict",
        method: "GET",
        params
    });
}
// 入职资料登记表 字典表 非审批处理
export function openapiInductionFromdict(params) {
    return request({
        url: "/hrm/openapi/induction/fromdict",
        method: "GET",
        params
    });
}
// 入职资料登记表 获取字典列表 个人资料 审批处理
export function inductionStaffdict(params) {
    return request({
        url: "/hrm/api/induction/staffdict",
        method: "GET",
        params
    });
}
// 入职资料登记表 字典表  审批处理
export function inductionFromdict() {
    return request({
        url: "/hrm/api/induction/fromdict",
        method: "GET",
    });
}
// 员工详情 编辑
export function inductionSave(data) {
    return request({
        url: "/hrm/api/induction/save",
        method: "POST",
        data
    });
}


// 新增入职登记表单
export function inductionAutoRegister(data) {
    return request({
        url: "/hrm/api/induction/autoregister",
        method: "POST",
        data
    });
}



// 资料审核 获取被审核人数据详情
export function inductionRegisterInfo(params) {
    return request({
        url: "/hrm/api/induction/register-info",
        method: "GET",
        params
    });
}
// 入职申请审核 通过
export function inductionRegisterPass(data) {
    return request({
        url: "/hrm/api/induction/register-pass",
        method: "POST",
        data
    });
}
// 入职申请审核 拒绝
export function inductionRegisterRefuse(data) {
    return request({
        url: "/hrm/api/induction/register-refuse",
        method: "POST",
        data
    });
}
// 入职人员信息获取（手动、重复录用、办理入职）使用
export function inductionDetails(params) {
    return request({
        url: "/hrm/api/induction/details",
        method: "GET",
        params
    });
}


// 待入职员工列表
export function inductionList(params) {
    return request({
        url: "/hrm/api/induction/list",
        method: "GET",
        params
    });
}
// 待入职员工统计
export function inductionStatistics(params) {
    return request({
        url: "/hrm/api/induction/statistics",
        method: "GET",
        params
    });
}
// 入职通用设置
export function settingInduction() {
    return request({
        url: "/hrm/api/setting/induction",
        method: "GET",
    });
}
// 入职通用设置修改
export function settingInductionEdit(data) {
    return request({
        url: "/hrm/api/setting/induction",
        method: "POST",
        data
    });
}
// 邀请补充资料 资料填充
export function inductionRegisterInvitation(params) {
    return request({
        url: "/hrm/api/induction/register-invitation",
        method: "GET",
        params
    });
}
// 资料补充 保存
export function inductionRegisterInvitationEdit(data) {
    return request({
        url: "/hrm/api/induction/register-invitation",
        method: "POST",
        data
    });
}
// 通用设置修改
export function inductionSet(params) {
    return request({
        url: "/hrm/api/induction/set",
        method: "GET",
        params
    });
}
// 入职资料登记表提交资料
export function inductionRegisterSubmit(data) {
    return request({
        url: "/hrm/openapi/induction/register-submit",
        method: "POST",
        data
    });
}
// 手动录入 新增待入职员工
export function inductionRegister(data) {
    return request({
        url: "/hrm/api/induction/register",
        method: "POST",
        data
    });
}
// 办理入值
export function inductionEntry(data) {
    return request({
        url: "/hrm/api/induction/entry",
        method: "POST",
        data
    });
}



