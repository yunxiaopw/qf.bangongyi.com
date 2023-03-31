import request from "@/utils/request";

// 获取岗位词典类别
export function positionType() {
  return request({
    url: "/hrm/api/position/position-type",
    method: "GET"
  });
}
// 新增/修改 岗位类别
export function setPositionType(data) {
    return request({
        url: "/hrm/api/position/position-type",
        method: "POST",
        data
    });
}
// 删除 岗位类别
export function deletePositionType(data) {
    return request({
        url: "/hrm/api/position/position-type",
        method: "DELETE",
        data
    });
}


// 获取岗位列表
export function positionList(params) {
    return request({
        url: "/hrm/api/position/position",
        method: "GET",
        params
    });
}
// 新增/修改 岗位列表
export function setPosition(data) {
    return request({
        url: "/hrm/api/position/position",
        method: "POST",
        data
    });
}
// 新增/修改 岗位列表
export function deletPosition(data) {
    return request({
        url: "/hrm/api/position/position",
        method: "DELETE",
        data
    });
}
// 批量移动 岗位列表
export function positionMove(data) {
    return request({
        url: "/hrm/api/position/move",
        method: "POST",
        data
    });
}