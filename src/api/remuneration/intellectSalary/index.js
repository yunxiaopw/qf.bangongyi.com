// 发薪方案
import request from "@/utils/request";

// 薪资结构添加/编辑
export function configAction(data) {
    return request({
        url: "/newsalary/api/wages/wages-rule-edit",
        method: "POST",
        data
    });
  }

  // 薪资结构查询配置
export function searchConfig(params) {
    return request({
        url: "/newsalary/api/wages/get-wages-rule",
        method: "GET",
        params
    });
  }
  // 薪资项列表
export function salaryList(params) {
    return request({
        url: "/newsalary/api/item/get-wages-items",
        method: "GET",
        params
    });
  }

  // 获取分类列表
export function classifyList(params) {
    return request({
        url: "/newsalary/api/item/get-category",
        method: "GET",
        params
    });
  }

// 薪资项新增/编辑
export function salaryAction(data) {
    return request({
        url: "/newsalary/api/item/item-edit",
        method: "POST",
        data
    });
  }

  // 薪资项 启用/禁用
export function stateList(params) {
    return request({
        url: "/newsalary/api/item/item-disabled",
        method: "GET",
        params
    });
  }

  
  // 薪资项 删除
export function deleteItem(params) {
    return request({
        url: "/newsalary/api/item/item-delete",
        method: "GET",
        params
    });
  }

  
  // 计薪规则- 薪资项 列表
export function salaryConfigList(params) {
    return request({
        url: "/newsalary/api/wages/get-item-list",
        method: "GET",
        params
    });
  }
  
  // 薪资项 查询
export function searchItem(params) {
    return request({
        url: "/newsalary/api/item/item-list-search",
        method: "GET",
        params
    });
  }

// 分组添加/编辑
export function divideAction(data) {
    return request({
        url: "/newsalary/api/wages/item-group-edit",
        method: "POST",
        data
    });
  }


 // 获取薪资项信息
 export function getSalaryMessage(params) {
    return request({
        url: "/newsalary/api/wages/get-item-single",
        method: "GET",
        params
    });
  }


// 薪资项添加/编辑
export function salaryItemAction(data) {
    return request({
        url: "/newsalary/api/wages/item-list-edit",
        method: "POST",
        data
    });
  }

// 获取规则
export function getSalaryRule(params) {
    return request({
        url: "/newsalary/api/wages/get-item-rule",
        method: "GET",
        params
    });
  }


  // 发薪规则 编辑规则
export function salaryItemRule(data) {
    return request({
        url: "/newsalary/api/wages/item-rule-edit",
        method: "POST",
        data
    });
  }

  // 发薪规则 发薪审批/工资条是否显示
export function showConfig(data) {
    return request({
        url: "/newsalary/api/wages/item-list-show",
        method: "POST",
        data
    });
  }

