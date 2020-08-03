<template>
  <el-container>
    <el-header>
      <div>
        <img class="header-img" src="../assets/logo.png" />
        <span class="header-title">E-commerce background</span>
      </div>
      <el-button type="info" class="sign-out" @click="signOut">Sign Out</el-button>
    </el-header>
    <el-container>
      <el-aside :width="isCollapse?'64px':'200px'">
        <el-menu
          class="el-menu-vertical-demo"
          background-color="#333744"
          text-color="#fff"
          active-text-color="#409fff"
          unique-opened
          :default-active="activePath"
          :collapse="isCollapse"
          :collapse-transition="false"
          router
        >
          <el-submenu :index="item.id" v-for="(item,index) in menuList" :key="index">
            <template slot="title">
              <i :class="icons[item.id]"></i>
              <span>{{item.authName}}</span>
            </template>
            <el-menu-item
              :index="'/'+subItem.path"
              v-for="(subItem,index) in item.children"
              :key="index"
              @click="saveNavState('/'+subItem.path)"
            >
              <i class="el-icon-menu"></i>
              {{subItem.authName}}
            </el-menu-item>
          </el-submenu>
        </el-menu>
        <div class="toggle" @click="isCollapse=!isCollapse">
          <i :class="icon"></i>
        </div>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      isCollapse: false,
      activePath: "",
      menuList: [
        {
          id: "01",
          authName: "用户管理",
          children: [{ id: "1", authName: "用户列表", path: "user" }],
        },
        {
          id: "02",
          authName: "权限管理",
          children: [
            { id: "1", authName: "角色列表", path: "roles" },
            { id: "2", authName: "权限列表", path: "rights" },
          ],
        },
        {
          id: "03",
          authName: "商品管理",
          children: [
            { id: "1", authName: "商品列表" },
            { id: "2", authName: "分类参数" },
            { id: "3", authName: "商品分类" },
          ],
        },
        {
          id: "04",
          authName: "订单管理",
          children: [{ id: "1", authName: "订单列表" }],
        },
        {
          id: "05",
          authName: "数据统计",
          children: [],
        },
      ],
      icons: {
        "01": "el-icon-user-solid",
        "02": "el-icon-s-management",
        "03": "el-icon-s-goods",
        "04": "el-icon-s-order",
        "05": "el-icon-s-data",
      },
    };
  },
  created() {
    this.activePath = window.sessionStorage.getItem("activePath");
  },
  methods: {
    signOut() {
      sessionStorage.clear("openId");
      this.$router.push("/login");
    },
    saveNavState(activePath) {
      sessionStorage.setItem("activePath", activePath);
      this.activePath = activePath;
    },
  },
  computed: {
    icon() {
      return this.isCollapse ? "el-icon-s-unfold" : "el-icon-s-fold";
    },
  },
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
      .header-title {
        font-size: 1.2rem;
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
    position: relative;
    background-color: #333744;
    .toggle {
      text-align: center;
      position: absolute;
      bottom: 0;
      width: 100%;
      background-color: #4a5064;
      cursor: pointer;
      i {
        font-size: 1.5rem;
        color: #fff;
      }
    }
  }
  .el-main {
    background-color: #eaedf1;
  }
  .el-menu {
    border-right: none;
  }
}
</style>