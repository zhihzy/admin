<template></template>
<script>
export default {
  data() {
    return {
    };
  },
  mounted() {
    this.removeUser();
  },
  methods: {
    removeUser() {
      this.$on("removeUserById", id => {
        this.$confirm("是否删除该用户", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.$http.delete("del-user/" + id).then(res => {
              if (res.data.msg === 1) {
                this.$message({ message: "删除成功！", type: "success" });
                this.$emit("load-data",true);
              } else {
                this.$message({ message: "删除失败！", type: "error" });
              }
            });
          })
          .catch(() => {
            this.$message({ message: "删除取消！", type: "info" });
          });
      });
    }
  }
};
</script>