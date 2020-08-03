<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-button class="insert-role" type="primary">添加角色</el-button>
      <el-table border stripe :data="rolesList">
        <el-table-column type="expand">
          <template slot-scope="scope">
            <el-row
              class="vcenter"
              :class="['bd-bottom',index1===0?'bd-top':'']"
              v-for="(item1,index1) in scope.row.children"
              :key="index1"
            >
              <el-col :span="5">
                <el-tag>{{item1.authName}}</el-tag>
                <i class="el-icon-caret-right"></i>
              </el-col>
              <el-col :span="19">
                <el-row
                  class="vcenter"
                  :class="[index2===0?'':'bd-top']"
                  v-for="(item2,index2) in item1.children"
                  :key="index2"
                >
                  <el-col :span="6">
                    <el-tag type="success">{{item2.authName}}</el-tag>
                    <i class="el-icon-caret-right"></i>
                  </el-col>
                  <el-col :span="18">
                    <el-tag
                      type="warning"
                      closable
                      @close="removeRightsById(item3.id)"
                      close="delTagItem"
                      v-for="(item3,index3) in item2.children"
                      :key="index3"
                    >{{item3.authName}}</el-tag>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column label="#" type="index"></el-table-column>
        <el-table-column label="角色名称" prop="roleName"></el-table-column>
        <el-table-column label="角色描述" prop="roleDesc"></el-table-column>
        <el-table-column label="操作">
          <el-button type="primary" class="el-icon-edit">编辑</el-button>
          <el-button type="danger" class="el-icon-delete">删除</el-button>
          <el-button type="warning" class="el-icon-setting" @click="rightsDialogVisible=true">分配权限</el-button>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog title="分配权限" :visible.sync="rightsDialogVisible" width="39%">
      <el-tree
        show-checkbox
        node-key="id"
        default-expand-all
        :default-checken-keys="defaultKeys"
        :data="rolesListTree"
        :props="treeProps"
      ></el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="rightsDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="rightsDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      rolesList: [
        {
          roleName: "主管",
          roleDesc: "技术负责人",
          children: [
            {
              id: 101,
              authName: "商品管理",
              path: "goods",
              children: [
                {
                  id: 104,
                  authName: "商品列表",
                  path: "order",
                  children: [
                    { authName: "修改商品" },
                    { authName: "编辑商品" },
                  ],
                },
                {
                  id: 105,
                  authName: "分类参数",
                  path: "order",
                  children: [
                    { authName: "修改商品" },
                    { authName: "编辑商品" },
                  ],
                },
                {
                  id: 106,
                  authName: "商品分类",
                  path: "order",
                  children: [
                    { authName: "修改商品" },
                    { authName: "编辑商品" },
                  ],
                },
              ],
            },
            {
              id: 102,
              authName: "商品管理",
              path: "goods",
              children: [
                {
                  id: 104,
                  authName: "商品列表",
                  path: "order",
                  children: [
                    { authName: "修改商品" },
                    { authName: "编辑商品" },
                  ],
                },
                {
                  id: 105,
                  authName: "分类参数",
                  path: "order",
                  children: [
                    { authName: "修改商品" },
                    { authName: "编辑商品" },
                  ],
                },
                {
                  id: 106,
                  authName: "商品分类",
                  path: "order",
                  children: [
                    { authName: "修改商品" },
                    { authName: "编辑商品" },
                  ],
                },
              ],
            },
          ],
        },
      ],
      rolesListTree: [
        {
          id: 101,
          authName: "商品管理",
          children: [
            {
              id: 104,
              authName: "商品列表",
              path: "order",
              children: [{ authName: "修改商品" }, { authName: "编辑商品" }],
            },
            {
              id: 105,
              authName: "分类参数",
              path: "order",
              children: [{ authName: "修改商品" }, { authName: "编辑商品" }],
            },
            {
              id: 106,
              authName: "商品分类",
              path: "order",
              children: [{ authName: "修改商品" }, { authName: "编辑商品" }],
            },
          ],
        },
        {
          id: 101,
          authName: "商品管理",
          children: [
            {
              id: 104,
              authName: "商品列表",
              path: "order",
              children: [{ authName: "修改商品" }, { authName: "编辑商品" }],
            },
            {
              id: 105,
              authName: "分类参数",
              path: "order",
              children: [{ authName: "修改商品" }, { authName: "编辑商品" }],
            },
            {
              id: 106,
              authName: "商品分类",
              path: "order",
              children: [{ authName: "修改商品" }, { authName: "编辑商品" }],
            },
          ],
        },
      ],
      defaultKeys: [],
      treeProps: {
        label: "authName",
        children: "children",
      },
      rightsDialogVisible: false,
    };
  },
  created() {
    // this.getRolesList();
  },
  methods: {
    // async getRolesList() {
    //   const { data: res } = await this.$http.get("roles/list");
    //   this.rolesList = res.data;
    // },
    getDefaultKeys(node, arr) {
      if (!node.children) {
        return arr.push(node.id);
      }
      node.children.forEach(iten => {
        this.getDefaultKeys(item, arr);
      });
    },
    removeRightsById(e) {
      this.$confirm("是否删除该权限", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          console.log(e);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.el-breadcrumb {
  margin-bottom: 1rem;
}
.el-tag {
  margin: 0.46rem;
}
.bd-top {
  border-top: 1px solid #eee;
}
.bd-bottom {
  border-bottom: 1px solid #eee;
}
.insert-role {
  margin-bottom: 1rem;
}
/deep/.el-table {
  .el-button {
    padding: 0.53rem 1.3rem;
  }
}
.vcenter {
  display: flex;
  align-items: center;
}
</style>