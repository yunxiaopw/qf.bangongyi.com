import request from "@/utils/request";

// 转正提交
export function correctsApply(data) {
    return request({
        url: "/hrm/api/corrects/apply",
        method: "POST",
        data
    });
}
// 员工的转正申请记录详情
export function correctsInfo(params) {
    return request({
        url: "/hrm/api/corrects/info",
        method: "GET",
        params
    });
}
// 转正通用设置详情
export function settingCorrects() {
    return request({
        url: "/hrm/api/setting/corrects",
        method: "GET",
    });
}
// 转正通用设置保存
export function settingCorrectsEdit(data) {
    return request({
        url: "/hrm/api/setting/corrects",
        method: "POST",
        data
    });
}
// 转正统计
export function correctsStatistics() {
    return request({
        url: "/hrm/api/corrects/statistics",
        method: "GET",
    });
}
// 转正 表格数据
export function correctsList(params) {
    return request({
        url: "/hrm/api/corrects/list",
        method: "GET",
        params,
    });
}