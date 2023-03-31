import request from "@/utils/request";

// 员工新增接口
export function staffCreate(data) {
    return request({
        url: "/hrm/api/staff/create",
        method: "POST",
        data
    });
}
// 新增时的 编制选项 是否显示
export function authorizedSetting() {
    return request({
        url: "/hrm/api/authorized/setting",
        method: "GET",
    });
}
// 获取岗位可选项
export function positionType() {
    return request({
        url: "/hrm/api/position/position-type",
        method: "GET"
    });
}
// 获取职级可选数据
export function widgetRank() {
    return request({
        url: "/hrm/api/widget/rank",
        method: "GET",
    });
}
// 是否显示 邀请加入企业微信
export function isshowinvitation() {
    return request({
        url: "/hrm/api/setting/isshowinvitation",
        method: "GET",
    });
}