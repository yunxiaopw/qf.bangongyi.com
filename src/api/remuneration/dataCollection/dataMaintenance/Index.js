import request from "@/utils/request";

// 数据维护-新增获取页面数据
export function getAddsData(params) {
  return request({
    url: "newsalary/api/data-list/get-item",
    method: "GET",
    params
  });
}
// 数据维护-获取用户基础信息
export function getUserInfo(params) {
  return request({
    url: "newsalary/api/data-list/get-userinfo",
    method: "GET",
    params
  });
}
// 数据维护-列表页
export function getMainList(params) {
  return request({
    url: "newsalary/api/data-list/data-list",
    method: "GET",
    params
  });
}


// 数据维护-新增数据
export function addDataList(data) {
    return request({
        url: "newsalary/api/data-list/data-add",
        method: "POST",
        data
    });
}

// 数据维护-列表删除数据
export function delMainList(params) {
  return request({
    url: "newsalary/api/data-list/data-batch-del",
    method: "GET",
    params
  });
}
// 数据维护-操作记录
export function operateMainList(params) {
  return request({
    url: "newsalary/api/data-list/data-list-log",
    method: "GET",
    params
  });
}

// 数据维护-列表编辑数据
export function editDataList(data) {
  return request({
      url: "newsalary/api/data-list/data-online-edit",
      method: "POST",
      data
  });
}