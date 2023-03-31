import request from "@/utils/request";

// 新增入职登记表单
export function inductionAutoRegister(data) {
    return request({
        url: "/hrm/api/induction/auto-register",
        method: "POST",
        data
    });
}