import request from "@/utils/request";

// 没有负责人的部门
export function leaderCensus() {
  return request({
    url: "/hrm/api/department/leader-census",
    method: "GET"
  });
}
// 部门列表
export function departmentList(params) {
  return request({
    url: "/hrm/api/department/list",
    method: "GET",
    params
  });
}
// 子部门列表
export function departmentChild(params) {
  return request({
    url: "/hrm/api/department/child",
    method: "GET",
    params
  });
}
// 添加子部门
export function createChild(params) {
  return request({
    url: "/hrm/api/department/create",
    method: "GET",
    params
  });
}
// 部门详情
export function departmentInfo(params) {
  return request({
    url: "/hrm/api/department",
    method: "GET",
    params
  });
}
// 修改部门
export function departmentEdit(params) {
  return request({
    url: "/hrm/api/department/edit",
    method: "GET",
    params
  });
}
// 移动部门
export function departmentMove(params) {
  return request({
    url: "/hrm/api/department/move",
    method: "GET",
    params
  });
}
// 停用部门列表
export function disableList() {
  return request({
    url: "/hrm/api/department/disable-list",
    method: "GET"
  });
}
// 获取员工列表
export function staff(params) {
  return request({
    url: "/hrm/api/staff/list",
    method: "GET",
    params
  });
}
// 移动员工部门
export function staffMove(data) {
  return request({
    url: "/hrm/api/staff/move",
    method: "POST",
    data
  });
}
// 工作性质下拉项
export function rankSetting() {
  return request({
      url: "/hrm/api/rank/rank-setting",
      method: "GET"
  });
}
// 组织架构管理 停用
export function departmentStop(data) {
  return request({
    url: "/hrm/api/department/stop",
    method: "POST",
    data
  });
}
// 组织架构管理 导出部门列表
export function departmentExport(params) {
  return request({
    url: "/hrm/api/department/export",
    method: "GET",
    params,
    responseType: "arraybuffer",
  });
}