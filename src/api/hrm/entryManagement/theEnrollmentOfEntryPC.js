import request from "@/utils/request";

// 职级统计总表数据
export function rankLevel(params) {
    return request({
        url: "/hrm/openapi/rank/rank-level",
        method: "GET",
        params
    });
}
// 获取岗位选择框 可选列表
export function widgetPosition(params) {
    return request({
        url: "/hrm/openapi/widget/get-position",
        method: "GET",
        params
    });
}
// 根据职级通道ID选择职级
export function rank_Level(params) {
    return request({
        url: "/hrm/openapi/widget/get-rank-level",
        method: "GET",
        params
    });
}
// 获取 中国省市区 地区数据
export function widgetArea(params) {
    return request({
        url: "/hrm/openapi/widget/area",
        method: "GET",
        params
    });
}