import request from "@/utils/request";

// 获取员工异动管理列表
export function adjustList(params) {
    return request({
        url: "/hrm/api/adjust/list",
        method: "GET",
        params
    });
}
// 获取员工异动详情
export function adjustInfo(params) {
    return request({
        url: "/hrm/api/adjust/info",
        method: "GET",
        params
    });
}
// 获取员工异动前数据及表单字段
export function adjustOriginal(params) {
    return request({
        url: "/hrm/api/adjust/original",
        method: "GET",
        params
    });
}
// 异动申请
export function adjustApply(data) {
    return request({
        url: "/hrm/api/adjust/apply",
        method: "POST",
        data
    });
}
// 获取异动类型
export function adjustType() {
    return request({
        url: "/hrm/api/adjust/type",
        method: "GET",
    });
}

// 保存异动类型
export function adjustTypeEdit(data) {
    return request({
        url: "/hrm/api/adjust/type",
        method: "POST",
        data
    });
}
