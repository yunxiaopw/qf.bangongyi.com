import request from "@/utils/request";

// 立即体验
export function custom(data) {
    return request({
        url: "/public/custom",
        method: "POST",
        data
    });
}