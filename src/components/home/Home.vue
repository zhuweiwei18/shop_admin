<template>
  <el-container>
    <el-header>
      <el-row
        type="flex"
        align="middle"
      >
        <el-col :span="8"><img
            src="../../assets/logo.png"
            alt=""
          ></el-col>
        <el-col :span="8">
          <h1>后台管理系统</h1>
        </el-col>
        <el-col
          :span="8"
          class="col3"
        >
          恭喜上海前端44期月薪2W <a
            href="#"
            @click.prevent="logout"
          >退出</a>
        </el-col>
      </el-row>

    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu
          :default-active="getIndex()"
          :router="true"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-submenu
            :index="item1.id + ''"
            v-for="item1 in loadMenuList"
            :key="item1.id"
          >
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{ item1.authName }}</span>
            </template>
            <el-menu-item
              :index="'/' + item2.path"
              v-for="item2 in item1.children"
              :key="item2.id"
            >
              <span slot="title">{{ item2.authName }}</span>
            </el-menu-item>
          </el-submenu>
          <!-- <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>权限管理</span>
            </template>
            <el-menu-item index="/roles">
              <span slot="title">角色列表</span>
            </el-menu-item>
            <el-menu-item index="/rights">
              <span slot="title">权限列表</span>
            </el-menu-item>
          </el-submenu> -->

        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  created () {
    this.loadMenuData()
  },
  data () {
    return {
      loadMenuList: []
    }
  },
  methods: {
    getIndex () {
      if (this.$route.path.startsWith('/users')) {
        return '/users'
      }
      if (this.$route.path.startsWith('/categories')) {
        return '/categories'
      }
      if (this.$route.path.startsWith('/goods')) {
        return '/goods'
      }

      return this.$route.path
    },
    async logout () {
      try {
        await this.$confirm('此操作将退出该账户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        localStorage.removeItem('token')
        this.$message({
          type: 'success',
          message: '退出成功',
          duration: 800
        })
        this.$router.push('/login')
      } catch (error) {
        this.$message({
          type: 'info',
          message: '取消退出',
          duration: 800
        })
      }
    },
    // logout () {
    //   this.$confirm('此操作将退出该账户, 是否继续?', '提示', {
    //     confirmButtonText: '确定',
    //     cancelButtonText: '取消',
    //     type: 'warning'
    //   }).then(() => {
    //     localStorage.removeItem('token')
    //     this.$message({
    //       type: 'success',
    //       message: '退出成功',
    //       duration: 800
    //     })
    //     this.$router.push('/login')
    //   }).catch(() => {
    //     this.$message({
    //       type: 'info',
    //       message: '取消退出',
    //       duration: 800
    //     })
    //   })
    // }
    async loadMenuData () {
      let res = await this.$axios.get('menus')
      this.loadMenuList = res.data.data
      // console.log(res)
    }
  }
}
</script>

<style scoped lang="less">
.el-container {
  height: 100%;
}
.el-header {
  background-color: #b3c1cd;
  padding: 0;
  .col3 {
    text-align: right;
    line-height: 60px;
    padding-right: 30px;
    a {
      color: #daa520;
    }
  }
  h1 {
    font-size: 26px;
    color: #fff;
    line-height: 60px;
    text-align: center;
  }
}
.el-aside {
  background-color: #545c64;
}
.el-main {
  background-color: #eaeef1;
}
</style>
