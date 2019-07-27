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
          <h1>电商后台管理系统</h1>
        </el-col>
        <el-col :span="8">
          <p class="hidden-sm-only">恭喜上海前端44期月薪2W <a
              href="javascript:;"
              @click="loginOut"
            >退出</a></p>
        </el-col>
      </el-row>

    </el-header>
    <el-container>
      <el-aside width="200px">Aside</el-aside>
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  methods: {
    loginOut () {
      this.$confirm('此操作将退出该账户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '退出成功',
          duration: 800
        })
        this.$router.push('/login')
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消退出',
          duration: 800
        })
      })
    }
  }
}
</script>

<style scoped>
.el-container {
  height: 100%;
}
.el-header {
  background-color: #b3c1cd;
  padding-left: 0;
}
p {
  text-align: right;
  line-height: 60px;
  padding-right: 30px;
}
a {
  color: #daa520;
}
h1 {
  font-size: 26px;
  color: #fff;
  line-height: 60px;
  text-align: center;
}
.el-aside {
  background-color: #545c64;
}
.el-main {
  background-color: #eaeef1;
}
</style>
