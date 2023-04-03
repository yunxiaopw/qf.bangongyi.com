export const h5Routers = [
  {
    path: "/h5-home",
    name: "H5Home",
    component: () => import("@/views/h5/index")
  },
  {
    path: "/h5-data-form",
    name: "H5DataForm",
    component: () => import("@/views/h5/dataForm")
  },
  {
    path: "/h5-form-record",
    name: "H5FormRecord",
    component: () => import("@/views/h5/formRecord")
  },
  {
    path: "/h5-record-info",
    name: "H5RecordInfo",
    component: () => import("@/views/h5/recordInfo")
  },
  {
    path: "/h5-edit-form",
    name: "H5EditInfo",
    component: () => import("@/views/h5/editDataForm")
  }
]