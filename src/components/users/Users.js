export default {
  name: 'users',
  data () {
    return {
      userData: [
        {
          username: '王小虎',
          email: 'tiger@163.com',
          mobile: '1233211234567'
        }
      ],
      total: 0,
      pagenum: 1,
      input3: '',
      // 添加
      dialogAddFormVisible: false,
      addForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      // 编辑
      dialogEditFormVisible: false,
      editForm: {
        id: '',
        username: '',
        email: '',
        mobile: ''
      },
      // 分配角色
      dialogAssignRoleVisible: false,
      assignRoleForm: {
        username: 'lay',
        id: '',
        rid: ''
      },
      rolesList: [],
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 5, max: 10, message: '长度在 5 到 10 个字符', trigger: 'blur' }
        ],
        email: [
          {
            pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
            message: '格式错误',
            trigger: 'blur'
          }
        ],
        mobile: [
          {
            pattern: /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/,
            message: '格式错误',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  created () {
    this.getUserData()
  },
  methods: {
    // 获取数据
    async getUserData (pagenum = 1, query = '') {
      let res = await this.$axios.get('users', {
        params: {
          query,
          pagenum,
          pagesize: 2
        }
      })
      this.userData = res.data.data.users
      this.total = res.data.data.total
      this.pagenum = res.data.data.pagenum
      // this.$axios
      //   .get('users', {
      //     params: {
      //       query,
      //       pagenum,
      //       pagesize: 2
      //     }
      //   })
      //   .then(res => {
      //     // console.log(res)
      // this.userData = res.data.data.users
      // this.total = res.data.data.total
      // this.pagenum = res.data.data.pagenum
      //   })
    },
    // 页数改变
    currentChange (currentPage) {
      this.getUserData(currentPage, this.input3)
    },
    // 搜索
    search () {
      this.getUserData(1, this.input3)
    },
    // 显示添加框
    showAddUsers () {
      this.dialogAddFormVisible = true
    },
    // 清空添加框
    addFormClear () {
      this.$refs.addUserRef.resetFields()
    },
    // 添加用户
    async addUsers () {
      let res = await this.$axios.post('users', this.addForm)
      if (res.data.meta.status === 201) {
        this.dialogAddFormVisible = false
        this.$message({
          message: '添加用户成功',
          type: 'success',
          duration: 800
        })
      }
      this.getUserData(1)
      // this.$axios.post('users', this.addForm).then(res => {
      // if (res.data.meta.status === 201) {
      //   this.dialogAddFormVisible = false
      //   this.$message({
      //     message: '添加用户成功',
      //     type: 'success',
      //     duration: 800
      //   })
      // }
      // this.getUserData(1)
      // })
    },
    // 改变状态
    /* eslint-disable */
    async changeState(row) {
      let { id, mg_state } = row
      let res = await this.$axios.put(`users/${id}/state/${mg_state}`)
      if (res.data.meta.status === 200) {
        // 1. 提示
        this.$message({
          message: '更新状态成功',
          type: 'success',
          duration: 800
        })
      }
      // this.$axios.put(`users/${id}/state/${mg_state}`).then(res => {
      //   if (res.data.meta.status === 200) {
      //     // 1. 提示
      //     this.$message({
      //       message: '更新状态成功',
      //       type: 'success',
      //       duration: 800
      //     })
      //   }
      // })
    },
    //删除用户
    async delUser(id) {
      try {
        await this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        let res = await this.$axios.delete(`users/${id}`)
        if (res.data.meta.status === 200) {
          this.$message({
            type: 'success',
            message: '删除成功!',
            duration: 800
          })
          this.getUserData()
        }
      } catch (error) {
        this.$message({
          type: 'info',
          message: '已取消删除',
          duration: 800
        })
      }
    },
    //   this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
    //     confirmButtonText: '确定',
    //     cancelButtonText: '取消',
    //     type: 'warning'
    //   })
    //     .then(() => {
    //       this.$axios.delete(`users/${id}`).then(res => {
    //         if (res.data.meta.status === 200) {
    //           this.$message({
    //             type: 'success',
    //             message: '删除成功!',
    //             duration: 800
    //           })
    //           this.getUserData()
    //         }
    //       })
    //     })
    //     .catch(() => {
    //       this.$message({
    //         type: 'info',
    //         message: '已取消删除',
    //         duration: 800
    //       })
    //     })
    // },
    // 显示编辑模态框
    async showEditUser(row) {
      let { id, username, mobile, email } = row
      let res = await this.$axios.get(`users/${id}`)
      this.dialogEditFormVisible = true
      this.editForm = res.data.data
    },
    // 编辑用户
    async editUser() {
      let { id, mobile, email } = this.editForm
      let res = await this.$axios.put(`users/${id}`, { mobile, email })
      if (res.data.meta.status === 200) {
        this.dialogEditFormVisible = false
        this.$message({
          type: 'success',
          message: '修改成功!',
          duration: 800
        })
        this.getUserData(this.pagenum)
      }
    },
    // 分配角色

    async showAssignRoleForm(row) {
      let res = await this.$axios.get('roles')
      this.rolesList = res.data.data
      const { id } = row
      let res1 = await this.$axios.get(`users/${id}`)
      this.assignRoleForm = res1.data.data
      let rid = res1.data.data.rid
      let res2 = await this.$axios.put(`users/${id}/role`, { rid })
      console.log(res2)

      this.dialogAssignRoleVisible = true
    }
  }
}
