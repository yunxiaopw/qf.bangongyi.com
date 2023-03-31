import request from "@/utils/request";

// 获取部门编制统计
export function authiruzed(params) {
  return request({
    url: "/hrm/api/authorized/authorized",
    method: "GET",
    params
  });
}
// 保存编制
export function setAuthiruzed(data) {
    return request({
        url: "/hrm/api/authorized/authorized",
        method: "POST",
        data
    });
}
// 获取实习员工编制规则
export function authiruzedSetting() {
    return request({
        url: "/hrm/api/authorized/setting",
        method: "GEt",
    });
}
// 保存实习员工编制规则
export function setAuthiruzedSetting(data) {
    return request({
        url: "/hrm/api/authorized/setting",
        method: "POST",
        data
    });
}
// 获取编制员工
export function authiruzedStaff(params) {
    return request({
        url: "/hrm/api/authorized/staff",
        method: "GEt",
        params
    });
}
// 获取编制岗位
export function authiruzedPosition(params) {
    return request({
        url: "/hrm/api/authorized/position",
        method: "GEt",
        params
    });
}