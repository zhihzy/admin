<template>
  <el-container>
    <el-header>
      <div>
        <img class="header-img" src="../assets/logo.png" />
        <span>E-commerce background</span>
      </div>
      <el-button type="info" class="sign-out" @click="signOut">Sign Out</el-button>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          background-color="#333744"
          text-color="#fff"
          active-text-color="#409fff"
        >
          <el-submenu :index="item.id" v-for="(item,index) in menuList" :key="index">
            <template slot="title">
              <i :class="item.icon"></i>
              <span>{{item.authName}}</span>
            </template>
            <el-menu-item :index="subItem.id" v-for="(subItem,index) in item.children" :key="index">
              <i class="el-icon-menu"></i>
              {{subItem.authName}}
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      menuList: [
        {
          id: "01",
          authName: "用户管理",
          icon:"el-icon-user-solid",
          children: [{ id: "1", authName: "用户列表" }]
        },
        {
          id: "02",
          authName: "权限管理",
          icon:"el-icon-s-management",
          children: [
            { id: "1", authName: "角色列表" },
            { id: "2", authName: "权限列表" }
          ]
        },
        {
          id: "03",
          authName: "商品管理",
          icon:"el-icon-s-goods",
          children: [
            { id: "1", authName: "商品列表" },
            { id: "2", authName: "分类参数" },
            { id: "3", authName: "商品分类" }
          ]
        },
        {
          id: "04",
          authName: "订单管理",
          icon:"el-icon-s-order",
          children: []
        },
        {
          id: "05",
          authName: "数据统计",
          icon:"el-icon-s-data",
          children: []
        }
      ]
    };
  },
  methods: {
    signOut() {
      sessionStorage.clear("openId");
      this.$router.push("/login");
    }
  }
};
</script>

<style lang="scss" scoped>
.el-container {
  height: 100%;
  .el-header {
    background-color: #373d41;
    height: 3.99rem;
    display: flex;
    justify-content: space-between;
    color: #fff;
    div {
      display: flex;
      align-items: center;
      padding: 3px 0;
      .header-img {
        width: 55px;
        background-color: #ccc;
        border-radius: 50%;
        margin-right: 1rem;
      }
    }
    .sign-out {
      height: 2.7rem;
      margin: auto 0;
    }
    .sign-out:hover {
      color: #54a3ff;
    }
  }
  .el-aside {
    background-color: #333744;
  }
  .el-main {
    background-color: #eaedf1;
  }
  .el-menu {
    border-right: none;
  }
}
</style>