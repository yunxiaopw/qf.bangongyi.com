import request from "@/utils/request";

// 获取员工关怀设置列表
export function remindList(params) {
  return request({
    url: "/hrm/api/remindcare/set-list",
    method: "GET",
    params
  });
}
// 员工关怀设置 Switch 开关
export function remindSetOpenEdit(data) {
  return request({
      url: "/hrm/api/remindcare/set-open-edit",
      method: "POST",
      data
  });
}
// 员工关怀设置 数据回显
export function remind(params) {
  return request({
    url: "/hrm/api/remindcare/set",
    method: "GET",
    params
  });
}
// 员工关怀设置 获取所有节日信息
export function festivalInfo(params) {
  return request({
    url: "/hrm/api/remindcare/get-festival-info",
    method: "GET",
    params
  });
}
// 员工关怀设置
export function remindSetEdit(data) {
    return request({
        url: "/hrm/api/remindcare/set-edit",
        method: "POST",
        data
    });
}
// 员工关怀 节日配置保存
export function remindSetFestival(data) {
  return request({
      url: "/hrm/api/remindcare/set-festival",
      method: "POST",
      data
  });
}
// 员工关怀提醒设置(生日和入职纪念日)
export function remindSetStaffEdit(data) {
  return request({
      url: "/hrm/api/remindcare/set-staff-edit",
      method: "POST",
      data
  });
}
// 员工关怀记录
export function remindLogList(params) {
  return request({
    url: "/hrm/api/remindcare/remind-log",
    method: "GET",
    params
  });
}