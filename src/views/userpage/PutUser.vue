<template>
  <el-dialog
    title="修改用户信息"
    :visible.sync="dialogVisible"
    @close="dialogClose"
    width="42%"
  >
    <el-form :model="editFrom" :rules="formRules" ref="editFormRef" label-width="70px">
      <el-form-item label="用户名" prop="userName">
        <el-input :disabled="true" v-model="editFrom.userName"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input type="email" v-model="editFrom.email"></el-input>
      </el-form-item>
      <el-form-item label="手机" prop="mobile">
        <el-input v-model="editFrom.mobile"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="editUserInfo">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  props: {
    formRules: { type: Object }
  },
  data() {
    return {
      editFrom: {
        id: "",
        userName: "",
        email: "",
        mobile: ""
      },
      dialogVisible: false
    };
  },
  mounted() {
    this.putUser();
  },
  methods: {
    dialogClose() {
      this.$refs.editFormRef.resetFields();
    },
    putUser() {
      this.$on("editUser", data => {
        this.editFrom.id = data.id;
        this.editFrom.userName = data.username;
        this.editFrom.email = data.email;
        this.editFrom.mobile = data.mobile;
        this.dialogVisible = true;
      });
    },
    editUserInfo() {
      this.$refs.editFormRef.validate(async value => {
        if (!value) return;
        let data =  {
          id: this.editFrom.id,
          email: this.editFrom.email,
          mobile: this.editFrom.mobile
        };
        const { data: res } = await this.$http.put("edit-user", data);
        this.dialogVisible = false;
        if (res.msg === 1) {
          this.$message({ message: "修改成功！", type: "success" });
          this.$emit("load-data", true);
        } else {
          this.$message({ message: "修改失败！", type: "error" });
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
</style>