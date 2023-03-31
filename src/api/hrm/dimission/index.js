import request from "@/utils/request";

// 离职统计
export function quitStatistics() {
    return request({
        url: "/hrm/api/quit/statistics",
        method: "GET",
    });
}
// 获取离职审批单列表
export function quitList(params) {
    return request({
        url: "/hrm/api/quit/list",
        method: "GET",
        params
    });
}
// 离职通用设置 获取
export function settingQuit() {
    return request({
        url: "/hrm/api/setting/quit",
        method: "GET",
    });
}
// 离职通用设置 修改
export function settingQuitEdit(data) {
    return request({
        url: "/hrm/api/setting/quit",
        method: "POST",
        data
    });
}
// 撤销离职
export function quitRevoke(data) {
    return request({
        url: "/hrm/api/quit/revoke",
        method: "POST",
        data
    });
}
// 办理离职
export function quitApply(data) {
    return request({
        url: "/hrm/api/quit/apply",
        method: "POST",
        data
    });
}
// 离职详情
export function quitInfo(params) {
    return request({
        url: "/hrm/api/quit/info",
        method: "GET",
        params
    });
}
// 离职详情页 离职事项编辑
export function quitEdit(data) {
    return request({
        url: "/hrm/api/quit/edit",
        method: "POST",
        data
    });
}

// 离职证明 获取
export function quitProve(params) {
    return request({
        url: "/hrm/api/quit/prove",
        method: "GET",
        params
    });
}
// 离职证明 保存
export function quitProveEdit(data) {
    return request({
        url: "/hrm/api/quit/prove",
        method: "POST",
        data
    });
}
// 离职证明 下载
export function quitProveDownload(data) {
    return request({
        url: "/hrm/api/quit/prove-download",
        method: "POST",
        data,
        responseType: "arraybuffer",
    });
}




