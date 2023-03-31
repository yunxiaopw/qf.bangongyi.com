<template>
    <el-dialog :title="title" :visible.sync="visible" ref="dialog" @open="handleOpen" @close="handleClose">
        <el-form :formData="formData" :disabled="action === 'view'" ref="form">
            <el-form-item label="活动名称" :label-width="formLabelWidth">
                <el-input v-model="form.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="活动区域" :label-width="formLabelWidth">
                <el-select v-model="form.region" placeholder="请选择活动区域">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="handleClose()">取 消</el-button>
            <el-button type="primary" @click="handleSave()">确 定</el-button>
        </div>
    </el-dialog>
</template>
<script>
export default {
    name: 'editPage',
    data() {
        return {
            visible: false,//是否显示
            title: '',
            formData: {
                name: '',
                region: '',
                date1: '',
                date2: '',
                delivery: false,
                type: [],
                resource: '',
                desc: ''
            },
            // 根据action==edit  ||action == add  来判断进行不同的界面
            action:'',

        }
    },
    methods: {
        // 打开弹窗
        async handleOpen() {
            switch (this.action) {
                case "add":
                
                    // this.formData.sitePCode = this.editRecord.sitePCode;
                    // this.formData.sitePName = this.editRecord.sitePName;
                    break;
                case "edit":
                case "view":
                    // this.$request({
                    //     method: "get",
                    //     url: this.url.detail,
                    //     data: { id: this.editRecord.id },
                    // }).then((res) => {
                    //     this.formData = res.data;
                    // });
                    break;
            }
        },
        // 关闭弹窗
        handleClose() {
            this.formData = {};
            this.editRecord = {};
            this.visible = false;
        },
        // 编辑弹窗
        handleSave() {
            this.$refs["form"].validate((valid) => {
                if (valid) {
                    this.$refs.dialog.loading = true;
                    this.$request({
                        method: "post",
                        url: this.action == "add" ? this.url.submit : this.url.edit,
                        data: {
                            ...this.formData,
                        },
                    })
                        .then((res) => {
                            this.$message({
                                type: "success",
                                message: res.userTip,
                            });
                            this.handleClose();
                            this.$emit("onsumit");
                        })
                        .finally(() => {
                            this.$refs.dialog.loading = false;
                        });
                }
            });
        },
    }
}
</script>