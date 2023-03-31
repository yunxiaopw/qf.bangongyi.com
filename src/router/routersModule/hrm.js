// 人事管理 路由模块

export const personalAffairsSystemRouters = [
  // 人事管理/组织管理/组织结构 相关页面
  {
    path: "/department",
    name: "department",
    component: () => import("@/views/hrm/department/index")
  },
  {
    path: "/departmentInfo",
    name: "departmentInfo",
    component: () => import("@/views/hrm/department/departmentInfo")
  },
  {
    path: "/deactivatedTissue",
    name: "deactivatedTissue",
    component: () => import("@/views/hrm/department/deactivatedTissue")
  },
  {
    path: "/organizationChart",
    name: "organizationChart",
    component: () => import("@/views/hrm/department/organizationChart")
  },
  // 人事管理/组织管理/职级管理 相关页面
  {
    path: "/rank",
    name: "rank",
    component: () => import("@/views/hrm/rank/index")
  },
  {
    path: "/manageTheRankChannel",
    name: "manageTheRankChannel",
    component: () => import("@/views/hrm/rank/manageTheRankChannel")
  },
  // 人事管理/组织管理/岗位词典 相关页面
  {
    path: "/position",
    name: "position",
    component: () => import("@/views/hrm/position/index")
  },
  // 人事管理/组织管理/编制管理 相关页面
  {
    path: "/authorized",
    name: "authorized",
    component: () => import("@/views/hrm/authorized/index")
  },
  {
    path: "/modifyCompile",
    name: "modifyCompile",
    component: () => import("@/views/hrm/authorized/modifyCompile")
  },
  // 人事管理/人事设置 相关页面
  {
    path: "/staffingFormSetup",
    name: "staffingFormSetup",
    component: () => import("@/views/hrm/staffingSetup/staffingFormSetup")
  },
  {
    path: "/staffingDict",
    name: "staffingDict",
    component: () => import("@/views/hrm/staffingSetup/staffingDict")
  },
  {
    path: "/staffingApprovalProcess",
    name: "staffingApprovalProcess",
    component: () => import("@/views/hrm/staffingSetup/staffingApprovalProcess")
  },
  {
    path: "/staffingLabel",
    name: "staffingLabel",
    component: () => import("@/views/hrm/staffingSetup/staffingLabel")
  },
  {
    path: "/approvalProcessEdit",
    name: "approvalProcessEdit",
    component: () => import("@/views/hrm/staffingSetup/approvalProcessEdit")
  },
  {
    path: "/staffFormConfiguration",
    name: "staffFormConfiguration",
    component: () => import("@/views/hrm/staffingSetup/staffFormConfiguration")
  },
  // 人事管理/员工管理/员工花名册 相关页面
  {
    path: "/staff",
    name: "staff",
    component: () => import("@/views/hrm/staff/index")
  },
  {
    path: "/addStaff",
    name: "addStaff",
    component: () => import("@/views/hrm/staff/addStaff")
  },
  {
    path: "/staffInfo",
    name: "staffInfo",
    component: () => import("@/views/hrm/staff/staffInfo")
  },
  // 人事管理/员工管理/入职管理 相关页面
  {
    path: "/entryManagement",
    name: "entryManagement",
    component: () => import("@/views/hrm/entryManagement/index")
  },
  {
    path: "/entryManagementInfo",
    name: "entryManagementInfo",
    component: () => import("@/views/hrm/entryManagement/entryManagementInfo")
  },
  {
    path: "/addEntryManagement",
    name: "addEntryManagement", 
    component: () => import("@/views/hrm/entryManagement/addEntryManagement")
  },
  {
    path: "/manuallyEntryManagement",
    name: "manuallyEntryManagement",
    component: () =>
      import("@/views/hrm/entryManagement/manuallyEntryManagement")
  },
  {
    path: "/theEnrollmentOfEntryPC",
    name: "theEnrollmentOfEntryPC",
    component: () =>
      import("@/views/hrm/entryManagement/theEnrollmentOfEntryPC")
  },
  {
    path: "/entryManagementSetup",
    name: "entryManagementSetup",
    component: () =>
      import("@/views/hrm/entryManagement/entryManagementSetup")
  },
  
  // 人事管理/员工管理/转正管理 相关页面
  {
    path: "/regularization",
    name: "regularization",
    component: () => import("@/views/hrm/regularization/index")
  },
  {
    path: "/transactRegularization",
    name: "transactRegularization",
    component: () => import("@/views/hrm/regularization/transactRegularization")
  },
  {
    path: "/regularizationInfor",
    name: "regularizationInfor",
    component: () => import("@/views/hrm/regularization/regularizationInfor")
  },
  {
    path: "/regularizationSetup",
    name: "regularizationSetup",
    component: () => import("@/views/hrm/regularization/regularizationSetup")
  },
  // 人事管理/员工管理/异动管理 相关页面
  {
    path: "/transactedMode",
    name: "transactedMode",
    component: () => import("@/views/hrm/transactedMode/index")
  },
  {
    path: "/soleTransactedMode",
    name: "soleTransactedMode",
    component: () => import("@/views/hrm/transactedMode/soleTransactedMode")
  },
  {
    path: "/transactedModeInfor",
    name: "transactedModeInfor",
    component: () => import("@/views/hrm/transactedMode/transactedModeInfor")
  },
  // 人事管理/员工管理/离职管理 相关页面
  {
    path: "/dimission",
    name: "dimission",
    component: () => import("@/views/hrm/dimission/index")
  },
  {
    path: "/setDimission",
    name: "setDimission",
    component: () => import("@/views/hrm/dimission/setDimission")
  },
  {
    path: "/dimissionInfor",
    name: "dimissionInfor",
    component: () => import("@/views/hrm/dimission/dimissionInfor")
  },
  {
    path: "/printDimission",
    name: "printDimission",
    component: () => import("@/views/hrm/dimission/printDimission")
  },
  {
    path: "/dimissionSetup",
    name: "dimissionSetup",
    component: () => import("@/views/hrm/dimission/dimissionSetup")
  },
  // 人事管理/员工管理/人事审批单 相关页面
  {
    path: "/personnelApprovalForm",
    name: "personnelApprovalForm",
    component: () => import("@/views/hrm/personnelApprovalForm/index")
  },
  // 人事管理/第三方对接设置 相关页面
  {
    path: "/toDockSetup",
    name: "toDockSetup",
    component: () => import("@/views/hrm/toDockSetup/index")
  },
  // 人事管理/人才库和简历解析/人才库 相关页面
  {
    path: "/talentPool",
    name: "talentPool",
    component: () => import("@/views/hrm/talentPoolAndResumeAnalysis/talentPool/index")
  },
  {
    path: "/talentPoolInfor",
    name: "talentPoolInfor",
    component: () => import("@/views/hrm/talentPoolAndResumeAnalysis/talentPool/talentPoolInfor")
  },
  // 人事管理/人才库和简历解析/简历解析 相关页面
  {
    path: "/resumeAnalysis",
    name: "resumeAnalysis",
    component: () => import("@/views/hrm/talentPoolAndResumeAnalysis/resumeAnalysis/index")
  },
  // 人事管理/数据分析/在职人员统计 相关页面
  {
    path: "/activeStaffChart",
    name: "activeStaffChart",
    component: () => import("@/views/hrm/dataAnalysis/activeStaffChart")
  },
  // 人事管理/数据分析/员工流动趋势 相关页面
  {
    path: "/stuffTurnoverChart",
    name: "stuffTurnoverChart",
    component: () => import("@/views/hrm/dataAnalysis/stuffTurnoverChart")
  },
  // 人事管理/HR工作台 相关页面
  {
    path: "/HRBench",
    name: "HRBench",
    component: () => import("@/views/hrm/HRBench/index")
  },
  // 移动端/人事管理/入职资料登记表 相关页面
  {
    path: "/entryDocument",
    name: "entryDocument",
    component: () => import("@/views/hrm/widget/entryDocument/index")
  },
  {
    path: "/editUserInfor",
    name: "editUserInfor",
    component: () => import("@/views/hrm/widget/entryDocument/editUserInfor")
  },
  // 员工关怀 相关页面
  {
    path: "/remindcare",
    name: "remindcare",
    component: () => import("@/views/staffCare/remindcare/index")
  },
  {
    path: "/setBlessing",
    name: "setBlessing",
    component: () => import("@/views/staffCare/remindcare/setBlessing")
  },
  {
    path: "/setReminders",
    name: "setReminders",
    component: () => import("@/views/staffCare/remindcare/setReminders")
  },
  {
    path: "/staffCareLog",
    name: "staffCareLog",
    component: () => import("@/views/staffCare/staffCareLog/index")
  },
  // 审批流 相关页面
  {
    path: "/approval",
    name: "approval",
    component: () => import("@/views/approval/index")
  },
  {
    path: "/addApproval",
    name: "addApproval",
    component: () => import("@/views/approval/addApproval")
  },
];
