<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-table border stripe :data="rightsList">
        <el-table-column label="#" type="index"></el-table-column>
        <el-table-column label="权限名称" prop="auth_name"></el-table-column>
        <el-table-column label="路径" prop="path"></el-table-column>
        <el-table-column label="权限级别" prop="level">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.level===1">一级</el-tag>
            <el-tag type="success" v-else-if="scope.row.level===2">二级</el-tag>
            <el-tag type="warning" v-else>三级</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      rightsList: [],
    };
  },
  created() {
    this.getRightsList();
  },
  methods: {
    async getRightsList() {
      const { data: res } = await this.$http.get("rights/list");
      this.rightsList = res.data;
    },
  },
};
</script>
<style lang="scss" scoped>
.el-breadcrumb {
  margin-bottom: 1rem;
}
</style>