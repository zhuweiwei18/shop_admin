<template>
  <div>
    <el-button
      type="success"
      plain
      @click="go2GoodsAdd"
    >添加商品</el-button>
    <el-table
      :data="goodsData"
      style="width: 100%"
    >
      <el-table-column type="index"></el-table-column>
      <el-table-column
        prop="goods_name"
        label="商品名称"
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="goods_price"
        label="商品价格"
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="goods_number"
        label="商品数量"
      >
      </el-table-column>
      <el-table-column label="创建时间">
        <template slot-scope="scope">
          <span>{{ scope.row.add_time | dateFilter}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      :page-size="4"
      :current-page="pagenum"
      @current-change="currentChange"
    >
    </el-pagination>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  data () {
    return {
      goodsData: [{
        add_time: '2016-05-02',
        goods_name: '王小虎',
        goods_number: '11',
        goods_price: '12'
      }],
      pagenum: 1,
      total: 1
    }
  },
  filters: {
    dateFilter (res) {
      return moment(res).format('YYYY-MM-DD')
    }
  },
  created () {
    let page = this.$route.params.page
    this.loadGoodsData(page)
  },
  methods: {
    currentChange (currentPage) {
      this.$router.push('/goods/' + currentPage)
      this.loadGoodsData(currentPage)
    },
    async loadGoodsData (pagenum = 1, query = '') {
      let res = await this.$axios.get('goods', { params: { query, pagenum, pagesize: 4 } })
      this.goodsData = res.data.data.goods
      this.pagenum = Number(res.data.data.pagenum)
      this.total = res.data.data.total
    },
    go2GoodsAdd () {
      this.$router.push('/goods-add')
    }
  }
}
</script>

<style>
</style>
