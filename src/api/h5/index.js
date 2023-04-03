import request from "@/utils/request";

// 获取采集列表
export function apiGetCollectList(params) {
  return request({
    url: "/newsalary/openapi/data-fill/get-collect-list",
    method: "GET",
    params
  });
}

// 填报数据基本信息
export function apiGetCollectListInfo(params) {
  return request({
    url: '/newsalary/openapi/data-fill/collect-fill-web',
    method: "GET",
    params
  })
}

// 获取填报数据回显数据
export function apiGetRecordFillData(data) {
  return request({
    url: "/newsalary/openapi/data-fill/fill-record-list",
    method: "POST",
    data
  });
}

// 添加数据
export function apiAddFillData(data) {
  return request({
    url: "/newsalary/openapi/data-fill/data-fill-add",
    method: "POST",
    data
  });
}

// 获取用户基本信息
export function apiGetUserInfo(data) {
  return request({
    url: "/newsalary/openapi/data-fill/get-userinfo",
    method: "POST",
    data
  });
}

// 查看记录
export function apiGetRecordList(data) {
  return request({
    url: "/newsalary/openapi/data-fill/fill-record",
    method: "POST",
    data
  });
}

// 获取单条数据详情
export function apiGetFillDetail(data) {
  return request({
    url: "/newsalary/openapi/data-fill/fill-record-detail",
    method: "POST",
    data
  });
}

// 数据删除
export function apiDeleteFillData(data) {
  return request({
    url: "/newsalary/openapi/data-fill/fill-detail-del",
    method: "POST",
    data
  });
}

// 数据编辑
export function apiEditFillData(data) {
  return request({
    url: "/newsalary/openapi/data-fill/data-fill-edit",
    method: "POST",
    data
  });
}

