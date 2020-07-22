<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input
            clearable
            placeholder="请输入内容"
            v-model="queryInfo.query"
            class="input-with-select"
            @clear="getUserList"
          >
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <AddUser :formRules="formRules" @load-data="loadData" />
        </el-col>
      </el-row>
      <el-table border :data="userList">
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column prop="username" label="姓名"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="mobile" label="电话"></el-table-column>
        <el-table-column prop="role_name" label="角色"></el-table-column>
        <el-table-column prop="mg_state" label="状态">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.mg_state"
              :inactive-value="0"
              :active-value="1"
              @change="userState(scope.row)"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="showEditDialog(scope.row)" type="primary" icon="el-icon-edit" circle></el-button>
            <el-button
              @click="removeUserById(scope.row.id)"
              type="danger"
              icon="el-icon-delete"
              circle
            ></el-button>
            <el-button type="info" icon="el-icon-setting" circle></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
        background
        layout="total,sizes, prev, pager, next,jumper"
        :page-sizes="[1,2,5,10]"
        :total="total"
        :page-size="queryInfo.pagesize"
        :current-page="queryInfo.pagenum"
      ></el-pagination>
    </el-card>
    <DelUser ref="childRemoveUser" @load-data="loadData" />
    <PutUser ref="childPutUser" :formRules="formRules" @load-data="loadData" />
  </div>
</template>
<script>
import AddUser from "./userpage/AddUser";
import DelUser from "./userpage/DelUser";
import PutUser from "./userpage/PutUser";
export default {
  components: { AddUser, DelUser, PutUser },
  data() {
    var checkMobile = (rule, value, callback) => {
      const regMobile = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
      setTimeout(() => {
        if (regMobile.test(value)) {
          return callback();
        } else {
          callback(new Error("手机号码不合法"));
        }
      }, 1000);
    };
    return {
      queryInfo: {
        query: "",
        pagesize: 5,
        pagenum: 1
      },
      formRules: {
        userName: [
          { required: true, message: "用户名不能为空", trigger: "blur" },
          { min: 3, max: 8, message: "长度在 3 到 8 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          { min: 6, max: 12, message: "长度在 6 到 12 个字符", trigger: "blur" }
        ],
        email: [
          { required: true, message: "邮箱不能为空" },
          { type: "email", message: "请输入正确的邮箱" }
        ],
        mobile: [{ required: true, validator: checkMobile, trigger: "blur" }]
      },
      total: 0,
      userList: []
    };
  },
  created() {
    this.getUserList();
  },
  methods: {
    handleSizeChange(pageSize) {
      this.queryInfo.pagesize = pageSize;
      this.getUserList();
    },
    userState(userInfo) {
      this.$http.put(`users/${userInfo.id}/state/${userInfo.mg_state}`);
    },
    handleCurrentChange(pageNum) {
      this.queryInfo.pagenum = pageNum;
      this.getUserList();
    },
    async getUserList() {
      const { data: res } = await this.$http.post("users", this.queryInfo);
      this.userList = res.data;
      this.total = res.total;
    },
    showEditDialog(data) {
      this.$refs.childPutUser.$emit("editUser", data);
    },
    removeUserById(id) {
      this.$refs.childRemoveUser.$emit("removeUserById", id);
    },
    loadData(e) {
      if (e) {
        this.getUserList();
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.el-breadcrumb {
  margin-bottom: 1rem;
}
.el-table {
  margin: 1rem 0;
}
/deep/.btn-prev,
/deep/.btn-next {
  min-height: 35px;
}
/deep/.el-pagination .el-pager li {
  line-height: 35px;

  min-width: 50px;
  min-height: 35px;
}
</style>