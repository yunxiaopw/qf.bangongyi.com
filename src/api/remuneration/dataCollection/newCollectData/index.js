
import request from "@/utils/request";

// 获取所有发薪方案
export function getSalaryProject(params) {
  return request({
    url: "newsalary/api/wages/get-all-item",
    method: "GET",
    params
  });
}

// 采集表添加
export function addGatherList(data) {
    return request({
        url: "newsalary/api/data-collect/add",
        method: "POST",
        data
    });
}

// 采集表列表项
export function gatherList(params) {
  return request({
    url: "newsalary/api/data-collect/item-list",
    method: "GET",
    params
  });
}

// 采集项添加/编辑
export function gatherItemAction(data) {
    return request({
        url: "newsalary/api/data-collect/add-item",
        method: "POST",
        data
    });
}

// 采集项删除
export function delGatherList(params) {
    return request({
      url: "newsalary/api/data-collect/item-delete",
      method: "GET",
      params
    });
  }
// 采集项必填/唯一标识修改
export function itemRequireEdit(params) {
    return request({
      url: "newsalary/api/data-collect/item-required-edit",
      method: "GET",
      params
    });
  }
 // 采集项获取规则
 export function getItemRule(params) {
  return request({
    url: "newsalary/api/data-collect/get-item-rule",
    method: "GET",
    params
  });
}

//采集项编辑规则
export function setItemRule(data) {
return request({
    url: "newsalary/api/data-collect/item-rule-edit",
    method: "POST",
    data
});
}