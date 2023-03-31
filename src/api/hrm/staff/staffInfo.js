import request from "@/utils/request";

// 员工信息 编辑接口
export function staffEdit(data) {
    return request({
        url: "/hrm/api/staff/edit",
        method: "POST",
        data
    });
}
// 获取员工详情接口
export function staffInfo(params) {
    return request({
        url: "/hrm/api/staff/info",
        method: "GET",
        params
    });
}
// 员工 禁用/启用 接口
export function staffEnable(data) {
    return request({
        url: "/hrm/api/staff/enable",
        method: "POST",
        data
    });
}
// 获取 所有下拉框选项的数据 合集
export function widgetOptions() {
    return request({
        url: "/hrm/api/widget/options",
        method: "GET",
    });
}