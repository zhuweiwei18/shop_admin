<template>
  <div>
    <el-button
      type="success"
      plain
      @click="showAddCatDialog"
    >添加分类</el-button>
    <el-table
      :data="catData"
      style="width: 100%"
    >
      <el-table-column type="expand">
        <template slot-scope="scope">
          <el-tree
            :data="scope.row.children"
            :props="defaultProps"
          ></el-tree>
        </template>
      </el-table-column>
      <el-table-column
        prop="cat_name"
        label="分类名称"
        width="180"
      >
      </el-table-column>
      <el-table-column
        label="是否有效"
        width="180"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.cat_deleted ? '否' : '是'}}</span>
        </template>
      </el-table-column>
      <el-table-column label="层级">
        <template slot-scope="scope">
          <span v-if="scope.row.cat_level == 0">一级</span>
          <span v-else-if="scope.row.cat_level == 1">二级</span>
          <span v-else>三级</span>
        </template>
      </el-table-column>
    </el-table>
    <!-- // 分页 -->
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      :page-size="4"
      :current-page="pagenum"
      @current-change="currentChange"
    >
    </el-pagination>
    <!-- // 添加分类对话框 -->
    <el-dialog
      title="添加分类"
      :visible.sync="dialogAddCatVisible"
    >
      <el-form
        :model="addCatForm"
        label-width="80px"
      >
        <el-form-item label="分类名称">
          <el-input
            v-model="addCatForm.cat_name"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="父级名称">
          <el-cascader
            v-model="addCatForm.cat_pid_arr"
            :options="options"
            :props="defaultProps2"
            clearable
          >

          </el-cascader>

        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogAddCatVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="addCat"
        >确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      catData: [{
        cat_name: '大家电',
        cat_level: '一级'
      }],
      addCatForm: {
        cat_name: '',
        cat_pid_arr: []
      },
      dialogAddCatVisible: false,
      pagenum: 1,
      total: 1,
      defaultProps: {
        children: 'children',
        label: 'cat_name'
      },
      defaultProps2: {
        value: 'cat_id',
        label: 'cat_name'
      },
      options: [{
        value: 'zhinan',
        label: '指南',
        children: [{
          value: 'shejiyuanze',
          label: '设计原则'
        }]
      }]
    }
  },
  created () {
    let page = this.$route.params.page
    this.loadCataData(page)
    this.loadCataData2()
  },
  methods: {
    // 分页
    currentChange (currentPage) {
      this.$router.push('/categories/' + currentPage)
      this.loadCataData(currentPage)
    },
    async loadCataData (pagenum = 1, query = '') {
      let res = await this.$axios.get('categories', { params: {
        query,
        pagenum,
        pagesize: 4,
        type: 3
      } })
      console.log(res)
      this.catData = res.data.data.result
      this.pagenum = res.data.data.pagenum + 1
      this.total = res.data.data.total
    },
    async loadCataData2 () {
      let res = await this.$axios.get('categories', { params: { type: 2 } })
      console.log(res)
      this.options = res.data.data
    },
    showAddCatDialog () {
      this.dialogAddCatVisible = true
    },
    async addCat () {
      /* eslint-disable */
      const { cat_name, cat_pid_arr } = this.addCatForm
      let res = await this.$axios.post('categories', { cat_name, cat_pid: cat_pid_arr[cat_pid_arr.length - 1], cat_level: cat_pid_arr.length })
      // console.log(res)
      if (res.data.meta.status === 201) {
        this.dialogAddCatVisible = false
        this.$message({
          type: 'success',
          message: '添加分类成功',
          duration: 800
        })
        this.loadCataData()
      }
    }
  }
}
</script>

<style>
</style>
