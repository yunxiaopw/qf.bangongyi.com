import request from "@/utils/request";

// 获取选人插件获取子部门
export function dept(params) {
  return request({
    url: "/hrm/api/widget/get-dept",
    method: "GET",
    params
  });
}
// 获取选人插件获取员工
export function staffs(params) {
  return request({
    url: "/hrm/api/widget/get-staffs",
    method: "GET",
    params
  });
}
// 获取选人插件获取员工
export function search(params) {
  return request({
    url: "/hrm/api/widget/search",
    method: "GET",
    params
  });
}

