import request from "@/utils/request";

// 人事字典列表数据
export function dictList(params) {
    return request({
        url: "/hrm/api/dict/list",
        method: "GET",
        params
    });
}
// 字典 启用/停用
export function dictEnable(data) {
    return request({
        url: "/hrm/api/dict/enable",
        method: "POST",
        data
    });
}
// 字典 新增
export function dictAdd(data) {
    return request({
        url: "/hrm/api/dict/add",
        method: "POST",
        data
    });
}

