import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'
export default {
  created () {
    this.loadCatData()
  },
  data () {
    return {
      activeIndex: 1,
      activeName: 'one',
      addGoodsForm: {
        goods_name: '',
        goods_cat: [],
        goods_price: '',
        goods_number: '',
        goods_weight: '',
        goods_introduce: '',
        pics: []
      },
      options: [
        {
          value: 'zhinan',
          label: '指南',
          children: [
            {
              value: 'shejiyuanze',
              label: '设计原则'
            }
          ]
        }
      ],
      defaultProps: {
        label: 'cat_name',
        value: 'cat_id'
      },
      radio: true,
      headers: { Authorization: localStorage.getItem('token') },
      dialogImageUrl: '',
      dialogVisible: false,
      editorOption: {
        placeholder: '请输入商品内容'
      }
    }
  },
  components: {
    quillEditor
  },
  methods: {
    async loadCatData () {
      let res = await this.$axios.get('categories', { params: { type: 3 } })
      // console.log(res)
      this.options = res.data.data
    },
    tabClick (tab) {
      this.activeIndex = +tab.index + 1
    },
    next (index, name) {
      this.activeIndex = index
      this.activeName = name
    },
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    uploadGoods (res) {
      // console.log(res)
      this.addGoodsForm.pics.push({ pic: res.data.tmp_path })
    },
    /* eslint-disable*/
    async addGoods() {
      const {
        goods_name,
        goods_cat,
        goods_price,
        goods_number,
        goods_weight,
        goods_introduce,
        pics
      } = this.addGoodsForm
      let res = await this.$axios.post('goods', {
        goods_name,
        goods_cat: goods_cat.join(','),
        goods_price,
        goods_number,
        goods_weight,
        goods_introduce,
        pics
      })
      if (res.data.meta.status === 201) {
        this.$message({
          type: 'success',
          message: '添加商品成功',
          duration: 800
        })
        this.$router.push('/goods')
      }
    }
  }
}
