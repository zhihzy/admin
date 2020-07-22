<template>
  <div>
    <el-button type="primary" @click="addDialogVisible = true">添加用户</el-button>
    <el-dialog title="添加用户" :visible.sync="addDialogVisible" @close="addDialogClose" width="42%">
      <el-form :model="addForm" :rules="formRules" ref="addFormRef" label-width="70px">
        <el-form-item label="用户名" prop="userName">
          <el-input v-model="addForm.userName"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addForm.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input type="email" v-model="addForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="addForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  props: { formRules: { type: Object } },
  data() {
    return {
      addDialogVisible: false,
      addForm: {
        role_name: "管理员",
        userName: "",
        password: "",
        email: "",
        mobile: ""
      }
    };
  },
  methods: {
    addDialogClose() {
      this.$refs.addFormRef.resetFields();
    },
    addUser() {
      this.$refs.addFormRef.validate(async value => {
        if (!value) return;
        const { data: res } = await this.$http.post("add-user", this.addForm);
        this.addDialogVisible = false;
        if (res.msg === 1) {
          this.$message({ message: "添加成功！", type: "success" });
          this.$emit("load-data", true);
        } else {
          this.$message.error("添加失败！");
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
</style>