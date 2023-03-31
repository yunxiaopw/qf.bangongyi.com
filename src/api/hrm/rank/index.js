import request from "@/utils/request";

// 定级统计
export function rankCount() {
  return request({
    url: "/hrm/api/rank/get-rank-count",
    method: "GET"
  });
}
// 职级统计总表数据
export function rankLevel(params) {
    return request({
        url: "/hrm/api/rank/rank-level",
        method: "GET",
        params
    });
}
// 保存职级
export function setRankLevel(data) {
    return request({
        url: "/hrm/api/rank/rank-level",
        method: "POST",
        data
    });
}
// 删除职级
export function deleteRankLevel(data) {
    return request({
        url: "/hrm/api/rank/rank-level",
        method: "DELETE",
        data
    });
}
// 定级计算规则
export function rankSetting() {
    return request({
        url: "/hrm/api/rank/rank-setting",
        method: "GET"
    });
}
// 保存定级计算规则
export function setRankSetting(data) {
    return request({
        url: "/hrm/api/rank/rank-setting",
        method: "POST",
        data
    });
}


// 职级通道列表
export function rankTypeList(params) {
    return request({
        url: "/hrm/api/rank/rank-type",
        method: "GET",
        params
    });
}
// 保存职级通道
export function setRankType(data) {
    return request({
        url: "/hrm/api/rank/rank-type",
        method: "POST",
        data
    });
}
// 删除职级通道
export function deleteRankType(data) {
    return request({
        url: "/hrm/api/rank/rank-type",
        method: "DELETE",
        data
    });
}