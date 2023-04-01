import request from "@/utils/request";

// 获取采集列表
export function apiGetCollectList(params) {
  return request({
    url: "/newsalary/openapi/data-fill/get-collect-list",
    method: "POST",
    params
  });
}

// 获取填报数据回显数据
export function apiGetFillData(params) {
  return request({
    url: "/newsalary/openapi/data-fill/fill-record-list",
    method: "POST",
    params
  });
}

// 添加数据
export function apiAddFillData(params) {
  return request({
    url: "/newsalary/openapi/data-fill/data-fill-add",
    method: "POST",
    params
  });
}

// 获取用户基本信息
export function apiGetUserInfo(params) {
  return request({
    url: "/newsalary/openapi/data-fill/get-userinfo",
    method: "POST",
    params
  });
}

// 查看记录
export function apiGetRecordList(params) {
  return request({
    url: "/newsalary/openapi/data-fill/fill-record",
    method: "POST",
    params
  });
}

// 获取数据详情
export function apiGetFillDetail(params) {
  return request({
    url: "/newsalary/openapi/data-fill/fill-record-detail",
    method: "POST",
    params
  });
}

// 数据删除
export function apiDeleteFillData(params) {
  return request({
    url: "/newsalary/openapi/data-fill/fill-detail-del",
    method: "POST",
    params
  });
}

// 数据编辑
export function apiEditFillData(params) {
  return request({
    url: "/newsalary/openapi/data-fill/data-fill-edit",
    method: "POST",
    params
  });
}