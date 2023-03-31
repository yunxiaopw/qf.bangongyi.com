
// 数据采集主页面
import request from "@/utils/request";
// 采集表列表页
export function getGatherList(params) {
    return request({
      url: "newsalary/api/data-collect/list",
      method: "GET",
      params
    });
  }
  // 采集表启用/禁用
  export function setGatherStatus(params) {
    return request({
      url: "newsalary/api/data-collect/collect-show",
      method: "GET",
      params
    });
  }
  // 采集表删除
  export function delGatherList(params) {
    return request({
      url: "newsalary/api/data-collect/collect-del",
      method: "GET",
      params
    });
  }
 