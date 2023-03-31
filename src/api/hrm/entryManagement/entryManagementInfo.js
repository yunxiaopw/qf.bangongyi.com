import request from "@/utils/request";

// 获取待入职员工详情
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