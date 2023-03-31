import request from "@/utils/request";

// 获取采集列表
export function apiGetCollectList(params) {
  return request({
    url: "/newsalary/openapi/data-fill/get-collect-list",
    method: "POST",
    params
  });
}