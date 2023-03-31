import request from "@/utils/request";

// 新增入职登记表单 手动录入
export function inductionRegister(data) {
    return request({
        url: "/hrm/api/induction/register",
        method: "POST",
        data
    });
}