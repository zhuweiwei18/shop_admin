<template>
  <div>
    <!-- 面包蟹导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 表格 -->
    <el-table
      :data="rightsData"
      style="width: 100%"
    >
      <el-table-column
        type="index"
        :index="indexMethod"
      >
      </el-table-column>
      <el-table-column
        prop="authName"
        label="权限名称"
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="path"
        label="路径"
        width="180"
      >
      </el-table-column>
      <el-table-column label="等级">
        <template slot-scope='scope'>
          <span v-if='scope.row.level==0'>一级</span>
          <span v-else-if='scope.row.level==1'>二级</span>
          <span v-else>三级</span>
        </template>
      </el-table-column>
    </el-table>

  </div>

</template>

<script>
/* eslint-disable */
export default {
  created () {
    this.loadRightsData()
  },
  data () {
    return {
      rightsData: [
        {
          authName: '',
          path: '',
          level: ''
        }
      ]
    }
  },
  methods: {
    async loadRightsData () {
      let res = await this.$axios.get('rights/list')
      this.rightsData = res.data.data
    },
    indexMethod (index) {
      return index
    }
  }
}
</script>

<style scoped>
.el-breadcrumb {
  background-color: #d4dae0;
  line-height: 40px;
  padding-left: 30px;
}
</style>
