import request from "@/utils/request";

// 人事表单数据
export function dictFormData(params) {
    return request({
        url: "/hrm/api/dict/form-data",
        method: "GET",
        params
    });
}
// 人事表单配置 保存
export function dictFormSave(data) {
    return request({
        url: "/hrm/api/dict/form-save",
        method: "POST",
        data
    });
}

