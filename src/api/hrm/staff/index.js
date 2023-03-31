import request from "@/utils/request";

// 员工统计 花名册主页顶部横向tab
export function staffCensus() {
    return request({
        url: "/hrm/api/staff/census",
        method: "GET",
    });
}
// 员工列表（筛选排序分页）
export function staffList(params) {
    return request({
        url: "/hrm/api/staff/list",
        method: "GET",
        params
    });
}
// 获取 中国省市区 地区数据
export function widgetArea(params) {
    return request({
        url: "/hrm/api/widget/area",
        method: "GET",
        params
    });
}
// 获取岗位可选项
export function positionType() {
    return request({
        url: "/hrm/api/position/position-type",
        method: "GET"
    });
}
// 获取职级可选数据
export function widgetRank() {
    return request({
        url: "/hrm/api/widget/rank",
        method: "GET",
    });
}
// 获取 所有下拉框选项的数据 合集
export function widgetOptions() {
    return request({
        url: "/hrm/api/widget/options",
        method: "GET",
    });
}
// 人事表单数据
export function dictFormData(params) {
    return request({
        url: "/hrm/api/dict/form-data",
        method: "GET",
        params
    });
}
// 获取岗位选择框 可选列表
export function widgetPosition(params) {
    return request({
        url: "/hrm/api/widget/get-position",
        method: "GET",
        params
    });
}
// 根据职级通道ID选择职级
export function rank_Level(params) {
    return request({
        url: "/hrm/api/widget/get-rank-level",
        method: "GET",
        params
    });
}




// 岗位与职级联动 岗位词典-根据词典类别获取岗位列表接口
export function position() {
    return request({
        url: "/hrm/api/position/position",
        method: "GET",
    });
}









